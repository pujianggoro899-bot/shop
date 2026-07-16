import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-carbon-900 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-lg shadow-red-600/20 hover:shadow-red-600/40 active:scale-[0.97]": variant === "primary",
            "bg-white/10 text-gray-200 hover:bg-white/15 border border-white/10 backdrop-blur-sm": variant === "secondary",
            "border-2 border-red-600/50 text-red-400 hover:bg-red-600/10 hover:border-red-500": variant === "outline",
            "text-gray-400 hover:text-white hover:bg-white/5": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20": variant === "danger",
          },
          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-7 py-3.5 text-sm": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
