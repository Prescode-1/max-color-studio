import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useState, Suspense, useEffect } from "react";
import "@/lib/i18n";
import appCss from "../styles.css?url";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchPalette } from "@/components/SearchPalette";
import { MouseGlow } from "@/components/MouseGlow";
import { BrushCursor } from "@/components/BrushCursor";
import { FoamTransition } from "@/components/FoamTransition";
import { WheelLoader } from "@/components/WheelLoader";
import { AIAssistant } from "@/components/AIAssistant";
import { SocialFab } from "@/components/SocialFab";
import { useAdmin } from "@/lib/admin-store";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="text-display text-[8rem] font-bold leading-none text-primary opacity-90">404</div>
        <h2 className="mt-2 text-xl font-semibold">Off the canvas</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist in our color library.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Max Color — Premium Automotive Painting" },
      { name: "description", content: "Showroom-grade automotive painting. Full body, caliper, wheels. Engineered for collectors and tuners." },
      { property: "og:title", content: "Max Color — Premium Automotive Painting" },
      { property: "og:description", content: "Showroom-grade automotive painting. Full body, caliper, wheels." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const [searchOpen, setSearchOpen] = useState(false);
  
  useEffect(() => {
    useAdmin.getState().init();
  }, []);

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><WheelLoader label="Loading" /></div>}>
      <div className="relative min-h-screen bg-background text-foreground">
        <MouseGlow />
        <BrushCursor />
        <FoamTransition />
        <Header onOpenSearch={() => setSearchOpen(true)} />
        <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
        <main className="relative z-10 pt-20">
          <Outlet />
        </main>
        <Footer />
        <SocialFab />
        <AIAssistant />
      </div>
    </Suspense>
  );
}
