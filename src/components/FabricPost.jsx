"use client";

import { useState } from "react";

const STORIES = [
  {
    id: 1,
    title: "The Language of Texture",
    shirt_name: "Inked Cloudline",
    shirtImage:
      "https://i.ibb.co.com/4RYXPxRq/Whats-App-Image-2026-03-10-at-2-16-39-AM.jpg",
    excerpt:
      "Before it became something special, it was simply a piece of fabric. A quiet composition of sky blue and white, crossed with fine ink lines. Balanced like architecture, calm like early morning light. Nothing loud. Nothing excessive. Only restraint, proportion and character. We chose it because true elegance never tries too hard. Soon, it finds its form.",
    image:
      "https://i.ibb.co.com/DHp2xRZr/shite-stripe-fabric.jpg",
  },
  {
    id: 2,
    title: "When Fabric Finds Light",
    shirt_name: "Moonlight Noir",
    shirtImage:
      "https://i.ibb.co.com/Zk5LzZQ/Whats-App-Image-2026-03-14-at-5-01-26-PM.jpg",
    excerpt:
      "Every piece begins with a contrast. A deep black viscose canvas, fluid, smooth and naturally light. Across it run fine lurex stripes, metallic threads that reflect light with every movement. This fabric doesn’t wait to be noticed. It claims the light.",
    image:
      "https://i.ibb.co.com/1fy6nC5V/balck-stripe-fabric.jpg",
  },
];

export default function FabricStories() {
  const [expanded, setExpanded] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="px-4 md:px-12 py-24 bg-white">
      <div className="text-center mb-16">
        <p className="text-[20px] md:text-[26px] tracking-[0.45em] uppercase text-black">
          Material Narrative
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-20">
        {STORIES.map((story, index) => {
          const isExpanded = expanded === story.id;
          const isActive = activeImage === story.id;

          return (
            <div
              key={story.id}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                index % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div
                className="relative overflow-hidden group cursor-pointer"
                onClick={() =>
                  setActiveImage(isActive ? null : story.id)
                }
              >
                <div className="relative h-[500px] w-full">

                  {/* Fabric */}
                  <img
                    src={story.image}
                    alt={story.title}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      transition-all duration-700
                      group-hover:scale-105 group-hover:opacity-0
                      ${isActive ? "opacity-0 scale-105" : "opacity-100"}
                    `}
                  />

                  {/* Shirt */}
                  <img
                    src={story.shirtImage}
                    alt={story.shirt_name}
                    className={`
                      absolute inset-0 w-full h-full object-cover
                      transition-all duration-700
                      group-hover:opacity-100 group-hover:scale-100
                      ${
                        isActive
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-110"
                      }
                    `}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/15 transition duration-700" />

                  {/* Name only when shirt visible */}
                  <div
                    className={`
                      absolute bottom-6 left-6 right-6 text-white
                      transition-all duration-700
                      group-hover:opacity-100 group-hover:translate-y-0
                      ${
                        isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }
                    `}
                  >
                    <p className="text-[10px] tracking-[0.35em] uppercase mb-2 opacity-80">
                      Finished Piece
                    </p>

                    <h4 className="text-lg font-light tracking-[0.08em]">
                      {story.shirt_name}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-2xl md:text-3xl font-light mb-5 tracking-[0.03em] text-black">
                  {story.title}
                </h3>

                <p className="text-zinc-600 leading-8 text-sm md:text-base">
                  {isExpanded
                    ? story.excerpt
                    : `${story.excerpt.slice(0, 170)}...`}
                </p>

                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : story.id)
                  }
                  className="text-black mt-6 text-[11px] uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-70 transition"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}