import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GameCard } from "./GameCard";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MultiplicationGridProps {
  level: number;
  question: { num1: number; num2: number; answer: number };
  onAnswer: (correct: boolean) => void;
}

export const MultiplicationGrid = ({ level, question, onAnswer }: MultiplicationGridProps) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

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
        const isHighlighted = 
          (i + 1 === question.num1 && j + 1 === question.num2) ||
          (i + 1 === question.num2 && j + 1 === question.num1);
        
        row.push(
          <div
            key={`${i}-${j}`}
            className={cn(
              "w-8 h-8 flex items-center justify-center text-xs font-medium border rounded",
              isHighlighted 
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
        <div className="text-lg text-muted-foreground mb-4">
          Find the answer in the grid below!
        </div>
      </div>

      <div className="flex justify-center">
        <div className="space-y-1 p-4 bg-gradient-sky rounded-lg">
          {renderGrid()}
        </div>
      </div>

      <div className="flex gap-4 items-center justify-center">
        <Input
          type="number"
          placeholder="Your answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="w-32 text-center text-lg font-bold"
          disabled={isAnswered}
        />
        <Button
          variant="pokemon"
          onClick={handleSubmit}
          disabled={!userAnswer || isAnswered}
          size="lg"
        >
          Submit
        </Button>
      </div>
    </GameCard>
  );
};