import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  dark?: boolean;
}

export function Card({ children, className, onClick, hover = false, dark = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border shadow-sm",
        dark
          ? "bg-carbon-800 border-carbon-600"
          : "bg-carbon-800 border-carbon-600/50",
        hover && "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/5 hover:border-red-600/30 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6 pb-0", className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border-t border-carbon-600/50 px-6 py-4", className)}>{children}</div>;
}
