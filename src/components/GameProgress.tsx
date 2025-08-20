import { GameCard } from "./GameCard";
import { Progress } from "@/components/ui/progress";

interface GameProgressProps {
  currentLevel: number;
  totalLevels: number;
  pokemonCaught: number;
}

export const GameProgress = ({ currentLevel, totalLevels, pokemonCaught }: GameProgressProps) => {
  const progressPercentage = (currentLevel / totalLevels) * 100;

  return (
    <GameCard className="mb-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground" dir="rtl">התקדמות</h3>
          <div className="text-sm text-muted-foreground" dir="rtl">
            שלב {currentLevel} מתוך {totalLevels}
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-3" />
        
        <div className="flex justify-between text-sm" dir="rtl">
          <span className="text-pokemon-blue font-medium">
            🎮 שלב נוכחי: {currentLevel}
          </span>
          <span className="text-pokemon-red font-medium">
            ⚡ פוקימונים שנתפסו: {pokemonCaught}
          </span>
        </div>
      </div>
    </GameCard>
  );
};