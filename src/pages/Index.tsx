import React from "react";
import { MenuSheet } from "@/components/MenuSheet";
import heroImage1 from "@/assets/hero-restaurant.jpg";
import heroImage2 from "@/assets/hero-restaurant-2.jpg";
import heroImage3 from "@/assets/hero-restaurant-3.jpg";
import heroImage4 from "@/assets/hero-restaurant-4.jpg";
import logoImage from "@/assets/logo.png";

// Фото и их относительные высоты (чуть разные, как в примере)
const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4].filter(Boolean);
const heroHeights = ["65svh", "72svh", "68svh", "75svh"];

const Index = () => {
  return (
    // Вся страница = высота экрана, паспарту по краям
    <div className="h-svh w-full bg-background flex items-center justify-center relative">
      {/* Центральный блок с фотографиями: внутри вертикальный скролл и snap */}
      <div
        className="
          relative
          h-[84svh]
          w-full
          max-w-5xl
          mx-6 md:mx-10
          overflow-y-auto
          snap-y snap-mandatory
        "
      >
        {heroImages.map((img, index) => (
          <div
            key={index}
            className="relative w-full snap-center mb-6 md:mb-8 last:mb-0"
            style={{ height: heroHeights[index % heroHeights.length] }}
          >
            <img
              src={img}
              alt="Restaurant"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-hero-overlay/40 backdrop-blur-[2px]" />
          </div>
        ))}
      </div>

      {/* Угловые элементы – частично на паспарту, частично на фото */}
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

      {/* MENU СПРАВА СВЕРХУ */}
      <div className="pointer-events-none absolute top-4 right-4 md:top-6 md:right-8">
        <div className="pointer-events-auto">
          <MenuSheet />
        </div>
      </div>

      {/* АДРЕС СЛЕВА СНИЗУ */}
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