import React, { useState, useEffect } from "react";
import { PokemonClient } from "pokenode-ts";
import PokeImage from "../Components/PokeImage";
import GuessBar from "../Components/GuessBar";
import { Pokemon } from "../Types";

function PokeApp() {
  // strongly typed state
  const [pokemon, setPokemon] = useState<Pokemon>({});
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(0);

  const getRandomPokemon = async () => {
    const api = new PokemonClient();
    const randomIndex = Math.floor(Math.random() * 898) + 1; // 1 to 898
    const data = await api.getPokemonById(randomIndex);
    setPokemon(data);
    console.log(pokemon);
    console.log(`Fetching Pokémon at index ${randomIndex}: ${data.name}`);
    return data.id;
  };

  const fetchPokemonImage = async (
    retryCount: number = 10
  ): Promise<undefined> => {
    if (retryCount <= 0) {
      throw new Error("Too many attempts");
    }
    setHasLost(false);
    const api = new PokemonClient();
    const data = await api.getPokemonById(await getRandomPokemon());
    if (data.sprites.front_default) {
      // type of pokemonImage is default string so will not accept a null value - this assigns an empty string if null
      setPokemonImage(data.sprites.front_default || "");
      setPokemon(data);
      setLoading(false);
      setBrightness(0);
    } else {
      console.log(`sprite missing for $randomPokemonName. Retrying`);
      return await fetchPokemonImage(retryCount - 1);
    }
  };

  useEffect(() => {
    fetchPokemonImage();
  }, []);

  return (
    <>
      <h1>Who's that Pokemon?</h1>
      <PokeImage
        pokemonImage={pokemonImage}
        loading={loading}
        brightness={brightness}
      />
      <GuessBar
        pokemon={pokemon}
        onCorrectGuess={fetchPokemonImage}
        hasLost={hasLost}
        setHasLost={setHasLost}
        setBrightness={setBrightness}
      />
    </>
  );
}

export default PokeApp;
