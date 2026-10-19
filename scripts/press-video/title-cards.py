"""Renders the animated opening and closing cards for the 2.0 press clip.

python3 title-cards.py SCRATCH ICON [intro|outro|both|preview]  ->  SCRATCH/intro/f_%04d.png, SCRATCH/outro/f_%04d.png
Card faces are cut from the game's own How to Play screen (cards/*.png).
Palette is the app's "Midnight" UiKit.
"""
import math, os, random, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

S, ICON = sys.argv[1], sys.argv[2]
W, H, FPS = 1920, 1080, 30

def hexc(h, a=255):
    return ((h >> 16) & 255, (h >> 8) & 255, h & 255, a)

GROUND, TILE, LINE = 0x0D1A20, 0x12252D, 0x22404A
TEAL_DEEP, ACCENT, AMBER = 0x175F63, 0x5FD0C8, 0xE8A33D
AMBER_GROUND, AMBER_LINE = 0x1B1A14, 0x3A2F1A
TEXT, MUTED, EYEBROW = 0xEAF2F2, 0x9FC4C6, 0x7FB8BA

SF = "/System/Library/Fonts/SFNS.ttf"
def font(size, weight="Bold"):
    f = ImageFont.truetype(SF, size)
    f.set_variation_by_name(weight)
    return f

# -- easing ------------------------------------------------------------------
def clamp(x, a=0.0, b=1.0): return max(a, min(b, x))
def prog(t, start, dur): return clamp((t - start) / dur)
def out_cubic(p): return 1 - (1 - p) ** 3
def out_back(p, s=1.7):
    p -= 1
    return 1 + (s + 1) * p ** 3 + s * p ** 2
def lerp(a, b, p): return a + (b - a) * p

# -- background ----------------------------------------------------------------
def make_bg():
    g = Image.radial_gradient("L").resize((W * 2, int(H * 2.4)))
    g = g.crop((W // 2, int(H * 0.7), W // 2 + W, int(H * 0.7) + H))  # centre a bit high
    base = Image.new("RGBA", (W, H), hexc(0x183842))
    edge = Image.new("RGBA", (W, H), hexc(GROUND))
    return Image.composite(edge, base, g)

BG = make_bg()
GLOW = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(GLOW).ellipse((W / 2 - 520, 120, W / 2 + 520, 760), fill=hexc(TEAL_DEEP, 120))
GLOW = GLOW.filter(ImageFilter.GaussianBlur(160))

def background(t, glow=1.0):
    im = BG.copy()
    pulse = 0.75 + 0.25 * math.sin(t * 2.2)
    g = GLOW.copy()
    g.putalpha(g.getchannel("A").point(lambda v: int(v * glow * pulse)))
    im.alpha_composite(g)
    return im

# Gold dust drifting up — deterministic so every render matches.
rng = random.Random(7)
DUST = [(rng.uniform(0, W), rng.uniform(0, H), rng.uniform(1.2, 3.2),
         rng.uniform(18, 60), rng.uniform(0, 6.28), rng.uniform(1.5, 4)) for _ in range(70)]

def dust(im, t, amount=1.0):
    d = ImageDraw.Draw(im)
    for x, y, r, speed, ph, tw in DUST:
        yy = (y - t * speed) % H
        xx = x + 14 * math.sin(t * 0.8 + ph)
        a = (0.35 + 0.65 * (0.5 + 0.5 * math.sin(t * tw + ph))) * amount
        d.ellipse((xx - r, yy - r, xx + r, yy + r), fill=hexc(AMBER, int(150 * a)))

# Burst of sparks from a point (for pops).
def burst(im, t, t0, cx, cy, n=22, seed=3, reach=260, color=AMBER):
    p = prog(t, t0, 0.8)
    if p <= 0 or p >= 1: return
    r = random.Random(seed)
    d = ImageDraw.Draw(im)
    for _ in range(n):
        ang = r.uniform(0, 6.28); dist = r.uniform(0.4, 1.0) * reach
        e = out_cubic(p)
        x = cx + math.cos(ang) * dist * e; y = cy + math.sin(ang) * dist * e + 60 * p * p
        rad = r.uniform(2, 5) * (1 - p)
        d.ellipse((x - rad, y - rad, x + rad, y + rad), fill=hexc(color, int(255 * (1 - p))))

# -- cards -------------------------------------------------------------------
CARDS = {n: Image.open(f"{S}/cards/{n}.png").convert("RGBA")
         for n in ["As", "10s", "Ks", "Qs", "Js", "Jd", "Kd"]}

def shadow_of(img, blur=14, alpha=150):
    pad = blur * 3
    sh = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
    a = img.getchannel("A").point(lambda v: v * alpha // 255)
    blk = Image.new("RGBA", img.size, (0, 0, 0, 255)); blk.putalpha(a)
    sh.paste(blk, (pad, pad))
    return sh.filter(ImageFilter.GaussianBlur(blur)), pad

def glow_of(img, blur=22):
    pad = blur * 3
    g = Image.new("RGBA", (img.width + pad * 2, img.height + pad * 2), (0, 0, 0, 0))
    gold = Image.new("RGBA", img.size, hexc(AMBER)); gold.putalpha(img.getchannel("A"))
    g.paste(gold, (pad, pad))
    return g.filter(ImageFilter.GaussianBlur(blur)), pad

def place(layer, img, cx, cy, angle, scale, alpha=1.0, shadow=True, glow=0.0):
    if scale <= 0.01 or alpha <= 0: return
    w, h = max(1, int(img.width * scale)), max(1, int(img.height * scale))
    s = img.resize((w, h), Image.LANCZOS)
    if alpha < 1:
        s.putalpha(s.getchannel("A").point(lambda v: int(v * alpha)))
    if glow > 0:
        g, pad = glow_of(s)
        g.putalpha(g.getchannel("A").point(lambda v: min(255, int(v * glow * 1.6))))
        g = g.rotate(-angle, Image.BICUBIC, expand=True)
        layer.alpha_composite(g, (int(cx - g.width / 2), int(cy - g.height / 2)))
    if shadow:
        sh, pad = shadow_of(s, alpha=int(150 * alpha))
        sh = sh.rotate(-angle, Image.BICUBIC, expand=True)
        layer.alpha_composite(sh, (int(cx - sh.width / 2 + 6), int(cy - sh.height / 2 + 18)))
    r = s.rotate(-angle, Image.BICUBIC, expand=True)
    layer.alpha_composite(r, (int(cx - r.width / 2), int(cy - r.height / 2)))

def shine(layer, t, t0, dur=0.7, region=None):
    """A diagonal light sweep, masked to whatever is already on `layer`."""
    p = prog(t, t0, dur)
    if p <= 0 or p >= 1: return layer
    x0, y0, x1, y1 = region
    band = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(band)
    cx = lerp(x0 - 300, x1 + 300, out_cubic(p) if False else p)
    d.polygon([(cx - 70, y0 - 50), (cx + 20, y0 - 50), (cx - 120 + 20, y1 + 50), (cx - 210, y1 + 50)], fill=150)
    band = band.filter(ImageFilter.GaussianBlur(26))
    band = ImageChops.multiply(band, layer.getchannel("A"))
    white = Image.new("RGBA", (W, H), (255, 250, 235, 0)); white.putalpha(band)
    layer.alpha_composite(white)
    return layer

# -- text ----------------------------------------------------------------------
def text_size(f, s, tracking=0):
    b = f.getbbox(s)
    return b[2] - b[0] + tracking * (len(s) - 1), b

def draw_text(im, s, f, cx, y, color, alpha=1.0, tracking=0, dy=0):
    """Centred text; `tracking` px between glyphs."""
    if alpha <= 0: return
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    total = sum(f.getlength(c) for c in s) + tracking * (len(s) - 1)
    x = cx - total / 2
    for c in s:
        d.text((x, y + dy), c, font=f, fill=hexc(color))
        x += f.getlength(c) + tracking
    if alpha < 1:
        layer.putalpha(layer.getchannel("A").point(lambda v: int(v * alpha)))
    im.alpha_composite(layer)

def pill(im, s, f, cx, cy, fg, bg, line, scale=1.0, alpha=1.0, padx=34, pady=16):
    if scale <= 0.02 or alpha <= 0: return
    tw = f.getlength(s); b = f.getbbox(s)
    th = b[3] - b[1]
    w, h = int(tw + padx * 2), int(th + pady * 2)
    p = Image.new("RGBA", (w + 8, h + 8), (0, 0, 0, 0))
    d = ImageDraw.Draw(p)
    d.rounded_rectangle((4, 4, w + 3, h + 3), h // 2, fill=hexc(bg), outline=hexc(line), width=3)
    d.text((4 + padx, 4 + pady - b[1]), s, font=f, fill=hexc(fg))
    if scale != 1:
        p = p.resize((max(1, int(p.width * scale)), max(1, int(p.height * scale))), Image.LANCZOS)
    if alpha < 1:
        p.putalpha(p.getchannel("A").point(lambda v: int(v * alpha)))
    im.alpha_composite(p, (int(cx - p.width / 2), int(cy - p.height / 2)))
    return w

# -- opening -------------------------------------------------------------------
INTRO_SECONDS = 4.2
FAN = ["As", "Ks", "Qs", "Jd", "Kd"]
F_TITLE = font(150, "Heavy")
F_SUB = font(46, "Medium")
F_PILL = font(38, "Bold")

def intro_frame(t):
    im = background(t)
    dust(im, t, amount=clamp(t / 0.8))
    cards = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pivot = (W / 2, 900)
    R = 560
    for i, n in enumerate(FAN):
        a_end = (i - 2) * 11
        t0 = 0.12 + 0.11 * i
        p = prog(t, t0, 0.6)
        if p <= 0: continue
        e = out_back(p, 1.3)
        ex = pivot[0] + R * math.sin(math.radians(a_end))
        ey = pivot[1] - R * math.cos(math.radians(a_end))
        sx, sy = W / 2 + (i - 2) * 260, H + 360
        x, y = lerp(sx, ex, e), lerp(sy, ey, e)
        ang = lerp(a_end - 40 + i * 14, a_end, e)
        # the pinochle pair (Q♠ + J♦) lifts and glows
        lift, glow = 0.0, 0.0
        if n in ("Qs", "Jd"):
            q = prog(t, 1.05, 0.35)
            back = prog(t, 2.6, 0.6)
            lift = 34 * out_back(q, 2.2) * (1 - out_cubic(back) * 0.6)
            glow = q * (1 - back * 0.5) * (0.8 + 0.2 * math.sin(t * 9))
        x += math.sin(math.radians(a_end)) * -lift * 0.3
        y -= lift
        place(cards, CARDS[n], x, y, ang, 0.62, glow=glow)
    cards = shine(cards, t, 2.85, 0.75, region=(560, 120, 1360, 560))
    im.alpha_composite(cards)

    # title, letter by letter
    title = "PINOCHLE"
    track = lerp(60, 34, out_cubic(prog(t, 1.15, 1.0)))
    total = sum(F_TITLE.getlength(c) for c in title) + track * (len(title) - 1)
    x = W / 2 - total / 2
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for i, c in enumerate(title):
        p = prog(t, 1.15 + 0.055 * i, 0.45)
        if p > 0:
            e = out_back(p, 2.0)
            letter = Image.new("RGBA", (W, H), (0, 0, 0, 0))
            ImageDraw.Draw(letter).text((x, 560 + 60 * (1 - e)), c, font=F_TITLE, fill=hexc(TEXT))
            letter.putalpha(letter.getchannel("A").point(lambda v, p=p: int(v * clamp(p * 2.2))))
            layer.alpha_composite(letter)
        x += F_TITLE.getlength(c) + track
    im.alpha_composite(layer)

    # gold rule grows from the centre
    p = out_cubic(prog(t, 1.75, 0.55))
    if p > 0:
        d = ImageDraw.Draw(im)
        half = 300 * p
        d.rounded_rectangle((W / 2 - half, 762, W / 2 + half, 767), 3, fill=hexc(AMBER))

    p = prog(t, 1.9, 0.5)
    draw_text(im, "The classic two-handed duel", F_SUB, W / 2, 795, MUTED,
              alpha=out_cubic(p), dy=24 * (1 - out_cubic(p)))

    p = prog(t, 2.35, 0.45)
    if p > 0:
        pill(im, "NEW IN 2.0", F_PILL, W / 2, 910, AMBER, AMBER_GROUND, AMBER_LINE,
             scale=out_back(p, 2.6), alpha=clamp(p * 3))
        burst(im, t, 2.4, W / 2, 910, n=26, reach=240)
    return im

# -- closing -------------------------------------------------------------------
OUTRO_SECONDS = 5.5
F_NAME = font(84, "Heavy")
F_CHIP = font(28, "Semibold")
F_CTA = font(44, "Bold")
F_PLAT = font(30, "Medium")
F_CLOSE = font(28, "Semibold")

icon = Image.open(ICON).convert("RGBA").resize((300, 300), Image.LANCZOS)
m = Image.new("L", (1200, 1200), 0)
ImageDraw.Draw(m).rounded_rectangle((0, 0, 1199, 1199), int(1200 * 0.2237), fill=255)
icon.putalpha(m.resize((300, 300), Image.LANCZOS))
ICON_IMG = icon

CHIPS = ["Guided first game", "Daily Deal", "Five table themes", "Online with Game Center"]

FLUSH = ["As", "10s", "Ks", "Qs", "Js"]  # the spade flush — 150, the closing hand
F_CTA_ROW = font(44, "Bold")
ICON_SMALL = ICON_IMG.resize((92, 92), Image.LANCZOS)

def outro_frame(t):
    im = background(t + 10)
    dust(im, t + 10)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pivot, R = (W / 2, 900), 600
    # The flush deals in from the left on an arc, one card at a time...
    sq = prog(t, 1.0, 0.35)          # ...then squares up and glows as a meld
    settle = prog(t, 2.4, 0.6)
    lift = 26 * out_back(sq, 2.2) * (1 - 0.6 * out_cubic(settle))
    glow = sq * (1 - 0.5 * settle) * (0.8 + 0.2 * math.sin(t * 9))
    for i, n in enumerate(FLUSH):
        a_end = (i - 2) * 12
        p = prog(t, 0.1 + 0.1 * i, 0.55)
        if p <= 0: continue
        e = out_back(p, 1.2)
        ex = pivot[0] + R * math.sin(math.radians(a_end))
        ey = pivot[1] - R * math.cos(math.radians(a_end)) - lift
        sx, sy = -260, 760 - 40 * i
        mx, my = (sx + ex) / 2, min(sy, ey) - 260      # arc's control point
        x = (1 - e) ** 2 * sx + 2 * (1 - e) * e * mx + e * e * ex
        y = (1 - e) ** 2 * sy + 2 * (1 - e) * e * my + e * e * ey
        ang = lerp(-120 + i * 8, a_end, e)
        place(layer, CARDS[n], x, y, ang, 0.6, glow=glow)
    layer = shine(layer, t, 1.35, 0.75, region=(520, 120, 1400, 560))
    im.alpha_composite(layer)
    burst(im, t, 1.05, W / 2, 330, n=30, reach=420, seed=11)

    p = prog(t, 1.2, 0.5)
    draw_text(im, "Pinochle: Two-Handed", F_NAME, W / 2, 560, TEXT,
              alpha=out_cubic(p), dy=30 * (1 - out_cubic(p)))

    # chips row
    widths = [F_CHIP.getlength(c) + 56 for c in CHIPS]
    gap = 18
    x = W / 2 - (sum(widths) + gap * (len(CHIPS) - 1)) / 2
    for i, (c, w) in enumerate(zip(CHIPS, widths)):
        p = prog(t, 1.55 + 0.12 * i, 0.4)
        if p > 0:
            pill(im, c, F_CHIP, x + w / 2, 712, ACCENT, TILE, LINE,
                 scale=out_back(p, 2.2), alpha=clamp(p * 3), padx=28, pady=14)
        x += w + gap

    # the store row: a small icon beside the call to action, as in a listing
    p = prog(t, 2.3, 0.5)
    if p > 0:
        e = out_cubic(p)
        cta = "Free to try on the App Store"
        tw = F_CTA_ROW.getlength(cta)
        row = ICON_SMALL.width + 24 + tw
        x0 = W / 2 - row / 2
        place(im, ICON_SMALL, x0 + ICON_SMALL.width / 2, 822 + 18 * (1 - e), 0,
              out_back(p, 2.0), alpha=clamp(p * 3))
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        b = F_CTA_ROW.getbbox(cta)
        ImageDraw.Draw(layer).text((x0 + ICON_SMALL.width + 24, 822 - (b[1] + b[3]) / 2 + 18 * (1 - e)),
                                   cta, font=F_CTA_ROW, fill=hexc(AMBER))
        layer.putalpha(layer.getchannel("A").point(lambda v: int(v * e)))
        im.alpha_composite(layer)
    p = prog(t, 2.55, 0.5)
    draw_text(im, "iPhone  ·  iPad  ·  Mac  ·  Apple TV", F_PLAT, W / 2, 896, MUTED,
              alpha=out_cubic(p), dy=20 * (1 - out_cubic(p)))
    p = prog(t, 3.0, 0.6)
    draw_text(im, "SEE YOU AT 1,000", F_CLOSE, W / 2, 985, EYEBROW, alpha=out_cubic(p), tracking=8)
    return im

def render(name, fn, seconds):
    out = f"{S}/{name}"
    os.makedirs(out, exist_ok=True)
    n = int(round(seconds * FPS))
    for i in range(n):
        fn(i / FPS).convert("RGB").save(f"{out}/f_{i:04d}.png", compress_level=1)
    print(name, n, "frames")

if __name__ == "__main__":
    which = sys.argv[3] if len(sys.argv) > 3 else "both"
    if which in ("both", "intro"): render("intro", intro_frame, INTRO_SECONDS)
    if which in ("both", "outro"): render("outro", outro_frame, OUTRO_SECONDS)
    if which == "preview":
        for t in (0.5, 1.2, 1.6, 2.6, 3.0, 4.0):
            intro_frame(t).convert("RGB").save(f"{S}/pv_in_{t}.png")
        for t in (0.35, 0.8, 1.5, 5.0):
            outro_frame(t).convert("RGB").save(f"{S}/pv_out_{t}.png")
