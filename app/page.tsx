"use client";
import { useCallback, useState } from "react";
import SplashCursor from "@/components/SplashCursor";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Footer } from "@/components/ui/footer-section";
import Preloader from "@/components/ui/preloader";
import { LayeredText } from "@/components/ui/layered-text";
import Lanyard from "@/components/ui/lanyard/Lanyard";
import { Briefcase, FileText, Home as HomeIcon, User } from "lucide-react";

const navItems = [
  { name: "Home", url: "#", icon: HomeIcon },
  { name: "About", url: "#about", icon: User },
  { name: "Projects", url: "#projects", icon: Briefcase },
  { name: "Resume", url: "#resume", icon: FileText },
];

export default function Page() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        background: "#0d0d0d",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {/* Rough texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          opacity: 0.35,
          mixBlendMode: "soft-light",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Navbar */}
      <div style={{ position: "relative", zIndex: 3, padding: "32px 24px" }}>
        <NavBar items={navItems} />
      </div>

      {/* Hero */}
      <section id="hero" className="relative z-[3] px-6 pt-6 pb-20 md:px-12">
        <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className="flex flex-col items-start text-left">
            <LayeredText
              className="text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.35)] [&_ul]:items-start"
              fontSize="42px"
              fontSizeMd="20px"
              lineHeight={46}
              lineHeightMd={26}
            />
          </div>
          <div className="min-h-[500px] h-[70vh] relative" />
        </div>
      </section>

      {/* Lanyard - positioned absolutely from top */}
      <div className="fixed top-0 right-0 w-1/2 h-screen z-[4]" style={{ pointerEvents: 'auto' }}>
        <Lanyard cameraDistance={20} />
      </div>

      {/* Main spacer to enable scroll */}
      <div style={{ height: "220vh", position: "relative", zIndex: 3 }} />

      {/* Footer */}
      <div style={{ position: "relative", zIndex: 3, padding: "0 16px 48px" }}>
        <Footer />
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          COLOR_UPDATE_SPEED={10}
          TRANSPARENT={true}
        />
      </div>
    </div>
  );
}
