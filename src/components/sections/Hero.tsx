"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

export default function Hero() {
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
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#080808]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 brand-grid-bg opacity-30" />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.42, 0.7, 0.42] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[12%] w-[46vw] h-[46vw] rounded-full bg-primary/18 blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-[4%] w-[34vw] h-[34vw] rounded-full bg-accent/18 blur-[130px] pointer-events-none"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center relative z-10 w-full">
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-neutral-900/45 text-xs font-semibold tracking-wider text-primary uppercase"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Creator partnerships engineered for growth
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="h-16 md:h-20 w-auto object-contain"
          >
            <Image
              src="/media/pk-logo-transparent.png"
              alt="PK Media"
              width={200}
              height={80}
              priority
              className="h-full w-auto object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.06] font-display"
          >
            Influencer Marketing That Builds Brands,{" "}
            <span className="teal-text-gradient relative inline-block">Not Just Campaigns.</span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#B8B8B8] text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            We connect ambitious brands with trusted creators to generate authentic partnerships, measurable business growth, and long-term ROI across Instagram, YouTube, LinkedIn, and emerging social platforms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, "#contact")}
              className="inline-flex items-center justify-center gap-1.5 px-8 py-4 rounded-full bg-accent hover:bg-[#d86518] text-black font-bold transition-all duration-300 shadow-[0_0_26px_rgba(244,124,32,0.3)] hover:shadow-[0_0_34px_rgba(244,124,32,0.44)] hover:-translate-y-0.5 group text-center"
            >
              Book a Discovery Call
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#services"
              onClick={(e) => handleScrollTo(e, "#services")}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary/40 hover:border-primary bg-neutral-900/30 hover:bg-primary/10 text-white font-medium transition-all duration-300 hover:-translate-y-0.5 text-center"
            >
              Explore Services
            </a>
          </motion.div>

          {/* Social Proof Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 pt-6 border-t border-primary/10"
          >
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              <span>500+ vetted creators</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Brand-safe creator network</span>
            </div>
            <div className="flex items-center gap-3 text-neutral-400">
              <span className="text-[11px] font-bold">IG</span>
              <span className="text-[11px] font-bold">YT</span>
              <span className="text-[11px] font-bold">in</span>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] w-full flex items-center justify-center">
          <div className="absolute w-80 h-80 rounded-full bg-primary/12 blur-[80px] pointer-events-none" />
          <div className="absolute inset-x-8 top-16 h-[420px] rounded-[2rem] border border-primary/10 bg-gradient-to-b from-primary/10 via-neutral-950/20 to-accent/10 rotate-[-4deg]" />

          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.2 },
              x: { duration: 0.8, delay: 0.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-8 left-0 sm:left-8 w-[240px] glass-panel p-4 rounded-2xl hover:border-primary/45 transition-colors duration-300 group z-20"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-neutral-700">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Sophia Chen"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Sophia Chen</h4>
                <p className="text-neutral-500 text-xs">@sophiastyle</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
              <div>
                <p className="text-neutral-500">Fashion & Travel</p>
                <p className="text-white font-medium">450K Followers</p>
              </div>
              <div className="bg-primary/10 px-2.5 py-1 rounded-full text-primary font-bold">
                4.8% ER
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, y: 100 }}
            animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.4 },
              x: { duration: 0.8, delay: 0.4 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            className="absolute top-44 right-0 sm:right-4 w-[260px] glass-panel p-4 rounded-2xl hover:border-primary/45 transition-colors duration-300 group z-10"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-neutral-700">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Marcus Vance"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Marcus Vance</h4>
                <p className="text-neutral-500 text-xs">@marcustech</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
              <div>
                <p className="text-neutral-500">Tech & Gadgets</p>
                <p className="text-white font-medium">1.2M Followers</p>
              </div>
              <div className="bg-primary/10 px-2.5 py-1 rounded-full text-primary font-bold">
                5.2% ER
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.6 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="absolute bottom-12 left-4 sm:left-14 w-[240px] glass-panel p-4 rounded-2xl hover:border-primary/45 transition-colors duration-300 group z-20"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-neutral-700">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
                  alt="Emma Rose"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold">Emma Rose</h4>
                <p className="text-neutral-500 text-xs">@emmarosefit</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between items-center text-xs">
              <div>
                <p className="text-neutral-500">Fitness & Health</p>
                <p className="text-white font-medium">850K Followers</p>
              </div>
              <div className="bg-primary/10 px-2.5 py-1 rounded-full text-primary font-bold">
                6.1% ER
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-4 right-6 w-[220px] rounded-2xl border border-accent/25 bg-[#101010]/80 p-4 shadow-[0_24px_70px_rgba(244,124,32,0.12)] backdrop-blur"
          >
            <p className="text-xs text-neutral-500 uppercase tracking-widest">Campaign Snapshot</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-2xl font-extrabold text-white">25M+</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Reach</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-white">4.8x</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">ROI</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
