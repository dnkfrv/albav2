// src/components/MenuSheet.tsx
import React, { useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import menuImage from "@/assets/Menu.png";
import imgA213 from "@/assets/A-213.jpg";
import imgA216 from "@/assets/A-216.jpg";

// МАССИВ БЛЮД
const menuItems = [
  {
    category: "MAIN",
    items: [
      {
        name: "PERFECT SCRAMBLED EGGS WITH SOURDOUGH BREAD",
        description:
          "creamy scrambled eggs with grated parmesan and toasted sourdough bread",
        price: "9",
        kcal: 410,
        protein: 22,
        fat: 18,
        carbs: 34,
        allergens: ["eggs", "gluten", "dairy"],
        images: [imgA213, imgA216],
      },
      {
        name: "DANISH BREAKFAST",
        description:
          "sourdough bread, gouda cheese, avocado, creamy hard-boiled egg, whipped butter and berry jam",
        price: "9",
      },
    ],
  },
  {
    category: "DESSERTS",
    items: [
      {
        name: "MATCHA COOKIE",
        description: "white chocolate custard cream, matcha, and dried raspberry",
        price: "4",
      },
      {
        name: "CREME BRULEE",
        description: "classic creme brulee with caramelized crust",
        price: "7",
      },
    ],
  },
];

export const MenuSheet: React.FC<{
  onDishClick: (dish: any) => void;
  onWidthChange: (w: number) => void;
}> = ({ onDishClick, onWidthChange }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  // сообщаем реальную ширину родителю
  useEffect(() => {
    if (menuRef.current) {
      onWidthChange(menuRef.current.getBoundingClientRect().width);
    }
  });

  return (
    <div className="alba-menu-sheet" ref={menuRef}>
      <Sheet>
        <SheetTrigger asChild>
          <button className="inline-flex items-center justify-center transition-opacity hover:opacity-80">
            <img
              src={menuImage}
              alt="Menu"
              className="h-4 md:h-6 w-auto object-contain"
            />
          </button>
        </SheetTrigger>

        <SheetContent className="w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-3xl font-bold mb-6">Menu</SheetTitle>
          </SheetHeader>

          <div className="space-y-8 py-4">
            {menuItems.map((section) => (
              <div key={section.category}>
                <h3 className="text-2xl font-semibold">{section.category}</h3>

                {section.items.map((item) => (
                  <button
                    key={item.name}
                    className="w-full text-left block py-3 px-3 hover:bg-muted/50 rounded-md"
                    onClick={() => onDishClick(item)}
                  >
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
