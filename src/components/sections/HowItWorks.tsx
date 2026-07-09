"use client";

import { motion } from "framer-motion";
import { HelpCircle, CalendarRange, Users, Sparkles, LineChart, FastForward } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Brand Consultation",
    description: "We deep-dive into your business goals, target audience metrics, product advantages, past campaign bottlenecks, and budget to align on key KPIs.",
    icon: HelpCircle,
  },
  {
    step: "02",
    title: "Campaign Strategy",
    description: "Our strategists construct a custom campaign plan detailing creative concepts, platforms (Instagram, YT, LinkedIn), messaging guidelines, and formats.",
    icon: CalendarRange,
  },
  {
    step: "03",
    title: "Creator Selection",
    description: "We scan our vetted creator network using proprietary tools to identify influencers with optimal engagement rates, authentic followings, and perfect brand alignment.",
    icon: Users,
  },
  {
    step: "04",
    title: "Campaign Launch",
    description: "We manage contracts, ship products, distribute brief documentation, review drafts for compliance, and orchestrate the publishing schedule.",
    icon: Sparkles,
  },
  {
    step: "05",
    title: "Performance Tracking",
    description: "Through custom tracking links, pixel tracking, and promo code redemptions, we monitor real-time conversions, CPA, CTR, and overall sales volume.",
    icon: LineChart,
  },
  {
    step: "06",
    title: "Growth & Optimization",
    description: "We analyze campaign results, double down on high-performing creators, optimize under-performing content, and scale the top partnerships into ambassador relationships.",
    icon: FastForward,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#030303] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-semibold tracking-wider text-accent uppercase">
            Our Method
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
            The Process Behind the Results
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            We take a highly structured approach to campaign execution to ensure flawless launch, brand safety, and optimized commercial return.
          </p>
        </div>

        {/* Timeline Desktop Grid */}
        <div className="relative border-l border-neutral-800 md:border-l-0 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-12 before:absolute before:top-0 before:left-0 md:before:left-1/2 before:w-[1px] before:h-full before:bg-neutral-800/80 before:-translate-x-1/2">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.step}
                className={`relative pl-8 md:pl-0 md:grid md:grid-cols-12 items-center mb-12 md:mb-0 ${
                  isEven ? "md:text-right" : "md:text-left"
                }`}
              >
                {/* Timeline node dot */}
                <div className="absolute left-0 top-1.5 md:top-1/2 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background -translate-x-1/2 md:-translate-y-1/2 z-20 shadow-[0_0_10px_rgba(244,124,32,0.65)]" />

                {/* Content Card Wrapper */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`p-6 rounded-2xl bg-neutral-900/35 border border-neutral-800 hover:border-neutral-700/60 transition-colors duration-300 relative z-10 hover:shadow-[0_0_20px_rgba(255,255,255,0.01)] ${
                    isEven
                      ? "md:col-start-1 md:col-end-6"
                      : "md:col-start-7 md:col-end-12"
                  }`}
                >
                  <div
                    className={`flex items-center gap-4 mb-4 ${
                      isEven ? "md:flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-accent shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-accent font-extrabold tracking-widest block uppercase font-mono">
                        Step {step.step}
                      </span>
                      <h3 className="text-white font-bold text-lg">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
