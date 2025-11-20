import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import menuImage from "@/assets/Menu.png";
import imgA213 from "@/assets/A-213.jpg";
import imgA216 from "@/assets/A-216.jpg";

// MENU ITEMS
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
      {
        name: "VEGAN MISO GRANOLA",
        description:
          "miso and cinnamon granola, peaches, basil, sweet whipped coconut labneh",
        price: "8",
      },
      {
        name: "FETA VEGAN TOAST",
        description:
          "vegan feta dip, quince jam, peas with tahini, asparagus, mint",
        price: "10",
      },
    ],
  },

  {
    category: "DESSERTS",
    items: [
      {
        name: "MATCHA COOKIE",
        description: "white chocolate custard cream, matcha, raspberry",
        price: "4",
      },
      {
        name: "CREME BRULEE",
        description: "classic creme brulee",
        price: "7",
      },
    ],
  },
];

export const MenuSheet = ({
  onDishClick,
  open,
  onOpenChange,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="inline-flex items-center justify-center hover:opacity-80 transition-opacity">
          <img src={menuImage} alt="Menu" className="h-5 md:h-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[540px] bg-white shadow-xl overflow-y-auto border-l"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl font-semibold mb-6">Menu</SheetTitle>
        </SheetHeader>

        {menuItems.map((section) => (
          <div key={section.category} className="mb-10">
            <h3 className="text-2xl font-semibold border-b pb-2 text-primary">
              {section.category}
            </h3>

            <div className="mt-4 space-y-3">
              {section.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onDishClick(item)}
                  className="w-full text-left py-2 px-3 hover:bg-muted/40 rounded-md"
                >
                  <div className="flex justify-between text-lg">
                    <span>{item.name}</span>
                    <span className="font-medium text-primary">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  );
};
