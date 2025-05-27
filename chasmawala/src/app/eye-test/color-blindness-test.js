"use client";

import { useState } from "react";
import Image from "next/image";

const plates = [
  { src: "/images/Ishihara/Ishihara1.jpg", answer: "12" },
  { src: "/images/Ishihara/Ishihara2.jpg", answer: "6" },
  { src: "/images/Ishihara/Ishihara3.png", answer: "74" },
];

export default function ColorBlindnessTest() {
  const [currentPlate, setCurrentPlate] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  const handleNext = () => {
    if (userAnswer === plates[currentPlate].answer) {
      setScore((prevScore) => prevScore + 1); // Corrected score update
    }
    setUserAnswer("");

    if (currentPlate < plates.length - 1) {
      setCurrentPlate(currentPlate + 1);
    } else {
      setTestCompleted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">🎨 Color Blindness Test</h1>

      {!testCompleted ? (
        <>
          <Image
            src={plates[currentPlate].src}
            width={300}
            height={300}
            alt="Ishihara Plate"
            className="mb-4 rounded shadow"
          />
          <input
            type="text"
            placeholder="Enter the number you see"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border p-2 rounded mb-4"
          />
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded shadow"
          >
            Next
          </button>
        </>
      ) : (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-bold">✅ Test Completed!</h2>
          <p className="text-lg">Your Score: {score} / {plates.length}</p>
          <p className="text-sm text-gray-500">Thank you for taking the test.</p>
        </div>
      )}
    </div>
  );
}
