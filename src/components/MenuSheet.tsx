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

export type Dish = {
  name: string;
  description?: string;
  price: string;
  images?: string[];
  nutrition?: {
    kcal: number;
    protein: number; // g
    fat: number;     // g
    carbs: number;   // g
  };
  allergens?: string[];
};

const menuItems: { category: string; items: Dish[] }[] = [
  {
    category: "MAIN",
    items: [
      {
        name: "PERFECT SCRAMBLED EGGS WITH SOURDOUGH BREAD",
        description:
          "creamy scrambled eggs with grated parmesan and toasted sourdough bread",
        price: "9",
        images: [imgA213, imgA216],
        nutrition: {
          kcal: 500,
          protein: 25,
          fat: 30,
          carbs: 35,
        },
        allergens: ["Eggs", "Gluten (wheat)", "Dairy"],
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
          "savory oatmeal with truffle sauce, poached egg and Proscuitto Crudo",
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
      {
        name: "BARISTA SET",
        description: "espresso, batch brew, cappuccino",
        price: "6",
      },
    ],
  },
];

type MenuSheetProps = {
  onSelect?: (item: Dish) => void;
};

export const MenuSheet: React.FC<MenuSheetProps> = ({ onSelect }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedDish, setSelectedDish] = React.useState<Dish | null>(null);
  const [previewSrc, setPreviewSrc] = React.useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSelectedDish(null);
      setPreviewSrc(null);
    }
  };

  const startX = React.useRef<number | null>(null);
  const currentX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      startX.current !== null &&
      currentX.current !== null &&
      currentX.current - startX.current > 70
    ) {
      handleOpenChange(false);
    }

    startX.current = null;
    currentX.current = null;
  };

  const handleDishClick = (item: Dish) => {
    setSelectedDish(item);
    if (onSelect) onSelect(item);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button className="inline-flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none">
          <img
            src={menuImage}
            alt="Menu"
            className="h-4 md:h-6 w-auto object-contain"
          />
        </button>
      </SheetTrigger>

      <SheetContent
        className="
          w-screen
          max-w-screen
          sm:w-[650px]
          sm:max-w-[650px]
          overflow-y-auto
        "
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold mb-6">Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-8 py-4 pb-40">
          {menuItems.map((section) => (
            <div key={section.category} className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary border-b border-border pb-2">
                {section.category}
              </h3>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className="w-full text-left flex flex-col gap-1 py-2 hover:bg-muted/50 px-3 rounded-md transition-colors cursor-pointer"
                    onClick={() => handleDishClick(item)}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg text-foreground">
                        {item.name}
                      </span>
                      <span className="text-lg font-medium text-primary">
                        €{item.price}
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

        {selectedDish && (
          <div
            className="
              fixed inset-0 z-50
              bg-black/50 backdrop-blur-sm
              flex items-center justify-center
              px-4
            "
            onClick={() => setSelectedDish(null)}
          >
            <div
              className="
                min-h-[340px]
                w-full max-w-[500px]
                bg-background
                rounded-2xl
                border border-border
                shadow-xl
                px-4 py-4
                flex justify-between items-start gap-4
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-lg font-semibold truncate">
                    {selectedDish.name}
                  </h4>
                  <span className="text-lg font-medium flex-shrink-0">
                    €{selectedDish.price}
                  </span>
                </div>

                {selectedDish.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {selectedDish.description}
                  </p>
                )}

                {selectedDish.images && selectedDish.images.length > 0 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto">
                    {selectedDish.images.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={selectedDish.name}
                        className="h-28 w-28 object-cover rounded-md flex-shrink-0 cursor-pointer"
                        onClick={() => setPreviewSrc(src)}
                      />
                    ))}
                  </div>
                )}

                {selectedDish.nutrition && (
                  <div className="mt-3 text-xs text-muted-foreground space-y-1">
                    <div>
                      <span className="font-medium mr-1">Nutrition:</span>
                      <span>
                        {selectedDish.nutrition.kcal} kcal ·{" "}
                        {selectedDish.nutrition.protein} g protein ·{" "}
                        {selectedDish.nutrition.fat} g fat ·{" "}
                        {selectedDish.nutrition.carbs} g carbs
                      </span>
                    </div>
                  </div>
                )}

                {selectedDish.allergens && selectedDish.allergens.length > 0 && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="font-medium mr-1">Allergens:</span>
                    <span>{selectedDish.allergens.join(", ")}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setSelectedDish(null)}
                className="text-xl leading-none opacity-70 hover:opacity-100 flex-shrink-0"
                aria-label="Close dish details"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {previewSrc && (
          <div
            className="
              fixed inset-0 z-[9999]
              bg-black/70
              flex items-center justify-center
            "
            onClick={() => setPreviewSrc(null)}
          >
            <div
              className="
                relative max-w-[90vw] max-h-[90vh]
                md:-translate-y-4
              "
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={previewSrc}
                alt={selectedDish?.name ?? "Dish"}
                className="w-full h-full object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={() => setPreviewSrc(null)}
                className="
                  absolute -top-3 -right-3
                  h-8 w-8
                  rounded-full
                  bg-background/90
                  border border-border
                  flex items-center justify-center
                  text-lg leading-none
                  opacity-80 hover:opacity-100
                "
                aria-label="Close image preview"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
