import Image from "next/image";
import React from "react";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white px-6 md:px-24 py-20">

      {/* Header */}
      <div className="text-center mb-14">
        <div className="flex justify-center mb-6">
          <Image
            src="/arkade-logo-removebg-preview.png"
            alt="Arkade"
            width={120}
            height={80}
            className="object-contain"
          />
        </div>

        

        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Arkade is a modern menswear brand built on precision, confidence,
          and timeless design. We create clothing that blends contemporary
          style with refined craftsmanship for the modern man.
        </p>
      </div>

      {/* Brand Story */}
      <section className="max-w-4xl mx-auto space-y-8 text-gray-600 text-base md:text-lg leading-relaxed">

        <p>
          At Arkade, we believe clothing is more than fabric — it is an
          expression of identity. Our collections are designed for individuals
          who appreciate simplicity, elegance, and attention to detail.
          Every piece reflects our commitment to quality and modern style.
        </p>

        <p>
          Inspired by contemporary fashion and timeless tailoring,
          Arkade focuses on creating versatile menswear that transitions
          effortlessly from everyday life to refined occasions. From
          perfectly structured pants to elevated essentials, every garment
          is crafted to offer comfort, confidence, and sophistication.
        </p>

        <p>
          We carefully select fabrics and refine every detail to ensure that
          our products meet the expectations of men who value both style and
          durability. Our goal is to deliver clothing that feels effortless
          yet distinctive.
        </p>

      </section>

      {/* Vision */}
      <section className="max-w-3xl mx-auto text-center mt-16">
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          Arkade exists for those who move with purpose — men who appreciate
          thoughtful design, refined aesthetics, and clothing that enhances
          their presence.
        </p>

        <p className="mt-10 text-sm tracking-[0.35em] uppercase text-zinc-500">
        For the few
        </p>
      </section>

    </main>
  );
}