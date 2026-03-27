/* eslint-disable react-hooks/static-components */
"use client";
import { useState } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const BKASH_NUMBER = "01XXXXXXXXXX"; // 🔴 Replace with your actual number
const DELIVERY_ADVANCE = 100; // BDT

export default function CheckoutModal({ product, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", address: "", trxId: "" });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (form.phone.trim().length < 10) e.phone = "Please enter a valid phone number";
    if (!form.address.trim()) e.address = "Please enter your delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.trxId.trim()) e.trxId = "Please enter your transaction ID";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const copyNumber = async () => {
    await navigator.clipboard.writeText(BKASH_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const StepDot = ({ n }) => {
    const done = n < step;
    const active = n === step;
    return (
      <div className={` rounded-full flex items-center justify-center text-xs font-medium border transition-all
        ${done ? "bg-green-700 text-white border-green-700" :
          active ? "bg-black text-white border-black" :
          "bg-zinc-100 text-zinc-400 border-zinc-200"}`}>
        {done ? <Check size={13} /> : n}
      </div>
    );
  };

  const StepLine = ({ done }) => (
    <div className={`flex-1 h-px transition-all ${done ? "bg-green-700" : "bg-zinc-200"}`} />
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
         onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white w-full max-w-xl rounded-none shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <p className="text-sm font-medium tracking-[0.12em] uppercase">
            {step === 3 ? "Order Confirmed" : "Place Your Order"}
          </p>
          <button onClick={onClose} className="text-zinc-400 hover:text-black transition">
            <X size={18} />
          </button>
        </div>

        {/* Step bar */}
        <div className="flex items-center gap-0 px-6 pb-5">
          <StepDot n={1} />
          <StepLine done={step > 1} />
          <StepDot n={2} />
          <StepLine done={step > 2} />
          <StepDot n={3} />
        </div>

        <div className="px-6 pb-8">

          {/* STEP 1 — Customer info */}
          {step === 1 && (
            <>
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-4">Your details</p>

              {/* Product summary */}
              <div className="flex items-center gap-3 p-3 border border-zinc-100 mb-5">
                <div className="w-10 h-10 bg-zinc-100 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-zinc-500">{product.price}</p>
                </div>
              </div>

              {[
                { key: "name", label: "Full name", type: "text", placeholder: "e.g. Rahim Uddin" },
                { key: "phone", label: "Phone number", type: "tel", placeholder: "01XXXXXXXXX" },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="mb-4 grid  grid-cols-2">
                  <label className="block text-xs text-zinc-500 mb-1.5">{label}</label>
                  <input type={type} value={form[key]} onChange={e => set(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-black transition" />
                  {errors[key] && <p className="text-xs text-red-500 mt-1">{errors[key]}</p>}
                </div>
              ))}

              <div className="mb-5">
                <label className="block text-xs text-zinc-500 mb-1.5">Delivery address</label>
                <textarea value={form.address} onChange={e => set("address", e.target.value)}
                  placeholder="House no, road, area, city..."
                  className="w-full border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-black transition h-20 resize-none" />
                {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
              </div>

              <Button onClick={() => validateStep1() && setStep(2)}
                className="w-full h-11 rounded-none bg-black hover:bg-zinc-800 text-white tracking-[0.15em] uppercase text-xs">
                Continue to Payment
              </Button>
            </>
          )}

          {/* STEP 2 — Payment */}
          {step === 2 && (
            <>
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 mb-4">Advance delivery charge</p>

              <div className="flex items-center justify-between bg-zinc-50 px-4 py-3 mb-5">
                <div>
                  <p className="text-xs text-zinc-500">Advance delivery charge</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5">Remaining amount on delivery</p>
                </div>
                <p className="text-base font-medium">BDT {DELIVERY_ADVANCE}</p>
              </div>

              {/* Payment box */}
              <div className="border border-zinc-100 p-5 text-center mb-4">
                <p className="text-[10px] tracking-[0.18em] uppercase text-zinc-400 mb-4">Send to (bKash / Nagad)</p>

                {/* QR code placeholder — replace with your real QR image */}
                <div className="w-28 h-28 mx-auto mb-3 bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-400">
                  QR CODE
                  {/* Replace with: <img src="/qr-bkash.png" alt="bKash QR" className="w-full h-full object-contain" /> */}
                </div>

                <p className="text-lg font-medium tracking-wider">{BKASH_NUMBER}</p>
                <p className="text-xs text-zinc-400 mt-0.5">bKash / Nagad (Personal)</p>
                <button onClick={copyNumber}
                  className="mt-2 text-[11px] border border-zinc-200 px-3 py-1 rounded-full hover:bg-zinc-50 transition text-zinc-500">
                  {copied ? "Copied!" : "Copy number"}
                </button>
              </div>

              <div className="bg-zinc-50 px-3 py-2.5 text-xs text-zinc-500 leading-relaxed mb-4">
                Send <strong className="text-zinc-700">BDT {DELIVERY_ADVANCE}</strong> advance via bKash or Nagad to the number above. After payment, enter your transaction ID (TrxID) below to confirm your order.
              </div>

              <div className="mb-5">
                <label className="block text-xs text-zinc-500 mb-1.5">Transaction ID (TrxID)</label>
                <input type="text" value={form.trxId} onChange={e => set("trxId", e.target.value)}
                  placeholder="e.g. 8K3ABCDE12"
                  className="w-full border border-zinc-200 px-3 py-2.5 text-sm outline-none focus:border-black transition font-mono tracking-wider" />
                {errors.trxId && <p className="text-xs text-red-500 mt-1">{errors.trxId}</p>}
              </div>

              <Button onClick={() => validateStep2() && setStep(3)}
                className="w-full h-11 rounded-none bg-black hover:bg-zinc-800 text-white tracking-[0.15em] uppercase text-xs">
                Confirm Order
              </Button>
              <button onClick={() => setStep(1)}
                className="w-full mt-2 h-10 text-xs text-zinc-500 hover:text-black border border-zinc-200 hover:border-zinc-400 transition">
                Back
              </button>
            </>
          )}

          {/* STEP 3 — Confirmation */}
          {step === 3 && (
            <>
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <Check className="text-green-700" size={26} />
              </div>
              <p className="text-center text-lg font-medium mb-2">Thank you for your order!</p>
              <p className="text-center text-xs text-zinc-500 leading-relaxed mb-6">
                We will call you within <strong className="text-zinc-700">12 hours</strong> on your number to confirm your order and delivery details.
              </p>

              <div className="border border-zinc-100 divide-y divide-zinc-100 mb-6">
                {[
                  { k: "Name", v: form.name },
                  { k: "Phone", v: form.phone },
                  { k: "Address", v: form.address },
                  { k: "TrxID", v: form.trxId, mono: true },
                  { k: "Advance paid", v: `BDT ${DELIVERY_ADVANCE}`, green: true },
                ].map(({ k, v, mono, green }) => (
                  <div key={k} className="flex justify-between items-start px-4 py-2.5 text-xs">
                    <span className="text-zinc-400">{k}</span>
                    <span className={`text-right max-w-[200px] font-medium ${mono ? "font-mono" : ""} ${green ? "text-green-700" : "text-zinc-700"}`}>{v}</span>
                  </div>
                ))}
              </div>

              <p className="text-center text-[11px] text-zinc-400">Keep your TrxID for reference.</p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}