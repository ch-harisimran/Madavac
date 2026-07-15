"use client";

import { useEffect } from "react";

export default function BackgroundOrbs() {
  useEffect(() => {
    const root = document.documentElement;

    const syncAmbient = () => {
      root.classList.toggle("ambient-paused", document.hidden);
    };

    syncAmbient();
    document.addEventListener("visibilitychange", syncAmbient);
    return () => document.removeEventListener("visibilitychange", syncAmbient);
  }, []);

  return (
    <div className="ambient-canvas fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      <div className="ambient-mesh absolute inset-0" />

      <div className="ambient-bloom-wrap absolute -top-[18%] left-1/2 -translate-x-1/2 w-[min(920px,130vw)] h-[620px]">
        <div className="ambient-bloom ambient-bloom-ember ambient-drift w-full h-full rounded-full" />
      </div>
      <div className="ambient-bloom-wrap absolute top-[42%] -left-[14%] w-[520px] h-[520px] hidden sm:block">
        <div className="ambient-bloom ambient-bloom-red ambient-drift ambient-drift-delay-2 w-full h-full rounded-full" />
      </div>
      <div className="ambient-bloom-wrap absolute bottom-[10%] right-[10%] w-[460px] h-[460px] hidden md:block">
        <div className="ambient-bloom ambient-bloom-amber ambient-drift ambient-drift-slow w-full h-full rounded-full" />
      </div>

      <div className="ambient-grid absolute inset-0" />
      <div className="ambient-vignette absolute inset-0" />
      <div className="ambient-noise absolute inset-0" />
    </div>
  );
}
