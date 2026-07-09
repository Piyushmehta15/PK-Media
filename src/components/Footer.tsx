"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(id);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-border-dark pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 brand-grid-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand block */}
          <div className="space-y-6">
            <Link href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="inline-flex items-center group">
              <div className="relative flex items-center justify-center h-14 w-36 overflow-hidden">
                <Image
                  src="/media/pk-logo-transparent.png"
                  alt="PK Media"
                  width={160}
                  height={64}
                  className="h-full w-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Helping brands grow through authentic creator partnerships, UGC campaigns, and measurable ROI.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary/15 flex items-center justify-center text-neutral-400 hover:text-accent hover:border-accent transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,124,32,0.3)] bg-neutral-900/50"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">IG</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary/15 flex items-center justify-center text-neutral-400 hover:text-accent hover:border-accent transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,124,32,0.3)] bg-neutral-900/50"
                aria-label="YouTube"
              >
                <span className="text-xs font-bold">YT</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary/15 flex items-center justify-center text-neutral-400 hover:text-accent hover:border-accent transition-all duration-300 hover:shadow-[0_0_15px_rgba(244,124,32,0.3)] bg-neutral-900/50"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">in</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 lg:pl-8">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "#home" },
                { name: "About Us", href: "#about" },
                { name: "How It Works", href: "#how-it-works" },
                { name: "Industries", href: "#industries" },
                { name: "Case Studies", href: "#case-studies" },
                { name: "FAQ", href: "#faq" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-neutral-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Our Services</h4>
            <ul className="space-y-3">
              {[
                "Influencer Discovery",
                "Campaign Strategy",
              "Creator Outreach",
              "Influencer Negotiation",
              "Campaign Management",
              "UGC Campaigns",
              "Performance Analytics",
              "Brand Collaborations",
              ].map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "#services")}
                    className="text-neutral-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">Email Us</p>
                  <a href="mailto:hello@pkmedia.agency" className="text-neutral-300 hover:text-accent transition-colors text-sm font-medium">
                    hello@pkmedia.agency
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">Call Us</p>
                  <a href="tel:+18005550199" className="text-neutral-300 hover:text-accent transition-colors text-sm font-medium">
                    +1 (800) 555-0199
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 text-accent mt-0.5 shrink-0 text-sm font-bold">in</span>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest">LinkedIn</p>
                  <a href="https://linkedin.com" className="text-neutral-300 hover:text-accent transition-colors text-sm font-medium">
                    PK Media
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-xs">
            © {new Date().getFullYear()} PK Media. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#privacy" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
