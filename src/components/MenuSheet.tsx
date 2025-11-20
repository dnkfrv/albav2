// src/components/MenuSheet.tsx
import React, { useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { X } from "lucide-react";
import menuImage from "@/assets/Menu.png";
import imgA213 from "@/assets/A-213.jpg";
import imgA216 from "@/assets/A-216.jpg";

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
        kcal: 620,
        protein: 21,
        fat: 32,
        carbs: 60,
        allergens: ["eggs", "gluten", "dairy"],
      },
      {
        name: "VEGAN MISO GRANOLA",
        description:
          "miso and cinnamon granola, peaches, basil, served with sweet whipped coconut labneh, oat milk, a drizzle of olive oil and rose water",
        price: "8",
        kcal: 510,
        protein: 11,
        fat: 14,
        carbs: 82,
        allergens: [],
      },
      {
        name: "FETA VEGAN TOAST",
        description:
          "toasted sourdough bread topped with vegan feta dip, quince jam, crushed peas with tahini, shaved asparagus, fresh mint, date molasses and pomegranate",
        price: "10",
        kcal: 530,
        protein: 15,
        fat: 22,
        carbs: 63,
        allergens: ["gluten", "sesame"],
      },
    ],
  },

  {
    category: "DESSERTS",
    items: [
      {
        name: "MATCHA COOKIE",
        description:
          "white chocolate custard cream, matcha, and dried raspberry",
        price: "4",
        kcal: 310,
        protein: 4,
        fat: 18,
        carbs: 34,
        allergens: ["gluten", "dairy"],
      },
      {
        name: "CREME BRULEE",
        description: "classic creme brulee with caramelized crust",
        price: "7",
        kcal: 390,
        protein: 6,
        fat: 28,
        carbs: 23,
        allergens: ["eggs", "dairy"],
      },
    ],
  },
];

// ---- КОМПОНЕНТ ----

export const MenuSheet: React.FC<{
  onDishClick: (dish: any) => void;
  onWidthChange: (width: number) => void;
}> = ({ onDishClick, onWidthChange }) => {
  const [open, setOpen] = React.useState(false);

  const sheetRef = useRef<HTMLDivElement | null>(null);

  // динамическая ширина
  useEffect(() => {
    if (!sheetRef.current) return;

    const observer = new ResizeObserver(() => {
      if (sheetRef.current) {
        onWidthChange(sheetRef.current.offsetWidth);
      }
    });

    observer.observe(sheetRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="inline-flex items-center justify-center transition-opacity hover:opacity-80">
          <img
            src={menuImage}
            alt="Menu"
            className="h-4 md:h-6 w-auto object-contain"
          />
        </button>
      </SheetTrigger>

      <SheetContent
        ref={sheetRef}
        className="w-full sm:w-[540px] overflow-y-auto"
      >
        <div className="flex justify-end w-full mt-2 mb-2 md:hidden">
          <button onClick={() => setOpen(false)} className="p-1">
            <X size={22} />
          </button>
        </div>

        <SheetHeader>
          <SheetTitle className="text-3xl font-bold mb-6">Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-8 py-4">
          {menuItems.map((section) => (
            <div key={section.category} className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary border-b pb-2">
                {section.category}
              </h3>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <button
                    key={item.name}
                    className="w-full text-left flex flex-col gap-1 py-2 px-3 hover:bg-muted/60 rounded-md transition"
                    onClick={() => onDishClick(item)}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg">{item.name}</span>
                      <span className="text-lg font-medium text-primary">
                        {item.price}
                      </span>
                    </div>

                    {item.description && (
                      <span className="text-sm text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
