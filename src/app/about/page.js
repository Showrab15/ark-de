import React from "react";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white px-6 md:px-20 py-24">
      {/* Headline */}
      <h1 className="text-5xl md:text-6xl font-thin text-gray-900 tracking-widest mb-8 text-center">
        ARKADE
      </h1>

      {/* Tagline / Premium statement */}
      <p className="text-lg md:text-2xl text-gray-700 text-center max-w-3xl mb-16">
        Crafted for presence. Defined by precision. Inspired by timeless style.  
        Every piece is designed to elevate your wardrobe, your moments, and your presence.
      </p>

      {/* Core Message / Brand philosophy */}
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          We believe in understated sophistication. From everyday essentials to statement pieces, ARKADE honors the art of modern masculinity.
        </p>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">
          Our creations combine refined tailoring, premium fabrics, and meticulous craftsmanship — for men who value presence, confidence, and effortless elegance.
        </p>
      </div>

      {/* Optional signature or hashtag */}
      <p className="mt-16 text-gray-400 text-sm tracking-widest uppercase">
        #WearARKADE
      </p>
    </main>
  );
}