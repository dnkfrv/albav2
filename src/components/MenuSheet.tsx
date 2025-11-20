import React from "react";
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

// ITEMS
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

export const MenuSheet: React.FC<{ onDishClick: (dish: any) => void }> = ({
  onDishClick,
}) => {
  return (
    <div className="w-[540px] h-full bg-white shadow-xl overflow-y-auto border-l border-gray-200">
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-6">Menu</h2>

        {menuItems.map((section) => (
          <div key={section.category} className="mb-10">
            <h3 className="text-2xl font-semibold text-primary border-b pb-2">
              {section.category}
            </h3>

            <div className="mt-4 space-y-3">
              {section.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onDishClick(item)}
                  className="w-full text-left py-2 px-3 hover:bg-muted/50 rounded-md transition"
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
      </div>
    </div>
  );
};
