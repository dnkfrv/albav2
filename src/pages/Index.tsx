import { MenuSheet } from "@/components/MenuSheet";
import { useState, useEffect, useRef } from "react";
import heroImage1 from "@/assets/hero-restaurant.jpg";
import heroImage2 from "@/assets/hero-restaurant-2.jpg";
import heroImage3 from "@/assets/hero-restaurant-3.jpg";
import heroImage4 from "@/assets/hero-restaurant-4.jpg";
import logoImage from "@/assets/logo.png";

// на случай, если какой-то импорт по какой-то причине undefined
const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4].filter(Boolean);

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // троттлинг колеса, чтобы пролистывание было более плавным
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // если анимация ещё не закончилась – игнорируем новые события
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;

      if (e.deltaY > 0) {
        // вниз – следующая картинка
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      } else if (e.deltaY < 0) {
        // вверх – предыдущая
        setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      }

      // небольшой таймаут, чтобы прокрутка ощущалась плавнее
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="relative h-screen w-full bg-background overflow-hidden">
      {/* Основной контейнер – ровно высота экрана */}
      <div className="h-full flex flex-col p-4 md:p-8 lg:p-12">
        {/* Контейнер с картинкой */}
        <div className="flex-1 relative rounded-2xl overflow-hidden shadow-elegant">
          {/* Картинка + оверлей */}
          <div className="relative h-full w-full">
            <img
              src={heroImages[currentImageIndex]}
              alt="Restaurant"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            />
            {/* если вдруг будет слишком тёмно/серо – можно временно закомментировать этот блок */}
            <div className="absolute inset-0 bg-hero-overlay/40 backdrop-blur-[2px]" />
          </div>

          {/* Контент поверх картинки */}
          <div className="absolute inset-0 z-10 flex flex-col">
            {/* Верхняя часть */}
            <header className="flex justify-between items-start p-6 md:p-8">
              <div className="flex items-center space-x-3">
                <img src={logoImage} alt="Restaurant Logo" className="h-12 w-12 object-contain" />
              </div>

              <MenuSheet />
            </header>

            {/* Нижняя часть */}
            <footer className="mt-auto p-6 md:p-8 flex justify-between items-end">
              {/* Слева – часы и адрес */}
              <div className="flex items-start space-x-6">
                <p className="text-sm text-muted-foreground">
                  Monday - Sunday 9:00 - 17:00
                  <br />
                  Largo do Rato, 4A
                </p>
              </div>

              {/* Справа – Instagram и email, прижаты к правому краю */}
              <div className="flex flex-col items-end text-right space-y-1">
                <a
                  href="https://instagram.com/albabistro.lisbon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="mailto:hello@albabistrolisbon.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
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
