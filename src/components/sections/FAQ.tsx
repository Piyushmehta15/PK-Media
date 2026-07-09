"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What does your pricing structure look like?",
    answer: "We offer transparent pricing models tailored to your goals. This typically includes a monthly management retainer covering strategy, casting, and execution, plus a separate media budget directed entirely to the creators. We do not hide behind markups; creator rates are shared transparently.",
  },
  {
    question: "What platforms do you run influencer campaigns on?",
    answer: "We specialize in Instagram (Reels, Stories, Posts), YouTube (Shorter integrations, dedicated reviews), and TikTok. We also construct targeted LinkedIn campaigns for B2B and SaaS businesses looking to leverage industry thought leaders.",
  },
  {
    question: "How long does a typical influencer campaign take?",
    answer: "A standard campaign takes about 4 to 6 weeks from initial consultation to final content publishing. This allows 1-2 weeks for strategy and casting, 2 weeks for contract signing and product distribution, and 1-2 weeks for creator content draft approval and publishing coordination.",
  },
  {
    question: "How do you select the influencers for our brand?",
    answer: "We combine proprietary search tools with manual audience audits. We evaluate creator demographics (location, age, gender), historical video performance, engagement rates, brand safety history, and follower quality (detecting bot activity) to ensure optimal matches.",
  },
  {
    question: "How is campaign performance tracked and reported?",
    answer: "We track performance using customized discount codes, referral links, pixel attribution, and raw creator analytics. You receive access to a live interactive dashboard summarizing reach, impressions, engagement, CPA, clicks, and total conversions.",
  },
  {
    question: "Do you handle the contracts and negotiation with creators?",
    answer: "Yes, we handle the entire creator relationship. This includes initial outreach, rate negotiation, drafting legally binding agency contracts, ensuring FTC disclosure compliance, processing payments, and managing content usage right buyouts.",
  },
  {
    question: "Who owns the rights to the content created during the campaign (UGC)?",
    answer: "In all our standard agreements, we negotiate digital usage rights so that you can reuse the influencer content (UGC) for your own paid social ads, email campaigns, landing pages, and product detail pages. We verify these buyouts in our creator contracts.",
  },
  {
    question: "What kind of ROI can we realistically expect?",
    answer: "While results vary depending on product market fit and budget, our campaigns average a 4.2x Return on Investment (ROI). During our initial strategy phase, we establish clear target benchmarks for customer acquisition costs (CAC) and conversion goals.",
  },
  {
    question: "What are your payment terms?",
    answer: "Our standard terms require a 50% deposit of the campaign budget upon contract signature to cover immediate creator commitments and product distribution, with the remaining 50% due upon completion of content publishing.",
  },
  {
    question: "What kind of ongoing support and communication do you provide?",
    answer: "You are assigned a dedicated Campaign Manager who provides weekly email status reports and bi-weekly review calls. We coordinate all logistics, meaning your team only needs to approve creators and final draft assets.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    if (activeIndex === idx) {
      setActiveIndex(null);
    } else {
      setActiveIndex(idx);
    }
  };

  return (
    <section id="faq" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-accent/2 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-semibold tracking-wider text-accent uppercase">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
            Clear Answers, No Jargon
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            Everything you need to know about our campaign processes, creators matching, pricing, and performance analytics.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/20 hover:border-neutral-700/60 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-white font-bold text-sm sm:text-base md:text-lg tracking-tight hover:text-accent transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 shrink-0 group-hover:text-white transition-all">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-neutral-400 text-xs sm:text-sm leading-relaxed border-t border-neutral-900/50 pl-14">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
