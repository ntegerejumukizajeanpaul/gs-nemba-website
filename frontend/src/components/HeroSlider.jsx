import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function HeroSlider({ slides }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused]);

  const handlePrev = useCallback(() => setActive((current) => (current - 1 + slides.length) % slides.length), [slides.length]);
  const handleNext = useCallback(() => setActive((current) => (current + 1) % slides.length), [slides.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrev();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <section
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') handlePrev();
        if (event.key === 'ArrowRight') handleNext();
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-slate-900 text-white"
    >
      {slides.map((slide, index) => (
        <motion.div
          key={slide.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: active === index ? 1 : 0 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 ${active === index ? 'z-10' : 'z-0'}`}
          style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="absolute inset-0 bg-slate-950/70"></div>
        </motion.div>
      ))}
      <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">{slides[active]?.subtitle || 'Groupe Scolaire Nemba'}</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">{slides[active]?.title || 'Excellence in Education'}</h1>
          <p className="mt-6 max-w-2xl text-xl leading-9 text-slate-200">{slides[active]?.description || 'Join a school community that values creativity, leadership and academic excellence while staying deeply connected to Rwanda’s culture and future.'}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#about" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">Learn More</a>
            <a href="/timetable" className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900">Timetable</a>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-3">
        <button onClick={handlePrev} aria-label="Previous slide" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-slate-950/30 text-white transition hover:bg-white/80 hover:text-slate-950">
          <FiChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2 w-8 rounded-full transition ${active === index ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
        <button onClick={handleNext} aria-label="Next slide" className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-slate-950/30 text-white transition hover:bg-white/80 hover:text-slate-950">
          <FiChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

export default HeroSlider;
