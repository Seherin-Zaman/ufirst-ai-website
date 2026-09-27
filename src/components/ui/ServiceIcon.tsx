import {
  AudioLines,
  BookOpenText,
  Bot,
  CalendarClock,
  FileScan,
  Headset,
  LifeBuoy,
  Mail,
  MessagesSquare,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconName } from "@/types/content";

/** Content stores an icon *name*; this maps it to a component so content stays serialisable / CMS-friendly. */
const icons: Record<ServiceIconName, LucideIcon> = {
  headset: Headset,
  "life-buoy": LifeBuoy,
  messages: MessagesSquare,
  mail: Mail,
  book: BookOpenText,
  workflow: Workflow,
  calendar: CalendarClock,
  audio: AudioLines,
  "file-scan": FileScan,
  bot: Bot,
};

export function ServiceIcon({ name, className }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name];
  return <Icon aria-hidden strokeWidth={1.6} className={className} />;
}
