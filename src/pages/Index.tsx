import React, { useState, useRef } from "react";
import { MenuSheet } from "@/components/MenuSheet";
import heroImage1 from "@/assets/hero-restaurant.jpg";
import heroImage2 from "@/assets/hero-restaurant-2.jpg";
import heroImage3 from "@/assets/hero-restaurant-3.jpg";
import heroImage4 from "@/assets/hero-restaurant-4.jpg";
import logoImage from "@/assets/logo.png";

// фото и их относительные высоты (как доля высоты контейнера)
const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4].filter(Boolean);
const heroHeights = ["88%", "96%", "92%", "100%"];

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const clampIndex = (idx: number) => {
    if (idx < 0) return 0;
    if (idx > heroImages.length - 1) return heroImages.length - 1;
    return idx;
  };

  const nextImage = () => {
    setCurrentIndex((prev) => clampIndex(prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => clampIndex(prev - 1));
  };

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

    const width = containerRef.current?.offsetWidth ?? 1;
    const threshold = width * 0.2;

    if (dragOffset < -threshold) {
      nextImage();
    } else if (dragOffset > threshold) {
      prevImage();
    }

    setIsDragging(false);
    setDragStartX(null);
    setDragOffset(0);
  };

  // TOUCH
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    startDrag(t.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    // не даём странице ехать по вертикали во время свайпа
    e.preventDefault();
    const t = e.touches[0];
    moveDrag(t.clientX);
  };

  const handleTouchEnd = () => {
    endDrag();
  };

  // MOUSE (desktop)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startDrag(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    moveDrag(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    endDrag();
  };

  // transform для карусели
  const width = containerRef.current?.offsetWidth ?? 1;
  const dragPercent = (dragOffset / width) * 100;
  const translate = -currentIndex * 100 + dragPercent;

  const trackStyle: React.CSSProperties = {
    transform: `translateX(${translate}%)`,
    transition: isDragging ? "none" : "transform 0.5s ease",
  };

  return (
    // фиксированная высота, без вертикального скролла страницы
    <div className="h-svh w-full bg-background flex items-center justify-center relative overflow-hidden">
      {/* Центральный блок с паспарту вокруг всех слайдов */}
      <div
        ref={containerRef}
        className="
          relative
          h-[88svh]
          w-full
          max-w-5xl
          mx-6 md:mx-10
          px-3 md:px-5
          overflow-hidden
          cursor-grab
          active:cursor-grabbing
        "
        style={{ touchAction: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Лента слайдов */}
        <div className="flex h-full w-full" style={trackStyle}>
          {heroImages.map((img, index) => (
            <div
              key={index}
              className="
                flex-shrink-0
                w-full
                h-full
                flex
                items-end   /* ВЫРАВНИВАНИЕ ПО НИЖНЕМУ КРАЮ */
                justify-center
              "
            >
              <div
                className="relative w-full"
                style={{ height: heroHeights[index % heroHeights.length] }}
              >
                <img
                  src={img}
                  alt="Restaurant"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-hero-overlay/40 backdrop-blur-[2px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Угловые элементы */}

      {/* Логотип */}
      <div className="pointer-events-none absolute top-4 left-4 md:top-6 md:left-8">
        <div className="pointer-events-auto">
          <img
            src={logoImage}
            alt="Restaurant Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
        </div>
      </div>

      {/* Menu */}
      <div className="pointer-events-none absolute top-4 right-4 md:top-6 md:right-8">
        <div className="pointer-events-auto">
          <MenuSheet />
        </div>
      </div>

      {/* Адрес */}
      <div className="pointer-events-none absolute bottom-4 left-4 md:bottom-6 md:left-8">
        <div className="pointer-events-auto">
          <p className="text-xs md:text-sm text-muted-foreground">
            Monday - Sunday 9:00 - 17:00
            <br />
            Largo do Rato, 4A
          </p>
        </div>
      </div>

      {/* Instagram + email */}
      <div className="pointer-events-none absolute bottom-4 right-4 md:bottom-6 md:right-8">
        <div className="pointer-events-auto flex flex-col items-end text-right space-y-1">
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