import { func } from "prop-types";
import React, { useState } from "react";

function GuessBar({
  pokemonName,
  onCorrectGuess,
}: {
  pokemonName: string;
  onCorrectGuess: () => void;
}) {
  const [guess, setGuess] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setGuess(event.target.value);
  }

  function handleGuess(guess: string) {
    console.log("The user guessed: " + guess);
    if (guess.toLowerCase() === pokemonName.toLowerCase()) {
      console.log("you won");
      onCorrectGuess();
      setGuess("");
    } else {
      console.log("incorrect");
    }
    return guess;
  }

  return (
    <>
      <div className="guessbar-container">
        <input
          className="guess-input"
          onChange={handleChange}
          value={guess}
          type="text"
        />
        <button className="guess-button" onClick={() => handleGuess(guess)}>
          Guess
        </button>
      </div>
    </>
  );
}

export default GuessBar;
