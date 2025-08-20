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
          <h3 className="text-lg font-semibold text-foreground">Progress</h3>
          <div className="text-sm text-muted-foreground">
            Level {currentLevel} of {totalLevels}
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-3" />
        
        <div className="flex justify-between text-sm">
          <span className="text-pokemon-blue font-medium">
            🎮 Current Level: {currentLevel}
          </span>
          <span className="text-pokemon-red font-medium">
            ⚡ Pokémon Caught: {pokemonCaught}
          </span>
        </div>
      </div>
    </GameCard>
  );
};