import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MultiplicationGrid } from "@/components/MultiplicationGrid";
import { GameProgress } from "@/components/GameProgress";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonCollection } from "@/components/PokemonCollection";
import { HebrewSpeech } from "@/components/HebrewSpeech";
import { generateMultiplicationQuestion, pokemonNames } from "@/data/pokemon";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/pokemon-hero.jpg";
import pikachu from "@/assets/pokemon-001.png";
import charizard from "@/assets/pokemon-006.png";
import bulbasaur from "@/assets/pokemon-001-bulbasaur.png";

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [caughtPokemon, setCaughtPokemon] = useState<Set<number>>(new Set());
  const [currentQuestion, setCurrentQuestion] = useState(() => generateMultiplicationQuestion(1));
  const [showPokemon, setShowPokemon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const getPokemonImage = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      const newCaughtPokemon = new Set(caughtPokemon);
      newCaughtPokemon.add(currentLevel);
      setCaughtPokemon(newCaughtPokemon);
      
      toast({
        title: "נכון! 🎉",
        description: `תפסת את ${pokemonNames[currentLevel - 1]}!`,
        variant: "default",
      });
      
      setShowPokemon(true);
      
      // Auto advance to next level after showing Pokemon
      setTimeout(() => {
        if (currentLevel < 151) {
          setCurrentLevel(currentLevel + 1);
          setCurrentQuestion(generateMultiplicationQuestion(currentLevel + 1));
        }
        setShowPokemon(false);
      }, 3000);
    } else {
      toast({
        title: "התשובה לא נכונה 😔",
        description: "זה בסדר! קח עוד הזדמנות ונסה שוב!",
        variant: "destructive",
      });
      
      // Reset the question
      setCurrentQuestion(generateMultiplicationQuestion(currentLevel));
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(generateMultiplicationQuestion(1));
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-sky flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-pokemon bg-clip-text text-transparent" dir="rtl">
              הרפתקאת מתמטיקה עם פוקימון
            </h1>
            <p className="text-xl text-foreground" dir="rtl">
              למדו כפל תוך כדי לכידת כל 151 הפוקימונים!
            </p>
          </div>
          
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Pokemon Math Adventure" 
              className="w-full max-w-lg mx-auto rounded-xl shadow-pokemon"
            />
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center" dir="rtl">
              <div className="bg-white/90 p-4 rounded-lg">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold">151 שלבים</div>
                <div className="text-sm text-muted-foreground">אחד לכל פוקימון</div>
              </div>
              <div className="bg-white/90 p-4 rounded-lg">
                <div className="text-2xl mb-2">🧮</div>
                <div className="font-semibold">כפל</div>
                <div className="text-sm text-muted-foreground">למדו עם טבלה 10×10</div>
              </div>
              <div className="bg-white/90 p-4 rounded-lg">
                <div className="text-2xl mb-2">🗣️</div>
                <div className="font-semibold">קול בעברית</div>
                <div className="text-sm text-muted-foreground">שמעו בעיות בעברית</div>
              </div>
            </div>
            
            <Button 
              variant="pokemon" 
              size="lg" 
              onClick={startGame}
              className="text-xl px-8 py-4 animate-bounce-gentle"
            >
              התחילו את ההרפתקה! 🚀
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (showPokemon) {
    return (
      <div className="min-h-screen bg-gradient-sky p-4">
        {/* Background collection */}
        <div className="fixed inset-0 opacity-20 overflow-hidden">
          <PokemonCollection caughtPokemon={caughtPokemon} className="p-4" />
        </div>
        
        {/* Main success content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6 animate-celebrate">
            <h2 className="text-4xl font-bold text-primary" dir="rtl">כל הכבוד!</h2>
            <div className="text-6xl animate-bounce-gentle">🎉</div>
            <PokemonCard
              id={currentLevel}
              name={pokemonNames[currentLevel - 1]}
              isUnlocked={true}
              showImage={true}
              imageUrl={getPokemonImage(currentLevel)}
            />
            <p className="text-xl text-foreground" dir="rtl">
              תפסת את <strong>{pokemonNames[currentLevel - 1]}</strong>!
            </p>
            {currentLevel < 151 && (
              <p className="text-muted-foreground" dir="rtl">
                התכוננו לשלב {currentLevel + 1}...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sky p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-pokemon bg-clip-text text-transparent mb-2" dir="rtl">
            הרפתקאת מתמטיקה עם פוקימון
          </h1>
          <HebrewSpeech num1={currentQuestion.num1} num2={currentQuestion.num2} />
        </div>

        <GameProgress 
          currentLevel={currentLevel}
          totalLevels={151}
          pokemonCaught={caughtPokemon.size}
        />

        <MultiplicationGrid
          level={currentLevel}
          question={currentQuestion}
          onAnswer={handleAnswer}
        />

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4" dir="rtl">הפוקימונים שתפסתי</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from(caughtPokemon).map((pokemonId) => (
              <PokemonCard
                key={pokemonId}
                id={pokemonId}
                name={pokemonNames[pokemonId - 1]}
                isUnlocked={true}
                showImage={true}
                imageUrl={getPokemonImage(pokemonId)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
