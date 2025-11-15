// src/components/AboutSheet.tsx
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import logoImage from "@/assets/logo.png";

export const AboutSheet: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Логотип + подписи как одна кликабельная зона */}
        <button className="inline-flex flex-col items-start gap-1 focus:outline-none hover:opacity-80 transition-opacity">
          <img
            src={logoImage}
            alt="Alba Bistro Logo"
            className="h-4 md:h-6 w-auto object-contain"
          />

          <div className="text-left leading-tight mt-1">
            <p className="font-kommon text-[10px] md:text-xs tracking-[0.16em] text-[#644A42]">
              BISTRO • SPECIALTY COFFEE • MATCHA BAR
            </p>
            <p className="font-martian text-[9px] md:text-xs text-[#644A42]/80 mt-0.5">
              Fresh take on breakfast and brunch
            </p>
            <p className="font-martian text-[8px] md:text-[11px] text-[#644A42]/80 mt-0.5">
              Every day, 9:00–17:00
            </p>
          </div>
        </button>
      </SheetTrigger>

      {/* Шторка слева */}
      <SheetContent
        side="left"
        className="w-full sm:w-[540px] overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold mb-4">About</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 text-sm md:text-base text-muted-foreground">
          <p>
            Welcome to Alba Bistro, your new corner of taste and style in
            Lisbon! Our bright space with a sunny terrace at Rato Square invites
            you to immerse yourself in an atmosphere of comfort and enjoyment.
          </p>
          <p>
            Alba Bistro offers a fresh take on breakfast and brunch - our
            exquisite menu is crafted for those who appreciate subtle taste and
            originality.
          </p>
          <p>
            Try our signature coffee cocktails and explore the rich variety of
            matcha options. Visit us for new gastronomic experiences and
            comfort! We eagerly await your visit.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};
