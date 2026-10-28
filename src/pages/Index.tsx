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
const HERO_MODE = "full" as "full" | "video" | "photos";

const LoopVideo: React.FC<{
  name: string;
  label: string;
  className?: string;
  focus?: string; // object-position when the frame is cropped
}> = ({ name, label, className = "", focus = "center" }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // iOS only autoplays video that is muted *as an attribute*; React sets only the property
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    // Low Power Mode and some browsers block autoplay: start on the first touch instead
    const onTouch = () => tryPlay();
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => window.removeEventListener("touchstart", onTouch);
  }, []);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        className="absolute inset-0 block h-full w-full object-cover"
        style={{ objectPosition: focus }}
        poster={`/video/${name}-poster.webp`}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
        aria-label={label}
      >
        <source src={`/video/${name}.mp4`} type="video/mp4" />
        <source src={`/video/${name}.webm`} type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
};

/** Two videos stacked: landscape coffee on top, vertical brunch below. */
const HeroVideos: React.FC<{ coffeeLabel: string; brunchLabel: string }> = ({
  coffeeLabel,
  brunchLabel,
}) => (
  <div
    className="pointer-events-none absolute flex flex-col gap-2
      left-[3.5vw] right-[3.5vw] top-[76px] bottom-[92px]
      md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-[33vw] md:gap-1.5"
  >
    <LoopVideo name="hero-coffee" label={coffeeLabel} className="aspect-video w-full shrink-0" />
    <LoopVideo name="hero" label={brunchLabel} focus="center 80%" className="min-h-0 w-full flex-1" />
  </div>
);

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
const MAPS_URL = "https://maps.app.goo.gl/PoeWtCYZqUPiun9E8";
const SLIDER_MARGIN = 150;

// Homepage menu teaser: photos from public/menu/img (the name overlays are part of the photos)
const MENU_TEASER = [
  { src: "dishes/croque-madame", en: "Croque madame", pt: "Croque madame" },
  { src: "dishes/pastrami-truffle-potato-crepe", en: "Pastrami & truffle potato crêpe", pt: "Crêpe de pastrami, batata e trufa" },
  { src: "dishes/eggs-benedict-salmon", en: "Eggs Benedict with salmon", pt: "Ovos Benedict com salmão" },
  { src: "matcha-tasting-set", en: "Ceremonial matcha tasting set", pt: "Set de degustação de matcha cerimonial" },
];

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

  // Full-screen video: phone gets the vertical clip, desktop the landscape one (only one is downloaded)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setIsDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
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

  const s = c.sections;
  const linkCls = "underline underline-offset-2 hover:opacity-70 transition-opacity";
  const instagram = (
    <a href="https://instagram.com/alba.lisbon" target="_blank" rel="noopener noreferrer" className={linkCls}>
      Instagram
    </a>
  );
  const email = (
    <span onClick={handleEmailClick} data-track="email_click" className={`cursor-pointer ${linkCls}`}>
      {EMAIL}
    </span>
  );

  return (
    <div ref={rootRef} className="relative w-full bg-background f-serif text-[#2a211d]">
      {/* HEADER – stays on top while scrolling */}
      <header className="sticky top-0 z-30 flex items-center justify-between bg-background px-4 py-4 md:px-8 md:py-6">
        <a href={lang === "pt" ? "/pt/" : "/"} className="flex flex-col items-start gap-1 select-none">
          <img
            src={logoImage}
            alt="ALBA: brunch • coffee • matcha bar – Alba Lisbon logo"
            className="h-4 md:h-6 w-auto object-contain"
          />
          <span
            className="text-[8px] md:text-[10px] tracking-[0.16em] text-[#e62d3b]"
            style={{ fontFamily: '"Maison Neue Extended Demi", sans-serif' }}
          >
            BRUNCH • COFFEE • MATCHA BAR
          </span>
        </a>
        <div className="flex items-center gap-5 text-[#e62d3b]">
          <a
            href={c.otherLang.href}
            hrefLang={c.otherLang.hreflang}
            lang={c.otherLang.hreflang}
            title={c.otherLang.title}
            className="text-[11px] md:text-xs tracking-[0.16em] hover:opacity-80 transition-opacity"
            style={{ fontFamily: '"Maison Neue Extended Demi", sans-serif' }}
          >
            {c.otherLang.label}
          </a>
          <MenuSheet href={c.menuHref} />
        </div>
      </header>

      {/* HERO – video with the hook on top */}
      <section className="relative h-[calc(100svh-64px)] md:h-[calc(100svh-92px)] min-h-[420px] overflow-hidden">
        {isDesktop ? (
          <LoopVideo name="hero-coffee-wide" label={c.heroVideoCoffeeLabel} focus="center 60%" className="h-full w-full" />
        ) : (
          <LoopVideo name="hero-coffee-vertical" label={c.heroVideoCoffeeLabel} focus="center 70%" className="h-full w-full" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div
          className="absolute inset-x-4 bottom-16 md:inset-x-auto md:left-8 md:bottom-14 md:max-w-3xl text-white [text-shadow:0_1px_16px_rgba(0,0,0,.35)]"
        >
          <h1 className="f-head text-[28px] md:text-[54px] leading-[1.05]">{c.hook}</h1>
          <p className="f-italic mt-3 md:mt-4 max-w-md text-[18px] md:text-[22px] leading-snug">{c.hookSub}</p>
        </div>
        <a
          href="#menu"
          aria-label={s.scroll}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/90 hover:text-white motion-safe:animate-bounce"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </section>

      {/* MENU */}
      <section id="menu" className="scroll-mt-16 md:scroll-mt-24 px-4 pt-14 pb-12 md:px-8 md:pt-24 md:pb-20 md:grid md:grid-cols-[1fr_2fr] md:gap-12">
        <h2 className="f-head text-[18px] md:text-[24px] leading-tight text-[#e62d3b]">
          {s.menuTitle}
        </h2>
        <div className="mt-5 md:mt-2">
          <p className="max-w-xl text-[18px] md:text-[20px] leading-[1.4]">
            {withNowrapTimes(c.welcome[1])}
          </p>
          <p className="mt-3 max-w-xl text-[18px] md:text-[20px] leading-[1.4]">
            {withNowrapTimes(s.lunch)}
          </p>
          <ul className="mt-7 -mx-4 flex gap-2 overflow-x-auto px-4 snap-x snap-mandatory [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {MENU_TEASER.map((d) => (
              <li key={d.src} className="w-[44vw] shrink-0 snap-start md:w-auto">
                <a href={c.menuHref} className="block aspect-[4/5] overflow-hidden bg-[#ddd5cc]">
                  <img
                    src={`/menu/img/${d.src}.jpg`}
                    alt={d[lang]}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={c.menuHref}
            className="mt-7 inline-block bg-[#2a211d] f-head px-6 py-3 text-[12px] tracking-[0.12em] text-[#f4f0eb] hover:bg-[#4B362F] transition-colors"
          >
            {s.menuCta} →
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-t border-[#2a211d]/10 px-4 py-12 md:px-8 md:py-20 md:grid md:grid-cols-[1fr_2fr] md:gap-12">
        <h2 className="f-head text-[18px] md:text-[24px] leading-tight text-[#e62d3b]">
          {s.aboutTitle}
        </h2>
        <div className="mt-5 md:mt-2 max-w-xl space-y-4 text-[18px] md:text-[20px] leading-[1.4]">
          <p>{withNowrapTimes(c.welcome[0])}</p>
          <p>{withNowrapTimes(c.welcome[2])}</p>
        </div>
      </section>

      {/* VISIT */}
      <section
        aria-labelledby="find-us-title"
        className="border-t border-[#2a211d]/10 px-4 py-12 md:px-8 md:py-20 md:grid md:grid-cols-[1fr_2fr] md:gap-12"
      >
        <h2 id="find-us-title" className="f-head text-[18px] md:text-[24px] leading-tight text-[#e62d3b]">
          {s.visitTitle}
        </h2>
        <div className="mt-5 md:mt-2 md:grid md:grid-cols-2 md:gap-10">
          <div className="space-y-5 text-[17px] leading-[1.45]">
            <p>
              <span className="f-head mb-1 block text-[11px] tracking-[0.12em] text-[#e62d3b]">{c.findUs.address}</span>
              {c.findUs.text}
              <br />
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {c.findUs.mapLabel}
              </a>
            </p>
            <p>
              <span className="f-head mb-1 block text-[11px] tracking-[0.12em] text-[#e62d3b]">{s.hoursLabel}</span>
              {withNowrapTimes(c.hours)}
            </p>
            <div>
              <span className="f-head mb-1 block text-[11px] tracking-[0.12em] text-[#e62d3b]">{s.goodTitle}</span>
              <ul>
                {s.good.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
            <p className="flex flex-wrap gap-x-2">
              {instagram}
              <span>/</span>
              {email}
              <span>/</span>
              <JoinTeamSheet lang={lang} triggerClassName={linkCls} />
            </p>
          </div>
          <img
            src={photoUrl("terrace-breakfast")}
            alt={s.terraceAlt}
            loading="lazy"
            decoding="async"
            className="mt-8 md:mt-0 aspect-[4/5] w-full object-cover"
          />
        </div>
      </section>

      <footer className="f-head flex justify-between gap-4 border-t border-[#2a211d]/10 px-4 py-6 text-[9px] md:text-[10px] text-[#644A42] md:px-8">
        <span>ALBA: BRUNCH • COFFEE • MATCHA BAR</span>
        <span>Created by AlbaFamily</span>
      </footer>

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
