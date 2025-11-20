import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import menuImage from "@/assets/Menu.png";

export type Dish = {
  name: string;
  description?: string;
  price: string;
};

// общий массив блюд
const menuItems = [
  {
    category: "MAIN",
    items: [
      { name: "ALBA OATMEAL WITH BERRY JAM AND BUTTER", description: "creamy oatmeal with berry jam, butter, crunchy granola and pecans", price: "7" },
      { name: "ALBA OATMEAL WITH SALMON AND AVOCADO", description: "creamy oatmeal topped with avocado, salmon, soft egg and crunchy seeds", price: "11" },
      { name: "ALBA OATMEAL WITH BACON, EGG AND MUSHROOMS", description: "creamy oatmeal with crispy bacon, mushroom and egg, sprinkled with cheese and herbs", price: "10" },
      { name: "ALBA CAESAR SALAD", description: "mix leaves with chicken breast, parmesan cheese, croutons and our signature sauce", price: "12" },
      { name: "ALBA POKE BOWL", description: "rice, salmon, lettuce, pickled cucumber, avocado, green onion and ponzu sauce with sesame", price: "14" },
      { name: "TOMATO MIX", description: "mix of tomatoes, avocado and burrata with our signature marinade and herbs", price: "13" },
      { name: "EGG BENEDICT WITH BACON", description: "brioche bread topped with hollandaise sauce, bacon and poached eggs", price: "13" },
      { name: "EGG BENEDICT WITH SALMON", description: "brioche bread topped with hollandaise sauce, salmon and poached eggs", price: "14" },
      { name: "EGG BENEDICT WITH ASPARAGUS", description: "brioche bread topped with hollandaise sauce, asparagus and poached eggs", price: "13" },
      { name: "KEFIR PANCAKES WITH COTTAGE CHEESE AND BERRY JAM", description: "fluffy kefir pancakes served with cottage cheese, berry jam and sour cream", price: "9" },
      { name: "KEFIR PANCAKES WITH SALMON AND AVOCADO", description: "kefir pancakes served with salmon, avocado and sauce", price: "12" },
    ],
  },
  {
    category: "SANDWICHES",
    items: [
      { name: "BRIOCHE SANDWICH WITH SALMON", description: "brioche sandwich with salmon, cream cheese, and fresh herbs", price: "11" },
      { name: "BRIOCHE SANDWICH WITH BACON AND EGG", description: "brioche sandwich with bacon, egg, cheddar cheese and special sauce", price: "10" },
      { name: "BRIOCHE SANDWICH WITH MUSHROOMS", description: "brioche sandwich with mushrooms, cheese and spinach", price: "10" },
      { name: "CIABATTA SANDWICH WITH HAM AND CHEESE", description: "ciabatta sandwich with ham, gouda cheese, greens and tomatoes", price: "9" },
      { name: "CIABATTA SANDWICH WITH MOZZARELLA AND TOMATO", description: "ciabatta sandwich with mozzarella, tomatoes, pesto and greens", price: "9" },
      { name: "CIABATTA SANDWICH WITH EGGPLANT AND FETA CHEESE", description: "ciabatta sandwich with baked eggplant, feta, tomatoes and herbs", price: "9" },
    ],
  },
  {
    category: "EGGS",
    items: [
      { name: "SCRAMBLED EGGS WITH BACON", description: "soft scrambled eggs with crispy bacon and herbs", price: "9" },
      { name: "SCRAMBLED EGGS WITH SALMON", description: "soft scrambled eggs with salmon and herbs", price: "10" },
      { name: "SCRAMBLED EGGS WITH VEGETABLES", description: "scrambled eggs with seasonal vegetables, herbs and cheese", price: "9" },
      { name: "OMELETTE WITH CHEESE AND TOMATOES", description: "french-style omelette with cheese, tomatoes and fresh herbs", price: "11" },
      { name: "OMELETTE WITH BACON AND CHEESE", description: "french-style omelette with bacon, cheese and herbs", price: "12" },
      { name: "OMELETTE WITH SALMON AND CREAM CHEESE", description: "french-style omelette with salmon, cream cheese and herbs", price: "13" },
      { name: "OMELETTE WITH MUSHROOMS", description: "french-style omelette with sliced mushrooms and a hint of truffle", price: "14" },
      { name: "OMELETTE WITH SHRIMP AND TOMATO", description: "french-style omelette with shrimps, tomatoes and cheese inside, garnished with lemon zest", price: "14" },
      { name: "GREEN OMLETTE WITH ASPARAGUS", description: "green omelette with spinach, eggs, asparagus, zesty lemon cream and fresh herbs", price: "14" },
    ],
  },
  {
    category: "DESSERTS",
    items: [
      { name: "MATCHA COOKIE", description: "white chocolate custard cream, matcha, and dried raspberry", price: "4" },
      { name: "CREME BRULEE", description: "classic creme brulee with a crisp caramelized sugar crust", price: "7" },
      { name: "WHITE CHOCOLATE YOGURT GANACHE WITH BERRY JAM", description: "delicate white chocolate yogurt with berry jam", price: "7" },
      { name: "RICE PUDDING WITH MANGO AND COCONUT MILK", description: "creamy rice pudding infused with tropical mango and smooth coconut milk", price: "8" },
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

export const MenuSheet: React.FC<{ onSelect: (item: Dish) => void }> = ({
  onSelect,
}) => {
  const [open, setOpen] = React.useState(false);

  const startX = React.useRef<number | null>(null);
  const currentX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX.current !== null) {
      currentX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    if (
      startX.current !== null &&
      currentX.current !== null &&
      currentX.current - startX.current > 70
    ) {
      setOpen(false);
    }

    startX.current = null;
    currentX.current = null;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="inline-flex items-center justify-center transition-opacity hover:opacity-80 focus:outline-none">
          <img src={menuImage} alt="Menu" className="h-4 md:h-6 w-auto object-contain" />
        </button>
      </SheetTrigger>

      <SheetContent
        className="w-full sm:w-[540px] overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
                      onSelect(item);
                      setOpen(false);
                    }} // открываем модалку и закрываем меню
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="text-base font-medium">{item.name}</span>
                      <span className="text-base font-semibold">€{item.price}</span>
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
    </Sheet>
  );
};
