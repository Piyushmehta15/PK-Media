"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, Radio, Star, TrendingUp, Users } from "lucide-react";

function Counter({ value, suffix = "", duration = 1.5 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      // easeOutQuad
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  {
    label: "Creators",
    value: 500,
    suffix: "+",
    icon: Users,
    desc: "Top performers across niches",
  },
  {
    label: "Campaigns",
    value: 120,
    suffix: "+",
    icon: TrendingUp,
    desc: "ROI-driven scale-ups",
  },
  {
    label: "Reach",
    value: 25,
    suffix: "M+",
    icon: Radio,
    desc: "Active and engaged consumers",
  },
  {
    label: "Client Rating",
    value: 4.8,
    suffix: "★",
    icon: Star,
    desc: "Average partner experience",
  },
  {
    label: "Client Retention",
    value: 95,
    suffix: "%",
    icon: Heart,
    desc: "Repeat retainer partnerships",
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-[#030303] border-y border-border-dark relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 sm:p-4 lg:p-6 rounded-2xl border border-primary/10 bg-neutral-900/20"
              >
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary mb-6">
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black text-white font-display tracking-tight mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h3>
                
                <p className="text-white text-sm font-semibold tracking-wider uppercase mb-1">
                  {stat.label}
                </p>
                
                <p className="text-neutral-500 text-xs">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
