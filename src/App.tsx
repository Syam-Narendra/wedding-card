import { useEffect, useState } from "react";
import "./WeddingInvitation.css"; // Import the CSS from below

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Trigger the door opening effect shortly after component mounts
    const timer = setTimeout(() => {
      setOpen(true);
    }, 100); // slight delay to trigger animation smoothly

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="door-container">
      <img
        src="https://i.pinimg.com/736x/04/fb/4b/04fb4b12ab87e1832d17f723c81d1d69.jpg"
        className={`door left-door ${open ? "open-left" : ""}`}
        alt="Left Door"
      />
      <img
        src="https://i.pinimg.com/736x/04/fb/4b/04fb4b12ab87e1832d17f723c81d1d69.jpg"
        className={`door right-door ${open ? "open-right" : ""}`}
        alt="Right Door"
      />
    </div>
  );
}
