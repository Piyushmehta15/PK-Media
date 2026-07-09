"use client";

import { motion } from "framer-motion";
import {
  Users2,
  TrendingUp,
  UserCheck,
  Zap,
  BarChart4,
  ShieldAlert,
  Lightbulb,
  Globe2,
} from "lucide-react";

const reasons = [
  {
    title: "Verified Creator Network",
    description: "Every creator in our database undergoes thorough audit vetting. We verify historical conversions and eliminate fake engagement.",
    icon: Users2,
  },
  {
    title: "ROI Driven Campaigns",
    description: "We align all strategic plans with acquisition goals. Success is determined by revenue generated, not just impressions.",
    icon: TrendingUp,
  },
  {
    title: "Dedicated Campaign Managers",
    description: "You are assigned a single point-of-contact manager who handles communication, creators, scheduling, and drafts.",
    icon: UserCheck,
  },
  {
    title: "Transparent Reporting",
    description: "Live interactive dashboard access displaying referral codes, conversion numbers, click tracking, and audience demographics.",
    icon: BarChart4,
  },
  {
    title: "Brand Safety",
    description: "Advanced vetting rules ensure that creator speech, history, and values reflect perfectly on your corporate standards.",
    icon: ShieldAlert,
  },
  {
    title: "Fast Campaign Launch",
    description: "Our structured pipeline allows us to go from campaign strategy sign-off to live content publishing within 14 days.",
    icon: Zap,
  },
  {
    title: "Creative Strategy",
    description: "No generic templates. We craft custom hooks, scripting frameworks, and formats specialized to your specific product benefits.",
    icon: Lightbulb,
  },
  {
    title: "Global Influencer Reach",
    description: "We source creators across regional and international markets so brands can scale without losing local relevance.",
    icon: Globe2,
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-neutral-900/50 text-xs font-semibold tracking-wider text-primary uppercase">
            Why Partner With Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
            Engineered for Commercial Performance
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            We move past standard vanity metrics to prioritize authentic creator engagement, brand safety, and measurable business growth.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            const indexStr = (index + 1).toString().padStart(2, "0");

            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                className="p-6 rounded-2xl glass-panel hover:border-primary/45 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(20,156,182,0.12)] hover:-translate-y-1 group relative flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs text-neutral-600 font-extrabold font-mono tracking-widest">
                      {indexStr}
                    </span>
                    <div className="text-primary group-hover:text-accent group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-base md:text-lg mb-2 tracking-tight group-hover:text-accent transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-neutral-400 text-xs md:text-sm leading-relaxed">
                    {reason.description}
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
