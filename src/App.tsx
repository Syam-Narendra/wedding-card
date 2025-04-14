import { useState } from "react";
import "./WeddingInvitation.css";


export default function DoorAnimation() {
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [started, setStarted] = useState(false);

  const handleStart = async () => {
    try {
      console.log("Starting audio playback...");
      const audio = new Audio("/om-namo.mp3");
      await audio.play(); // wait until audio plays
      setStarted(true);
      setTimeout(() => {
        setDoorsOpen(true);
      }, 100); // short delay for smoothness
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  return (
    <div>
      <div className="door-container">
        <img
          src="https://i.pinimg.com/736x/04/fb/4b/04fb4b12ab87e1832d17f723c81d1d69.jpg"
          alt="Left Door"
          className={`door left-door ${doorsOpen ? "open-left" : ""}`}
        />
        <img
          src="https://i.pinimg.com/736x/04/fb/4b/04fb4b12ab87e1832d17f723c81d1d69.jpg"
          alt="Right Door"
          className={`door right-door ${doorsOpen ? "open-right" : ""}`}
        />
      </div>
      {!started && (
        <button className="play-button" onClick={handleStart}>
          ▶ Play
        </button>
      )}
    </div>
  );
}
