"use client";

import { useState } from "react";
import { ArrowLeft, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/data/product";
import ImageGallery from "@/components/ImageGallery";
import SizeChart from "@/components/SizeChart";
import Link from "next/link";

export default function ProductDetail({ onBack }) {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id == id);

  const messengerLink =
    "https://m.me/weararkade"; // replace with your messenger link

  return (
    <main className="pb-10 px-4 md:px-8 min-h-svh pt-12 animate-fade-up">
      {/* Back */}
      <div className="py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="flex items-center gap-2 pl-0 text-zinc-600 hover:text-black"
        >
         <Link href="/" className="flex items-center gap-2">
          <ArrowLeft size={14} />
          Back to Collections
         </Link>
        </Button>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[calc(100svh-120px)]">

        {/* Left */}
        <ImageGallery images={product.imgs} productName={product.name} />

        {/* Right */}
        <div className="flex flex-col justify-center px-2 md:px-6 lg:px-10 py-6">

          {/* Badge */}
          {product.badge && (
            <Badge className="w-fit mb-4 bg-black text-white rounded-sm px-3 py-1 text-[10px] tracking-[0.25em] uppercase">
              {product.badge}
            </Badge>
          )}

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-light leading-tight text-black">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-2xl font-medium mt-4 text-zinc-900">
            {product.price}
          </p>

          <Separator className="my-6" />

          {/* Description */}
          <p className="text-sm text-zinc-600 leading-8 max-w-xl">
            {product.desc}
          </p>

          {/* Trust Info */}
          <div className="mt-8 space-y-3 text-sm text-zinc-700">
            <div className="flex items-center gap-2">
              <Truck size={16} />
              Nationwide delivery available
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              Premium quality guaranteed
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <a
              href={messengerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full md:w-auto px-8 h-12 rounded-none bg-black hover:bg-zinc-800 text-white tracking-[0.2em] uppercase">
                <MessageCircle size={18} className="mr-2" />
                Order via Messenger
              </Button>
            </a>

            <p className="text-xs text-zinc-500 mt-3">
              Message us to confirm stock, delivery and order details.
            </p>
          </div>

          {/* Size chart */}
          <div className="mt-10">
            <SizeChart />
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 pt-8">
            <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500">
              Share
            </p>

            {[
              { label: "Instagram", href: "https://instagram.com" },
              { label: "Facebook", href: "https://facebook.com" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] uppercase text-zinc-600 hover:text-black transition"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}