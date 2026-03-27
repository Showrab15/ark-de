import Image from "next/image";
import React from "react";

export const metadata = {
  title: "About",
  description:
    "About Arkade: a premium menswear brand offering modern clothing designed with refined craftsmanship, quality fabrics, and timeless style.",
};

export default function AboutUsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-12">
       

        <h1 className="text-3xl font-bold text-[#831113] mb-4">About Arkade</h1>

      
      </div>

      <div className="space-y-10 text-gray-700 leading-relaxed">
        {/* Brand Story */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#831113]">
            Our Brand Story
          </h2>

          <p className="mb-4">
            At Arkade, we believe clothing is more than fabric — it is an
            expression of identity. Our collections are designed for individuals
            who appreciate simplicity, elegance, and attention to detail.
            Every piece reflects our commitment to quality and modern style.
          </p>

          <p>
            Inspired by contemporary fashion and timeless tailoring,
            Arkade focuses on creating versatile menswear that transitions
            effortlessly from everyday life to refined occasions.
          </p>
        </section>

        {/* Craftsmanship */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#831113]">
            Craftsmanship & Quality
          </h2>

          <p className="mb-4">
            From perfectly structured pants to elevated essentials, every garment
            is crafted to offer comfort, confidence, and sophistication.
          </p>

          <p>
            We carefully select fabrics and refine every detail to ensure that
            our products meet the expectations of men who value both style and
            durability.
          </p>
        </section>

        {/* Vision */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#831113]">
            Our Vision
          </h2>

          <p>
            Arkade exists for those who move with purpose — men who appreciate
            thoughtful design, refined aesthetics, and clothing that enhances
            their presence.
          </p>
        </section>

        {/* Signature line */}
        <section className="text-center pt-6">
          <p className="text-sm tracking-[0.35em] uppercase text-zinc-500">
            For the few
          </p>
        </section>
      </div>
    </main>
  );
}