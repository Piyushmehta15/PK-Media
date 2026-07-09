"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Smartphone,
  ShoppingBag,
  Gem,
  Dumbbell,
  Gamepad2,
  Utensils,
  Plane,
  HeartPulse,
  TrendingUp,
  GraduationCap,
  Building2,
} from "lucide-react";

const industries = [
  { name: "Fashion & Apparel", icon: Sparkles, color: "from-purple-500/10 to-indigo-500/10", tag: "D2C" },
  { name: "Beauty & Cosmetics", icon: HeartPulse, color: "from-pink-500/10 to-rose-500/10", tag: "Growth" },
  { name: "Technology & Gadgets", icon: Smartphone, color: "from-cyan-500/10 to-blue-500/10", tag: "B2C / B2B" },
  { name: "E-commerce & D2C", icon: ShoppingBag, color: "from-amber-500/10 to-orange-500/10", tag: "ROI" },
  { name: "Luxury Brands", icon: Gem, color: "from-yellow-600/10 to-amber-600/10", tag: "Premium" },
  { name: "Fitness & Wellness", icon: Dumbbell, color: "from-emerald-500/10 to-teal-500/10", tag: "Lifestyle" },
  { name: "Gaming & Esports", icon: Gamepad2, color: "from-red-500/10 to-violet-500/10", tag: "Engagement" },
  { name: "Food & Culinary", icon: Utensils, color: "from-orange-500/10 to-red-500/10", tag: "Visual" },
  { name: "Travel & Hospitality", icon: Plane, color: "from-sky-500/10 to-blue-500/10", tag: "Adventure" },
  { name: "Finance & Fintech", icon: TrendingUp, color: "from-green-500/10 to-emerald-500/10", tag: "Trust" },
  { name: "Education & EdTech", icon: GraduationCap, color: "from-indigo-500/10 to-cyan-500/10", tag: "Impact" },
  { name: "Real Estate", icon: Building2, color: "from-blue-600/10 to-slate-500/10", tag: "High-Ticket" },
];

export default function Industries() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="industries" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-semibold tracking-wider text-accent uppercase">
            Target Markets
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
            Industries We Serve
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            We match brands with micro, macro, and celebrity influencers who command genuine authority within their specific market segments.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {industries.map((ind) => {
            const IconComponent = ind.icon;
            return (
              <motion.div
                key={ind.name}
                variants={itemVariants}
                className="p-6 rounded-2xl bg-neutral-900/20 border border-neutral-800 hover:border-accent/40 transition-all duration-300 group flex flex-col justify-between h-44 relative overflow-hidden"
              >
                {/* Background color glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${ind.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="flex justify-between items-start relative z-10">
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-accent group-hover:border-accent/30 transition-all duration-300">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-800">
                    {ind.tag}
                  </span>
                </div>

                <div className="space-y-1 mt-auto relative z-10">
                  <h3 className="text-white font-bold text-sm sm:text-base group-hover:text-accent transition-colors duration-300">
                    {ind.name}
                  </h3>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium">
                    Verified Creators
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
