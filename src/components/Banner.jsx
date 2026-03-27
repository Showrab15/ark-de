"use client";

import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-70 bg-gradient-to-br from-black via-transparent to-[#831113]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <p className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-white/80">
              New arrival
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight">
                Modern menswear made for the few who move with confidence.
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-gray-200 leading-relaxed">
                Discover Arkade's premium essentials, thoughtfully crafted for everyday refinement.
                Shop tailored fits, luxury fabrics, and statement staples built to last.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link
                href="/products/1"
                className="inline-flex items-center justify-center rounded-full bg-[#831113] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9a1f1f]"
              >
                Shop Moonlight Noir
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/5 p-4 text-center">
                <p className="text-2xl font-semibold">Premium Fabric</p>
                <p className="mt-2 text-sm text-gray-300">Soft, durable, and breathable.</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 text-center">
                <p className="text-2xl font-semibold">Limited Drops</p>
                <p className="mt-2 text-sm text-gray-300">Exclusive designs, ready now.</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4 text-center">
                <p className="text-2xl font-semibold">Free Shipping</p>
                <p className="mt-2 text-sm text-gray-300">On orders over $100.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-white/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/20">
              <Image
                src="/banner1.jpg"
                alt="Arkade fashion collection"
                width={960}
                height={800}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
