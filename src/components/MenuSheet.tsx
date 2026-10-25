import React from "react";

import menuImage from "@/assets/Menu.png";

export const MenuSheet: React.FC = () => {
  return (
    <a
      href="/menu/"
      className="inline-flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none"
      aria-label="Open menu"
    >
      <img
        src={menuImage}
        alt="Menu"
        className="h-4 md:h-6 w-auto object-contain"
      />
    </a>
  );
};
