import React, { useState, useRef } from 'react';
import gsap from 'gsap';

const CAMPAIGNS = [
  { id: 'general', label: "Where it's needed most" },
  { id: 'water', label: 'Clean Water Initiative' },
  { id: 'education', label: 'Rural Education Drive' },
  { id: 'food', label: 'Emergency Food Relief' },
];

const PRESETS = [100, 500, 1000, 2000];

const UPI_ID = 'abhishekcpr2000@ybl';
const PAYEE_NAME = 'Donation';

function getUpiUrl(amount, campaignLabel) {
  return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(campaignLabel || 'Donation')}`;
}

function getQrUrl(amount, campaignLabel) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
    getUpiUrl(amount, campaignLabel)
  )}`;
}

export default function DonationInterface() {
  const [amount, setAmount] = useState(500);
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [campaign, setCampaign] = useState('general');
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const buttonRef = useRef(null);
  const cardRef = useRef(null);
  const successRef = useRef(null);
  const modalRef = useRef(null);

  const selectedAmount = isCustom ? parseFloat(customValue) || 0 : amount;
  const isValid = selectedAmount >= 1;
  const selectedCampaign = CAMPAIGNS.find((c) => c.id === campaign);

  // --- Confetti burst ---
  const fireConfetti = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let i = 0; i < 28; i++) {
      const el = document.createElement('div');
      el.textContent = ['❤️', '✨', '💛', '🌿'][Math.floor(Math.random() * 4)];
      el.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        font-size: ${16 + Math.random() * 16}px;
        pointer-events: none;
        z-index: 9999;
        user-select: none;
      `;
      document.body.appendChild(el);

      gsap.set(el, { x: originX, y: originY, opacity: 1, scale: 0 });
      gsap.to(el, {
        x: originX + (Math.random() - 0.5) * 500,
        y: originY - 100 - Math.random() * 400,
        opacity: 0,
        scale: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 360 - 180,
        duration: 1.2 + Math.random() * 0.8,
        ease: 'power2.out',
        onComplete: () => el.remove(),
      });
    }
  };

  const handleOpenQR = () => {
    if (!isValid || isLoading) return;

    gsap.to(buttonRef.current, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    setShowQR(true);
    setTimeout(() => {
      if (modalRef.current) {
        gsap.fromTo(
          modalRef.current,
          { scale: 0.92, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
        );
      }
    }, 30);
  };

  const handleCloseQR = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.93,
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => setShowQR(false),
      });
    } else {
      setShowQR(false);
    }
  };

  const handlePaymentDone = () => {
    handleCloseQR();
    setIsLoading(true);

    setTimeout(() => {
      fireConfetti();
      gsap.to(cardRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          setIsLoading(false);
          setIsDone(true);
          setTimeout(() => {
            if (successRef.current) {
              gsap.fromTo(
                successRef.current,
                { scale: 0.9, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
              );
            }
          }, 50);
        },
      });
    }, 400);
  };

  const handleReset = () => {
    setIsDone(false);
    setAmount(500);
    setCustomValue('');
    setIsCustom(false);
    setCampaign('general');
    setTimeout(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { scale: 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' }
        );
      }
    }, 50);
  };

  return (
    <section
      id="donate"
      className="min-h-screen flex items-center justify-center px-6 py-16 relative z-10"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-8 text-left">
          <p className="text-emerald-400 text-xs tracking-widest uppercase">
            You can change this
          </p>
          <h2 className="text-4xl font-bold text-white leading-tight">
            One donation. One less child who goes to bed hungry tonight.
          </h2>
          <p className="text-slate-400 max-w-md">
            ₹500 feeds a child for a month. ₹2,000 puts them in school for a year.
            Your name, their future.
          </p>

          {/* Progress */}
          <div className="max-w-md">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>This month's goal</span>
              <span>₹4.2L of ₹5L</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-[84%]" />
            </div>
          </div>

          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl transition">
            Donate now ↗
          </button>
          <p className="text-slate-500 text-xs">
            Registered NGO · 80G certified · Full transparency reports
          </p>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex justify-center">
          {!isDone ? (
            <div
              ref={cardRef}
              className="w-full max-w-lg bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
            >
              {/* Header */}
              <div className="text-center mb-10">
                <span className="text-blue-400 text-sm font-mono uppercase tracking-[0.2em] mb-3 block">
                  Make a difference
                </span>
                <h2 className="text-4xl font-black text-white mb-2">Fuel the Mission</h2>
                <p className="text-slate-400">Your contribution creates real-world impact.</p>
              </div>

              {/* Campaign Selector */}
              <div className="mb-8">
                <label className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-3 block">
                  Donate to
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CAMPAIGNS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCampaign(c.id)}
                      className={`px-4 py-3 rounded-2xl text-sm font-bold text-left transition-all duration-200 border ${
                        campaign === c.id
                          ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Presets */}
              <div className="mb-4">
                <label className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-3 block">
                  Select amount
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {PRESETS.map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setAmount(val);
                        setIsCustom(false);
                        setCustomValue('');
                      }}
                      className={`py-4 rounded-2xl font-bold transition-all duration-200 border-2 text-lg ${
                        amount === val && !isCustom
                          ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/8'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div className="relative mb-10">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold pointer-events-none">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  placeholder="Custom amount"
                  value={customValue}
                  onChange={(e) => {
                    setCustomValue(e.target.value);
                    setIsCustom(true);
                  }}
                  onFocus={() => setIsCustom(true)}
                  className={`w-full bg-white/5 border-2 rounded-2xl py-4 pl-10 pr-5 text-white text-lg focus:outline-none transition-colors font-bold placeholder:text-slate-600 ${
                    isCustom ? 'border-blue-500' : 'border-white/10 hover:border-white/20'
                  }`}
                />
              </div>

              {/* Summary */}
              <div className="flex justify-between items-center mb-6 px-1">
                <span className="text-slate-400 text-sm">
                  You're giving{' '}
                  <span className="text-white font-bold">
                    {isValid ? `₹${selectedAmount.toLocaleString('en-IN')}` : '—'}
                  </span>{' '}
                  to{' '}
                  <span className="text-blue-400 font-bold">
                    {selectedCampaign?.label}
                  </span>
                </span>
              </div>

              {/* CTA — opens QR modal */}
              <button
                ref={buttonRef}
                onClick={handleOpenQR}
                disabled={!isValid || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-5 rounded-2xl font-bold text-xl shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Processing…
                  </span>
                ) : (
                  `Donate ₹${isValid ? selectedAmount.toLocaleString('en-IN') : '—'} via UPI`
                )}
              </button>

              <p className="text-center text-slate-600 text-xs mt-5">
                🔒 Powered by UPI · Zero transaction fees
              </p>
            </div>
          ) : (
            <div ref={successRef} className="w-full max-w-lg text-center opacity-0">
              <div className="text-7xl mb-6">🎉</div>
              <h2 className="text-5xl font-black text-white mb-4">Thank you!</h2>
              <p className="text-slate-400 text-xl mb-3 leading-relaxed">
                Your{' '}
                <span className="text-emerald-400 font-bold">
                  ₹{selectedAmount.toLocaleString('en-IN')}
                </span>{' '}
                donation to{' '}
                <span className="text-blue-400 font-bold">
                  {selectedCampaign?.label}
                </span>{' '}
                is making a real difference.
              </p>
              <p className="text-slate-500 text-base mb-10">
                A confirmation would be sent to your registered email.
              </p>
              <button
                onClick={handleReset}
                className="px-8 py-4 border border-white/20 text-white rounded-full font-bold hover:border-blue-400 hover:text-blue-400 transition-all"
              >
                Make another donation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= UPI QR MODAL ================= */}
      {showQR && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={handleCloseQR}
        >
          <div
            ref={modalRef}
            className="bg-slate-900 border border-white/10 rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <p className="text-slate-400 text-sm mb-1">Scan & pay via any UPI app</p>
            <p className="text-white text-4xl font-black mb-1">
              ₹{selectedAmount.toLocaleString('en-IN')}
            </p>
            <p className="text-blue-400 text-sm mb-6">{selectedCampaign?.label}</p>

            {/* QR Code */}
            <div className="flex justify-center mb-4">
              <img
                src={getQrUrl(selectedAmount, selectedCampaign?.label)}
                alt="UPI QR Code"
                className="w-56 h-56 rounded-2xl bg-white p-2"
              />
            </div>

            {/* UPI ID */}
            <p className="text-slate-400 text-xs mb-1">UPI ID</p>
            <p className="text-white text-sm font-bold mb-4">{UPI_ID}</p>

            {/* Deep link for mobile */}
            <a
              href={getUpiUrl(selectedAmount, selectedCampaign?.label)}
              className="block text-blue-400 text-sm underline underline-offset-2 mb-2"
            >
              Open in UPI app →
            </a>
            <p className="text-slate-600 text-xs mb-6">
              GPay · PhonePe · Paytm · BHIM · all UPI apps
            </p>

            {/* Confirm payment done */}
            <button
              onClick={handlePaymentDone}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-2xl font-bold text-base transition-all mb-3"
            >
              I've completed the payment ✓
            </button>

            <button
              onClick={handleCloseQR}
              className="text-slate-500 text-sm hover:text-slate-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}