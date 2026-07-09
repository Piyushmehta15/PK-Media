"use client";


const brands = [
  { name: "Nike", icon: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=80&h=40&q=80" },
  { name: "Spotify", icon: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?auto=format&fit=crop&w=80&h=40&q=80" },
  { name: "Adobe", icon: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=80&h=40&q=80" },
  { name: "Amazon", icon: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=80&h=40&q=80" },
  { name: "Samsung", icon: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=80&h=40&q=80" },
  { name: "Tesla", icon: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=80&h=40&q=80" },
  { name: "Apple", icon: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=80&h=40&q=80" },
];

export default function TrustedBrands() {
  // Double the list to support infinite scroll smoothly
  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <section className="py-16 bg-[#030303] border-y border-border-dark overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center">
        <p className="text-neutral-500 text-xs font-semibold uppercase tracking-widest">
          Trusted by Industry Leaders & Fast-Growing Brands
        </p>
      </div>

      <div className="relative flex w-full overflow-x-hidden">
        {/* Left/Right masks for smooth fade edges */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-20 py-4 shrink-0 animate-marquee min-w-full justify-around items-center">
          {marqueeItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center justify-center filter grayscale opacity-40 hover:opacity-100 hover:grayscale-0 hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Elegant text representations with icons that match Apple UI standards */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-white text-xs">
                  {brand.name[0]}
                </div>
                <span className="text-white text-lg font-bold tracking-tight font-display">
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
