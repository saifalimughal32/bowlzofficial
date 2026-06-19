"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: 1 | 2 | 3;
};

export function AnimateIn({ children, className = "", delay }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `animate-in-delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`animate-in ${delayClass} ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
