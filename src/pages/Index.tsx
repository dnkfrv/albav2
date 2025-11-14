import { MenuSheet } from "@/components/MenuSheet";
import { useState, useEffect, useRef } from "react";
import heroImage1 from "@/assets/hero-restaurant.jpg";
import heroImage2 from "@/assets/hero-restaurant-2.jpg";
import heroImage3 from "@/assets/hero-restaurant-3.jpg";
import heroImage4 from "@/assets/hero-restaurant-4.jpg";
import logoImage from "@/assets/logo.png";

// На случай, если какой-то импорт вдруг undefined
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

  // Прокрутка колесом (десктоп)
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

  // Свайп (тач-экраны)
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

      // Горизонтальный свайп сильнее вертикального и больше порога
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
    <div className="relative h-screen w-full bg-background overflow-hidden">
      {/* На мобиле убираем внешние отступы и рамку, на десктопе оставляем */}
      <div className="h-full flex flex-col p-0 md:p-8 lg:p-12">
        {/* Контейнер с картинкой */}
        <div
          ref={carouselRef}
          className="flex-1 relative rounded-none md:rounded-2xl overflow-hidden shadow-elegant"
        >
          {/* Картинка + оверлей */}
          <div className="relative h-full w-full">
            <img
              src={heroImages[currentImageIndex]}
              alt="Restaurant"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-hero-overlay/40 backdrop-blur-[2px]" />
          </div>

          {/* Контент поверх */}
          <div className="absolute inset-0 z-10 flex flex-col">
            {/* Верхняя часть */}
            <header className="flex justify-between items-start p-4 md:p-6 lg:p-8">
              <div className="flex items-center space-x-3">
                <img src={logoImage} alt="Restaurant Logo" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
              </div>

              <MenuSheet />
            </header>

            {/* Нижняя часть */}
            <footer className="mt-auto p-4 md:p-6 lg:p-8 flex justify-between items-end">
              {/* Слева – часы и адрес */}
              <div className="flex items-start space-x-4 md:space-x-6">
                <p className="text-xs md:text-sm text-muted-foreground">
                  Monday - Sunday 9:00 - 17:00
                  <br />
                  Largo do Rato, 4A
                </p>
              </div>

              {/* Справа – Instagram и email */}
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
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;