import type { Feature, FeatureIcon } from "../_lib/content";
import { Card } from "./card";
import {
  BookIcon,
  CardsIcon,
  ControllerIcon,
  CpuIcon,
  FaceTimeIcon,
  GlobeIcon,
  ShieldIcon,
  TrophyIcon,
} from "./icons";

const ICONS: Record<
  FeatureIcon,
  (props: { className?: string }) => React.ReactNode
> = {
  cards: CardsIcon,
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
    </Card>
  );
}
