"use client";

import { useState } from "react";
import { ArrowLeft, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { PRODUCTS } from "@/data/product";
import ImageGallery from "@/components/ImageGallery";
import SizeChart from "@/components/SizeChart";
import Link from "next/link";

export default function ProductDetail({ onBack }) {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id == id);

  const messengerLink =
    "https://m.me/weararkade"; // replace with your messenger link

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
        quantity: quantity,
        deliveryCharge: DELIVERY_CHARGE,
        status: "pending",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

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
    setTimeout(() => {
      resetOrderForm();
    }, 200);
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
              Worldwide delivery available
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              Premium quality guaranteed
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 space-y-3">
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

          <Dialog
            open={isOrderOpen}
            onOpenChange={(open) => {
              if (!open) closeModal();
              else setIsOrderOpen(true);
            }}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-lg">
                  Order: {product.name}
                </DialogTitle>
                <DialogDescription>
                  Please complete details, send delivery advance, and confirm.
                </DialogDescription>
              </DialogHeader>

              {orderSubmitted ? (
                <div className="space-y-4">
                  <p className="text-green-700 text-sm font-medium">
                    Thanks for your order. We will confirm your order within 12 hours by phone call.
                  </p>
                  <p className="text-sm text-zinc-700">
                    Order summary:
                  </p>
                  <ul className="list-disc pl-5 text-sm text-zinc-600">
                    <li>Name: {customerName}</li>
                    <li>Phone: {phone}</li>
                    <li>Address: {address}</li>
                    <li>Size: {selectedSize}</li>
                    <li>Quantity: {quantity}</li>
                    <li>Advance delivery charge: Tk {DELIVERY_CHARGE}</li>
                  </ul>
                  <Button
                    className="w-full mt-2 bg-black text-white"
                    onClick={closeModal}
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleOrderSubmit}>
                  <div>
                    <Label htmlFor="customerName">Full name</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      type="tel"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Delivery address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, city, area"
                      required
                    />
                  </div>

                  <div>
                    <Label>Size</Label>
                    <div className="flex gap-2 mt-2">
                      {["M", "L", "XL", "XXL"].map((size) => (
                        <Button
                          key={size}
                          type="button"
                          variant={selectedSize === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 ${
                            selectedSize === size
                              ? "bg-black text-white"
                              : "border-zinc-300 text-zinc-700 hover:bg-zinc-50"
                          }`}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2"
                      >
                        -
                      </Button>
                      <span className="px-4 py-2 border border-zinc-300 rounded text-center min-w-[50px]">
                        {quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-700">
                    <p className="font-medium mb-1">Advance delivery payment</p>
                    <p className="text-zinc-900">Delivery charge: Tk {DELIVERY_CHARGE}</p>
                    <p>{MOBILE_BANK_NUMBER}</p>
                    <div className="mt-3 flex flex-col items-start gap-2">
                      <img
                        src="/arkade-logo-removebg-preview.png"
                        alt="QR code placeholder"
                        className="h-24 w-24 rounded-md border border-zinc-300 object-cover"
                      />
                      <p className="text-xs text-zinc-500">
                        Scan this QR code after paying to any of above mobile banking options.
                      </p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={paymentConfirmed}
                      onChange={(e) => setPaymentConfirmed(e.target.checked)}
                      className="h-4 w-4 rounded border-zinc-300 text-black"
                      required
                    />
                    I have sent the advance delivery payment.
                  </label>

                  {formError && (
                    <p className="text-xs text-destructive">{formError}</p>
                  )}

                  <DialogFooter>
                    <Button type="submit" className="w-full bg-black text-white" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Confirm Order"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={closeModal}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </DialogContent>
          </Dialog>

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
              { label: "Instagram", href: "https://www.instagram.com/weararkade?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
              { label: "Facebook", href: "https://web.facebook.com/weararkade/" },
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