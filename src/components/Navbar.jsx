"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "About Us", href: "/about" },
];

export default function Navbar({onNotifyClick}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, appUser, loading, logout, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 const handleLogout = async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <header
      className={` transition-all duration-300 ${
        scrolled ? "shadow-[0_2px_20px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 py-2.5 flex items-center justify-between">
        {/* Logo */}
       
        <Link href="/" className="flex items-center gap-2">
           
           <span className=" font-heading text-[26px] tracking-[0.2em] uppercase select-none hover:opacity-80 transition-opacity text-xl font-serif font-semibold text-[#831113]">
             ARKADE
           </span>
         </Link>
       
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-3">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`text-[14px] tracking-wider  transition-colors duration-200 relative group pb-0.5
                  ${
                    isActive
                      ? "text-[#030303] font-semibold"
                      : "text-[#3C3C3C] font-medium hover:text-[#111]"
                  }`}
              >
                {label}
                {/* Active underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#111] transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            );
          })}

           <Button 
                         onClick={handleLogout}

           variant="outline" size="sm" >
           Logout
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className=" md:hidden text-[#111] hover:text-[#555] transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-8 py-4 gap-4 border-t border-gray-100">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-[13px] tracking-wider font-medium transition-colors ${
                  isActive ? "text-[#111]" : "text-[#555] hover:text-[#111]"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {/* <Button
            asChild
            variant="outline"
            className="w-fit rounded-[4px]  border-[#3C3C3C] text-[#030303] bg-transparent hover:bg-[#030303] hover:text-white text-[12px] tracking-widest px-3 py-1.5 h-auto transition-all duration-200"
          >
            <Link href="/sign-in">Notify Me</Link>
          </Button> */}
        </nav>
      </div>
    </header>
  );
}