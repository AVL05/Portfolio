"use client";

import type { ReactNode } from "react";

/**
 * Simplified Scroll Component.
 * Reverted to native scroll to ensure the "lightest" possible feel
 * as per user request to remove "pesadez".
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <div className="contents">{children}</div>;
}
