import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import menuImage from "@/assets/Menu.png";

const menuItems = [
  {
    category: "Напитки",
    items: [
      { name: "Эспрессо", price: "150₽" },
      { name: "Капучино", price: "200₽" },
      { name: "Латте", price: "220₽" },
      { name: "Американо", price: "180₽" },
    ],
  },
  {
    category: "Завтраки",
    items: [
      { name: "Круассан с лососем", price: "450₽" },
      { name: "Яйца Бенедикт", price: "420₽" },
      { name: "Гранола с йогуртом", price: "350₽" },
    ],
  },
  {
    category: "Десерты",
    items: [
      { name: "Чизкейк", price: "280₽" },
      { name: "Тирамису", price: "320₽" },
      { name: "Круассан", price: "180₽" },
    ],
  },
];

export const MenuSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* кнопка с изображением Menu.png */}
        <button className="transition-opacity hover:opacity-80 focus:outline-none">
          <img
            src={menuImage}
            alt="Menu"
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
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
