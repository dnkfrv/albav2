import { Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { MenuSheet } from "@/components/MenuSheet";
import { useState, useEffect } from "react";
import heroImage1 from "@/assets/hero-restaurant.jpg";
import heroImage2 from "@/assets/hero-restaurant-2.jpg";
import heroImage3 from "@/assets/hero-restaurant-3.jpg";
import heroImage4 from "@/assets/hero-restaurant-4.jpg";
import logoImage from "@/assets/logo.png";

const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4];

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (e.deltaY > 0) {
        // Scroll down = next image
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      } else if (e.deltaY < 0) {
        // Scroll up = previous image
        setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden">
      {/* Main Content Container with padding for white margins */}
      <div className="min-h-screen flex flex-col p-4 md:p-8 lg:p-12">
        {/* Image Container - centered with aspect ratio */}
        <div className="flex-1 relative rounded-2xl overflow-hidden shadow-elegant">
          {/* Hero Image with Carousel */}
          <div className="relative w-full h-full">
            <img
              src={heroImages[currentImageIndex]}
              alt="Restaurant"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
              key={currentImageIndex}
            />
            <div className="absolute inset-0 bg-hero-overlay/40 backdrop-blur-[2px]" />
          </div>

          {/* Carousel Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-glass-bg/70 rounded-full p-3 shadow-elegant hover:bg-primary/20 transition-all duration-300 group z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-md bg-glass-bg/70 rounded-full p-3 shadow-elegant hover:bg-primary/20 transition-all duration-300 group z-20"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
          </button>

          {/* Content Layer */}
          <div className="absolute inset-0 z-10 flex flex-col">
            {/* Top Section */}
            <header className="flex justify-between items-start p-6 md:p-8">
              {/* Logo - Top Left */}
              <div className="flex items-center space-x-3">
                <img src={logoImage} alt="Restaurant Logo" className="h-12 w-12 object-contain" />
                
              </div>

              {/* Menu Button - Top Right */}
              <MenuSheet />
            </header>

            {/* Bottom Section */}
            <footer className="mt-auto p-6 md:p-8 flex justify-between items-end">
              {/* Hours & Address - Bottom Left */}
              <div className="flex items-start space-x-3">
              <div className="flex items-start space-x-3">
               <div>
                 <p className="text-sm text-muted-foreground">Monday - Sunday 9:00 - 17:00</p>
                  </div>
                    </div>
                       <div className="flex items-start space-x-3">
                         <div>
                          <br>
                           <p className="text-sm text-muted-foreground">
                             Largo do Rato, 4A
                      <br/>
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
      </div>

      {/* Scroll hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-md bg-glass-bg/70 rounded-full px-4 py-2 shadow-elegant z-30">
        <p className="text-xs text-muted-foreground">Прокрутите для смены фото</p>
      </div>
    </div>
  );
};

export default Index;
