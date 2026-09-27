import {
  AudioLines, Bot, BotMessageSquare, BrainCircuit, Building2, ChartColumnIncreasing, ChartNoAxesColumnIncreasing, Cloud,
  CloudCog, Factory, GraduationCap, Handshake, HeartPulse, Landmark, Leaf, MessagesSquare, Plus, Puzzle,
  ShieldCheck, ShoppingCart, Truck, Users, Workflow, Zap, type LucideIcon,
} from "lucide-react";

/** Icon names used in src/content/home.ts. */
export const homeIcons: Record<string, LucideIcon> = {
  zap: Zap,
  chart: ChartColumnIncreasing,
  leaf: Leaf,
  bot: Bot,
  agent: BotMessageSquare,
  brain: BrainCircuit,
  cloud: Cloud,
  cloudCog: CloudCog,
  workflow: Workflow,
  chat: MessagesSquare,
  voice: AudioLines,
  shield: ShieldCheck,
  puzzle: Puzzle,
  health: HeartPulse,
  education: GraduationCap,
  finance: Landmark,
  retail: ShoppingCart,
  manufacturing: Factory,
  logistics: Truck,
  government: Building2,
  more: Plus,
  team: Users,
  results: ChartNoAxesColumnIncreasing,
  secure: ShieldCheck,
  partnership: Handshake,
};
