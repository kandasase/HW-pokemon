import React from "react";
import { Link } from "react-router-dom";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemon: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemon }) => {
  return (
    <div>
      {pokemon.map((p, index) => (
        <Link key={index} to={`/pokemon/${index + 1}`}>
          <div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt={p.name}
            />
            <p>{p.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
