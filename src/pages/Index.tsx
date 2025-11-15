// src/pages/Index.tsx
import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { MenuSheet } from "@/components/MenuSheet";

// фото
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

// автосмена для десктопа
const SLIDE_INTERVAL = 6000;

const Index: React.FC = () => {
  // десктопный индекс (fade)
  const [currentIndex, setCurrentIndex] = useState(0);

  // мобильный слайдер (свайп)
  const [mobileIndex, setMobileIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  // авто-смена для десктопа
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const timer = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % heroImages.length),
      SLIDE_INTERVAL
    );

    return () => clearInterval(timer);
  }, []);

  // хелперы мобильного слайдера
  const clampIndex = (idx: number) => {
    if (idx < 0) return 0;
    if (idx > heroImages.length - 1) return heroImages.length - 1;
    return idx;
  };

  const nextMobile = () => setMobileIndex((prev) => clampIndex(prev + 1));
  const prevMobile = () => setMobileIndex((prev) => clampIndex(prev - 1));

  const startDrag = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const moveDrag = (clientX: number) => {
    if (dragStartX === null) return;
    setDragOffset(clientX - dragStartX);
  };

  const endDrag = () => {
    if (dragStartX === null) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const width = mobileRef.current?.offsetWidth ?? 1;
    const threshold = width * 0.2;

    if (dragOffset < -threshold) nextMobile();
    else if (dragOffset > threshold) prevMobile();

    setIsDragging(false);
    setDragStartX(null);
    setDragOffset(0);
  };

  // мобильный track transform
  const width = mobileRef.current?.offsetWidth ?? 1;
  const dragPercent = (dragOffset / width) * 100;
  const translate = -mobileIndex * 100 + dragPercent;

  const mobileTrackStyle: CSSProperties = {
    transform: `translateX(${translate}%)`,
    transition: isDragging ? "none" : "transform 0.4s ease",
  };

  return (
    // фиксированная высота, без вертикального скролла / overscroll
    <div className="relative h-svh w-full overflow-hidden bg-background overscroll-none">
      {/* ФОН: фото на ДЕСКТОПЕ — занимают половину экрана по ширине и прижаты вправо */}
      <div className="absolute inset-0 hidden md:flex justify-end">
        <div className="relative h-full w-1/2">
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
      </div>

      {/* ФОН: фото на МОБИЛЬНОМ — свайп, центрирование, не более 90% ширины экрана */}
      <div
        ref={mobileRef}
        className="absolute inset-0 block md:hidden overflow-x-hidden"
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
        style={{ touchAction: "pan-x" }} // только горизонтальный свайп
      >
        <div className="flex h-full w-full" style={mobileTrackStyle}>
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
            >
              {/* контейнер с фото: максимум 90% ширины экрана, по центру */}
              <div className="relative h-full w-[90vw] max-w-[90vw] -translate-y-[10px]">
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

      {/* Часы работы и адрес слева снизу (адрес — ссылка на карты) */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8">
        <p className="text-xs md:text-sm text-[#644A42] leading-relaxed">
          Monday - Sunday 9:00 - 17:00
          <br />
          <a
            href="https://maps.app.goo.gl/PoeWtCYZqUPiun9E8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-[#644A42] hover:text-[#644A42] transition-colors"
          >
            Largo do Rato, 4A
          </a>
        </p>
      </div>

      {/* Инстаграм и Email справа снизу */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8">
        <div className="flex flex-col items-end text-right space-y-1">
          <a
            href="https://instagram.com/albabistrolisbon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-[#644A42] hover:text-[#644A42] transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@albabistrolisbon.com"
            className="text-xs md:text-sm text-[#644A42] hover:text-[#644A42] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;

