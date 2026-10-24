import reactRouterNext from "@evolonix/react-router-next/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const BASE = "/pinochle/";

/**
 * GitHub Pages redirects /pinochle to /pinochle/; Vite's dev and preview
 * servers instead answer with a "did you mean /pinochle/?" page. Redirect the
 * same way locally, so a bare /pinochle (or /pinochle#top — the hash stays with
 * the browser) opens the site.
 */
function trailingSlashBase(): Plugin {
  const bare = BASE.slice(0, -1);
  /** "/pinochle" -> "/pinochle/", "/pinochle?x" -> "/pinochle/?x"; else null. */
  const redirect = (url: string | undefined): string | null =>
    url === bare || url?.startsWith(bare + "?")
      ? BASE + url.slice(bare.length)
      : null;
  const middleware = (
    req: { url?: string },
    res: {
      statusCode: number;
      setHeader: (k: string, v: string) => void;
      end: () => void;
    },
    next: () => void,
  ) => {
    const to = redirect(req.url);
    if (to === null) return next();
    res.statusCode = 301;
    res.setHeader("Location", to);
    res.end();
  };
  // First in the stack: Vite's own base check would answer before a plugin
  // middleware added the usual way gets the request.
  const first = (stack: { route: string; handle: typeof middleware }[]) =>
    stack.unshift({ route: "", handle: middleware });
  return {
    name: "trailing-slash-base",
    configureServer(server) {
      first(server.middlewares.stack as never);
    },
    configurePreviewServer(server) {
      first(server.middlewares.stack as never);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // Served from the /pinochle project-page subdirectory on GitHub Pages. Vite
  // rewrites asset URLs to this base, and @evolonix/react-router-next's
  // <AppRouter /> reads import.meta.env.BASE_URL for its router basename.
  base: BASE,
  plugins: [trailingSlashBase(), reactRouterNext(), react(), tailwindcss()],
});
