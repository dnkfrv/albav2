import React from "react";

export const DishModal = ({ dish, onClose }) => {
  if (!dish) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-[90vw] max-w-[480px] p-6 relative"
        onClick={(e) => e.stopPropagation()} // предотвращает закрытие шторки
      >
        {/* Крестик */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-xl leading-none opacity-70 hover:opacity-100"
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
