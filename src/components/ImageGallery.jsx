"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col lg:flex-row gap-4">

      {/* Vertical thumbnails desktop */}
      {images.length > 1 && (
        <div className="hidden lg:flex flex-col gap-3 w-20">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative w-20 h-28 overflow-hidden border transition-all duration-300",
                i === activeIndex
                  ? "border-black"
                  : "border-zinc-200 hover:border-zinc-400"
              )}
            >
              <img
              
                src={img}
                alt=""
                className="w-full h-full object-cover"
              />

              {i === activeIndex && (
                <span className="absolute inset-0 border border-black" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1">
        <div className="relative overflow-hidden bg-zinc-50 aspect-[3/4] group">

          <img
            key={activeIndex}
            src={images[activeIndex]}
            alt={`${productName} image ${activeIndex + 1}`}
            className="
              w-full h-full object-cover
              transition-all duration-700 ease-out
              group-hover:scale-105
            "
          />

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="
                  absolute left-4 top-1/2 -translate-y-1/2
                  w-10 h-10 bg-white/10 border border-zinc-200
                  flex items-center justify-center
                  hover:bg-white transition
                "
              >
                <ChevronLeft className="text-black" size={18} />
              </button>

              <button
                onClick={next}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  w-10 h-10 bg-white/10 border border-zinc-200
                  flex items-center justify-center
                  hover:bg-white transition
                "
              >
                <ChevronRight className="text-black"  size={18} />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="text-black absolute bottom-4 right-4 bg-white/90 px-3 py-1 text-xs tracking-[0.2em]">
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* Mobile thumbnails */}
        {images.length > 1 && (
          <div className="flex lg:hidden gap-2 mt-3 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-16 h-20 flex-shrink-0 overflow-hidden border",
                  i === activeIndex
                    ? "border-black"
                    : "border-zinc-200"
                )}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}