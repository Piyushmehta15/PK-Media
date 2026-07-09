"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Target, Lightbulb, BarChart3 } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Aura Cosmetics",
    industry: "Beauty & Cosmetics",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&h=400&q=80",
    goal: "Drive awareness and e-commerce conversions for the winter Velvet Lip Tint collection launch.",
    strategy: "Casted 18 highly active micro-influencers on TikTok & Instagram Reels. Crafted creative guidelines highlighting daily wear tests and transition trends.",
    results: [
      { label: "Return on Ad Spend", value: "5.4x ROI" },
      { label: "Direct Campaign Sales", value: "+124% Lift" },
      { label: "Estimated Impressions", value: "2.4M Reach" },
    ],
  },
  {
    title: "Apex Wearables",
    industry: "Tech & Fitness",
    image: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=600&h=400&q=80",
    goal: "Secure email signups and pre-orders for the launching Titan Smart Ring.",
    strategy: "Partnered with 8 premium YouTube tech review and lifestyle creators for integrated sponsorships detailing real product utility in daily routines.",
    results: [
      { label: "Return on Ad Spend", value: "3.8x ROI" },
      { label: "Titan Pre-Orders", value: "18,400+ Units" },
      { label: "Estimated Impressions", value: "4.1M Reach" },
    ],
  },
  {
    title: "Bloom Apparel",
    industry: "Fashion & Lifestyle",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&h=400&q=80",
    goal: "Establish top-tier lifestyle positioning and grow monthly recurring subscription signups.",
    strategy: "Recruited 12 long-term Instagram ambassador creators for continuous lifestyle placements, lookbooks, and seasonal unboxing videos.",
    results: [
      { label: "Return on Ad Spend", value: "4.8x ROI" },
      { label: "Monthly Subscribers", value: "+32% Growth" },
      { label: "Estimated Impressions", value: "3.5M Reach" },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-semibold tracking-wider text-accent uppercase">
            Our Work
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
            Campaigns That Convert
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            Browse through concrete campaign performance reports showing how we match creator outreach, strategy, and tracking to drive sales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="rounded-2xl overflow-hidden bg-neutral-900/25 border border-neutral-800 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(20,156,182,0.12)] group flex flex-col justify-between"
              >
                {/* Image and Header */}
                <div>
                  <div className="h-52 w-full overflow-hidden relative border-b border-neutral-800">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-[10px] text-accent font-extrabold tracking-wider uppercase bg-black/80 border border-neutral-800 px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.industry}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white text-xl font-bold font-display group-hover:text-accent transition-colors duration-300">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    <ul className="space-y-4">
                      <li className="flex gap-3">
                        <Target className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Goal</p>
                          <p className="text-neutral-400 text-xs leading-relaxed mt-0.5">{project.goal}</p>
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <Lightbulb className="w-4.5 h-4.5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Strategy</p>
                          <p className="text-neutral-400 text-xs leading-relaxed mt-0.5">{project.strategy}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Performance Results */}
                <div className="p-6 border-t border-neutral-800 bg-neutral-950/50">
                  <div className="flex gap-2 items-center mb-3">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    <span className="text-xs text-white font-bold uppercase tracking-wider">
                      Verified Campaign Results
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {project.results.map((res, rIdx) => (
                      <div key={rIdx} className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-3 text-center">
                        <p className="text-accent text-sm sm:text-base font-extrabold font-display">
                          {res.value}
                        </p>
                        <p className="text-[9px] text-neutral-500 uppercase tracking-tight mt-0.5 leading-tight">
                          {res.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
