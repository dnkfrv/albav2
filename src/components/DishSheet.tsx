// src/components/DishSheet.tsx
import React from "react";
import { X } from "lucide-react";

export const DishSheet = ({
  dish,
  open,
  onClose,
  menuWidth,
}) => {
  if (!dish) return null;

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 768;

  return (
    <div
      className={`
        fixed top-0
        h-full w-[420px]
        bg-white shadow-xl z-[998]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-[110%]"}
      `}
      style={{
        right: isDesktop ? `${menuWidth}px` : "0px",
      }}
    >
      {/* header */}
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="p-1 hover:opacity-70">
          <X size={22} />
        </button>
      </div>

      {/* content */}
      <div className="p-4 overflow-y-auto h-full">

        {dish.images && (
          <div className="flex gap-3 overflow-x-auto mb-4 pb-2">
            {dish.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-[85%] rounded-lg flex-shrink-0 object-cover"
              />
            ))}
          </div>
        )}

        <h2 className="text-xl mb-2">{dish.name}</h2>

        {dish.description && (
          <p className="text-sm mb-4">{dish.description}</p>
        )}

        {(dish.kcal || dish.protein || dish.fat || dish.carbs) && (
          <div className="text-sm mb-4">
            {dish.kcal && (
              <div>
                <strong>Calories: </strong>
                {dish.kcal} kcal
              </div>
            )}
            {dish.protein && (
              <div>
                <strong>Protein: </strong>
                {dish.protein} g
              </div>
            )}
            {dish.fat && (
              <div>
                <strong>Fat: </strong>
                {dish.fat} g
              </div>
            )}
            {dish.carbs && (
              <div>
                <strong>Carbs: </strong>
                {dish.carbs} g
              </div>
            )}
          </div>
        )}

        {dish.allergens && dish.allergens.length > 0 && (
          <div className="text-sm">
            <strong>Allergens:</strong> {dish.allergens.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
};
