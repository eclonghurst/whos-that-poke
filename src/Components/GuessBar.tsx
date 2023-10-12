import React, { useState } from "react";
import { Pokemon } from "../Types";
function GuessBar({
  pokemon,
  onCorrectGuess,
}: {
  pokemon: Pokemon;
  onCorrectGuess: () => void;
}) {
  const [guess, setGuess] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setGuess(event.target.value);
  }

  function handleGuess(guess: string) {
    console.log("The user guessed: " + guess);
    if (guess.toLowerCase() === pokemon.name?.toLowerCase()) {
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
