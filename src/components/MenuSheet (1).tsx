import React from "react";

import menuImage from "@/assets/Menu.png";
import menuPdf from "@/assets/ALBA Menu 13 apr 2026.pdf";

export const MenuSheet: React.FC = () => {
  return (
    <a
      href={menuPdf}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none"
      aria-label="Open menu PDF"
    >
      <img
        src={menuImage}
        alt="Menu"
        className="h-4 md:h-6 w-auto object-contain"
      />
    </a>
  );
};
