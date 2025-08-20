import { GameCard } from "./GameCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PokemonCardProps {
  id: number;
  name: string;
  isUnlocked: boolean;
  onClick?: () => void;
}

export const PokemonCard = ({ id, name, isUnlocked, onClick }: PokemonCardProps) => {
  return (
    <GameCard className="text-center transition-all duration-300 hover:shadow-pokemon">
      <div className="space-y-3">
        <div className="text-2xl font-bold text-primary">#{String(id).padStart(3, '0')}</div>
        <div 
          className={cn(
            "w-16 h-16 mx-auto rounded-full border-4 flex items-center justify-center text-2xl",
            isUnlocked 
              ? "bg-gradient-pokemon border-pokemon-yellow animate-pulse-pokemon" 
              : "bg-muted border-border"
          )}
        >
          {isUnlocked ? "🔓" : "🔒"}
        </div>
        <div className="font-medium text-foreground">
          {isUnlocked ? name : "???"}
        </div>
        {onClick && (
          <Button 
            variant={isUnlocked ? "pokemon" : "outline"} 
            size="sm"
            onClick={onClick}
            disabled={!isUnlocked}
          >
            {isUnlocked ? "View" : "Locked"}
          </Button>
        )}
      </div>
    </GameCard>
  );
};