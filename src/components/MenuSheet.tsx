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

// фото для SCRAMBLED EGGS
import eggImg1 from "@/assets/A-213.jpg";
import eggImg2 from "@/assets/A-216.jpg";

// МЕНЮ — с расширенными данными для детальной карточки
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
    ],
  },
];

// ✦ ОСНОВНОЙ КОМПОНЕНТ
export const MenuSheet: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [lightboxImg, setLightboxImg] = React.useState<string | null>(null);

  // свайп-закрытие для карточки блюда
  const detailStartX = React.useRef<number | null>(null);
  const detailCurrentX = React.useRef<number | null>(null);

  const touchStartDetail = (e: React.TouchEvent) => {
    detailStartX.current = e.touches[0].clientX;
    detailCurrentX.current = e.touches[0].clientX;
  };

  const touchMoveDetail = (e: React.TouchEvent) => {
    detailCurrentX.current = e.touches[0].clientX;
  };

  const touchEndDetail = () => {
    if (
      detailStartX.current !== null &&
      detailCurrentX.current !== null &&
      detailCurrentX.current - detailStartX.current > 60
    ) {
      setSelectedItem(null);
    }
    detailStartX.current = null;
    detailCurrentX.current = null;
  };

  // свайпы для лайтбокса
  const lightboxStartX = React.useRef<number | null>(null);
  const lightboxCurrentX = React.useRef<number | null>(null);

  const touchStartLb = (e: React.TouchEvent) => {
    lightboxStartX.current = e.touches[0].clientX;
    lightboxCurrentX.current = e.touches[0].clientX;
  };

  const touchMoveLb = (e: React.TouchEvent) => {
    lightboxCurrentX.current = e.touches[0].clientX;
  };

  const touchEndLb = () => {
    if (!selectedItem || !lightboxImg) return;

    const imgs = selectedItem.images;
    const idx = imgs.indexOf(lightboxImg);

    if (
      lightboxStartX.current !== null &&
      lightboxCurrentX.current !== null
    ) {
      const dx = lightboxCurrentX.current - lightboxStartX.current;

      if (dx < -40 && idx < imgs.length - 1) {
        setLightboxImg(imgs[idx + 1]);
      }
      if (dx > 40 && idx > 0) {
        setLightboxImg(imgs[idx - 1]);
      }
    }

    lightboxStartX.current = null;
    lightboxCurrentX.current = null;
  };

  return (
    <>
      {/* Лайтбокс поверх всего */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxImg(null)}
          onTouchStart={touchStartLb}
          onTouchMove={touchMoveLb}
          onTouchEnd={touchEndLb}
        >
          <img
            src={lightboxImg}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}

      <Sheet open={open} onOpenChange={setOpen}>
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

        {/* ЛЕВАЯ ШТОРКА — меню */}
        <SheetContent className="w-full sm:w-[480px] overflow-y-auto">
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
                        if (window.innerWidth >= 768)
                          setSelectedItem(item);
                      }}
                    >
                      <div className="flex justify-between items-baseline">
                        <span className="text-lg text-foreground">
                          {item.name}
                        </span>
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

        {/* ПРАВАЯ ШТОРКА — карточка блюда (ТОЛЬКО DESKTOP) */}
        {selectedItem && (
          <div className="hidden md:block fixed top-0 right-0 h-full w-[480px] bg-white border-l z-[999] overflow-y-auto animate-slide-left"
            onTouchStart={touchStartDetail}
            onTouchMove={touchMoveDetail}
            onTouchEnd={touchEndDetail}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>

              {/* Фото */}
              <div className="space-y-4 mb-6">
                {selectedItem.images?.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={img}
                    alt={selectedItem.name}
                    className="w-full h-auto rounded-md cursor-pointer"
                    onClick={() => setLightboxImg(img)}
                  />
                ))}
              </div>

              {/* КБЖУ */}
              {selectedItem.nutrition && (
                <div className="mb-6 text-sm text-muted-foreground space-y-1">
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
                  <ul className="list-disc pl-5 text-sm text-muted-foreground">
                    {selectedItem.ingredients.map((ing: string) => (
                      <li key={ing}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Аллергены */}
              {selectedItem.allergens && (
                <div className="mb-10">
                  <h3 className="text-lg font-semibold mb-2">Allergens</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedItem.allergens.join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Sheet>
    </>
  );
};
