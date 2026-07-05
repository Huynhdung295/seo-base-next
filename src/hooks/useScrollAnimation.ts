"use client";

import { useRef } from "react";
import {
  useInView,
  type UseInViewOptions,
  type Variant,
} from "framer-motion";

// ─── Animation Presets ──────────────────────────────────────

export const animationPresets = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
} satisfies Record<string, { hidden: Variant; visible: Variant }>;

// ─── Types ──────────────────────────────────────────────────

type PresetName = keyof typeof animationPresets;

interface UseScrollAnimationOptions {
  /** Animation preset to use */
  preset?: PresetName;
  /** Trigger animation only once (default: true) */
  once?: boolean;
  /** Margin around the element to trigger (default: "-100px") */
  margin?: UseInViewOptions["margin"];
  /** Amount of element visible to trigger (default: 0) */
  amount?: UseInViewOptions["amount"];
}

interface UseScrollAnimationReturn {
  /** Ref to attach to the animated element */
  ref: React.RefObject<HTMLElement | null>;
  /** Whether the element is in view */
  isInView: boolean;
  /** The animation variants for the selected preset */
  variants: { hidden: Variant; visible: Variant };
  /** Current animation state: "visible" or "hidden" */
  animationState: "visible" | "hidden";
}

// ─── Hook ───────────────────────────────────────────────────

/**
 * Custom hook for scroll-triggered animations using framer-motion.
 *
 * @example
 * "use client";
 * import { motion } from "framer-motion";
 * import { useScrollAnimation } from "@/hooks/useScrollAnimation";
 *
 * function MySection() {
 *   const { ref, variants, animationState } = useScrollAnimation({
 *     preset: "slideUp",
 *     once: true,
 *   });
 *
 *   return (
 *     <motion.div
 *       ref={ref}
 *       initial="hidden"
 *       animate={animationState}
 *       variants={variants}
 *       transition={{ duration: 0.5, ease: "easeOut" }}
 *     >
 *       <h2>This slides up when scrolled into view</h2>
 *     </motion.div>
 *   );
 * }
 */
export function useScrollAnimation(
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const {
    preset = "fadeIn",
    once = true,
    margin = "-100px",
    amount = 0,
  } = options;

  const ref = useRef<HTMLElement | null>(null);

  const isInView = useInView(ref, {
    once,
    margin,
    amount,
  });

  const variants = animationPresets[preset];
  const animationState = isInView ? "visible" : "hidden";

  return {
    ref,
    isInView,
    variants,
    animationState,
  };
}
