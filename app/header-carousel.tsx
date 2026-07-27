"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import slidesData from "@/content/header-slides.json";

type Slide = {
  image: string;
  alt: string;
};

const slides = slidesData as Slide[];

export function HeaderCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (
      slides.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5800);

    return () => window.clearInterval(timer);
  }, []);

  if (slides.length === 0) return null;

  const moveSlide = (direction: number) => {
    setActiveSlide(
      (current) => (current + direction + slides.length) % slides.length,
    );
  };

  return (
    <div
      className="overview-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured research"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") moveSlide(-1);
        if (event.key === "ArrowRight") moveSlide(1);
      }}
    >
      <div className="overview-carousel-image">
        {slides.map((slide, index) => (
          <div
            className={`overview-slide ${index === activeSlide ? "is-active" : ""}`}
            key={slide.image}
            aria-hidden={index !== activeSlide}
          >
            <Image
              src={slide.image}
              alt={index === activeSlide ? slide.alt : ""}
              fill
              priority={index === 0}
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
