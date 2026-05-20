/**
 * Wheel Spin Loader — a stylized rim spinning until content loads.
 */
export function WheelLoader({ size = 56, label }: { size?: number; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="wheel-spin"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="rim-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.7 0.15 260)" />
            <stop offset="100%" stopColor="oklch(0.25 0.02 260)" />
          </radialGradient>
        </defs>
        {/* Tire */}
        <circle cx="50" cy="50" r="48" fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="3" />
        {/* Rim */}
        <circle cx="50" cy="50" r="34" fill="url(#rim-grad)" />
        {/* Spokes */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <rect
            key={deg}
            x="48"
            y="20"
            width="4"
            height="30"
            fill="oklch(0.85 0.05 260)"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
        {/* Hub */}
        <circle cx="50" cy="50" r="8" fill="oklch(0.55 0.22 260)" />
        <circle cx="50" cy="50" r="3" fill="#fff" />
      </svg>
      {label && <span className="text-xs uppercase tracking-ultra text-muted-foreground">{label}</span>}
    </div>
  );
}
