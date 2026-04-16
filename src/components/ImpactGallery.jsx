import React from 'react';

const galleryItems = [
  {
    title: 'Meal Distribution Drive',
    description: 'Community-led food support for children and families.',
    // width/height params reduce payload; auto=format picks webp when supported
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=70',
  },
  {
    title: 'Learning Circles',
    description: 'Volunteer-led classes helping children stay in school.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=70',
  },
  {
    title: 'Water Access Projects',
    description: 'Building and restoring clean water points in rural areas.',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=70',
  },
  {
    title: 'Volunteer Mobilization',
    description: 'Local teams joining hands for on-ground action.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=70',
  },
];

export default function ImpactGallery() {
  return (
    <section id="gallery" className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Gallery</p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">Stories from the field.</h2>
          <p className="mt-4 text-slate-300">
            A visual look at outreach, learning, relief, and community support.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {galleryItems.map((item) => (
            <article key={item.title} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/60">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"          // native lazy load
                  decoding="async"        // non-blocking decode
                  width="800"
                  height="500"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}