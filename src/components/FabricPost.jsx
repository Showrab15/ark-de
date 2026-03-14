"use client";

import { useState } from "react";

const STORIES = [
  {
    id: 1,
    title: "The Language of Texture",
    excerpt:
      "Before it became something special, it was simply a piece of fabric. A quiet composition of sky blue and white, crossed with fine ink lines. Balanced like architecture, calm like early morning light. Nothing loud. Nothing excessive. Only restraint, proportion and character. We chose it because true elegance never tries too hard. Soon, it finds its form.",
    image:
    "https://i.ibb.co.com/DHp2xRZr/shite-stripe-fabric.jpg",
  },
  {
    id: 2,
    title: "When Fabric Finds Light",
    excerpt:
      "Every piece begins with a contrast. A deep black viscose canvas, fluid, smooth and naturally light. Across it run fine lurex stripes, metallic threads that reflect light with every movement. This fabric doesn’t wait to be noticed. It claims the light.",
    image:
      "https://i.ibb.co.com/1fy6nC5V/balck-stripe-fabric.jpg",
  },
];

export default function FabricStories() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section className="px-4 md:px-12 py-20">
      <div className="text-center mb-14">
       <p className="text-[18px] tracking-[0.35em] uppercase text-zinc-500 mb-2">
  Material Notes
</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-16">
        {STORIES.map((story, index) => {
          const isExpanded = expanded === story.id;

          return (
            <div
              key={story.id}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="overflow-hidden rounded-sm">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-[420px] object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-xl md:text-2xl font-medium mb-4 text-black">
                  {story.title}
                </h3>

                <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
                  {isExpanded
                    ? story.excerpt
                    : `${story.excerpt.slice(0, 160)}...`}
                </p>

                <button
                  onClick={() =>
                    setExpanded(isExpanded ? null : story.id)
                  }
                  className="mt-5 text-[11px] uppercase tracking-[0.25em] border-b border-black pb-1"
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