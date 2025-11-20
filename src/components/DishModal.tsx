import React from "react";
import type { Dish } from "@/components/MenuSheet";

type DishModalProps = {
  dish: Dish | null;
  onClose: () => void;
};

// сейчас компонент нигде не используется;
// оставлен как заготовка, если захочешь вернуть отдельную модалку
export const DishModal: React.FC<DishModalProps> = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="pointer-events-auto bg-white rounded-xl shadow-xl w-[90vw] max-w-[480px] p-6">
        <button
          onClick={onClose}
          className="float-right text-xl leading-none opacity-70 hover:opacity-100"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-2">{dish.name}</h2>
        {dish.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {dish.description}
          </p>
        )}
        <p className="text-lg font-medium">€{dish.price}</p>
      </div>
    </div>
  );
};
