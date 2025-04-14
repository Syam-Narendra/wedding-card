"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DoorAnimation from "./DoorsComponent";

export default function App() {
  const [clicked, setClicked] = useState(false);

  const handleStart = async () => {
    setClicked(true);
    try {
      console.log("Starting audio playback...");
      const audio = new Audio("/om-namo.mp3");
      await audio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  const Home = () => (
    <>
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/bg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-amber-900/40 mix-blend-overlay" />

        <div
          className="absolute inset-0 bg-radial-gradient from-amber-500/20 to-transparent"
          style={{
            background:
              "radial-gradient(circle at center, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0) 50%)",
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20"
            style={{
              width: "220px",
              height: "220px",
              filter: "blur(20px)",
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-300/60"
              style={{ width: "180px", height: "180px" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.7, 0],
                scale: [1, 1.8],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1,
                ease: "easeOut",
              }}
            />
          ))}

          <motion.button
            className="relative z-10 flex h-[180px] w-[180px] items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-xl font-bold text-red-950 shadow-lg"
            onClick={handleStart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                "0px 0px 15px 5px rgba(245, 158, 11, 0.3)",
                "0px 0px 25px 10px rgba(245, 158, 11, 0.5)",
                "0px 0px 15px 5px rgba(245, 158, 11, 0.3)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              },
            }}
          >
            <motion.div
              className="text-white"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              Click Here
            </motion.div>
          </motion.button>
        </div>
      </div>
    </>
  );

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {clicked ? <DoorAnimation /> : <Home />}
    </div>
  );
}
