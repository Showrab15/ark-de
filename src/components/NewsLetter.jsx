import React, { useState } from "react";
import { Instagram, Facebook, Mail, Send } from "lucide-react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Successfully subscribed to our newsletter!");
        setEmail("");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        setMessage(data.error || "Failed to subscribe. Please try again.");

        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" border-gray-800 pb-12">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-semibold mb-4 text-[#831113]">
          Stay Updated
        </h3>
        <p className="mb-6 md:text-nowrap">
          Subscribe to our newsletter for exclusive updates, new arrivals, and
          special offers.
        </p>

        <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-4 w-4" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3  border border-gray-700 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:border-[#831113] focus:ring-1 focus:ring-[#831113]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#831113] hover:bg-[#6a0f0f] text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              "Subscribing..."
            ) : (
              <>
                <Send className="h-4 w-4" />
                Subscribe
              </>
            )}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm ${message.includes("Successfully") ? "text-green-400" : "text-red-400"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
