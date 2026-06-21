"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealOptions {
  selector?: string;
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  ease?: string;
}

export function useScrollReveal<T extends HTMLElement>({
  selector,
  y = 32,
  opacity = 0,
  duration = 0.8,
  stagger = 0.1,
  start = "top 85%",
  ease = "power3.out",
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector ? el.querySelectorAll(selector) : [el];

    const tween = gsap.fromTo(
      targets,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [selector, y, opacity, duration, stagger, start, ease]);

  return ref;
}
