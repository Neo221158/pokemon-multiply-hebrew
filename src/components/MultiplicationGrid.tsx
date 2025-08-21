import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GameCard } from "./GameCard";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface MultiplicationGridProps {
  level: number;
  question: { num1: number; num2: number; answer: number };
  onAnswer: (correct: boolean) => void;
  caughtPokemon: Set<number>;
}

export const MultiplicationGrid = ({ level, question, onAnswer, caughtPokemon }: MultiplicationGridProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  // Reset state when question changes (allows retry after wrong answer)
  useEffect(() => {
    setUserAnswer("");
    setIsAnswered(false);
    setShowGrid(false);
    setShowOverlay(true);
  }, [question]);

  // Get the last caught Pokémon or default to Mew (151)
  const getLastCaughtPokemon = () => {
    if (caughtPokemon.size === 0) return 151; // Mew as default
    return Math.max(...Array.from(caughtPokemon));
  };

  const getPokemonImage = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    const isCorrect = answer === question.answer;
    setIsAnswered(true);
    onAnswer(isCorrect);
  };

  const renderGrid = () => {
    const grid = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const cellValue = (i + 1) * (j + 1);
        // Only highlight the factors, not the answer
        const isFactorHighlighted = 
          (i + 1 === question.num1 && j === 0) || // Highlight first factor column
          (i === 0 && j + 1 === question.num2);   // Highlight second factor row
        
        row.push(
          <div
            key={`${i}-${j}`}
            className={cn(
              "w-8 h-8 flex items-center justify-center text-xs font-medium border rounded",
              isFactorHighlighted 
                ? "bg-pokemon-yellow text-foreground border-pokemon-red animate-pulse-pokemon" 
                : "bg-white/80 text-foreground border-border"
            )}
          >
            {cellValue}
          </div>
        );
      }
      grid.push(
        <div key={i} className="flex gap-1">
          {row}
        </div>
      );
    }
    return grid;
  };

  return (
    <GameCard className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Level {level}
        </h2>
        <div className="text-4xl font-bold text-pokemon-red mb-4">
          {question.num1} × {question.num2} = ?
        </div>
        <div className="text-lg text-muted-foreground mb-4" dir="rtl">
          {showGrid ? "השתמש בטבלה למציאת התשובה!" : "לחץ על הכפתור להצגת הטבלה"}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <Button
          variant="outline"
          onClick={() => setShowGrid(!showGrid)}
          className="text-lg px-6 py-3"
        >
          {showGrid ? "הסתר טבלה" : "הצג טבלה"}
        </Button>
      </div>

      {showGrid && (
        <div className="flex justify-center relative">
          <div className="space-y-1 p-4 bg-gradient-sky rounded-lg relative">
            {/* Clickable overlay */}
            {showOverlay && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm rounded-lg flex items-center justify-center cursor-pointer z-20 transition-opacity duration-300"
                onClick={() => setShowOverlay(false)}
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">🎯</div>
                  <div className="text-lg font-medium">לחץ כדי לחשוף</div>
                  <div className="text-sm opacity-75 mt-1" dir="rtl">לחץ בכל מקום כדי לחשוף את הטבלה</div>
                </div>
              </div>
            )}
            {/* Pokémon image overlay */}
            <div className="absolute top-2 right-2 z-10">
              <img
                src={getPokemonImage(getLastCaughtPokemon())}
                alt="Last caught Pokémon"
                className="w-16 h-16 object-contain bg-white/80 rounded-full p-1 border-2 border-pokemon-yellow shadow-lg"
              />
            </div>
            {renderGrid()}
          </div>
        </div>
      )}

      <div className="flex gap-4 items-center justify-center">
        <Input
          type="number"
          placeholder="התשובה שלכם"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-32 text-center text-lg font-bold"
          disabled={isAnswered}
          dir="ltr"
        />
        <Button
          variant="pokemon"
          onClick={handleSubmit}
          disabled={!userAnswer || isAnswered}
          size="lg"
        >
          שלח תשובה
        </Button>
      </div>
    </GameCard>
  );
};