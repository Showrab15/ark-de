import { Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SOCIALS = [
  { label: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
];

/**
 * Site footer with social links and launch notice.
 */
export default function Footer() {
  return (
    <footer className="bg-ark-surface border-t border-ark-border">
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-16 md:py-24 flex flex-col items-center text-center gap-8">
        {/* Brand */}
        <div>
          <p className="font-display text-3xl font-light tracking-widest3 text-ark-text mb-2">
            ARKADE
          </p>
          <p className="text-[10px] tracking-widest3 uppercase text-crimson">
            Refined Menswear
          </p>
        </div>

        <Separator className="w-px h-8 mx-auto" />

        {/* Social links */}
        <nav className="flex items-center gap-4" aria-label="Social media">
          {SOCIALS.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 border border-ark-border text-[10px] tracking-widest2 uppercase text-ark-text-dim hover:border-crimson hover:text-crimson transition-all duration-200"
            >
              <Icon size={13} />
              {label}
            </a>
          ))}
        </nav>

        {/* Launch notice */}
        <div className="px-6 py-3 border border-gold/30 text-[11px] tracking-widest text-gold">
          Full website launching soon — stay tuned
        </div>

        <Separator className="w-24" />

        <p className="text-[10px] tracking-widest text-ark-text-muted">
          © 2025 Arkade. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
