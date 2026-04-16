import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CAMPAIGNS = [
  {
    id: 1,
    title: 'Clean Water Initiative',
    category: 'Infrastructure',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    progress: 75,
    goal: 50000,
    raised: 37500,
    description:
      'Providing clean, safe drinking water to 120 villages across rural Rajasthan. We drill bore-wells, install filtration units, and train local maintenance crews so the infrastructure lasts for decades.',
    volunteers: 84,
    daysLeft: 18,
  },
  {
    id: 2,
    title: 'Rural Education Drive',
    category: 'Education',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
    progress: 40,
    goal: 25000,
    raised: 10000,
    description:
      'Equipping 40 under-resourced schools with digital learning labs, trained teachers, and curriculum materials. Every child deserves access to a quality education, regardless of their postcode.',
    volunteers: 120,
    daysLeft: 34,
  },
  {
    id: 3,
    title: 'Emergency Food Relief',
    category: 'Humanitarian',
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800',
    progress: 90,
    goal: 15000,
    raised: 13500,
    description:
      'Distributing monthly ration kits to 3,000 families affected by seasonal flooding in Bihar. Our local network ensures aid reaches the most vulnerable within 48 hours of a crisis.',
    volunteers: 210,
    daysLeft: 6,
  },
  
];

function formatCurrency(n) {
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}k`;
  return `$${n}`;
}

function ProgressBar({ progress, color }) {
  const barRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el || started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          gsap.fromTo(
            el,
            { width: '0%' },
            { width: `${progress}%`, duration: 1.4, ease: 'power3.out', delay: 0.2 }
          );
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started, progress]);

  return (
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <div
        ref={barRef}
        className="h-full rounded-full"
        style={{
          width: 0,
          background: color,
        }}
      />
    </div>
  );
}

const CATEGORY_COLORS = {
  Infrastructure: { bar: 'linear-gradient(90deg,#3b82f6,#06b6d4)', badge: 'bg-blue-600/80' },
  Education: { bar: 'linear-gradient(90deg,#8b5cf6,#a78bfa)', badge: 'bg-violet-600/80' },
  Humanitarian: { bar: 'linear-gradient(90deg,#f43f5e,#fb923c)', badge: 'bg-rose-600/80' },
};

function Modal({ campaign, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Backdrop Fade In
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    // Content Slide & Scale Up
    gsap.fromTo(
      contentRef.current,
      { scale: 0.9, y: 40, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)", delay: 0.1 }
    );
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      scale: 0.9,
      y: 40,
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl overflow-y-auto"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden max-w-5xl w-full shadow-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* THE "CUT" (CLOSE) BUTTON */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 hover:border-red-500 transition-all duration-300 text-2xl font-light"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* LEFT: IMAGE SECTION */}
          <div className="md:w-5/12 h-64 md:h-auto relative">
            <img src={campaign.image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 md:bg-gradient-to-r md:from-transparent md:to-slate-950" />
          </div>

          {/* RIGHT: DETAILS SECTION */}
          <div className="md:w-7/12 p-8 md:p-14 overflow-y-auto max-h-[85vh] custom-scrollbar">
            <span className={`px-4 py-1 ${CATEGORY_COLORS[campaign.category].badge} text-white text-[10px] font-black rounded-full uppercase tracking-widest mb-6 inline-block`}>
              {campaign.category}
            </span>

            <h3 className="text-white text-4xl md:text-5xl font-black mb-8 leading-tight">
              {campaign.title}
            </h3>

            <div className="space-y-10">
              {/* DESCRIPTION */}
              <section>
                <h4 className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-4 opacity-70">The Mission</h4>
                <p className="text-slate-300 text-lg leading-relaxed">{campaign.description}</p>
              </section>

              {/* TIMELINE: WHAT WE DID */}
              <section>
                <h4 className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-6 opacity-70">Impact & Milestones</h4>
                <div className="space-y-8 border-l border-white/10 ml-2 pl-8">
                  {/* We map through a 'milestones' array. If you haven't added it to CAMPAIGNS yet, see below. */}
                  {(campaign.milestones || [
                    { year: 'Phase 1', task: 'Initial research and ground-team deployment.' },
                    { year: 'Phase 2', task: 'Infrastructure development and community training.' },
                    { year: 'Current', task: 'Ongoing maintenance and impact monitoring.' }
                  ]).map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[2.35rem] top-1.5 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_#10b981]" />
                      <span className="text-white font-bold block text-sm mb-1">{item.year}</span>
                      <p className="text-slate-400 text-sm">{item.task}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FOOTER STATS */}
              <div className="pt-8 border-t border-white/10 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-white font-black text-2xl">{campaign.progress}%</span>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Goal Reached</p>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-black text-2xl">{formatCurrency(campaign.raised)}</span>
                    <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Total Raised</p>
                  </div>
                </div>
                <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl uppercase tracking-widest text-xs">
                  Support this campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CampaignsDashboard() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              card,
              { y: 80, opacity: 0, scale: 0.93 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                delay: i * 0.15,
                ease: 'back.out(1.5)',
              }
            );
            observer.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(card);
    });
  }, []);

  return (
    <section
    id='campaigns'
      ref={sectionRef}
      className="min-h-screen py-24 px-6 md:px-20 relative z-10"
    >
      <div className="mb-16 text-center">
        <span className="text-blue-400 text-sm font-mono uppercase tracking-[0.2em] mb-3 block">
          What we're working on
        </span>
        <h2 className="text-white text-5xl md:text-6xl font-black mb-4 leading-tight">
          Active Campaigns
        </h2>
        <div className="w-20 h-[3px] bg-blue-600 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {CAMPAIGNS.map((item, index) => {
          const colors = CATEGORY_COLORS[item.category];
          return (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-5 transition-all duration-500 hover:bg-white/8 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:-translate-y-2 cursor-pointer opacity-0"
              onClick={() => setActiveModal(item)}
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden rounded-2xl mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 ${colors.badge} backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider`}
                >
                  {item.category}
                </span>
                {item.daysLeft <= 10 && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-rose-600/90 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {item.daysLeft}d left
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-white text-xl font-bold mb-1 group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>

              {/* Raised / Goal row */}
              <div className="flex justify-between text-sm mb-3">
                <span className="text-emerald-400 font-bold">
                  {formatCurrency(item.raised)} raised
                </span>
                <span className="text-slate-500">
                  of {formatCurrency(item.goal)}
                </span>
              </div>

              {/* Animated progress bar */}
              <ProgressBar progress={item.progress} color={colors.bar} />

              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-400 text-sm">
                  <span className="text-white font-bold">{item.progress}%</span> funded
                </span>
                <button className="px-4 py-2 bg-white/10 text-white rounded-xl text-sm font-bold border border-white/10 hover:bg-blue-600 hover:border-blue-600 transition-all">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeModal && (
        <Modal campaign={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
}