import React from "react";
import { PokemonClient } from "pokenode-ts";
import { useState, useEffect } from "react";
import "../CSS/PokeImage.css";

function PokeImage() {
  // strongly typed state
  const [pokemonImage, setPokemonImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const getRandomPokemon = async () => {
    const api = new PokemonClient();
    const randomIndex = Math.floor(Math.random() * 898) + 1; // 1 to 898
    const data = await api.getPokemonById(randomIndex);
    console.log(`Fetching Pokémon at index ${randomIndex}: ${data.name}`);

    return data.id;
  };

  const fetchPokemonImage = async (
    retryCount: number = 10
  ): Promise<undefined> => {
    if (retryCount <= 0) {
      throw new Error("Too many attempts");
    }
    const api = new PokemonClient();

    const data = await api.getPokemonById(await getRandomPokemon());
    if (data.sprites.front_default) {
      // type of pokemonImage is default string so will not accept a null value - this assigns an empty string if null
      setPokemonImage(data.sprites.front_default || "");
      setLoading(false);
      console.log(data.name);
    } else {
      console.log("sprite missing for ${randomPokemonName}. Retrying");
      return await fetchPokemonImage(retryCount - 1);
    }
  };

  useEffect(() => {
    fetchPokemonImage();
  }, []);

  return (
    <>
      <div className="pokeimage-container">
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <img
            className="pokeimage"
            src={pokemonImage}
            alt="Hidden Pokemon"
            width={"200px"}
            onLoad={() => setLoading(false)}
          />
        )}
      </div>
    </>
  );
}

export default PokeImage;
