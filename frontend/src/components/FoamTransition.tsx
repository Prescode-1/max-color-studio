import { useLocation } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/**
 * Foam Wash Transition — plays a foam wipe overlay each time the route changes.
 */
export function FoamTransition() {
  const loc = useLocation();
  const [playKey, setPlayKey] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPlayKey((k) => k + 1);
  }, [loc.pathname]);

  if (playKey === 0) return null;

  return <div key={playKey} className="foam-wipe" aria-hidden="true" />;
}
