import { Instagram, Facebook } from "lucide-react";

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/weararkade?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { label: "Facebook", icon: Facebook, href: "https://web.facebook.com/weararkade/" },
];

export default function Footer() {
  return (
    <footer className="text-black border-t mt-6 py-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Brand */}
        <span className=" font-heading text-[26px] tracking-[0.2em] uppercase select-none hover:opacity-80 transition-opacity text-xl font-serif font-semibold text-[#831113]">
          ARKADE
        </span>
        <p className="text-xs uppercase text-crimson tracking-widest">
          FOr The Few        </p>

        {/* Social links */}
        <div className="flex gap-4 mt-4">
          {SOCIALS.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-ark-text-dim hover:text-crimson transition"
            >
              <Icon size={14} />
              {label}
            </a>
          ))}
        </div>

        {/* Launch notice */}
        <p className="mt-4 text-[11px] text-gold/80 tracking-widest">
          Full website launching soon — stay tuned
        </p>

        {/* Copyright */}
        <p className="mt-2 text-[10px] text-ark-text-muted">
          © 2026 Arkade. All rights reserved.
        </p>
      </div>
    </footer>
  );
}