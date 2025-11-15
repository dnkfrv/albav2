// src/pages/Index.tsx
import React, { useState, useRef, CSSProperties } from "react";
import { MenuSheet } from "@/components/MenuSheet";

// НОВЫЕ ФОТО + старые
import imgA11 from "@/assets/A-11.jpg";
import img1_11 from "@/assets/1-11.jpg";
import img1_23 from "@/assets/1-23.jpg";
import imgA1113 from "@/assets/A-1113.jpg";
import imgA121 from "@/assets/A-121.jpg";
import imgA130 from "@/assets/A-130.jpg";
import imga17 from "@/assets/a-17.jpg";
import imgA188 from "@/assets/A-188.jpg";
import imgA20 from "@/assets/A-20.jpg";
import imgA208 from "@/assets/A-208.jpg";
import imgA217 from "@/assets/A-217.jpg";
import imgA23 from "@/assets/A-23.jpg";
import imgA31 from "@/assets/A-31.jpg";
import imgA55 from "@/assets/A-55.jpg";
import imgA73 from "@/assets/A-73.jpg";
import imgA90 from "@/assets/A-90.jpg";
import imga5 from "@/assets/a-5.jpg";
import imga10 from "@/assets/a-10.jpg";
import imga40 from "@/assets/a-40.jpg";
import imga54 from "@/assets/a-54.jpg";
import imga94 from "@/assets/a-94.jpg";
import imga113 from "@/assets/a-113.jpg";
import imga132 from "@/assets/a-132.jpg";
import imga150 from "@/assets/a-150.jpg";
import imga155 from "@/assets/a-155.jpg";
import imga172 from "@/assets/a-172.jpg";
import imga183 from "@/assets/a-183.jpg";
import imga184 from "@/assets/a-184.jpg";
import imga197 from "@/assets/a-197.jpg";

import logoImage from "@/assets/logo.png";

// все фото, и старые, и новые
const heroImages = [
  imgA11,
  img1_11,
  img1_23,
  imgA1113,
  imgA121,
  imgA130,
  imga17,
  imgA188,
  imgA20,
  imgA208,
  imgA217,
  imgA23,
  imgA31,
  imgA55,
  imgA73,
  imgA90,
  imga5,
  imga10,
  imga40,
  imga54,
  imga94,
  imga113,
  imga132,
  imga150,
  imga155,
  imga172,
  imga183,
  imga184,
  imga197,
].filter(Boolean);

const Index: React.FC = () => {
  // десктопный индекс (меняется от движения мышки)
  const [currentIndex, setCurrentIndex] = useState(0);

  // мобильный слайдер (свайп + тап)
  const [mobileIndex, setMobileIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const swipedRef = useRef(false);

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
    swipedRef.current = false;
  };

  const moveDrag = (clientX: number) => {
    if (dragStartX === null) return;
    const delta = clientX - dragStartX;
    setDragOffset(delta);
    if (Math.abs(delta) > 10) {
      swipedRef.current = true;
    }
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

  // тап по левой / правой части экрана (только мобилка)
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    const rect = mobileRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const isLeft = x < rect.width / 2;
    if (isLeft) prevMobile();
    else nextMobile();
  };

  // изменение кадра на десктопе от движения мышки
  const handleDesktopMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!heroImages.length) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width; // 0..1
    let idx = Math.floor(ratio * heroImages.length);
    if (idx < 0) idx = 0;
    if (idx > heroImages.length - 1) idx = heroImages.length - 1;
    setCurrentIndex(idx);
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
      {/* ДЕСКТОП: фото прижаты вправо, сохраняют пропорции и всегда полностью влезают */}
      <div
        className="absolute inset-0 hidden md:block"
        onMouseMove={handleDesktopMouseMove}
      >
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`
              absolute inset-0
              flex items-center justify-end
              transition-opacity duration-700
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
          >
            {/* Контейнер под фото: не больше 50% ширины и 90% высоты экрана */}
            <div className="relative max-w-[50vw] max-h-[90vh] mr-0">
              <img
                src={img}
                alt="Restaurant"
                className="w-auto h-auto max-w-full max-h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* МОБИЛЬНЫЙ: свайп + тап, оригинальное соотношение сторон, до 93% ширины */}
      <div
        ref={mobileRef}
        className="absolute inset-0 block md:hidden overflow-x-hidden"
        onTouchStart={(e) => startDrag(e.touches[0].clientX)}
        onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
        onTouchEnd={endDrag}
        onClick={handleTap}
        style={{ touchAction: "pan-x" }}
      >
        <div className="flex h-full w-full" style={mobileTrackStyle}>
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full flex items-center justify-center"
            >
              <div className="relative w-[93vw] max-w-[93vw] -translate-y-[10px]">
                <img
                  src={img}
                  alt="Restaurant"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
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

      {/* Часы работы и адрес слева снизу */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8">
        <p className="text-xs md:text-sm text-[#644A42] leading-relaxed">
          Monday - Sunday 9:00 - 17:00
          <br />
          <a
            href="https://maps.app.goo.gl/PoeWtCYZqUPiun9E8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm text-[#644A42] hover:text-[#4B362F] transition-colors"
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
            className="text-xs md:text-sm text-[#644A42] hover:text-[#4B362F] transition-colors"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@albabistrolisbon.com"
            className="text-xs md:text-sm text-[#644A42] hover:text-[#4B362F] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
