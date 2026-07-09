"use client";

import { motion } from "framer-motion";
import { Handshake, LineChart, Megaphone, MessageSquare, PenTool, Radar, Search, ShieldCheck } from "lucide-react";

const services = [
  {
    title: "Influencer Discovery",
    description: "Finding the perfect creators for your brand's unique identity and target demographics.",
    icon: Search,
    details: [
      "Audience demographic verification",
      "Follower quality & authenticity audits",
      "Brand safety alignment check",
      "Niche relevance scoring",
    ],
  },
  {
    title: "Campaign Strategy",
    description: "Planning structured, creative, and performance-backed campaigns that convert views into revenue.",
    icon: Radar,
    details: [
      "Target audience profiling",
      "Multi-channel distribution plans",
      "Content hooks & creative briefs",
      "Competitor landscape analysis",
    ],
  },
  {
    title: "Creator Outreach",
    description: "Personalized outreach sequences that open genuine conversations with creators your audience already trusts.",
    icon: MessageSquare,
    details: [
      "Personalized agency outreach pitch",
      "Creator relationship management",
      "Availability and fit qualification",
      "Response tracking and follow-up",
    ],
  },
  {
    title: "Influencer Negotiation",
    description: "Commercially sharp negotiation across pricing, timelines, deliverables, usage rights, and disclosure terms.",
    icon: Handshake,
    details: [
      "Rate negotiation & media buying",
      "Contracts & rights management",
      "Compliance & FTC disclosure setup",
      "Usage and whitelisting terms",
    ],
  },
  {
    title: "Campaign Management",
    description: "Full end-to-end project management. From product shipping to final content calendar execution.",
    icon: Megaphone,
    details: [
      "Product distribution logistics",
      "Content schedule coordination",
      "Quality assurance & draft review",
      "Crisis management support",
    ],
  },
  {
    title: "UGC Campaigns",
    description: "User Generated Content engineered for paid ads, landing pages, and product pages to lift conversions.",
    icon: PenTool,
    details: [
      "High-converting ad frameworks",
      "Creator casting & scripting",
      "Editing & raw file management",
      "Full digital usage rights buyout",
    ],
  },
  {
    title: "Performance Analytics",
    description: "Granular reporting, real-time ROI tracking, conversion attribution, and campaign insights.",
    icon: LineChart,
    details: [
      "Custom tracking links & codes",
      "Client dashboard & live report",
      "Cost Per Acquisition (CPA) stats",
      "Post-campaign scaling advice",
    ],
  },
  {
    title: "Brand Collaborations",
    description: "Long-term creator partnerships, ambassador programs, and co-branded activations that compound trust over time.",
    icon: ShieldCheck,
    details: [
      "Ambassador program design",
      "Creator retention strategy",
      "Collaboration calendars",
      "Partnership performance reviews",
    ],
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-neutral-900/50 text-xs font-semibold tracking-wider text-primary uppercase">
            Our Expertise
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
            Premium Influencer Marketing Services
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            We handle everything from initial creator matching to contract management, creative briefs, content quality control, and full ROI performance reporting.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="p-8 rounded-2xl glass-panel hover:border-primary/45 hover:shadow-[0_20px_70px_rgba(20,156,182,0.16)] transition-all duration-500 group flex flex-col justify-between hover:-translate-y-2"
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:text-accent group-hover:border-accent/40 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-white font-bold text-xl tracking-tight group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800/80">
                  <ul className="space-y-2.5">
                    {service.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2.5 text-xs text-neutral-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
