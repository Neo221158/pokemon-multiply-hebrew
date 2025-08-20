import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GameCard = ({ children, className }: GameCardProps) => {
  return (
    <Card className={cn(
      "bg-gradient-card shadow-card border-border p-6 rounded-xl",
      className
    )}>
      {children}
    </Card>
  );
};