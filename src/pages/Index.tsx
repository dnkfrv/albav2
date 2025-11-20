import React, { useState, useRef, CSSProperties } from "react";
import { MenuSheet, type Dish } from "@/components/MenuSheet";
import { JoinTeamSheet } from "@/components/JoinTeamSheet";
import { DishModal } from "@/components/DishModal"; // ← добавлено
import logoImage from "@/assets/logo.png";

// НОВЫЕ ФОТО + старые (импорты оставляем как есть)
import imgA130 from "@/assets/A-130.jpg";
import imga17 from "@/assets/a-17.jpg";
import imgA20 from "@/assets/A-20.jpg";
import imga54 from "@/assets/a-54.jpg";
import imgA208 from "@/assets/A-208.jpg";
import imga94 from "@/assets/a-94.jpg";
import imga150 from "@/assets/a-150.jpg";
import imga113 from "@/assets/a-113.jpg";
import imgA31 from "@/assets/A-31.jpg";
import imgA121 from "@/assets/A-121.jpg";
import imgA55 from "@/assets/A-55.jpg";
import imgA11 from "@/assets/A-11.jpg";
import imgA90 from "@/assets/A-90.jpg";
import imga172 from "@/assets/a-172.jpg";
import imga155 from "@/assets/a-155.jpg";
import imga132 from "@/assets/a-132.jpg";
import imga40 from "@/assets/a-40.jpg";
import imgA1113 from "@/assets/A-1113.jpg";
import imga5 from "@/assets/a-5.jpg";

// мобилные фото (только существующие файлы)
import img1_11 from "@/assets/1-11.jpg";
import img1_23 from "@/assets/1-23.jpg";
import img1_38 from "@/assets/1-38.jpg";

// массив фото для мобильного слайдера
const heroImages = [
  img1_11,
  img1_23,
  img1_38,
].filter(Boolean);

// ОТДЕЛЬНЫЙ набор фото для десктопа
const desktopImages = [
  imgA130,
  imgA20,
  imga94,
  imga150,
  imga113,
  img1_38,
  img1_23,
  imgA11,
  imgA55,
  imgA121,
  imgA90,
  imga172,
  imga155,
  imga132,
  imga40,
  imgA1113,
  imga5,
].filter(Boolean);

const Index: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // МОДАЛКА ДЛЯ БЛЮД
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // мобильный слайдер
  const [mobileIndex, setMobileIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const mobileRef = useRef<HTMLDivElement | null>(null);
  const swipedRef = useRef(false);

  // Десктоп - отслеживание позиции мыши для смены фото
  const lastDesktopMousePos = useRef<{ x: number; y: number } | null>(null);

  const nextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevMobile = () => {
    setMobileIndex((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }
    const rect = mobileRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    if (x < rect.width / 2) prevMobile();
    else nextMobile();
  };

  const handleDesktopMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;

    if (!lastDesktopMousePos.current) {
      lastDesktopMousePos.current = { x: clientX, y: clientY };
      return;
    }

    const dx = clientX - lastDesktopMousePos.current.x;
    const dy = clientY - lastDesktopMousePos.current.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const threshold = 100;

    if (distance > threshold) {
      setCurrentIndex((prev) => {
        const randomOffset =
          Math.floor(Math.random() * (desktopImages.length - 1)) + 1;
        return (prev + randomOffset) % desktopImages.length;
      });

      lastDesktopMousePos.current = { x: clientX, y: clientY };
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (heroImages.length <= 1) return;

    const touch = e.touches[0];
    setDragStartX(touch.clientX);
    setIsDragging(true);
    setDragOffset(0);
    swipedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartX === null) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartX;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || dragStartX === null || !mobileRef.current) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const width = mobileRef.current.offsetWidth;
    const threshold = width * 0.2;

    if (Math.abs(dragOffset) > threshold) {
      swipedRef.current = true;
      if (dragOffset < 0) {
        nextMobile();
      } else {
        prevMobile();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    setDragStartX(null);
  };

  const width = mobileRef.current?.offsetWidth ?? 1;
  const dragPercent = (dragOffset / width) * 100;
  const translate = -mobileIndex * 100 + dragPercent;

  const mobileTrackStyle: CSSProperties = {
    transform: `translateX(${translate}%)`,
    transition: isDragging ? "none" : "transform 0.4s ease",
  };

  return (
    <div className="relative h-svh w-full overflow-hidden bg-background overscroll-none font-kommon">
      
      {/* ДЕСКТОП ФОТО */}
      <div
        className="absolute inset-0 hidden md:block"
        onMouseMove={handleDesktopMouseMove}
      >
        {desktopImages.map((img, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 flex items-center justify-end
              transition-opacity duration-700
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
          >
            <img
              src={img}
              alt="Alba interior"
              className="h-full w-auto object-cover max-w-[70vw]"
            />
          </div>
        ))}
      </div>

      {/* Мобильный слайдер (виден только на мобиле) */}
      <div className="absolute inset-0 md:hidden">
        <div
          ref={mobileRef}
          className="h-full w-full overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={handleTap}
        >
          <div
            className="flex h-full w-full"
            style={mobileTrackStyle}
          >
            {heroImages.map((img, index) => (
              <div
                key={index}
                className="min-w-full h-full flex items-center justify-center"
              >
                <img
                  src={img}
                  alt="Alba interior"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Индикаторы (точки) */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileIndex(index);
                }}
                className={`
                  w-2 h-2 rounded-full border border-white
                  ${index === mobileIndex ? "bg-white" : "bg-white/20"}
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Логотип и верхний текстовый блок */}
      <div className="relative z-10 h-full w-full flex flex-col">
        <div className="flex items-start justify-between px-4 pt-4 md:px-8 md:pt-8">
          <div className="flex items-center gap-2 md:gap-3">
            <img
              src={logoImage}
              alt="Alba Bistro Logo"
              className="h-10 w-auto md:h-14"
            />
            <div className="text-[#644A42] font-kommon text-xs md:text-sm leading-tight">
              <p>Alba Bistro</p>
              <p>Specialty Coffee and Matcha Bar</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs md:text-sm text-[#644A42] font-kommon">
            <a
              href="https://maps.app.goo.gl/PoeWtCYZqUPiun9E8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4B362F] transition-colors"
            >
              Largo do Rato, 4A
            </a>
            <MenuSheet onSelect={setSelectedDish} />
          </div>
        </div>

        {/* Центральный текстовый блок */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24">
          <div className="max-w-xl text-[#644A42] space-y-4 font-kommon">
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase">
              Specialty Coffee · Matcha · All-day brunch
            </p>
            <p className="text-2xl md:text-4xl leading-tight">
              A cozy corner in Lisbon where brunch meets specialty coffee.
            </p>
            <p className="text-xs md:text-sm md:max-w-md">
              We serve carefully brewed coffee, matcha and brunch dishes made with attention to detail and love for simple, honest food.
            </p>

            <div className="pt-2">
              <JoinTeamSheet />
            </div>
          </div>
        </div>

        {/* Нижний левый угол (мобильный) */}
        <div className="md:hidden px-6 pb-6 text-xs text-[#644A42] font-kommon space-y-1">
          <span>Monday - Sunday 9:00 - 17:00</span>
          <a
            href="https://maps.app.goo.gl/PoeWtCYZqUPiun9E8"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-[#4B362F] transition-colors"
          >
            Largo do Rato, 4A
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/albabistrolisbon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4B362F] transition-colors"
            >
              Instagram
            </a>
            <span>/</span>
            <a
              href="mailto:hello@albabistrolisbon.com"
              className="hover:text-[#4B362F] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      {/* ДЕСКТОП — нижний левый угол */}
      <div className="hidden md:block absolute bottom-6 left-8">
        <div className="flex flex-col space-y-0 text-xs text-[#644A42] leading-[14px] font-kommon">
          <span>Monday - Sunday 9:00 - 17:00</span>
          <a
            href="https://maps.app.goo.gl/PoeWtCYZqUPiun9E8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4B362F] transition-colors"
          >
            Largo do Rato, 4A
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://instagram.com/albabistrolisbon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4B362F] transition-colors"
            >
              Instagram
            </a>
            <span>/</span>
            <a
              href="mailto:hello@albabistrolisbon.com"
              className="hover:text-[#4B362F] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-6 right-8">
        <p className="text-xs text-[#644A42] font-kommon">Created by AlbaFamily</p>
      </div>

      {/* МОДАЛКА БЛЮДА */}
      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  );
};

export default Index;
