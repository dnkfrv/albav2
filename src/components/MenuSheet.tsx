// src/components/MenuSheet.tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import menuImage from "@/assets/Menu.png";

const Menu = () => {
  const menuItems = [
    {
      category: "MAIN",
      items: [
        { name: "PERFECT SCRAMBLED EGGS WITH SOURDOUGH BREAD", description: "creamy scrambled eggs with grated parmesan and toasted sourdough bread", price: "9" },
        { name: "DANISH BREAKFAST", description: "sourdough bread, gouda cheese, avocado, creamy hard-boiled egg, whipped butter and berry jam", price: "9" },
        { name: "VEGAN MISO GRANOLA", description: "miso and cinnamon granola, peaches, basil, served with sweet whipped coconut labneh, oat milk, a drizzle of olive oil and rose water", price: "8" },
        { name: "FETA VEGAN TOAST", description: "toasted sourdough bread topped with vegan feta dip, quince jam, crushed peas with tahini, shaved asparagus, fresh mint, date molasses and pomegranate", price: "10" },
        { name: "CROQUETTES WITH SOUR CREAM AND RED CAVIAR", description: "cheesy potato croquettes with lemon cream cheese and red caviar", price: "12" },
        { name: "ROTI WITH SALMON, ASPARAGUS AND BOILED EGG", description: "puff roti with lemon cream cheese, salmon, asparagus and boiled egg", price: "12" },
        { name: "OATMEAL PORRIDGE WITH PROSCIUTTO CRUDO", description: "savory oatmeal with truffle sauce, poached egg and Prosciutto Crudo", price: "12" },
        { name: "CROQUE MADAME WITH TRUFFLE SAUCE", description: "brioche sandwich with prosciutto, gouda, scrambled eggs and a rich truffle sauce", price: "13" },
        { name: "EGGS BENEDICT WITH SALMON AND SPINACH", description: "brioche with avocado cream, salmon, poached eggs, yogurt hollandaise and fresh herbs", price: "13" },
        { name: "OMELETTE WITH MUSHROOMS", description: "French omelette with sliced mushrooms and a hint of truffle", price: "14" },
        { name: "OMELETTE WITH SHRIMP AND TOMATO", description: "French omelette with shrimp, sun-dried tomatoes and cheese inside, garnished with lemon zest", price: "14" },
        { name: "GREEN OMLETTE WITH ASPARAGUS", description: "spinach omelette with peas, asparagus, zesty lemon cream and fresh herbs", price: "14" },
         ]
    },
    {
      category: "DESSERTS",
      items: [
        { name: "MATCHA COOKIE", description: "white chocolate custard cream, matcha, and dried raspberry", price: "4" },
        { name: "CREME BRULEE", description: "classic creme brulee with a crisp caramelized sugar crust", price: "7" },
        { name: "WHITE CHOCOLATE YOGURT GANACHE WITH BERRY JAM", description: "delicate white chocolate yogurt with berry jam", price: "7" },
        { name: "RICE PUDDING WITH MANGO AND COCONUT MILK", description: "rice pudding infused with tropical mango and smooth coconut milk", price: "8" },
      ]
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
                  ]
    },
   ];

  return (
    <section id="menu" className="py-20 px-6 bg-card">
      <div className="container mx-auto max-w-4xl">
        <h2 className="font-kommon text-4xl font-bold text-center mb-0.3">Menu</h2>
        <p className="text-center text-muted-foreground mb-6">Fall / Winter 2025 / 2026</p>
        
        <div className="space-y-12">
          {menuItems.map((section) => (
            <div key={section.category}>
              <h3 className="font-kommon text-3xl font-bold mb-1 text-lg">
                {section.category}
              </h3>
              <div className="space-y-2">
                {section.items.map((item) => (
                  <div key={item.name} className="border-b border-border pb-1 last:border-0">
                    <div className="flex justify-between items-baseline mb-0.1">
                      <h4 className="font-martian text-lg">{item.name}</h4>
                      <span className="font-martian text-muted-foreground">{item.price}</span>
                    </div>
                    <p className="font-martian text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;

export const MenuSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* изображение Menu.png того же размера, что logo.png */}
        <button className="transition-opacity hover:opacity-80 focus:outline-none">
          <img
            src={menuImage}
            alt="Menu"
            className="h-5 md:h-7 w-auto object-contain"
          />
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold mb-6">Наше меню</SheetTitle>
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
                    className="flex justify-between items-center py-2 hover:bg-muted/50 px-3 rounded-md transition-colors"
                  >
                    <span className="text-lg text-foreground">{item.name}</span>
                    <span className="text-lg font-medium text-primary">
                      {item.price}
                    </span>
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
