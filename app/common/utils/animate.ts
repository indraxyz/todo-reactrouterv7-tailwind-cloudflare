/**
 * Animation utility functions and constants
 */

export const transitions = {
  fast: "duration-150",
  normal: "duration-200",
  slow: "duration-300",
  slower: "duration-500",
} as const;

export const easings = {
  linear: "ease-linear",
  in: "ease-in",
  out: "ease-out",
  inOut: "ease-in-out",
} as const;

/**
 * Fade in animation classes
 */
export const fadeIn = "animate-fade-in";

/**
 * Slide in animation classes
 */
export const slideIn = {
  up: "animate-slide-in-up",
  down: "animate-slide-in-down",
  left: "animate-slide-in-left",
  right: "animate-slide-in-right",
} as const;

/**
 * Scale animation classes
 */
export const scale = {
  in: "animate-scale-in",
  out: "animate-scale-out",
} as const;

/**
 * Combine transition classes
 */
export function transition(
  property: string = "all",
  duration: keyof typeof transitions = "normal",
  easing: keyof typeof easings = "inOut"
): string {
  return `${transitions[duration]} ${easings[easing]}`;
}

