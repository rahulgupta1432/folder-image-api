import { useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Story from './components/Story.jsx';
import Collections from './components/Collections.jsx';
import Planner from './components/Planner.jsx';
import Peddamma from './components/Peddamma.jsx';
import Finishing from './components/Finishing.jsx';
import Lookbook from './components/Lookbook.jsx';
import Testimonials from './components/Testimonials.jsx';
import Visit from './components/Visit.jsx';
import Booking from './components/Booking.jsx';
import Footer from './components/Footer.jsx';
import FloatingActions from './components/FloatingActions.jsx';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  // Shared between the wardrobe planner and the booking form.
  const [selected, setSelected] = useState(['dhoti', 'wedding', 'reception']);
  const [ready, setReady] = useState(false);
  useReveal();
  useEffect(() => { const t = requestAnimationFrame(() => setReady(true)); return () => cancelAnimationFrame(t); }, []);

  return (
    <div className={ready ? 'is-ready' : ''}>
      <div className="preview-ribbon">Website concept preview made for Groom2B's feedback · not the official site</div>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Collections />
        <Planner selected={selected} setSelected={setSelected} />
        <Peddamma />
        <Finishing />
        <Lookbook />
        <Testimonials />
        <Visit />
        <Booking selected={selected} setSelected={setSelected} />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
