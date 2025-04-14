import { useEffect, useState } from "react";
import "./WeddingInvitation.css";
import { InvitationCard } from "./InvitationCard";

export default function DoorAnimation() {
  const [doorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoorsOpen(true);
    },500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col">
        <div className="door-container">
          <img
            src="https://i.ibb.co/8DfzZrjY/Chat-GPT-Image-Apr-14-2025-11-09-28-PM.png"
            alt="Left Door"
            className={`door left-door ${doorsOpen ? "open-left" : ""}`}
          />
          <img
            src="https://i.pinimg.com/736x/04/fb/4b/04fb4b12ab87e1832d17f723c81d1d69.jpg"
            alt="Right Door"
            className={`door right-door ${doorsOpen ? "open-right" : ""}`}
          />
          <InvitationCard />
        </div>
      </div>
    </div>
  );
}
