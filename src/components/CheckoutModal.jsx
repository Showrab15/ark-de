"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Package } from "lucide-react";

const SIZES = ["S", "M", "L", "XL", "XXL"];

export default function CheckoutModal({
  open,
  onClose,
  product,
  // form state
  customerName,
  setCustomerName,
  phone,
  setPhone,
  address,
  setAddress,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  paymentConfirmed,
  setPaymentConfirmed,
  orderSubmitted,
  formError,
  isSubmitting,
  onSubmit,
  DELIVERY_CHARGE,
  MOBILE_BANK_NUMBER,
}) {
  return (
    <Dialog
      className="w-3xl"
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent className="p-0 gap-0 max-w-xl rounded-none max-h-[72vh] overflow-y-auto">
        {/* Header */}
        <DialogClose className="bg-red-500 absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
  ✕
</DialogClose>
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-zinc-100 sticky top-0 bg-white z-10">
          <DialogTitle className="text-sm  font-medium tracking-[0.15em]  uppercase text-zinc-900">
            {orderSubmitted ? "Order Confirmed" : "Place Your Order"}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400 mt-0.5">
            {orderSubmitted
              ? "We will call you within 12 hours to confirm."
              : "Fill in your details and confirm advance payment."}
          </DialogDescription>
        </DialogHeader>

        <div className="px-5 py-5">
          {/* ── CONFIRMATION STATE ── */}
          {orderSubmitted ? (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center">
                <Check size={26} className="text-zinc-900" />
              </div>

              <div>
                <p className="text-base font-medium text-zinc-900 mb-1">
                  Thank you for your order!
                </p>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">
                  We will call you on{" "}
                  <span className="text-zinc-800 font-medium">{phone}</span>{" "}
                  within{" "}
                  <span className="text-zinc-800 font-medium">12 hours</span> to
                  confirm your delivery.
                </p>
              </div>

              {/* Summary card */}
              <div className="w-full border border-zinc-100 divide-y divide-zinc-100 text-left mt-2">
                {[
                  { k: "Product", v: product?.name },
                  { k: "Name", v: customerName },
                  { k: "Phone", v: phone },
                  { k: "Address", v: address },
                  { k: "Size", v: selectedSize },
                  { k: "Quantity", v: quantity },
                  { k: "Advance paid", v: `Tk ${DELIVERY_CHARGE}` },
                ].map(({ k, v }) => (
                  <div
                    key={k}
                    className="flex justify-between items-start px-4 py-2.5 text-xs"
                  >
                    <span className="text-zinc-400 flex-shrink-0 mr-4">
                      {k}
                    </span>
                    <span className="text-zinc-800 font-medium text-right">
                      {v}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full h-11 rounded-none bg-black hover:bg-zinc-800 text-white tracking-[0.15em] uppercase text-xs"
                onClick={onClose}
              >
                Done
              </Button>
            </div>
          ) : (
            /* ── ORDER FORM ── */
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              {/* Product pill */}
              <div className="flex items-center gap-3 p-3 border border-zinc-100 bg-zinc-50">
                {product?.imgs?.[0] ? (
                  <img
                    src={product.imgs[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 bg-zinc-200 flex items-center justify-center flex-shrink-0">
                    <Package size={16} className="text-zinc-400" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900 truncate">
                    {product?.name}
                  </p>
                  <p className="text-xs text-zinc-400">{product?.price}</p>
                </div>
              </div>

              {/* Name */}
              <div className="flex gap-4 ">
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="customerName"
                    className="text-xs  text-zinc-500 uppercase tracking-[0.1em]"
                  >
                    Full name
                  </Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahim Uddin"
                    className="rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-800 h-10 text-sm"
                  />
                </div>
                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="phone"
                    className="text-xs text-zinc-500 uppercase tracking-[0.1em]"
                  >
                    Phone number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="rounded-none border-zinc-200 focus-visible:ring-0 focus-visible:border-zinc-800 h-10 text-sm"
                  />
                </div>{" "}
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <Label
                  htmlFor="address"
                  className="text-xs text-zinc-500 uppercase tracking-[0.1em]"
                >
                  Delivery address
                </Label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House no, road, area, city..."
                  rows={3}
                  className="w-full border border-zinc-200 focus:border-zinc-800 focus:outline-none px-3 py-2.5 text-sm resize-none transition-colors"
                />
              </div>

            <div className="flex items-center gap-4">
                  {/* Size */}
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-zinc-500 uppercase tracking-[0.1em]">
                  Size
                </Label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white border-black"
                          : "bg-white text-zinc-700 border-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-2">
                <Label className="text-xs text-zinc-500 uppercase tracking-[0.1em]">
                  Quantity
                </Label>
                <div className="flex items-center gap-0 w-fit border border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors text-base"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm font-medium border-x border-zinc-200 h-9 flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 transition-colors text-base"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
              {/* Payment info */}
              <div className="border border-zinc-200 bg-zinc-50 p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-zinc-700 uppercase tracking-[0.1em]">
                    Advance Delivery Payment
                  </p>
                  <p className="text-sm font-semibold text-zinc-900">
                    Tk {DELIVERY_CHARGE}
                  </p>
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed">
                  {MOBILE_BANK_NUMBER}
                </p>

                {/* QR */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <img
                    src="/qr-code.jpeg"
                    alt="QR code"
                    className="h-20 w-20 object-contain border border-zinc-200 bg-white p-1 flex-shrink-0"
                  />
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Send{" "}
                    <span className="text-zinc-700 font-medium">
                      Tk {DELIVERY_CHARGE}
                    </span>{" "}
                    advance to any of the numbers above, then confirm below.
                    Remaining amount is paid on delivery.
                  </p>
                </div>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={paymentConfirmed}
                  onChange={(e) => setPaymentConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 border-zinc-300 accent-black cursor-pointer"
                />
                <span className="text-xs text-zinc-600 leading-relaxed group-hover:text-zinc-900 transition-colors">
                  I have sent the advance delivery payment of{" "}
                  <span className="font-medium text-zinc-900">
                    Tk {DELIVERY_CHARGE}
                  </span>
                  .
                </span>
              </label>

              {/* Error */}
              {formError && (
                <p className="text-xs text-red-500 -mt-2">{formError}</p>
              )}

              {/* Footer buttons */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-none bg-black hover:bg-zinc-800 text-white tracking-[0.15em] uppercase text-xs order-1"
              >
                {isSubmitting ? "Submitting..." : "Confirm Order"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="w-full h-11 rounded-none border-zinc-300 text-zinc-600 hover:bg-zinc-50 tracking-[0.15em] uppercase text-xs order-2"
              >
                Cancel
              </Button>
              
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
