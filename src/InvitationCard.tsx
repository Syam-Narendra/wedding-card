import { animated, useSpring } from "@react-spring/web";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
export const InvitationCard = () => {
  const [showInvitation, setShowInvitation] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInvitation(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const invitationAnimation = useSpring({
    opacity: showInvitation ? 1 : 0,
    transform: showInvitation ? "translateY(0)" : "translateY(50px)",
    config: { tension: 120, friction: 14 },
  });
  const AnimatedDiv = animated("div");

  return (
    <AnimatedDiv
      style={invitationAnimation}
      className="flex-1 flex flex-col items-center justify-start pt-8 px-4 overflow-y-auto"
    >
      <div className="max-w-4xl w-full bg-gradient-to-b from-amber-50 to-amber-100 opacity-85 rounded-lg border-2 border-amber-600 p-8 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-6">
            <Bell className="h-8 w-8 text-amber-800 mr-2" />
            <div className="h-0.5 w-32 bg-amber-800 self-center"></div>
            <div className="mx-4 text-amber-800 text-2xl">॥ श्री ॥</div>
            <div className="h-0.5 w-32 bg-amber-800 self-center"></div>
            <Bell className="h-8 w-8 text-amber-800 ml-2" />
          </div>
          <div className="w-24 h-24 mb-6 relative">
            <div className="absolute inset-0 border-2 border-amber-700 rounded-full"></div>
            <div className="absolute inset-2 border-2 border-amber-700 rounded-full"></div>
            <div className="absolute inset-4 border-2 border-amber-700 rounded-full"></div>
            <div className="absolute inset-6 border-2 border-amber-700 rounded-full"></div>
            <div className="absolute inset-8 border-2 border-amber-700 rounded-full"></div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6 text-center font-serif">
            Gangisetti's Wedding Invitation
          </h1>

          {/* Decorative line */}
          <div className="w-full max-w-md h-0.5 bg-amber-700 mb-8"></div>

          {/* Invitation text */}
          <div className="text-center mb-8">
            <p className="text-amber-800 text-lg mb-4">
              With the divine blessings of Lord Venkateswara
            </p>
            <p className="text-amber-900 text-xl mb-2 font-medium">
              We cordially invite you to celebrate the wedding of
            </p>
            <h2 className="text-2xl md:text-3xl text-amber-900 font-bold mb-2 font-serif">
              Rama & Sita
            </h2>
            <p className="text-amber-800 text-lg">On the auspicious day of</p>
            <p className="text-amber-900 text-xl font-medium mt-2">
              Saturday, June 15, 2024
            </p>
            <p className="text-amber-800 mt-2">
              Venue: Sri Venkateswara Temple Hall
            </p>
            <p className="text-amber-800">
              123 Temple Street, Tirupati, Andhra Pradesh
            </p>
          </div>

          {/* RSVP button */}
          <Button className="bg-amber-700 hover:bg-amber-800 text-amber-50 px-8 py-2 rounded-md text-lg">
            RSVP
          </Button>

          {/* Decorative footer */}
          <div className="mt-8 w-full flex justify-center">
            <div className="h-0.5 w-full max-w-md bg-amber-700"></div>
          </div>
          <p className="mt-4 text-amber-800 text-sm">ॐ नमो वेङ्कटेशाय</p>
        </div>
      </div>
    </AnimatedDiv>
  );
};
