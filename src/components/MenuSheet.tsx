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

      {
        name: "DANISH BREAKFAST",
        description:
          "sourdough bread, gouda cheese, avocado, creamy hard-boiled egg, whipped butter and berry jam",
        price: "9",
      },

      {
        name: "VEGAN MISO GRANOLA",
        description:
          "miso and cinnamon granola, peaches, basil, served with sweet whipped coconut labneh, oat milk, a drizzle of olive oil and rose water",
        price: "8",
      },

      {
        name: "FETA VEGAN TOAST",
        description:
          "toasted sourdough bread topped with vegan feta dip, quince jam, crushed peas with tahini, shaved asparagus, fresh mint, date molasses and pomegranate",
        price: "10",
      },

      {
        name: "CROQUETTES WITH SOUR CREAM AND RED CAVIAR",
        description:
          "cheesy potato croquettes with lemon cream cheese and red caviar",
        price: "12",
      },

      {
        name: "ROTI WITH SALMON, ASPARAGUS AND BOILED EGG",
        description:
          "puff roti with lemon cream cheese, salmon, asparagus and boiled egg",
        price: "12",
      },

      {
        name: "OATMEAL PORRIDGE WITH PROSCIUTTO CRUDO",
        description:
          "savory oatmeal with truffle sauce, poached egg and Prosciutto Crudo",
        price: "12",
      },

      {
        name: "CROQUE MADAME WITH TRUFFLE SAUCE",
        description:
          "brioche sandwich with prosciutto, gouda, scrambled eggs and a rich truffle sauce",
        price: "13",
      },

      {
        name: "EGGS BENEDICT WITH SALMON AND SPINACH",
        description:
          "brioche with avocado cream, salmon, poached eggs, yogurt hollandaise and fresh herbs",
        price: "13",
      },

      {
        name: "OMELETTE WITH MUSHROOMS",
        description:
          "French omelette with sliced mushrooms and a hint of truffle",
        price: "14",
      },

      {
        name: "OMELETTE WITH SHRIMP AND TOMATO",
        description:
          "French omelette with shrimp, sun-dried tomatoes and cheese inside, garnished with lemon zest",
        price: "14",
      },

      {
        name: "GREEN OMLETTE WITH ASPARAGUS",
        description:
          "spinach omelette with peas, asparagus, zesty lemon cream and fresh herbs",
        price: "14",
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
      },
      {
        name: "CREME BRULEE",
        description:
          "classic creme brulee with a crisp caramelized sugar crust",
        price: "7",
      },
      {
        name: "WHITE CHOCOLATE YOGURT GANACHE WITH BERRY JAM",
        description: "delicate white chocolate yogurt with berry jam",
        price: "7",
      },
      {
        name: "RICE PUDDING WITH MANGO AND COCONUT MILK",
        description:
          "rice pudding infused with tropical mango and smooth coconut milk",
        price: "8",
      },
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
      { name: "BARISTA SET", description: "espresso, batch brew, cappuccino", price: "6" },
    ],
  },
];


// ★★★ Основной компонент
export const MenuSheet: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);

  return (
    <Sheet open={open} onOpenChange={(o) => {
      setOpen(o);
      if (!o) setSelectedItem(null);
    }}>
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

      {/* ПЕРВАЯ ШТОРКА (МЕНЮ) */}
      <SheetContent
        side="left"
        className="w-full sm:w-[540px] overflow-y-auto relative"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold mb-6">Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-8 py-4">
          {menuItems.map((section) => (
            <div key={section.category} className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary border-b border-border pb-2">
                {section.category}
              </h3>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-1 py-2 hover:bg-muted/50 px-3 rounded-md transition-colors cursor-pointer"
                    onClick={() => {
                      if (window.innerWidth >= 768) {
                        setSelectedItem(item);
                      }
                    }}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg text-foreground">{item.name}</span>
                      <span className="text-lg font-medium text-primary">
                        {item.price}
                      </span>
                    </div>

                    {item.description && (
                      <span className="text-sm text-muted-foreground">
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

      {/* ВТОРАЯ ШТОРКА (КАРТОЧКА БЛЮДА) — ВЫЕЗЖАЕТ НАЛЕВО */}
      {selectedItem && (
        <SheetContent
          side="left"
          className="
            hidden md:block 
            w-[480px] 
            border-r 
            overflow-y-auto 
            translate-x-[-540px] 
            fixed top-0 h-full bg-background shadow-xl
          "
        >
          {/* Крестик */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute right-4 top-4 text-xl opacity-60 hover:opacity-100"
          >
            ✕
          </button>

          <SheetHeader>
            <SheetTitle className="text-2xl font-bold mb-4 mt-8">
              {selectedItem.name}
            </SheetTitle>
          </SheetHeader>

          {/* Фото */}
          <div className="space-y-4 mb-6">
            {selectedItem.images?.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={selectedItem.name}
                className="w-full h-auto rounded-md"
              />
            ))}
          </div>

          {/* КБЖУ */}
          {selectedItem.nutrition && (
            <div className="mb-6 text-sm text-muted-foreground space-y-1 px-1">
              <p><strong>Calories:</strong> {selectedItem.nutrition.kcal} kcal</p>
              <p><strong>Proteins:</strong> {selectedItem.nutrition.proteins} g</p>
              <p><strong>Fats:</strong> {selectedItem.nutrition.fats} g</p>
              <p><strong>Carbs:</strong> {selectedItem.nutrition.carbs} g</p>
            </div>
          )}

          {/* Ингредиенты */}
          {selectedItem.ingredients && (
            <div className="mb-6 px-1">
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {selectedItem.ingredients.map((ing: string) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Аллергены */}
          {selectedItem.allergens && (
            <div className="mb-10 px-1">
              <h3 className="text-lg font-semibold mb-2">Allergens</h3>
              <p className="text-sm text-muted-foreground">
                {selectedItem.allergens.join(", ")}
              </p>
            </div>
          )}
        </SheetContent>
      )}
    </Sheet>
  );
};
