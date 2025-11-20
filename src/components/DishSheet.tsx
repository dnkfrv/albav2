import React from "react";
import { X } from "lucide-react";

export const DishSheet = ({ dish, open, onClose }) => {
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
        <img src={dish.image} className="w-full rounded-lg mb-4" />

        <h2 className="text-xl mb-2">{dish.name}</h2>
        <p className="text-sm mb-4">{dish.description}</p>

        <div className="text-sm mb-4">
          <strong>Calories:</strong> {dish.kcal} kcal<br />
          <strong>Protein:</strong> {dish.protein} g<br />
          <strong>Fat:</strong> {dish.fat} g<br />
          <strong>Carbs:</strong> {dish.carbs} g
        </div>

        <div className="text-sm">
          <strong>Allergens:</strong> {dish.allergens.join(", ")}
        </div>
      </div>
    </div>
  );
};

