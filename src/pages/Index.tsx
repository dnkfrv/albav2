import React, {
  useState,
  useRef,
  CSSProperties,
  useEffect,
} from "react";
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

const EMAIL = "hello@albabistrolisbon.com";

const Index: React.FC = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  // мобильный слайдер
  const [mobileIndex, setMobileIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const mobileRef = useRef<HTMLDivElement | null>(null);
  const swipedRef = useRef(false);

  const lastDesktopMousePos = useRef<{ x: number; y: number } | null>(null);

  const clampIndex = (idx: number) =>
    Math.max(0, Math.min(idx, heroImages.length - 1));

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
    if (Math.abs(delta) > 10) swipedRef.current = true;
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

  const handleDesktopMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!desktopImages.length) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!lastDesktopMousePos.current) {
      lastDesktopMousePos.current = { x, y };
      return;
    }

    const dx = x - lastDesktopMousePos.current.x;
    const dy = y - lastDesktopMousePos.current.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const threshold = Math.min(rect.width, rect.height) * 0.08;

    if (distance < threshold) return;

    lastDesktopMousePos.current = { x, y };

    if (desktopImages.length > 1) {
      let nextIndex = currentIndex;
      while (nextIndex === currentIndex) {
        nextIndex = Math.floor(Math.random() * desktopImages.length);
      }
      setCurrentIndex(nextIndex);
    }
  };

  const width = mobileRef.current?.offsetWidth ?? 1;
  const dragPercent = (dragOffset / width) * 100;
  const translate = -mobileIndex * 100 + dragPercent;

  const mobileTrackStyle: CSSProperties = {
    transform: `translateX(${translate}%)`,
    transition: isDragging ? "none" : "transform 0.4s ease",
  };

  // "Copied" тост
  const [copied, setCopied] = useState(false);
  const [copiedPos, setCopiedPos] = useState<{ x: number; y:
