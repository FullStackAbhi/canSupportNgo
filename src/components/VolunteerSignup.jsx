import React, { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTEREST_OPTIONS = [
  'Education', 'Environment', 'Healthcare', 'Food Relief',
  'Water & Sanitation', 'Women Empowerment', 'Child Welfare', 'Disaster Relief',
];

const QUESTIONS = [
  {
    id: 'name',
    label: "First, what's your name?",
    placeholder: 'Type your full name…',
    type: 'text',
    validate: (v) => v.trim().length >= 2,
    hint: 'At least 2 characters',
  },
  {
    id: 'email',
    label: 'Great! And your email?',
    placeholder: 'name@example.com',
    type: 'email',
    validate: (v) => EMAIL_RE.test(v.trim()),
    hint: 'Enter a valid email address',
  },
  {
    id: 'interest',
    label: 'What are you passionate about?',
    placeholder: null, // chip-based, not a text input
    type: 'chips',
    validate: (v) => v.length > 0,
    hint: 'Pick at least one',
  },
];

export default function VolunteerSignup() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', interest: [] });
  const [isDone, setIsDone] = useState(false);
  const [showError, setShowError] = useState(false);

  const questionRef = useRef(null);
  const inputRef = useRef(null);

  const q = QUESTIONS[step];
  const currentValue = formData[q.id];
  const isValid = q.validate(currentValue);

  // Animate IN whenever step changes
  useLayoutEffect(() => {
    if (isDone || !questionRef.current) return;
    gsap.fromTo(
      questionRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
    // Auto-focus text inputs
    if (inputRef.current && q.type !== 'chips') {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [step, isDone]);

  const animateOut = (dir, callback) => {
    gsap.to(questionRef.current, {
      y: dir === 'forward' ? -40 : 40,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: callback,
    });
  };

  const handleNext = () => {
    if (!isValid) { setShowError(true); return; }
    setShowError(false);

    if (step < QUESTIONS.length - 1) {
      animateOut('forward', () => setStep((s) => s + 1));
    } else {
      // Submit
      gsap.to(questionRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.4,
        onComplete: () => setIsDone(true),
      });
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    setShowError(false);
    animateOut('back', () => setStep((s) => s - 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && q.type !== 'chips') handleNext();
  };

  const toggleChip = (chip) => {
    setFormData((prev) => ({
      ...prev,
      interest: prev.interest.includes(chip)
        ? prev.interest.filter((c) => c !== chip)
        : [...prev.interest, chip],
    }));
    setShowError(false);
  };

  return (
    <section
    id='volunteer'
     className="min-h-screen flex items-center justify-center px-6 py-24 relative z-10 overflow-hidden">
      <div className="w-full max-w-2xl">
        {!isDone ? (
          <>
            {/* Progress dots */}
            <div className="flex items-center gap-3 mb-12">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i < step
                      ? 'w-8 bg-emerald-500'
                      : i === step
                      ? 'w-8 bg-blue-500'
                      : 'w-4 bg-white/15'
                  }`}
                />
              ))}
              <span className="text-slate-500 text-sm font-mono ml-2">
                {step + 1} / {QUESTIONS.length}
              </span>
            </div>

            <div ref={questionRef} className="space-y-8">
              {/* Step indicator */}
              <div className="flex items-center gap-2">
                <span className="text-blue-400 font-mono font-bold text-lg">{step + 1} →</span>
                <div className="h-px w-10 bg-white/20" />
              </div>

              {/* Question label */}
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                {q.label}
              </h2>

              {/* Input — text / email */}
              {q.type !== 'chips' && (
                <div>
                  <input
                    ref={inputRef}
                    type={q.type}
                    placeholder={q.placeholder}
                    value={formData[q.id]}
                    onChange={(e) => {
                      setFormData({ ...formData, [q.id]: e.target.value });
                      setShowError(false);
                    }}
                    onKeyDown={handleKeyDown}
                    className={`w-full bg-transparent border-b-2 py-4 text-2xl md:text-3xl text-white focus:outline-none transition-colors placeholder:text-white/15 ${
                      showError ? 'border-rose-500' : 'border-white/20 focus:border-blue-500'
                    }`}
                  />
                  {showError && (
                    <p className="text-rose-400 text-sm mt-2">{q.hint}</p>
                  )}
                </div>
              )}

              {/* Input — chips */}
              {q.type === 'chips' && (
                <div>
                  <div className="flex flex-wrap gap-3">
                    {INTEREST_OPTIONS.map((chip) => {
                      const selected = formData.interest.includes(chip);
                      return (
                        <button
                          key={chip}
                          onClick={() => toggleChip(chip)}
                          className={`px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all duration-200 ${
                            selected
                              ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                              : 'bg-white/5 border-white/15 text-slate-300 hover:border-white/30'
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                  {showError && (
                    <p className="text-rose-400 text-sm mt-3">{q.hint}</p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                {/* Back */}
                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 text-slate-400 border border-white/15 rounded-xl font-bold hover:border-white/30 hover:text-white transition-all"
                  >
                    ← Back
                  </button>
                )}

                {/* Next / Submit */}
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                  {step === QUESTIONS.length - 1 ? 'Submit ✓' : 'OK'}
                </button>

                {q.type !== 'chips' && (
                  <span className="text-white/30 text-sm hidden md:block">
                    press <strong className="text-white/50">ENTER ↵</strong>
                  </span>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Success */
          <div className="text-center space-y-6">
            <div
              className="text-7xl mb-4"
              style={{ animation: 'pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both' }}
            >
              🚀
            </div>
            <h2 className="text-5xl font-black text-white">You're on the list!</h2>
            <p className="text-slate-400 text-xl leading-relaxed max-w-md mx-auto">
              Thanks for stepping up,{' '}
              <span className="text-white font-bold">
                {formData.name.split(' ')[0]}
              </span>
              . We'll reach out to{' '}
              <span className="text-blue-400">{formData.email}</span> with your
              next steps.
            </p>
            {formData.interest.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {formData.interest.map((chip) => (
                  <span
                    key={chip}
                    className="px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-full text-sm font-bold"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={() => {
                setIsDone(false);
                setStep(0);
                setFormData({ name: '', email: '', interest: [] });
                setShowError(false);
              }}
              className="text-slate-400 border-b border-slate-600 hover:text-white hover:border-white transition-colors font-bold mt-4 inline-block"
            >
              Start over
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pop {
          0%   { transform: scale(0); opacity: 0; }
          80%  { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}