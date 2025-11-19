// src/pages/Index.tsx
import React, { useState, useRef, CSSProperties } from "react";
import { MenuSheet } from "@/components/MenuSheet";
import { JoinTeamSheet } from "@/components/JoinTeamSheet";
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
import img1_38 from "@/assets/1-38.jpg";
import img1_23 from "@/assets/1-23.jpg";
import imgA11 from "@/assets/A-11.jpg";
import imga38 from "@/assets/a-38.jpg";
import imgA55 from "@/assets/A-55.jpg";
import imgA121 from "@/assets/A-121.jpg";
import imgA90 from "@/assets/A-90.jpg";
import imgA73 from "@/assets/A-73.jpg";
import imga155 from "@/assets/a-155.jpg";
import imga172 from "@/assets/a-172.jpg";
import imga132 from "@/assets/a-132.jpg";
import imga40 from "@/assets/a-40.jpg";
import imgA217 from "@/assets/A-217.jpg";
import imgA23 from "@/assets/A-23.jpg";
import imgA188 from "@/assets/A-188.jpg";
import imgA1113 from "@/assets/A-1113.jpg";
import imga5 from "@/assets/a-5.jpg";
import imga10 from "@/assets/a-10.jpg";

// все фото для мобильной версии (как было)
const heroImages = [
  imgA130,
  imga17,
  imgA20,
  imga54,
  imgA208,
  imga94,
  imga150,
  imga113,
  imgA31,
  img1_38,
  img1_23,
  imgA11,
  imga38,
  imgA55,
  imgA121,
  imgA90,
  imgA73,
  imga155,
  imga172,
  imga132,
  imgA217,
  imgA23,
  imgA188,
  imgA1113,
  imga5,
  imga10,
].filter(Boolean);

// ОТДЕЛЬНЫЙ набор фото для десктопа (только указанные)
const desktopImages = [
  imgA130, // A-130
  imgA20, // A-20
  imga94, // a-94
  imga150, // a-150
  imga113, // a-113
  img1_38, // 1-38
  img1_23, // 1-23
  imgA11, // A-11
  imgA55, // A-55
  imgA121, // A-121
  imgA90, // A-90
  imga172, // a-172
  imga155, // a-155
  imga132, // a-132
  imga40, // a-40
  imgA1113, // A-1113
  imga5, // a-5
].filter(Boolean);

const Index: React.FC = () => {
  // текущий кадр на десктопе
  const [currentIndex, setCurrentIndex] = useState(0);

  // состояние слайдера для мобильной версии
  const [mobileIndex, setMobileIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const mobileRef = useRef<HTMLDivElement | null>(null);
  const swipedRef = useRef(false);

  // последняя позиция мыши на десктопе – для отслеживания движения во всех направлениях
  const lastDesktopMousePos = useRef<{ x: number; y: number } | null>(null);

  // хелперы мобильного слайдера (работают по heroImages)
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

  // тап по левой / правой части экрана (только мобильная версия)
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

  // ДЕСКТОП: смена кадра при движении мыши в любом направлении (x и/или y), с рандомным выбором изображения
  const handleDesktopMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!desktopImages.length) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // инициализация – просто запоминаем первую позицию
    if (!lastDesktopMousePos.current) {
      lastDesktopMousePos.current = { x, y };
      return;
    }

    const dx = x - lastDesktopMousePos.current.x;
    const dy = y - lastDesktopMousePos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // порог, чтобы кадр не менялся при каждом небольшом движении
    const threshold = Math.min(rect.width, rect.height) * 0.08; // ~8% от меньшей стороны

    if (distance < threshold) return;

    // запоминаем новую позицию
    lastDesktopMousePos.current = { x, y };

    // выбираем случайный кадр, отличный от текущего
    if (desktopImages.length > 1) {
      let nextIndex = currentIndex;
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * desktopImages.length);
      }
      setCurrentIndex(nextIndex);
    }
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
    <div className="relative h-svh w-full overflow-hidden bg-background overscroll-none font-kommon">
      {/* ДЕСКТОП: фото прижаты вправо, только desktopImages */}
      <div
        className="absolute inset-0 hidden md:block"
        onMouseMove={handleDesktopMouseMove}
      >
        {desktopImages.map((img, index) => (
          <div
            key={index}
            className={`
              absolute inset-0
              flex items-center justify-end
              transition-opacity duration-700
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
          >
            <div className="relative max-h-[100vh] mr-0">
              <img
                src={img}
                alt="Restaurant"
                className="w-auto h-auto max-h-[100vh] max-w-full object-contain"
              />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* МОБИЛЬНАЯ версия: свайп + нажатие по краям экрана */}
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

     {/* Логотип слева сверху — без шторки */}
        <div className="absolute top-4 left-4 md:top-6 md:left-8">
        <div className="flex flex-col items-start gap-1 select-none">
          <img
            src={logoImage}
            alt="Alba Bistro Logo"
            className="h-4 md:h-6 w-auto object-contain"
            />
    <p className="font-kommon text-[8px] md:text-[10px] tracking-[0.16em] text-[#644A42]">
      BISTRO • SPECIALTY COFFEE • MATCHA BAR
    </p>
  </div>
</div>
    
      {/* Текстовый блок с описанием + Join our team — только десктоп */}
      <div
        className="hidden md:block absolute max-w-md text-xs md:text-sm text-[#644A42] leading-relaxed font-kommon"
        style={{ top: 200, left: 200 }}
      >
        <p className="mb-3">
          Welcome to Alba Bistro, Lisbon&apos;s new corner of taste and style!
          Our bright space with a sunny terrace at Rato Square invites you to
          immerse yourself in an atmosphere of comfort and enjoyment.
        </p>
        <p className="mb-3">
          Alba Bistro offers a fresh take on breakfast and brunch - our
          exquisite menu is crafted for those who appreciate subtle taste and
          originality.
        </p>
        <p>
          Try our signature coffee cocktails and explore the rich variety of
          matcha options. Visit us for new gastronomic experiences and comfort!
          We eagerly await your visit.
        </p>

        {/* Join our team на ~50px ниже текста */}
        <div className="mt-20">
          <JoinTeamSheet />
        </div>
      </div>

      {/* Меню справа сверху */}
      <div className="absolute top-4 right-4 md:top-4.5 md:right-8">
        <MenuSheet />
      </div>

      {/* Часы/адрес слева снизу — только мобильная версия */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 md:hidden">
        <div className="flex flex-col space-y-1 text-xs md:text-sm text-[#644A42] leading-[18px] font-kommon">
          <span>Monday - Sunday 9:00 - 17:00</span>
          <a
            href="https://maps.app.goo.gl/PoeWtCYZqUPiun9E8"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#4B362F] transition-colors"
          >
            Largo do Rato, 4A
          </a>
        </div>
      </div>

      {/* Join our team + (Instagram / Email) справа снизу — только мобильная версия */}
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 md:hidden">
        <div className="flex flex-col items-end text-right space-y-1 font-kommon">
          <JoinTeamSheet />
          <div className="flex flex-row items-center gap-1 text-xs md:text-sm text-[#644A42]">
            <a
              href="https://instagram.com/albabistro.lisbon"
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

      {/* Часы работы + адрес + Instagram/Email в левом нижнем углу — только десктоп */}
      <div className="hidden md:block absolute bottom-6 left-8">
        <div className="flex flex-col space-y-0 text-xs md:text-sm text-[#644A42] leading-[14px] font-kommon">
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

      {/* Правый нижний угол – Created by AlbaFamily (только десктоп) */}
      <div className="hidden md:block absolute bottom-6 right-8">
        <p className="text-xs text-[#644A42] font-kommon">
          Created by AlbaFamily
        </p>
      </div>
    </div>
  );
};

export default Index;
