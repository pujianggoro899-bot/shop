import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        {
          "bg-carbon-600 text-gray-300": variant === "default",
          "bg-green-500/15 text-green-400 border border-green-500/20": variant === "success",
          "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20": variant === "warning",
          "bg-red-500/15 text-red-400 border border-red-500/20": variant === "danger",
          "bg-blue-500/15 text-blue-400 border border-blue-500/20": variant === "info",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
