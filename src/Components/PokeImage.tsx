import React from "react";
import { PokemonClient } from "pokenode-ts";
import { useState, useEffect } from "react";
import "../CSS/PokeImage.css";

function PokeImage() {
  // strongly typed state
  const [pokemonImage, setPokemonImage] = useState<string>("");

  const getRandomPokemon = async () => {
    const api = new PokemonClient();
    // getting the total number of pokemon by the length of the api's list
    const pokemonList = await api.listPokemons(900);
    const totalPokemon = pokemonList.results.length;

    const randomPokemon = Math.floor(Math.random() * totalPokemon);
    const randomPokemonName = pokemonList.results[randomPokemon].name;
    return randomPokemonName;
  };

  useEffect(() => {
    const fetchPokemonImage = async () => {
      const api = new PokemonClient();
      try {
        const data = await api.getPokemonByName(await getRandomPokemon());
        // type of pokemonImage is default string so will not accept a null value - this assigns an empty string if null
        setPokemonImage(data.sprites.front_default || "");
        console.log(data.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonImage();
  }, []);

  return (
    <>
      <div className="pokeimage-container">
        <img
          className="pokeimage"
          src={pokemonImage}
          alt="Hidden Pokemon"
          width={"200px"}
        />
      </div>
    </>
  );
}

export default PokeImage;
