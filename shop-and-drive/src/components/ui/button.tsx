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
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm": variant === "primary",
            "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500 shadow-sm": variant === "secondary",
            "border-2 border-red-600 text-red-600 hover:bg-red-50 focus:ring-red-500": variant === "outline",
            "text-gray-700 hover:bg-gray-100 focus:ring-gray-400": variant === "ghost",
            "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400": variant === "danger",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-7 py-3 text-base": size === "lg",
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
