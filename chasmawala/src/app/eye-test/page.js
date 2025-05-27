"use client";
import { useState } from "react";
import ColorBlindnessTest from "./color-blindness-test"; 
import DepthPerceptionTest from "./depth-perception-test"; 

export default function EyeTestHome() {
  const [selectedTest, setSelectedTest] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Choose an Eye Test</h1>

      {/* Toggle Test Selection */}
      {!selectedTest && (
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setSelectedTest("color-blindness")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Color Blindness Test
          </button>
          <button
            onClick={() => setSelectedTest("depth-perception")}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Depth Perception Test
          </button>
        </div>
      )}

      {/* Render Selected Test */}
      {selectedTest === "color-blindness" && <ColorBlindnessTest />}
      {selectedTest === "depth-perception" && <DepthPerceptionTest />}

      {/* Back Button */}
      {selectedTest && (
        <button
          onClick={() => setSelectedTest(null)}
          className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Back to Test Menu
        </button>
      )}
    </div>
  );
}
