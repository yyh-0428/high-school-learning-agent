import {
  Brain,
  Clock,
  Repeat,
  BookOpen,
  GitBranch,
  Shuffle,
  ClipboardList,
  Lightbulb,
  Sparkles,
  MessageCircle,
  Calendar,
  Compass,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Clock,
  Repeat,
  BookOpen,
  GitBranch,
  Shuffle,
  ClipboardList,
  Lightbulb,
  Sparkles,
  MessageCircle,
  Calendar,
  Compass,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}

export const iconNodes: Record<string, React.ReactNode> = {
  Brain: <Brain className="h-6 w-6" aria-hidden="true" />,
  Clock: <Clock className="h-6 w-6" aria-hidden="true" />,
  Repeat: <Repeat className="h-6 w-6" aria-hidden="true" />,
  BookOpen: <BookOpen className="h-6 w-6" aria-hidden="true" />,
  GitBranch: <GitBranch className="h-6 w-6" aria-hidden="true" />,
  Shuffle: <Shuffle className="h-6 w-6" aria-hidden="true" />,
  ClipboardList: <ClipboardList className="h-6 w-6" aria-hidden="true" />,
  Lightbulb: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
  Sparkles: <Sparkles className="h-6 w-6" aria-hidden="true" />,
  MessageCircle: <MessageCircle className="h-6 w-6" aria-hidden="true" />,
  Calendar: <Calendar className="h-6 w-6" aria-hidden="true" />,
  Compass: <Compass className="h-6 w-6" aria-hidden="true" />,
};

export {
  Brain,
  Clock,
  Repeat,
  BookOpen,
  GitBranch,
  Shuffle,
  ClipboardList,
  Lightbulb,
  Sparkles,
  MessageCircle,
  Calendar,
  Compass,
};
