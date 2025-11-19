// src/components/MenuSheet.tsx
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import menuImage from "@/assets/Menu.png";

// Фото для Scrambled Eggs
import eggImg1 from "@/assets/A-213.jpg";
import eggImg2 from "@/assets/A-216.jpg";

const menuItems = [
  {
    category: "MAIN",
    items: [
      {
        name: "PERFECT SCRAMBLED EGGS WITH SOURDOUGH BREAD",
        description:
          "creamy scrambled eggs with grated parmesan and toasted sourdough bread",
        price: "9",

        images: [eggImg1, eggImg2],

        nutrition: {
          kcal: 520,
          proteins: 22,
          fats: 31,
          carbs: 38,
        },

        ingredients: [
          "Eggs",
          "Sourdough bread",
          "Parmesan cheese",
          "Butter",
          "Salt",
          "Pepper",
        ],

        allergens: ["Eggs", "Gluten", "Dairy"],
      },

      { name: "DANISH BREAKFAST", price: "9" },
      { name: "VEGAN MISO GRANOLA", price: "8" },
      { name: "FETA VEGAN TOAST", price: "10" },
      { name: "CROQUETTES WITH SOUR CREAM AND RED CAVIAR", price: "12" },
      { name: "ROTI WITH SALMON, ASPARAGUS AND BOILED EGG", price: "12" },
      { name: "OATMEAL PORRIDGE WITH PROSCIUTTO CRUDO", price: "12" },
      { name: "CROQUE MADAME WITH TRUFFLE SAUCE", price: "13" },
      { name: "EGGS BENEDICT WITH SALMON AND SPINACH", price: "13" },
      { name: "OMELETTE WITH MUSHROOMS", price: "14" },
      { name: "OMELETTE WITH SHRIMP AND TOMATO", price: "14" },
      { name: "GREEN OMLETTE WITH ASPARAGUS", price: "14" },
    ],
  },

  {
    category: "DESSERTS",
    items: [
      { name: "MATCHA COOKIE", price: "4" },
      { name: "CREME BRULEE", price: "7" },
      { name: "WHITE CHOCOLATE YOGURT GANACHE WITH BERRY JAM", price: "7" },
      { name: "RICE PUDDING WITH MANGO AND COCONUT MILK", price: "8" },
    ],
  },

  {
    category: "DRINKS",
    items: [
      { name: "SINGLE ESPRESSO", price: "1.5" },
      { name: "DOUBLE ESPRESSO", price: "2.5" },
      { name: "AMERICANO", price: "3" },
      { name: "BATCH BREW", price: "3.5" },
      { name: "HAND BREW EXCEPTIONAL", price: "7" },
      { name: "BARISTA SET", price: "6" },
    ],
  },
];

// ★★★ Основной компонент
export const MenuSheet: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setSelectedItem(null);
      }}
    >
      {/* Кнопка меню */}
      <SheetTrigger asChild>
        <button className="inline-flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none">
          <img
            src={menuImage}
            alt="Menu"
            className="h-4 md:h-6 w-auto object-contain"
          />
        </button>
      </SheetTrigger>

      {/* ПЕРВАЯ ШТОРКА — меню */}
      <SheetContent side="left" className="w-full sm:w-[540px] overflow-y-auto relative">
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold mb-6">Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-8 py-4">
          {menuItems.map((section) => (
            <div key={section.category} className="space-y-4">
              <h3 className="text-2xl font-semibold border-b pb-2">
                {section.category}
              </h3>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-1 py-2 hover:bg-muted/50 px-3 rounded-md cursor-pointer"
                    onClick={() => {
                      if (window.innerWidth >= 768) setSelectedItem(item);
                    }}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg">{item.name}</span>
                      <span className="text-lg font-medium">{item.price}</span>
                    </div>

                    {item.description && (
                      <span className="text-sm opacity-70">
                        {item.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>

      {/* ВТОРАЯ ШТОРКА — карточка блюда */}
      {selectedItem && (
        <div
          className="
            hidden md:block
            fixed top-0 left-0
            h-full w-[480px]
            bg-white border-r shadow-xl
            z-[999]
            animate-in slide-in-from-left
          "
        >
          {/* Крестик */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute right-4 top-4 text-xl opacity-60 hover:opacity-100"
          >
            ✕
          </button>

          <div className="p-6 overflow-y-auto h-full">
            <h2 className="text-2xl font-bold mb-4 mt-6">
              {selectedItem.name}
            </h2>

            {/* Фото */}
            <div className="space-y-4 mb-6">
              {selectedItem.images?.map((img, i) => (
                <img key={i} src={img} className="w-full rounded-md" />
              ))}
            </div>

            {/* КБЖУ */}
            {selectedItem.nutrition && (
              <div className="mb-6 text-sm space-y-1">
                <p><strong>Calories:</strong> {selectedItem.nutrition.kcal} kcal</p>
                <p><strong>Proteins:</strong> {selectedItem.nutrition.proteins} g</p>
                <p><strong>Fats:</strong> {selectedItem.nutrition.fats} g</p>
                <p><strong>Carbs:</strong> {selectedItem.nutrition.carbs} g</p>
              </div>
            )}

            {/* Ингредиенты */}
            {selectedItem.ingredients && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                <ul className="list-disc pl-5 text-sm opacity-80">
                  {selectedItem.ingredients.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Аллергены */}
            {selectedItem.allergens && (
              <div className="mb-10">
                <h3 className="text-lg font-semibold mb-2">Allergens</h3>
                <p className="text-sm opacity-80">
                  {selectedItem.allergens.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Sheet>
  );
};
