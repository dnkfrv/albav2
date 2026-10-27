import React, {
  useState,
  useRef,
  CSSProperties,
  useEffect,
} from "react";
import { MenuSheet } from "@/components/MenuSheet";
import { JoinTeamSheet } from "@/components/JoinTeamSheet";
import logoImage from "@/assets/logo.png";

import site from "@/content/site.json";

export type Lang = "en" | "pt";

// Homepage photos: order, files and alt texts live in src/content/site.json
const photoFiles = import.meta.glob("/src/assets/photos/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const photoUrl = (file: string) => photoFiles[`/src/assets/photos/${file}.webp`];

/** What fills the photo area: a looping video, or the photo slider (set back to "photos" to return). */
const HERO_MODE = "video" as "video" | "photos";

const HeroVideo: React.FC<{ label: string }> = ({ label }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true; // iOS only autoplays muted video, and React doesn't set the attribute
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) v.play().catch(() => {});
  }, []);
  return (
    <div className="absolute inset-0 flex items-center justify-center md:justify-end pointer-events-none">
      <div className="relative -translate-y-[10px] md:translate-y-0">
        <video
          ref={ref}
          className="block w-[93vw] h-auto max-h-[calc(100svh-180px)] md:w-[33vw] md:h-[100vh] md:max-h-none md:object-cover object-contain"
          poster="/video/hero-poster.webp"
          muted
          loop
          playsInline
          preload="auto"
          aria-label={label}
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/25" />
      </div>
    </div>
  );
};

/** Keeps time ranges like 9:00–17:00 on one line. */
const withNowrapTimes = (text: string) =>
  text.split(/(\d{1,2}:\d{2}\s?–\s?\d{1,2}:\d{2})/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );

const EMAIL = "hello@albalisbon.com";
const SLIDER_MARGIN = 150;

const Index: React.FC<{ lang?: Lang }> = ({ lang = "en" }) => {
  const c = site[lang];
  const photos = React.useMemo(
    () => site.photos.map((p) => ({ src: photoUrl(p.file), alt: p[lang] })),
    [lang],
  );
  const heroImages = photos;
  const desktopImages = photos;

  // Desktop: only the first photo loads with the page, the rest after it has loaded
  const [restReady, setRestReady] = useState(false);
  useEffect(() => {
    const go = () => setRestReady(true);
    if (document.readyState === "complete") {
      const t = setTimeout(go, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

  useEffect(() => {
    document.documentElement.lang = c.htmlLang;
  }, [c.htmlLang]);

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

  const isWithinSliderActiveZone = (clientY: number) => {
    const viewportHeight =
      typeof window !== "undefined"
        ? window.innerHeight
        : rootRef.current?.getBoundingClientRect().height ?? 0;

    if (viewportHeight === 0) return true;

    return (
      clientY > SLIDER_MARGIN && clientY < viewportHeight - SLIDER_MARGIN
    );
  };

  const startDrag = (clientX: number, clientY: number) => {
    if (!isWithinSliderActiveZone(clientY)) return;

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

    if (dragOffset < -threshold) {
      nextMobile();
    } else if (dragOffset > threshold) {
      prevMobile();
    }

    setIsDragging(false);
    setDragStartX(null);
    setDragOffset(0);
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isWithinSliderActiveZone(e.clientY)) return;

    if (swipedRef.current) {
      swipedRef.current = false;
      return;
    }

    const rect = mobileRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;

    if (x < rect.width / 2) {
      prevMobile();
    } else {
      nextMobile();
    }
  };

  const handleDesktopMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!desktopImages.length || !restReady) return;

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
  const [copiedPos, setCopiedPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleEmailClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    const rootRect = rootRef.current?.getBoundingClientRect();

    if (rootRect) {
      let x: number;
      let y: number;

      const isMobile =
        typeof window !== "undefined" ? window.innerWidth < 768 : false;

      if (isMobile) {
        x = e.clientX - rootRect.left;
        y = e.clientY - rootRect.top;
      } else {
        const emailRect = e.currentTarget.getBoundingClientRect();
        x = emailRect.right - rootRect.left + 4;
        y = emailRect.top - rootRect.top - 4;
      }

      setCopiedPos({ x, y });
    }

    let success = false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(EMAIL);
        success = true;
      }
    } catch {
      success = false;
    }

    if (!success) {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = EMAIL;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        success = true;
      } catch {
        success = false;
      }
    }

    if (success) {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      setCopied(true);

      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative h-svh w-full overflow-hidden bg-background overscroll-none font-kommon"
    >
      {HERO_MODE === "video" && <HeroVideo label={c.heroVideoLabel} />}

      {/* ДЕСКТОП ФОТО */}
      {HERO_MODE === "photos" && (<>
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
            <div className="relative max-h-[100vh] mr-0">
              <img
                src={index === 0 || restReady ? img.src : undefined}
                alt={img.alt}
                decoding="async"
                fetchPriority={index === 0 ? "high" : "low"}
                className="w-auto h-auto max-h-[100vh] max-w-full object-contain"
              />
              <div className="absolute inset-0 bg-black/25 pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* МОБИЛЬНЫЙ СЛАЙДЕР */}
      <div
        ref={mobileRef}
        className="absolute inset-0 block md:hidden overflow-x-hidden"
        onTouchStart={(e) =>
          startDrag(e.touches[0].clientX, e.touches[0].clientY)
        }
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
                  src={img.src}
                  alt={img.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      </>)}

      {/* ЛОГО */}
      <div className="absolute top-4 left-4 md:top-6 md:left-8">
        <div className="flex flex-col items-start gap-1 select-none">
          <img
            src={logoImage}
            alt="ALBA: brunch • coffee • matcha bar – Alba Lisbon logo"
            className="h-4 md:h-6 w-auto object-contain"
          />
         <p
            className="text-[8px] md:text-[10px] tracking-[0.16em] text-[#e62d3b]"
            style={{ fontFamily: '"Maison Neue Extended Demi", sans-serif' }}
>
  BRUNCH • COFFEE • MATCHA BAR
</p>
        </div>
      </div>

      {/* ТЕКСТ ДЛЯ ДЕСКТОПА */}
      <div
        className="hidden md:block absolute max-w-md text-xs md:text-sm text-black leading-relaxed "
        style={{ top: 200, left: 200, fontFamily: '"Times Now Light", serif' }}
      >
        {c.welcome.map((text, i) => (
          <p key={i} className={i < c.welcome.length - 1 ? "mb-3" : ""}>
            {withNowrapTimes(text)}
          </p>
        ))}

        <div className="mt-20">
          <JoinTeamSheet lang={lang} />
        </div>

      </div>

      {/* КНОПКА МЕНЮ */}
      <div className="absolute top-4 right-4 md:top-[27px] md:right-[calc(33vw+2rem)] text-[#e62d3b]">
        <div className="flex items-center gap-5">
          <a
            href={c.otherLang.href}
            hrefLang={c.otherLang.hreflang}
            lang={c.otherLang.hreflang}
            title={c.otherLang.title}
            className="text-[11px] md:text-xs tracking-[0.16em] text-[#e62d3b] hover:opacity-80 transition-opacity"
            style={{ fontFamily: '"Maison Neue Extended Demi", sans-serif' }}
          >
            {c.otherLang.label}
          </a>
          <MenuSheet href={c.menuHref} />
        </div>
      </div>

      {/* Мобильная нижняя инфа */}
      <div className="absolute bottom-4 left-4 md:hidden">
        <div className="flex flex-col space-y-1 text-xs text-[#644A42] leading-[18px] font-kommon">
          <span>{c.hours}</span>
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

      <div className="absolute bottom-4 right-4 md:hidden">
        <div className="flex flex-col items-end text-right space-y-1 font-kommon">
          <JoinTeamSheet lang={lang} />
          <div className="flex flex-row items-center gap-1 text-xs text-[#644A42]">
            <a
              href="https://instagram.com/albabistro.lisbon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4B362F] transition-colors"
            >
              Instagram
            </a>
            <span>/</span>
            <span
              onClick={handleEmailClick}
              className="cursor-pointer hover:text-[#4B362F] underline underline-offset-2 transition-colors"
            >
              {EMAIL}
            </span>
          </div>
        </div>
      </div>

      {/* ДЕСКТОП — нижний левый угол */}
      <div className="hidden md:block absolute bottom-6 left-8">
        <div className="flex flex-col space-y-0 text-sm text-[#644A42] leading-[16px] font-kommon">
          <span>{c.hours}</span>
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
              href="https://instagram.com/albabistro.lisbon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4B362F] transition-colors"
            >
              Instagram
            </a>
            <span>/</span>
            <span
              onClick={handleEmailClick}
              className="cursor-pointer hover:text-[#4B362F] underline underline-offset-2 transition-colors"
            >
              {EMAIL}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-6 right-8">
        <p className="text-xs text-[#644A42] font-kommon">
          Created by AlbaFamily
        </p>
      </div>

      {/* Tooltip "Copied" в стиле macOS */}
      {copiedPos && (
        <div
          className={`
            pointer-events-none absolute z-50
            transition-opacity duration-500 ease-out
            ${copied ? "opacity-100" : "opacity-0"}
          `}
          style={{
            left: copiedPos.x,
            top: copiedPos.y,
            transform: "translateY(-100%)",
          }}
        >
          <div
            className="
              bg-[#f5f5f7]/90
              text-[10px] md:text-[11px]
              text-[#111827]
              px-3 py-1.5
              rounded-[6px]
              border border-white/70
              shadow-[0_8px_24px_rgba(15,23,42,0.18)]
              backdrop-blur-md
              tracking-[0.02em]
            "
          >
            {c.copied}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
