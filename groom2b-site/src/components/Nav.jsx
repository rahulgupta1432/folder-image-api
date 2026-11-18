import { useEffect, useState } from 'react';
import { scrollToId } from './ui.jsx';

const links = [
  ['collections', 'Collections'],
  ['planner', 'Wardrobe Planner'],
  ['peddamma', 'Peddamma'],
  ['lookbook', 'Lookbook'],
  ['visit', 'Visit'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <header className={`nav${scrolled ? ' nav--solid' : ''}`}>
        <div className="container nav__inner">
          <a href="#top" className="wordmark" onClick={(e) => { e.preventDefault(); go('top'); }} aria-label="Groom2B home">
            <span className="wordmark__small">We celebrate you</span>
            <span className="wordmark__name">GROOM<span className="wordmark__2">2</span>B</span>
          </a>
          <nav className="nav__links" aria-label="Primary">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>
            ))}
          </nav>
          <button className="btn btn--ghost nav__cta" onClick={() => go('book')}>Book Appointment</button>
          <button className={`burger${open ? ' is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <span /><span />
          </button>
        </div>
      </header>
      <div className={`drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav>
          {links.map(([id, label], i) => (
            <a key={id} href={`#${id}`} style={{ transitionDelay: `${open ? 120 + i * 60 : 0}ms` }} onClick={(e) => { e.preventDefault(); go(id); }}>
              <span>0{i + 1}</span>{label}
            </a>
          ))}
        </nav>
        <button className="btn btn--gold" onClick={() => go('book')}>Book Appointment</button>
      </div>
    </>
  );
}
