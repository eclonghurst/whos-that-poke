import React, { useState, useEffect } from "react";
import { Pokemon } from "../Types";

function GuessBar({
  pokemon,
  onCorrectGuess,
  hasLost,
  setHasLost,
  brightness,
  setBrightness,
}: {
  pokemon: Pokemon;
  onCorrectGuess: () => void;
  hasLost: boolean;
  setHasLost: React.Dispatch<React.SetStateAction<boolean>>;
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [guess, setGuess] = useState<string>("");
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(2);
  const [streak, setStreak] = useState<number>(0);
  let stringSimilarity = require("string-similarity");

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // If the guess is correct, set a timeout to reset the win message after 3 seconds
    if (hasWon) {
      timerId = setTimeout(() => {
        setHasWon(false);
      }, 2000);
    }
    // Clean up timeout if component is unmounted before timeout is reached
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [hasWon]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setGuess(event.target.value);
  }

  function handleGuess(guess: string) {
    const similarity = stringSimilarity.compareTwoStrings(
      guess.toLowerCase(),
      pokemon.name?.toLowerCase() || ""
    );
    console.log("The user guessed: " + guess);
    if (
      similarity > 0.7 ||
      guess.toLowerCase() === pokemon.name?.toLowerCase() ||
      guess.toLowerCase() === pokemon.name?.split("-")[0].toLowerCase()
    ) {
      console.log("you won");
      setHasWon(true);
      // shows the answer
      setHasLost(true);
      setLives(2);
      setStreak(streak + 1);
      setBrightness(1);
      setTimeout(() => onCorrectGuess(), 2000);
      setGuess("");
    } else {
      setLives(lives - 1);
      if (lives === 0) {
        setStreak(0);
        setHasLost(true);
        setLives(2);
        setBrightness(1);
        setTimeout(() => onCorrectGuess(), 2000);
        setGuess("");
      }
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
        <h4>Guesses remaining: {lives + 1}</h4>
        <h5>Current streak: {streak}</h5>
      </div>
      {hasWon && <h2>You got it!</h2>}
      {hasLost && <h2>The answer was: {pokemon.name}</h2>}
    </>
  );
}

export default GuessBar;
