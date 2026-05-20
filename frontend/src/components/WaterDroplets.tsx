import { useMemo } from "react";

/**
 * Water Droplet Reveal — overlays animated droplets sliding down across the hero,
 * mimicking a freshly washed car.
 */
export function WaterDroplets({ count = 14 }: { count?: number }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 1.8 + Math.random() * 2.2,
        scale: 0.6 + Math.random() * 1.1,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {drops.map((d) => (
        <span
          key={d.id}
          className="droplet"
          style={{
            left: `${d.left}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            transform: `scale(${d.scale})`,
          }}
        />
      ))}
    </div>
  );
}
