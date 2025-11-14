import React, { useState, useEffect, useRef } from "react";
import { MenuSheet } from "@/components/MenuSheet";
import heroImage1 from "@/assets/hero-restaurant.jpg";
import heroImage2 from "@/assets/hero-restaurant-2.jpg";
import heroImage3 from "@/assets/hero-restaurant-3.jpg";
import heroImage4 from "@/assets/hero-restaurant-4.jpg";
import logoImage from "@/assets/logo.png";

// на всякий случай отбрасываем битые импорты
const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4].filter(Boolean);

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isScrollingRef = useRef(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // тап/клик по левой/правой части экрана
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const width = window.innerWidth || document.documentElement.clientWidth;
    const x = e.clientX;

    // левая часть экрана (40%) – предыдущее фото
    if (x < width * 0.4) {
      prevImage();
    }
    // правая часть экрана (40%) – следующее фото
    else if (x > width * 0.6) {
      nextImage();
    }
    // середина — ничего не делаем
  };

  // прокрутка колёсиком (десктоп)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      if (e.deltaY > 0) {
        nextImage();
      } else if (e.deltaY < 0) {
        prevImage();
      }

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // свайп (тач-экраны)
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
        if (dx < 0) {
          nextImage();
        } else {
          prevImage();
        }
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    // страница = высота экрана, паспарту по периметру
    <div className="h-svh w-full bg-background flex items-center justify-center relative">
      {/* карточка с фотографией, без скругления, с широким паспарту */}
      <div
        ref={carouselRef}
        onClick={handleClick}
        className="relative h-[84svh] w-full max-w-5xl mx-6 md:mx-10 shadow-elegant overflow-hidden"
      >
        <div className="relative h-full w-full">
          <img
            src={heroImages[currentImageIndex]}
            alt="Restaurant"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-hero-overlay/40 backdrop-blur-[2px]" />
        </div>
      </div>

      {/* Угловые элементы – поверх и паспарту, и фото */}
      {/* ЛОГО СЛЕВА СВЕРХУ */}
      <div className="pointer-events-none absolute top-4 left-4 md:top-6 md:left-8">
        <div className="pointer-events-auto">
          <img
            src={logoImage}
            alt="Restaurant Logo"
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
        </div>
      </div>

      {/* КНОПКА MENU СПРАВА СВЕРХУ (стили самой кнопки меняются в MenuSheet) */}
      <div className="pointer-events-none absolute top-4 right-4 md:top-6 md:right-8">
        <div className="pointer-events-auto">
          <MenuSheet />
        </div>
      </div>

      {/* ВРЕМЯ И АДРЕС СЛЕВА СНИЗУ */}
      <div className="pointer-events-none absolute bottom-4 left-4 md:bottom-6 md:left-8">
        <div className="pointer-events-auto">
          <p className="text-xs md:text-sm text-muted-foreground">
            Monday - Sunday 9:00 - 17:00
            <br />
            Largo do Rato, 4A
          </p>
        </div>
      </div>

      {/* INSTAGRAM + EMAIL СПРАВА СНИЗУ */}
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