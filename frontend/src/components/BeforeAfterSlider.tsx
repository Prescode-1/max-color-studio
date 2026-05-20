import { useRef, useState, useCallback, useEffect } from "react";

/**
 * Before/After Slider — drag to reveal a polished version over a "dirty" one.
 * "Dirty" effect is simulated with desaturate + dim filters over the same image.
 */
export function BeforeAfterSlider({
  image,
  alt,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  image: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, ratio)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      updateFromClientX(x);
    };
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-2xl border border-border/60"
      onMouseDown={(e) => {
        setDragging(true);
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        setDragging(true);
        updateFromClientX(e.touches[0].clientX);
      }}
    >
      {/* Before (dirty) */}
      <img
        src={image}
        alt={`${alt} — ${beforeLabel}`}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.4) brightness(0.55) contrast(0.9) blur(0.4px)" }}
        draggable={false}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(120,90,60,0.35), transparent 40%), radial-gradient(circle at 70% 70%, rgba(80,70,60,0.4), transparent 45%)",
        }}
      />

      {/* After (polished) — clipped to slider position */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={image}
          alt={`${alt} — ${afterLabel}`}
          className="h-full w-full object-cover"
          style={{ filter: "saturate(1.2) brightness(1.05) contrast(1.05)" }}
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
          }}
        />
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 rounded-full bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-ultra text-muted-foreground backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute bottom-3 right-3 rounded-full bg-primary/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-ultra text-primary-foreground backdrop-blur">
        {afterLabel}
      </span>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 cursor-ew-resize bg-gradient-to-b from-transparent via-primary to-transparent"
        style={{ left: `${pos}%`, boxShadow: "0 0 20px var(--glow-strong)" }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-background/80 backdrop-blur">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
            <path d="M8 7L3 12L8 17" />
            <path d="M16 7L21 12L16 17" />
          </svg>
        </div>
      </div>
    </div>
  );
}
