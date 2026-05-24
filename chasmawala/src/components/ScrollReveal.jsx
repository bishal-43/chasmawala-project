"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal - Animate elements as they enter viewport
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {"fade-up"|"fade-down"|"fade-left"|"fade-right"|"fade"|"scale"|"slide-up"} props.animation - Animation type
 * @param {number} props.delay - Delay in ms before animation starts
 * @param {number} props.duration - Animation duration in ms
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.once - Animate only once (default: true)
 */
export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
  once = true,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
          }
        } else if (!once && hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, hasAnimated]);

  const animations = {
    "fade-up": {
      initial: "opacity-0 translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    "fade-down": {
      initial: "opacity-0 -translate-y-8",
      animate: "opacity-100 translate-y-0",
    },
    "fade-left": {
      initial: "opacity-0 translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    "fade-right": {
      initial: "opacity-0 -translate-x-8",
      animate: "opacity-100 translate-x-0",
    },
    fade: {
      initial: "opacity-0",
      animate: "opacity-100",
    },
    scale: {
      initial: "opacity-0 scale-95",
      animate: "opacity-100 scale-100",
    },
    "slide-up": {
      initial: "translate-y-12",
      animate: "translate-y-0",
    },
  };

  const selectedAnimation = animations[animation] || animations["fade-up"];

  return (
    <div
      ref={ref}
      className={`
        transition-all ease-out
        ${isVisible ? selectedAnimation.animate : selectedAnimation.initial}
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
