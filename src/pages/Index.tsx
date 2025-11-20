import React, { useState, useRef, CSSProperties } from "react";
import { MenuSheet } from "@/components/MenuSheet";
import { JoinTeamSheet } from "@/components/JoinTeamSheet";
import { DishSheet } from "@/components/DishSheet";
import logoImage from "@/assets/logo.png";

// Фотографии
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

// MOBILE
const heroImages = [
  imgA130, imga17, imgA20, imga54, imgA208, imga94, imga150, imga113, imgA31,
  img1_38, img1_23, imgA11, imga38, imgA55, imgA121, imgA90, imgA73, imga155,
  imga172, imga132, imgA217, imgA23, imgA188, imgA1113, imga5, imga10
].filter(Boolean);

// DESKTOP
const desktopImages = [
  imgA130, imgA20, imga94, imga150, imga113, img1_38, img1_23, imgA11,
  imgA55, imgA121, imgA90, imga172, imga155, imga132, imga40, imgA1113, imga5
].filter(Boolean);

const Index: React.FC = () => {

  const [selectedDish, setSelectedDish] = useState(null);
  const [showDish, setShowDish] = useState(false);

  // DESKTOP IMAGE
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastDesktopMousePos = useRef<{ x: number; y: number } | null>(null);

  // SWAP DESKTOP IMAGE
  const handleDesktopMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!lastDesktopMousePos.current) {
      lastDesktopMousePos.current = { x, y };
      return;
    }

    const dx = x - lastDesktopMousePos.current.x;
    const dy = y - lastDesktopMousePos.current.y;

    const dist = Math.sqrt(dx * dx + dy * dy);
    const threshold = Math.min(rect.width, rect.height) * 0.08;

    if (dist < threshold) return;

    lastDesktopMousePos.current = { x, y };

    let next = currentIndex;
    while (next === currentIndex) {
      next = Math.floor(Math.random() * desktopImages.length);
    }
    setCurrentIndex(next);
  };

  // MOBILE SLIDER
  const [mobileIndex, setMobileIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const swipedRef = useRef(false);

  const clampIndex = (i: number) =>
    Math.min(Math.max(i, 0), heroImages.length - 1);

  const nextMobile = () => setMobileIndex((p) => clampIndex(p + 1));
  const prevMobile = () => setMobileIndex((p) => clampIndex(p - 1));

  const startDrag = (clientX: number) => {
    setDragStartX(clientX);
    setIsDragging(true);
    swipedRef.current = false;
  };

  const moveDrag = (clientX: number) => {
    if (dragStartX === null) return;
    const delta = clientX - dragStartX;
    setDragOffset(delta);
    if (Math.abs(delta) > 10) swipedRef.current = true;
  };

  const endDrag = () => {
    if (dragStartX === null) {
      setIsDragging(false);
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

  const width = mobileRef.current?.offsetWidth ?? 1;
  const dragPercent = (dragOffset / width) * 100;

  const mobileTrackStyle: CSSProperties = {
    transform: `translateX(${-mobileIndex * 100 + dragPercent}%)`,
    transition: isDragging ? "none" : "transform 0.4s ease",
  };

  // OPEN DISH
  const handleOpenDish = (dish: any) => {
    setSelectedDish(dish);
    setShowDish(true);
  };

  return (
    <div className="relative h-svh bg-background font-kommon overflow-hidden">

      {/* MAIN CONTENT */}
      <div className="absolute inset-0 flex">

        {/* DESKTOP IMAGES */}
        <div
          className="hidden md:block absolute inset-0"
          onMouseMove={handleDesktopMouseMove}
        >
          {desktopImages.map((img, i) => (
            <div
              key={i}
              className={`
                absolute inset-0 flex items-center justify-end
                transition-opacity duration-700
                ${i === currentIndex ? "opacity-100" : "opacity-0"}
              `}
            >
              <div className="relative max-h-[100vh]">
                <img src={img} className="max-h-[100vh] object-contain" />
                <div className="absolute inset-0 bg-black/25" />
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE IMAGES */}
        <div
          ref={mobileRef}
          className="md:hidden absolute inset-0 overflow-hidden"
          onTouchStart={(e) => startDrag(e.touches[0].clientX)}
          onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
          onTouchEnd={endDrag}
          style={{ touchAction: "pan-x" }}
        >
          <div className="flex h-full w-full" style={mobileTrackStyle}>
            {heroImages.map((img, i) => (
              <div
                key={i}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={img}
                  className="w-[93vw] object-contain -translate-y-[10px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* LOGO */}
        <div className="absolute top-4 left-4 md:top-6 md:left-8 z-50">
          <img
            src={logoImage}
            className="h-4 md:h-6 select-none"
          />
          <p className="text-[8px] md:text-[10px] tracking-[0.16em] text-[#644A42]">
            BISTRO • SPECIALTY COFFEE • MATCHA BAR
          </p>
        </div>

        {/* ABOUT (DESKTOP) */}
        <div
          className="hidden md:block absolute text-[#644A42] top-[200px] left-[200px] max-w-md"
        >
          <p className="mb-3 text-sm">
            Welcome to Alba Bistro, Lisbon&apos;s new corner of taste and style!
            Our bright space with a sunny terrace at Rato Square invites you to
            immerse yourself in an atmosphere of comfort and enjoyment.
          </p>
          <p className="mb-3 text-sm">
            Alba Bistro offers a fresh take on breakfast and brunch - our
            exquisite menu is crafted for those who appreciate subtle taste and
            originality.
          </p>
          <p className="text-sm">
            Try our signature coffee cocktails and explore the rich variety of
            matcha options. Visit us for new gastronomic experiences and
            comfort! We eagerly await your visit.
          </p>

          <div className="mt-20">
            <JoinTeamSheet />
          </div>
        </div>

        {/* RIGHT PANEL => MENU + DISH */}
        <div className="absolute right-0 top-0 h-full flex z-[999]">

          {/* DISH SHEET (left) */}
          {showDish && selectedDish && (
            <DishSheet
              dish={selectedDish}
              onClose={() => setShowDish(false)}
            />
          )}

          {/* MENU SHEET (right) */}
          <MenuSheet onDishClick={handleOpenDish} />
        </div>

      </div>
    </div>
  );
};

export default Index;
