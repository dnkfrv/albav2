// src/pages/Index.tsx
import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { MenuSheet } from "@/components/MenuSheet";

// НОВЫЕ ФОТО + старые
import img1_11 from "@/assets/1-11.jpg";
import img1_23 from "@/assets/1-23.jpg";

import imgA113_2 from "@/assets/A-113-2.jpg";
import imgA121 from "@/assets/A-121.jpg";
import imgA130 from "@/assets/A-130.jpg";
import imgA179 from "@/assets/A-179.jpg";
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
  img1_11,
  img1_23,
  imgA113_2,
  imgA121,
  imgA130,
  imgA179,
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

  const moveDrag = (
