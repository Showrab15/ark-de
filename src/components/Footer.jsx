"use client";

import { Instagram, Facebook, Mail, Send } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import NewsLetter from "./NewsLetter";

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/weararkade?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { label: "Facebook", icon: Facebook, href: "https://web.facebook.com/weararkade/" },
];

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

const CUSTOMER_SERVICE = [
  { label: "Refund Guidelines", href: "/refund-guidelines" },
  { label: "Community Guidelines", href: "/community-guidelines" },
  { label: "Size Chart", href: "/size-chart" },
  { label: "Track Order", href: "/track-order" },
];

export default function Footer() {
  
  return (
    <footer className="bg-  text-black mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Newsletter Section */}
       
<NewsLetter/>
        {/* Main Footer Content */}
        <div className="text-black grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <span className="font-heading text-3xl tracking-[0.2em] uppercase select-none hover:opacity-80 transition-opacity text-[#831113]">
                ARKADE
              </span>
              <p className="text-sm uppercase  tracking-widest mt-2">
                For The Few
              </p>
            </div>
            <p className=" text-sm leading-relaxed mb-6">
              Premium fashion for the discerning individual. Quality craftsmanship meets contemporary design.
            </p>
            <div className="flex gap-4">
              {SOCIALS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-1  rounded-full transition-colors"
                >
                  <Icon size={18} className="" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#831113]">Quick Links</h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className=" hover:text-[#831113] transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#831113]">Customer Service</h4>
            <ul className="space-y-3">
              {CUSTOMER_SERVICE.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className=" hover:text-[#831113] transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#831113]">Contact Us</h4>
            <div className="space-y-3 text-sm ">
              <p>
                <span className="block font-medium text-[#831113]">Email</span>
               weararkade@gmail.com
              </p>
              <p>
                <span className="block font-medium text-[#831113]">Phone</span>
                +880 1631-156903
              </p>
              <p>
                <span className="block font-medium text-[#831113]">Hours</span>
                Mon-Fri: 9AM - 6PM EST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className=" text-sm">
              © 2026 Arkade. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy-policy" className="hover:text-[#831113] transition-colors">
                Privacy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-[#831113] transition-colors">
                Terms
              </Link>
              <Link href="/admin" className="hover:text-[#831113] transition-colors text-xs">
                Admin
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}