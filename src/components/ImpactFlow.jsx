import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { label: "Donor gives", icon: "❤️" },
  { label: "We plan & procure", icon: "📋" },
  { label: "Ground team delivers", icon: "🚚" },
  { label: "Life changes", icon: "🌟" },
];

const stats = [
  { label: "Lives Impacted", value: "240,00+" },
  { label: "Meals Served", value: "18,400+" },
  { label: "Wells Built", value: "312+" },
  { label: "Schools Supported", value: "87+" },
];

export default function ImpactFlow() {
  const rootRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Animate the connecting line
      gsap.from(".process-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: ".process-container",
          start: "top 80%",
          scrub: 1,
        },
      });

      // 2. Stagger the icons
      gsap.from(".process-node", {
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".process-container",
          start: "top 75%",
        },
      });

      // 3. Animate the stats
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="min-h-screen flex flex-col items-center justify-center px-6 py-24 relative z-10">
      <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 md:p-20 rounded-[4rem] max-w-6xl w-full shadow-2xl text-center">
        
        {/* --- PART 1: THE PROCESS --- */}
        <div className="mb-24">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em]">What we do</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-8">
            We build the bridge between compassion and communities.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            Our ground teams work directly in villages — distributing meals, building wells, enrolling children in schools, and training parents for sustainable livelihoods.
          </p>

          <div className="process-container relative flex justify-between items-start max-w-4xl mx-auto mt-20">
            {/* The Connecting Line */}
            <div className="process-line absolute top-6 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/20 via-emerald-500 to-blue-500/20 z-0" />
            
            {processSteps && processSteps.map((step, i) => (
              <div key={i} className="process-node relative z-10 flex flex-col items-center group w-1/4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <p className="text-white text-xs font-bold uppercase tracking-widest mt-6 text-center leading-tight">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
          
          <p className="text-emerald-400/60 text-[10px] uppercase tracking-widest mt-16 font-mono">
            100% of operational costs are covered by grants — your donation goes entirely to the field.
          </p>
        </div>

        {/* --- PART 2: THE STATS --- */}
        <div className="stats-grid">
          <div className="mb-12">
            <span className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em]">The Impact So Far</span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-4">Numbers don't lie. People's lives have changed.</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
  {stats && stats.map((stat, i) => (
    <div 
      key={i} 
      className="stat-card group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-2 hover:bg-white/5 overflow-hidden"
    >
      {/* Decorative Glow matching the text color (Optional UI Polish) */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-current opacity-5 blur-[50px] group-hover:opacity-10 transition-opacity" />

      {/* Emoji/Icon Header */}
      <div className="text-3xl mb-6 block group-hover:scale-110 transition-transform duration-300">
        {stat.icon || ['❤️', '🤝', '📍', '🚀'][i]} 
      </div>

      {/* Main Value */}
      <h4 className={`text-4xl md:text-5xl font-black mb-3 tracking-tighter ${
        i === 0 ? 'text-blue-500' : 
        i === 1 ? 'text-emerald-500' : 
        i === 2 ? 'text-amber-500' : 'text-rose-500'
      }`}>
        {stat.value}
      </h4>

      {/* Label */}
      <p className="text-white text-xs font-black uppercase tracking-[0.2em] mb-4">
        {stat.label}
      </p>

     
      {/* Bottom Accent Bar */}
      
    </div>
  ))}
</div>
        </div>

      </div>
    </section>
  );
}