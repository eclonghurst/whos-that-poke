import React, { useState, useEffect } from "react";
import { Pokemon } from "../Types";

function GuessBar({
  pokemon,
  onCorrectGuess,
}: {
  pokemon: Pokemon;
  onCorrectGuess: () => void;
}) {
  const [guess, setGuess] = useState<string>("");
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [lives, setLives] = useState<number>(3);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // If the guess is correct, set a timeout to reset the win message after 3 seconds
    if (hasWon) {
      timerId = setTimeout(() => {
        setHasWon(false);
      }, 1000);
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
    console.log("The user guessed: " + guess);
    if (
      guess.toLowerCase() === pokemon.name?.toLowerCase() ||
      guess.toLowerCase() === pokemon.name?.split("-")[0].toLowerCase()
    ) {
      console.log("you won");
      setHasWon(true);
      setLives(3);
      setStreak(streak + 1);
      onCorrectGuess();
      setGuess("");
    } else {
      setLives(lives - 1);
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
        <h4>Guesses remaining: {lives}</h4>
        <h5>Current streak: {streak}</h5>
      </div>
      {hasWon && <h2>You got it!</h2>}
    </>
  );
}

export default GuessBar;
