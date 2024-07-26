/*import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../components/PokemonList";

interface Pokemon {
  name: string;
  url: string;
}

const HomePage: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => setPokemon(response.data.results));
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <PokemonList pokemon={filteredPokemon} />
    </div>
  );
};

export default HomePage;
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonList from "../components/PokemonList";

interface Pokemon {
  name: string;
  url: string;
  id: number; // เพิ่ม id สำหรับเก็บเลข index ของโปเกมอน
}

const HomePage: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        const fetches = response.data.results.map((p: Pokemon) =>
          axios.get(p.url)
        );
        Promise.all(fetches).then((results) => {
          const fullPokemonData = results.map((result) => ({
            name: result.data.name,
            url: result.data.url,
            id: result.data.id, // เก็บเลข index ของโปเกมอน
          }));
          setPokemon(fullPokemonData);
        });
      });
  }, []);

  const filteredPokemon = pokemon.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toString() === search
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon by name or index"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <PokemonList pokemon={filteredPokemon} />
    </div>
  );
};

export default HomePage;
