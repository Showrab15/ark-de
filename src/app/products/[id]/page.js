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
import CheckoutModal from "@/components/CheckoutModal"; // ← new
import Link from "next/link";

export default function ProductDetail({ onBack }) {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id == id);

  const messengerLink = "https://m.me/weararkade";
  const DELIVERY_CHARGE = 80;
  const MOBILE_BANK_NUMBER = "bKash: 017XX-XXX-XXX | Nagad: 018XX-XXX-XXX | Rocket: 016XX-XXX-XXX";

  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── All your original functions, untouched ──
  const resetOrderForm = () => {
    setCustomerName("");
    setPhone("");
    setAddress("");
    setSelectedSize("");
    setQuantity(1);
    setPaymentConfirmed(false);
    setFormError("");
    setOrderSubmitted(false);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !selectedSize) {
      setFormError("Please fill out all fields and select a size.");
      return;
    }
    if (!paymentConfirmed) {
      setFormError("Please confirm that advance delivery payment has been sent.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const orderData = {
        id: Date.now().toString(),
        productId: product.id,
        productName: product.name,
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        size: selectedSize,
        quantity,
        deliveryCharge: DELIVERY_CHARGE,
        status: "pending",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to submit order");

      setOrderSubmitted(true);
    } catch (error) {
      setFormError("Failed to submit order. Please try again.");
      console.error("Order submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsOrderOpen(false);
    setTimeout(() => resetOrderForm(), 200);
  };

  if (!product) {
    return (
      <main className="pb-10 px-4 md:px-8 min-h-svh pt-12 animate-fade-up">
        <p className="text-center text-red-500">Product not found.</p>
      </main>
    );
  }

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
        <ImageGallery images={product.imgs} productName={product.name} />

        <div className="flex flex-col justify-center px-2 md:px-6 lg:px-10 py-6">
          {product.badge && (
            <Badge className="w-fit mb-4 bg-black text-white rounded-sm px-3 py-1 text-[10px] tracking-[0.25em] uppercase">
              {product.badge}
            </Badge>
          )}

          <h1 className="text-4xl md:text-5xl font-light leading-tight text-black">
            {product.name}
          </h1>

          <p className="text-2xl font-medium mt-4 text-zinc-900">{product.price}</p>

          <Separator className="my-6" />

          <p className="text-sm text-zinc-600 leading-8 max-w-xl">{product.desc}</p>

          <div className="mt-8 space-y-3 text-sm text-zinc-700">
            <div className="flex items-center gap-2">
              <Truck size={16} /> Worldwide delivery available
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} /> Premium quality guaranteed
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col space-y-3">
            <a href={messengerLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full  px-8 h-12 rounded-none bg-black hover:bg-zinc-800 text-white tracking-[0.2em] uppercase">
                <MessageCircle size={18} className="mr-2" />
                Order via Messenger
              </Button>
            </a>

            <Button
              className="w-full md:w-auto px-8 h-12 rounded-none border border-zinc-900 bg-white text-zinc-900 hover:bg-zinc-100 tracking-[0.2em] uppercase"
              onClick={() => setIsOrderOpen(true)}
            >
              Buy Now
            </Button>

            <p className="text-xs text-zinc-500">
              Use Buy Now to place a quick order and follow the advance delivery payment instructions.
            </p>
          </div>

          {/* ── Checkout Modal ── */}
          <CheckoutModal
            open={isOrderOpen}
            onClose={closeModal}
            product={product}
            customerName={customerName} setCustomerName={setCustomerName}
            phone={phone} setPhone={setPhone}
            address={address} setAddress={setAddress}
            selectedSize={selectedSize} setSelectedSize={setSelectedSize}
            quantity={quantity} setQuantity={setQuantity}
            paymentConfirmed={paymentConfirmed} setPaymentConfirmed={setPaymentConfirmed}
            orderSubmitted={orderSubmitted}
            formError={formError}
            isSubmitting={isSubmitting}
            onSubmit={handleOrderSubmit}
            DELIVERY_CHARGE={DELIVERY_CHARGE}
            MOBILE_BANK_NUMBER={MOBILE_BANK_NUMBER}
          />

          <div className="mt-10">
            <SizeChart />
          </div>

          <div className="flex items-center gap-4 pt-8">
            <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500">Share</p>
            {[
              { label: "Instagram", href: "https://www.instagram.com/weararkade?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
              { label: "Facebook", href: "https://web.facebook.com/weararkade/" },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="text-[11px] uppercase text-zinc-600 hover:text-black transition">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}