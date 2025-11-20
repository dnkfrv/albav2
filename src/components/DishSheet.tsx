// src/components/DishSheet.tsx
import React from "react";
import { X } from "lucide-react";

export const DishSheet = ({ dish, open, onClose }) => {
  if (!dish) return null;

  return (
    <div
      className={`
        fixed top-0
        h-full w-[420px]
        bg-white shadow-xl z-[998]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-[110%]"}
      `}
      style={{ right: "540px" }} // ← приклеиваем к MenuSheet
    >
      {/* HEADER */}
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 overflow-y-auto h-full">

        {/* ГАЛЕРЕЯ */}
        {Array.isArray(dish.images) && dish.images.length > 0 && (
          <div className="flex gap-3 overflow-x-auto mb-4 pb-2">
            {dish.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={dish.name}
                className="w-[85%] rounded-lg flex-shrink-0"
              />
            ))}
          </div>
        )}

        {/* НАЗВАНИЕ */}
        <h2 className="text-xl mb-2">{dish.name}</h2>

        {/* ОПИСАНИЕ */}
        {dish.description && (
          <p className="text-sm mb-4">{dish.description}</p>
        )}

        {/* ХАРАКТЕРИСТИКИ */}
        {(dish.kcal || dish.protein || dish.fat || dish.carbs) && (
          <div className="text-sm mb-4">
            {dish.kcal && <div><strong>Calories:</strong> {dish.kcal} kcal</div>}
            {dish.protein && <div><strong>Protein:</strong> {dish.protein} g</div>}
            {dish.fat && <div><strong>Fat:</strong> {dish.fat} g</div>}
            {dish.carbs && <div><strong>Carbs:</strong> {dish.carbs} g</div>}
          </div>
        )}

        {/* АЛЛЕРГЕНЫ */}
        {dish.allergens && dish.allergens.length > 0 && (
          <div className="text-sm">
            <strong>Allergens:</strong> {dish.allergens.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
};
