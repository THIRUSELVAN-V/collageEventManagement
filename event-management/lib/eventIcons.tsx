import type { LucideIcon } from "lucide-react";
import {
  Laptop,
  Theater,
  Rocket,
  Camera,
  Zap,
  HeartPulse,
  Bot,
  Trophy,
  CalendarDays,
} from "lucide-react";

export const eventIconMap: Record<string, LucideIcon> = {
  laptop: Laptop,
  theater: Theater,
  rocket: Rocket,
  camera: Camera,
  zap: Zap,
  wellness: HeartPulse,
  bot: Bot,
  trophy: Trophy,
};

export function getEventIcon(iconKey: string): LucideIcon {
  return eventIconMap[iconKey] ?? CalendarDays;
}
