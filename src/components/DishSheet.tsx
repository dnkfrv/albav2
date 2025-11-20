import React from "react";
import { X } from "lucide-react";

export const DishSheet = ({ dish, open, onClose }) => {
  // если блюдо ещё не выбрано — ничего не рендерим
  if (!dish) {
    return null;
  }

  return (
    <div
      className={`
       fixed top-0 right-0 h-full w-[80vw] max-w-[450px]
       bg-white z-[999]
       transform transition-transform duration-300
       ${open ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <div className="flex justify-end p-4">
        <button onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-full">

        {/* РЕНДЕРИМ ФОТО ТОЛЬКО ЕСЛИ ОНО ЕСТЬ */}
        {dish.image && (
          <img
            src={dish.image}
            className="w-full rounded-lg mb-4"
            alt={dish.name}
          />
        )}

        <h2 className="text-xl mb-2">{dish.name}</h2>

        {dish.description && (
          <p className="text-sm mb-4">{dish.description}</p>
        )}

        {(dish.kcal || dish.protein || dish.fat || dish.carbs) && (
          <div className="text-sm mb-4">
            {dish.kcal && <div><strong>Calories:</strong> {dish.kcal} kcal</div>}
            {dish.protein && <div><strong>Protein:</strong> {dish.protein} g</div>}
            {dish.fat && <div><strong>Fat:</strong> {dish.fat} g</div>}
            {dish.carbs && <div><strong>Carbs:</strong> {dish.carbs} g</div>}
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
