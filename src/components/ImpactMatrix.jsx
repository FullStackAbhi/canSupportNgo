import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const metrics = [
  {
    label: 'Lives Impacted',
    value: 15000,
    suffix: '+',
    display: '15,000+',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.3)',
    icon: '🫀',
    description: 'People whose daily lives have been meaningfully improved',
  },
  {
    label: 'Active Volunteers',
    value: 1200,
    suffix: '+',
    display: '1,200+',
    color: '#10b981',
    glow: 'rgba(16,185,129,0.3)',
    icon: '🤝',
    description: 'Dedicated individuals giving their time on the ground',
  },
  {
    label: 'Cities Reached',
    value: 85,
    suffix: '',
    display: '85',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.3)',
    icon: '📍',
    description: 'Across India, from metros to rural communities',
  },
  {
    label: 'Campaigns Run',
    value: 240,
    suffix: '+',
    display: '240+',
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.3)',
    icon: '🚀',
    description: 'Initiatives across water, education, and food relief',
  },
];

function StatCard({ item, index }) {
  const cardRef = useRef(null);
  const numRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Use IntersectionObserver — works with R3F ScrollControls
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Card entrance
          gsap.fromTo(
            el,
            { y: 50, opacity: 0, scale: 0.92 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              delay: index * 0.15,
              ease: 'back.out(1.4)',
            }
          );

          // Number counter — use object tween, not innerText tween
          const counter = { val: 0 };
          gsap.to(counter, {
            val: item.value,
            duration: 2.2,
            delay: index * 0.15 + 0.3,
            ease: 'power3.out',
            onUpdate: () => {
              if (numRef.current) {
                const rounded = Math.round(counter.val);
                numRef.current.textContent =
                  rounded.toLocaleString() + item.suffix;
              }
            },
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated, index, item]);

  return (
    <div
      ref={cardRef}
      className="relative group opacity-0"
      style={{ '--glow': item.glow, '--accent': item.color }}
    >
      {/* Glow bg on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: item.glow }}
      />

      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center group-hover:border-white/20 transition-all duration-500 group-hover:-translate-y-1">
        {/* Icon */}
        <div className="text-4xl mb-5">{item.icon}</div>

        {/* Animated number */}
        <div
          ref={numRef}
          className="text-5xl md:text-6xl font-black mb-2 tabular-nums"
          style={{ color: item.color }}
        >
          0
        </div>

        {/* Label */}
        <p className="text-white font-bold text-lg mb-2 uppercase tracking-wider">
          {item.label}
        </p>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="mt-6 h-[2px] w-12 mx-auto rounded-full opacity-60"
          style={{ background: item.color }}
        />
      </div>
    </div>
  );
}

export default function ImpactMatrix() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-24 relative"
    >
      {/* Section header */}
      <div className="text-center mb-16 max-w-2xl">
        <span className="text-blue-400 text-sm font-mono uppercase tracking-[0.2em] mb-4 block">
          By the numbers
        </span>
        <h2 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
          Our Footprint
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Real data reflecting the collective power of our volunteers, donors,
          and communities — updated every quarter.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {metrics.map((item, index) => (
          <StatCard key={item.label} item={item} index={index} />
        ))}
      </div>

      {/* Bottom quote */}
      <div className="mt-20 max-w-xl text-center">
        <p className="text-slate-500 text-base italic leading-relaxed border-t border-white/10 pt-8">
          "The measure of a life is not its duration, but its donation."
        </p>
        <span className="text-slate-600 text-sm mt-2 block">
          — Peter Marshall
        </span>
      </div>
    </section>
  );
}