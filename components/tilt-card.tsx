"use client";

import { useTilt } from "@/lib/use-tilt";
import type { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  spotlight?: boolean;
}

/**
 * Envoltorio de tarjeta con tilt 3D + spotlight que sigue al cursor.
 * Pensado para usarse junto a `.premium-card` (alimenta --mouse-x / --mouse-y).
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
  scale = 1,
  spotlight = true,
}: TiltCardProps) {
  const ref = useTilt<HTMLDivElement>({ max, scale, spotlight });
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
