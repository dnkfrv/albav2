import React from "react";
import type { Dish } from "@/components/MenuSheet";

type DishModalProps = {
  dish: Dish | null;
  onClose: () => void;
};

export const DishModal: React.FC<DishModalProps> = ({ dish, onClose }) => {
  if (!dish) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-[200]"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
    >
      <div className="bg-background text-foreground rounded-xl shadow-xl w-[90vw] max-w-[480px] p-6 relative">
        
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl leading-none opacity-70 hover:opacity-100"
        >
          ×
        </button>

        <h2 id="dish-modal-title" className="text-2xl font-semibold mb-2">{dish.name}</h2>

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
