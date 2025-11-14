import { Instagram, Clock, MapPin } from "lucide-react";
import { MenuSheet } from "@/components/MenuSheet";
import heroImage from "@/assets/hero-restaurant.jpg";
import logoImage from "@/assets/logo.png";

const Index = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-hero-overlay/40 backdrop-blur-[2px]" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Section */}
        <header className="flex justify-between items-start p-6 md:p-8">
          {/* Logo - Top Left */}
          <div className="flex items-center space-x-3 backdrop-blur-sm bg-glass-bg/60 rounded-full px-4 py-2 shadow-elegant">
            <img src={logoImage} alt="Restaurant Logo" className="h-12 w-12 object-contain" />
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">Your Restaurant</h1>
              <p className="text-sm text-muted-foreground">Coffee & Dine</p>
            </div>
          </div>

          {/* Menu Button - Top Right */}
          <MenuSheet />
        </header>

        {/* Bottom Section */}
        <footer className="mt-auto p-6 md:p-8 flex justify-between items-end">
          {/* Hours & Address - Bottom Left */}
          <div className="backdrop-blur-md bg-glass-bg/70 rounded-2xl px-6 py-4 shadow-elegant space-y-3 max-w-sm">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Часы работы</p>
                <p className="text-sm text-muted-foreground">Пн-Вс: 08:00 - 22:00</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Адрес</p>
                <p className="text-sm text-muted-foreground">
                  ул. Пример, 123
                  <br />
                  Москва, Россия
                </p>
              </div>
            </div>
          </div>

          {/* Instagram - Bottom Right */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="backdrop-blur-md bg-glass-bg/70 rounded-full p-4 shadow-elegant hover:bg-primary/20 transition-all duration-300 group"
            aria-label="Instagram"
          >
            <Instagram className="h-8 w-8 text-foreground group-hover:text-primary transition-colors" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;
