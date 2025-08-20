import { PokemonCard } from "./PokemonCard";
import { pokemonNames } from "@/data/pokemon";

interface PokemonCollectionProps {
  caughtPokemon: Set<number>;
  className?: string;
}

export const PokemonCollection = ({ caughtPokemon, className }: PokemonCollectionProps) => {
  const getPokemonImage = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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