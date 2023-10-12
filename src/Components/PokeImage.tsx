import React from "react";
import { useState, useEffect } from "react";
import "../CSS/PokeImage.css";

type PokeImageProps = {
  pokemonImage: string;
  loading: boolean;
};

function PokeImage({ pokemonImage, loading }: PokeImageProps) {
  return (
    <>
      <div className="pokedex">
        <div className="pokeimage-container">
          {loading ? (
            <p>Loading ...</p>
          ) : (
            <img
              className="pokeimage"
              src={pokemonImage}
              alt="Hidden Pokemon"
              width={"200px"}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default PokeImage;
