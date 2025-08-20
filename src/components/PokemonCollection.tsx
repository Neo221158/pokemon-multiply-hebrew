import { PokemonCard } from "./PokemonCard";
import { pokemonNames } from "@/data/pokemon";

interface PokemonCollectionProps {
  caughtPokemon: Set<number>;
  className?: string;
}

export const PokemonCollection = ({ caughtPokemon, className }: PokemonCollectionProps) => {
  const getPokemonImage = (id: number) => {
    // For now, return a placeholder - in a full implementation, 
    // you'd have individual images for each Pokemon
    if (id === 1) return "/src/assets/pokemon-001-bulbasaur.png";
    if (id === 6) return "/src/assets/pokemon-006.png";
    if (id === 25) return "/src/assets/pokemon-001.png";
    return null;
  };

  return (
    <div className={className}>
      <h3 className="text-xl font-bold text-center mb-6 text-foreground" dir="rtl">
        הפוקימונים שתפסתם
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 max-h-96 overflow-y-auto">
        {Array.from(caughtPokemon)
          .sort((a, b) => a - b)
          .map((pokemonId) => (
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
  );
};