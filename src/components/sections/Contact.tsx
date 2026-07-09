"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2, ShieldCheck, CalendarRange } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formState.company.trim()) newErrors.company = "Company name is required";
    if (!formState.budget) newErrors.budget = "Please select a budget range";
    if (!formState.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      if (!web3FormsKey) {
        setErrors({
          form: "Web3Forms key is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in your environment variables.",
        });
        return;
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          ...formState,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setErrors({ form: data.message || "Submission failed. Please try again." });
      }
    } catch {
      setErrors({ form: "Failed to connect. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#030303] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/8 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-accent/8 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Columns - Copy & Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-neutral-900/50 text-xs font-semibold tracking-wider text-primary uppercase">
              Start Campaign
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-display">
              Ready to Connect <br />
              <span className="text-primary">With Creators?</span>
            </h2>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              Book a discovery call or fill out our project inquiry form. Our team will review your objectives and map out a custom influencer strategy for your brand.
            </p>

            <div className="space-y-6 pt-6 border-t border-neutral-900">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Direct Inquiry</h4>
                  <a href="mailto:hello@pkmedia.agency" className="text-neutral-400 text-sm hover:text-accent transition-colors mt-0.5 block">
                    hello@pkmedia.agency
                  </a>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-accent">
                  <CalendarRange className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Response Time</h4>
                  <p className="text-neutral-400 text-sm mt-0.5">
                    Our sales team responds to all submissions within 12 business hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 flex gap-4 items-start">
              <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-xs font-bold uppercase tracking-wider">
                  Guaranteed Vetted Outreach
                </p>
                <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                  We verify all creator statistics before booking. Your brand safety and alignment are fully guaranteed in contract structures.
                </p>
              </div>
            </div>
          </div>

          {/* Right Columns - Form Card */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder-neutral-600 ${
                            errors.name ? "border-red-500/50" : "border-neutral-800"
                          }`}
                          placeholder="Jane Doe"
                        />
                        {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder-neutral-600 ${
                            errors.email ? "border-red-500/50" : "border-neutral-800"
                          }`}
                          placeholder="jane@company.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Company */}
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                          Company Name
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formState.company}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder-neutral-600 ${
                            errors.company ? "border-red-500/50" : "border-neutral-800"
                          }`}
                          placeholder="Acme D2C Inc."
                        />
                        {errors.company && <p className="text-xs text-red-500 font-medium">{errors.company}</p>}
                      </div>

                      {/* Budget */}
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                          Campaign Budget (Monthly)
                        </label>
                        <div className="relative">
                          <select
                            id="budget"
                            name="budget"
                            value={formState.budget}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-neutral-400 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all cursor-pointer ${
                              errors.budget ? "border-red-500/50" : "border-neutral-800"
                            }`}
                          >
                            <option value="">Select range...</option>
                            <option value="under_5k">Less than $5,000</option>
                            <option value="5k_15k">$5,000 - $15,000</option>
                            <option value="15k_50k">$15,000 - $50,000</option>
                            <option value="over_50k">$50,000+</option>
                          </select>
                        </div>
                        {errors.budget && <p className="text-xs text-red-500 font-medium">{errors.budget}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                        Project Brief & Requirements
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formState.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3.5 rounded-xl bg-neutral-900/80 border text-white text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all placeholder-neutral-600 resize-none ${
                          errors.message ? "border-red-500/50" : "border-neutral-800"
                        }`}
                        placeholder="Tell us about your brand, target channels, products, and campaign goals..."
                      />
                      {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
                    </div>

                    {/* Error display */}
                    {errors.form && (
                      <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 text-red-500 text-xs font-semibold">
                        {errors.form}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-accent hover:bg-[#d86518] text-black font-bold text-sm transition-all duration-300 cursor-pointer disabled:opacity-50 hover:shadow-[0_0_24px_rgba(244,124,32,0.36)] group"
                    >
                      {submitting ? "Sending Inquiry..." : "Submit Campaign Brief"}
                      {!submitting && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center flex flex-col items-center justify-center space-y-6"
                  >
                    <CheckCircle2 className="w-16 h-16 text-accent animate-pulse" />
                    <div className="space-y-2">
                      <h3 className="text-white text-2xl font-bold font-display">Inquiry Received!</h3>
                      <p className="text-neutral-400 text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out to PK Media. Our campaign strategist will review your brief and contact you within 12 business hours.
                      </p>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
