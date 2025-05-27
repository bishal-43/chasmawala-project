"use client";

import { useState } from "react";

export default function DepthPerceptionTest() {
  const [position, setPosition] = useState(Math.floor(Math.random() * 100));
  const [userGuess, setUserGuess] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  const handleGuess = () => {
    const guess = parseInt(userGuess);
    if (isNaN(guess) || guess < 0 || guess > 100) {
      setMessage("⚠️ Please enter a number between 0 and 100.");
      return;
    }

    const difference = Math.abs(position - guess);
    if (difference <= 5) {
      setScore((prevScore) => prevScore + 1);
      setMessage("🎯 Great job! You were very close!");
    } else if (difference <= 15) {
      setMessage("👍 Not bad! Try again for better accuracy.");
    } else {
      setMessage("❌ Too far! Focus and try again.");
    }

    setPosition(Math.floor(Math.random() * 100)); // Generate a new position
    setUserGuess("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">🔍 Depth Perception Test</h1>

      <div className="relative w-64 h-4 bg-gray-300 rounded mb-4">
        <div
          className="absolute top-0 left-0 h-4 bg-blue-500 rounded transition-all duration-500"
          style={{ width: `${position}%` }}
        ></div>
      </div>

      {/* Input with Correct Placeholder Behavior */}
      <div className="relative">
        <input
          type="number"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          className="w-64 border p-3 rounded text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!userGuess && (
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            Guess the position (0-100)
          </span>
        )}
      </div>

      <button
        onClick={handleGuess}
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-300"
      >
        Submit
      </button>

      {message && (
        <p className="mt-4 px-4 py-2 bg-white dark:bg-gray-800 rounded shadow text-lg">
          {message}
        </p>
      )}

      <p className="mt-4 text-lg font-semibold">🏆 Score: {score}</p>
    </div>
  );
}
