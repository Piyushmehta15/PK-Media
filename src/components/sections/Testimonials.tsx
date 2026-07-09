"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Head of Growth",
    company: "Aura Cosmetics",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    quote: "Working with PK Media transformed our D2C acquisition. They didn't just bring us influencers; they built a custom creative strategy that resulted in our winter lip collection selling out in just 10 days.",
  },
  {
    name: "David Miller",
    role: "VP of Marketing",
    company: "Apex Wearables",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    quote: "Their influencer vetting is exceptionally rigorous. Unlike previous agencies we partnered with, the creator selection at PK Media translated directly into actual smart ring pre-orders and a highly profitable CPA.",
  },
  {
    name: "Amanda Cross",
    role: "Founder & CEO",
    company: "Bloom Apparel",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80",
    rating: 5,
    quote: "PK Media manages the creator pipeline flawlessly. They saved our in-house team hundreds of hours of contract administration and scaled our monthly recurring ambassador signups at a steady 4.8x ROI.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#030303] relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-800 bg-neutral-900/50 text-xs font-semibold tracking-wider text-accent uppercase">
            Client Success
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
            Trusted by Dynamic Brands
          </h2>
          <p className="text-neutral-400 text-base md:text-lg">
            Hear directly from the marketing directors and founders who scaled their business growth through our campaign partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            return (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="p-8 rounded-2xl bg-neutral-900/20 border border-neutral-800 hover:border-accent/40 transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Quote Icon overlay */}
                <Quote className="absolute top-6 right-8 w-12 h-12 text-neutral-800/40 pointer-events-none z-0 group-hover:text-accent/10 transition-colors duration-300" />

                <div className="space-y-6 relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  <p className="text-neutral-300 text-sm md:text-base leading-relaxed italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* Profile info */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-800/80 relative z-10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-neutral-700">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-bold">{review.name}</h4>
                    <p className="text-neutral-500 text-xs mt-0.5">
                      {review.role}, <span className="text-accent">{review.company}</span>
                    </p>
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
