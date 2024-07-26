import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

interface Pokemon {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => setPokemon(response.data))
        .catch((error) =>
          console.error("Error fetching the Pokémon data:", error)
        );
    }
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  // ตรวจสอบว่ามี id และเป็นสตริงก่อนแปลงเป็นตัวเลข
  const pokemonId = id ? parseInt(id, 10) : 0;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Index: {pokemon.id}</p>
      <p>Type: {pokemon.types.map((type) => type.type.name).join(", ")}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>
        Abilities:{" "}
        {pokemon.abilities.map((ability) => ability.ability.name).join(", ")}
      </p>
      <p>Stats:</p>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      {pokemonId > 1 && (
        <Button href={`/pokemon/${pokemonId - 1}`}>ก่อน</Button>
      )}
      {pokemonId < 151 && (
        <Button href={`/pokemon/${pokemonId + 1}`}>หลัง</Button>
      )}
      {pokemonId > 1 && <Link to={`/pokemon/${pokemonId - 1}`}>Previous</Link>}
      {pokemonId < 151 && <Link to={`/pokemon/${pokemonId + 1}`}>Next</Link>}
    </div>
  );
};

export default PokemonDetail;
