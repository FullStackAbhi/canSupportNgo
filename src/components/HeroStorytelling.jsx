import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroStorytelling() {
  const compRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    // Small guard: wait one frame so ScrollTrigger can measure correctly
    const raf = requestAnimationFrame(() => {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: compRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        tl.to(textRef.current, {
          opacity: 0,
          y: -100,
          ease: 'power2.in',
        });
      }, compRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={compRef}
      className="h-screen w-full flex items-start pt-32 md:pt-40 px-10 md:px-20 relative overflow-hidden"
    >
      <div ref={textRef} className="z-10 max-w-4xl">
        <h1 className="hero-text text-7xl md:text-9xl font-extrabold tracking-tighter text-white leading-[0.9]">
          <span className="block opacity-50">A Crisis</span>
          <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            Waiting For
          </span>
          <span className="block">Your Compassion.</span>
        </h1>

        <div className="mt-10 hero-text">
          <p className="text-xl text-gray-400 max-w-lg mb-8 border-l-2 border-blue-500 pl-6">
            Every scroll brings us closer to a solution. Join CanSupport in turning
            awareness into action.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:scale-105 transition-transform"
            >
              Start the Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}