import React from "react";
import PokeImage from "../Components/PokeImage";
import GuessBar from "../Components/GuessBar";

function PokeApp() {
  return (
    <>
      <h1>Who's that Pokemon?</h1>
      <PokeImage />
      <GuessBar />
    </>
  );
}

export default PokeApp;
