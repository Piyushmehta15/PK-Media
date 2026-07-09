"use client";

import { motion } from "framer-motion";
import { Award, Eye, Heart, BarChart3, Users2 } from "lucide-react";

const values = [
  {
    title: "Absolute Authenticity",
    description: "We match you with creators whose audience trust them implicitly. No fake followers, no artificial engagement.",
    icon: Heart,
    highlight: "100% Vetted",
  },
  {
    title: "Uncompromising ROI",
    description: "Every influencer relationship is assessed based on concrete conversions, customer acquisition cost, and revenue.",
    icon: BarChart3,
    highlight: "Data-Driven Decisions",
  },
  {
    title: "End-to-End Management",
    description: "From contract negotiations and briefs to shipping products and handling content approvals, we handle the grind.",
    icon: Award,
    highlight: "Zero Friction",
  },
  {
    title: "Granular Tracking",
    description: "Real-time tracking of referral codes, custom links, and pixel attributions to trace every dollar spent.",
    icon: Eye,
    highlight: "Full Transparency",
  },
  {
    title: "Long-Term Synergy",
    description: "We transform single campaigns into ongoing brand ambassador partnerships that compound results over time.",
    icon: Users2,
    highlight: "Ambassador Programs",
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-semibold tracking-wider text-accent uppercase">
              Who We Are
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
              We Scale Brands Through{" "}
              <span className="text-accent">Strategic Partnerships</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              At PK Media, we bridge the gap between creative authenticity and commercial success. We help startups, fast-growing D2C brands, and established enterprises establish profitable connections with creators who have highly engaged, loyal audiences.
            </p>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              We do not treat influencer marketing as a side-hustle or a simple guessing game. Our approach is entirely ROI-centric, combining rigorous data analysis with creative direction to secure partnerships that yield measurable business results.
            </p>

            <div className="pt-4 border-t border-neutral-900 flex gap-10">
              <div>
                <p className="text-3xl font-extrabold text-white font-display">95%</p>
                <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Client Retention</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white font-display">4.2x</p>
                <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">Average ROI</p>
              </div>
            </div>
          </div>

          {/* Right Core Focus Grid */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {values.map((val) => {
                const IconComponent = val.icon;
                return (
                  <motion.div
                    key={val.title}
                    variants={itemVariants}
                    className="p-6 rounded-2xl bg-neutral-900/30 border border-neutral-800 hover:border-neutral-700/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)] group flex flex-col md:flex-row gap-6 items-start"
                  >
                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-accent shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 flex-grow">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-white font-bold text-lg">{val.title}</h3>
                        <span className="text-[10px] text-accent font-semibold tracking-wider uppercase border border-accent/20 px-2.5 py-0.5 rounded-full bg-accent/5">
                          {val.highlight}
                        </span>
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
