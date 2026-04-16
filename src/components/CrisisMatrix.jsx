import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const causes = [
  { label: "Children with daily food access", percentage: 42, color: "linear-gradient(90deg, #f59e0b, #ea580c)" },
  { label: "Children completing basic school", percentage: 35, color: "linear-gradient(90deg, #ef4444, #991b1b)" },
  { label: "Families with clean water", percentage: 51, color: "linear-gradient(90deg, #0ea5e9, #2563eb)" },
];

export default function CrisisMatrix() {
  const sectionRef = useRef(null);
  const dotsRef = useRef([]);
  const causesRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Animate the Dots (Split Left)
      gsap.from(dotsRef.current, {
        scale: 0,
        opacity: 0,
        stagger: {
          each: 0.01,
          from: "start",
          grid: "auto",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // 2. Animate the Progress Bars (Split Right)
      gsap.from(".progress-bar-fill", {
        width: "0%",
        duration: 2.5,
        ease: "power4.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // 3. Stagger in the Text Blocks
      gsap.from(".split-block", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Create 100 dots: Red for at-risk, Green for safe
  const dots = Array.from({ length: 100 }).map((_, i) => (i < 22 ? "#10b981" : "#ef4444"));

  return (
    <section 
      id="crisis"
      ref={sectionRef} 
      className="min-h-screen flex items-center justify-center px-6 py-24 relative z-10"
    >
      {/* THE COMBINED "GLASS" CONTAINER */}
      <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 md:p-16 rounded-[4rem] max-w-7xl w-full text-center shadow-[0_0_80px_rgba(0,0,0,0.5)]">
        
        {/* Header Block (Unified) */}
        <div className="text-center mb-16 split-block">
          <span className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em]">The Crisis Matrix</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-4 max-w-2xl mx-auto leading-tight">
            Lack of access.<br />Lack of reach.
          </h2>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto">
            Visualizing the daily challenges faced by millions of children in under-served communities.
          </p>
        </div>

        {/* --- SPLIT SCREEN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* --- LEFT SIDE: THE DOT GRID (Crisis) --- */}
          <div className="split-block p-10 bg-white/5 border border-white/10 rounded-3xl text-center shadow-xl">
            <span className="text-orange-500 font-mono text-xs uppercase tracking-[0.2em] mb-4 block">Child Data Matrix</span>
            <h3 className="text-2xl font-black text-white leading-tight mb-8">Every 4s, one child <br />faces hunger.</h3>
            
            <div className="grid grid-cols-10 gap-3 md:gap-4 max-w-sm mx-auto mt-12 mb-8">
              {dots && dots.map((color, i) => (
                <div
                  key={i}
                  ref={(el) => (dotsRef.current[i] = el)}
                  className="w-3 h-3 md:w-4 md:h-4 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: `0 0 15px ${color}66` // Red glow
                  }}
                />
              ))}
            </div>
            
            <p className="text-slate-500 text-xs mt-10 uppercase tracking-widest italic font-bold">
              Each dot = 1 child. <span className="text-red-500">Red = At Risk.</span>
            </p>
          </div>

          {/* --- RIGHT SIDE: THE PROGRESS BARS (Root Causes) --- */}
          <div ref={causesRef} className="split-block p-10 bg-white/5 border border-white/10 rounded-3xl shadow-xl text-left">
            <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.2em] mb-4 block">Progress Visualization</span>
            <h3 className="text-2xl font-black text-white leading-tight mb-12">Tracking vital<br />infrastructure gaps.</h3>

            <div className="space-y-12">
              {causes.map((cause, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-white text-xl font-bold">{cause.label}</span>
                    <span className="text-blue-400 font-mono text-xl font-black">{cause.percentage}%</span>
                  </div>
                  <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden p-1 shadow-inner">
                    <div 
                      className="progress-bar-fill h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${cause.percentage}%`, 
                        background: cause.color,
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}