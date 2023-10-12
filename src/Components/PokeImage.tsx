import React from "react";
import { useState, useEffect } from "react";
import "../CSS/PokeImage.css";
import { PokeImageProps } from "../Types";
import pokeball from "../pokeball.gif";

function PokeImage({ pokemonImage, loading }: PokeImageProps) {
  return (
    <>
      <div className="pokedex">
        <div className="pokeimage-container">
          {loading ? (
            <img src={pokeball} alt="" width={"200px"} />
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
