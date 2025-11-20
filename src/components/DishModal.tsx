import React from "react";

export const DishModal = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-[200]"
      onClick={(e) => {
        // Закрываем только при клике на backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-[90vw] max-w-[480px] p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl leading-none opacity-70 hover:opacity-100 z-10"
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
