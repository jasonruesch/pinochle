import { storeUrl, type Feature, type FeatureIcon } from "../_lib/content";
import { AppLink } from "./app-link";
import { Card } from "./card";
import {
  AppleIcon,
  BookIcon,
  CalendarIcon,
  CardsIcon,
  ControllerIcon,
  CpuIcon,
  FaceTimeIcon,
  GlobeIcon,
  PaletteIcon,
  ShieldIcon,
  TrophyIcon,
} from "./icons";

const ICONS: Record<
  FeatureIcon,
  (props: { className?: string }) => React.ReactNode
> = {
  cards: CardsIcon,
  calendar: CalendarIcon,
  palette: PaletteIcon,
  cpu: CpuIcon,
  globe: GlobeIcon,
  facetime: FaceTimeIcon,
  controller: ControllerIcon,
  trophy: TrophyIcon,
  book: BookIcon,
  shield: ShieldIcon,
};

export function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = ICONS[feature.icon];
  return (
    <Card accent={feature.tone} className="h-full">
      <span className="text-brand-700 dark:text-brand-300 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 dark:bg-brand-900/40">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {feature.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {feature.body}
      </p>
      {feature.storePage && (
        // This feature's own App Store page (a custom product page).
        <AppLink
          href={storeUrl(feature.storePage)}
          target="_blank"
          rel="noopener noreferrer"
          icon={<AppleIcon className="h-4 w-4" />}
          className="mt-3 text-sm font-medium"
        >
          See it on the App Store
        </AppLink>
      )}
    </Card>
  );
}
