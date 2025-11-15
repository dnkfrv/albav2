// src/pages/Index.tsx
import React, { useState, useEffect } from "react";
import { MenuSheet } from "@/components/MenuSheet";

// новые фото
import img1 from "@/assets/A-130.jpg";
import img2 from "@/assets/A-188.jpg";
import img3 from "@/assets/A-20.jpg";
import img4 from "@/assets/A-55.jpg";
import img5 from "@/assets/a-113.jpg";
import img6 from "@/assets/a-155.jpg";
import img7 from "@/assets/a-183.jpg";
import img8 from "@/assets/a-54.jpg";

import logoImage from "@/assets/logo.png";

const heroImages = [img1, img2, img3, img4, img5, img6, img7, img8].filter(Boolean);

const SLIDE_INTERVAL = 6000; // 6 секунд между сменой фото

const Index: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    // На десктопе – full height, по центру.
    // На мобиле высота авто, страница скроллится обычным образом.
    <div className="w-full bg-background relative overflow-hidden md:h-svh md:flex md:items-center md:justify-center">
      {/* ФОТО ДЛЯ ДЕСКТОПА (слайдер) */}
      <div
        className="
          hidden md:block
          relative
          h-[88svh]
          w-full
          max-w-5xl
          mx-6 md:mx-10
          overflow-visible
        "
      >
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`
              absolute inset-0
              w-full h-full
              transition-opacity duration-700
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
          >
            {/* сдвигаем фото и оверлей вверх на 10px */}
            <div className="relative w-full h-full -translate-y-[10px]">
              <img
                src={img}
                alt="Restaurant"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          </div>
        ))}
      </div>

      {/* ФОТО ДЛЯ МОБИЛЬНОЙ ВЕРСИИ (лента, скроллится вся страница) */}
      <div
        className="
          block md:hidden
          w-full
          max-w-5xl
          mx-4
          mt-4 mb-24
        "
      >
        <div className="relative w-full -translate-y-[10px] space-y-2">
          {heroImages.map((img, index) => (
            <div key={index} className="relative w-full">
              <img
                src={img}
                alt="Restaurant"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25" />
            </div>
          ))}
        </div>
      </div>

      {/* Логотип слева сверху */}
      <div className="absolute top-4 left-4 md:top-6 md:left-8">
        <img
          src={logoImage}
          alt="Restaurant Logo"
          className="h-3 md:h-5 w-auto object-contain"
        />
      </div>

      {/* Меню справа сверху */}
      <div className="absolute top-4 right-4 md:top-6 md:right-8">
        <MenuSheet />
      </div>

      {/* Часы работы и адрес слева снизу */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8">
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          Monday - Sunday 9:00 - 17:00
          <br />
          <a
            href="https://maps.app.goo.gl/PoeWtCYZqUPiun9E8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            Largo do Rato, 4A
          </a>
        </p>
      </div>

      {/* Инстаграм и email справа снизу */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8">
        <div className="flex flex-col items-end text-right space-y-1">
          <a
            href="https://instagram.com/albabistro.lisbon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@albabistrolisbon.com"
            className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
