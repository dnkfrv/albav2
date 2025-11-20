import React from "react";
import { X } from "lucide-react";

export const DishSheet = ({
  dish,
  onClose,
}: {
  dish: any;
  onClose: () => void;
}) => {
  return (
    <div className="w-[420px] h-full bg-white shadow-xl border-l border-gray-200 flex flex-col relative">

      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 hover:opacity-70"
      >
        <X size={22} />
      </button>

      {/* CONTENT */}
      <div className="p-6 overflow-y-auto">

        {dish.images && (
          <div className="flex gap-3 overflow-x-auto mb-4">
            {dish.images.map((img: string, i: number) => (
              <img key={i} src={img} className="w-[85%] rounded-lg" />
            ))}
          </div>
        )}

        <h2 className="text-xl mb-2">{dish.name}</h2>

        {dish.description && (
          <p className="text-sm mb-4">{dish.description}</p>
        )}

        <div className="text-sm mb-4 space-y-1">
          {dish.kcal && (
            <div>
              <strong>Calories: </strong>{dish.kcal} kcal
            </div>
          )}
          {dish.protein && (
            <div>
              <strong>Protein: </strong>{dish.protein} g
            </div>
          )}
          {dish.fat && (
            <div>
              <strong>Fat: </strong>{dish.fat} g
            </div>
          )}
          {dish.carbs && (
            <div>
              <strong>Carbs: </strong>{dish.carbs} g
            </div>
          )}
        </div>

        {dish.allergens?.length > 0 && (
          <div className="text-sm">
            <strong>Allergens: </strong>
            {dish.allergens.join(", ")}
          </div>
        )}
      </div>

    </div>
  );
};
