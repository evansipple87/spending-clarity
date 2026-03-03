import {
  UtensilsCrossed,
  Car,
  Gamepad2,
  ShoppingBag,
  Receipt,
  HeartPulse,
  GraduationCap,
  MoreHorizontal,
  LucideIcon,
} from "lucide-react";

export const CATEGORIES: Record<
  string,
  { label: string; icon: LucideIcon; color: string }
> = {
  food: { label: "Food", icon: UtensilsCrossed, color: "hsl(14, 80%, 56%)" },
  transport: { label: "Transport", icon: Car, color: "hsl(210, 70%, 52%)" },
  entertainment: { label: "Entertainment", icon: Gamepad2, color: "hsl(280, 60%, 55%)" },
  shopping: { label: "Shopping", icon: ShoppingBag, color: "hsl(340, 65%, 55%)" },
  bills: { label: "Bills", icon: Receipt, color: "hsl(38, 90%, 50%)" },
  health: { label: "Health", icon: HeartPulse, color: "hsl(152, 55%, 42%)" },
  education: { label: "Education", icon: GraduationCap, color: "hsl(200, 70%, 50%)" },
  other: { label: "Other", icon: MoreHorizontal, color: "hsl(215, 15%, 55%)" },
};

export const CATEGORY_LIST = Object.entries(CATEGORIES).map(([value, meta]) => ({
  value,
  ...meta,
}));
