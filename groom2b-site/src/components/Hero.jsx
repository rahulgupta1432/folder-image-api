import { useEffect, useRef } from 'react';
import { business } from '../content.js';
import { Photo, Arrow, scrollToId } from './ui.jsx';

export default function Hero() {
  const art = useRef(null);

  useEffect(() => {
    const el = art.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        el.style.setProperty('--py', `${y * 0.08}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow anim" style={{ '--d': '0.1s' }}>
            <span className="dot" /> Groom Wear · Jubilee Hills, Hyderabad
          </p>
          <h1 className="hero__title">
            <span className="line"><span style={{ '--d': '0.15s' }}>The groom,</span></span>
            <span className="line"><span style={{ '--d': '0.28s' }}><em>celebrated.</em></span></span>
          </h1>
          <p className="hero__lead anim" style={{ '--d': '0.55s' }}>
            From the silk Pattu Pancha at your muhurtham to the tuxedo at your reception,
            Groom2B dresses you for every occasion of your wedding.
          </p>
          <div className="hero__actions anim" style={{ '--d': '0.7s' }}>
            <button className="btn btn--gold" onClick={() => scrollToId('book')}>Book a Styling Appointment <Arrow /></button>
            <button className="btn btn--line" onClick={() => scrollToId('planner')}>Plan My Wedding Looks</button>
          </div>
          <dl className="hero__facts anim" style={{ '--d': '0.85s' }}>
            <div><dt>{business.instagramFollowers}</dt><dd>Instagram family</dd></div>
            <div><dt>8</dt><dd>Groom-wear categories</dd></div>
            <div><dt>IN · US</dt><dd>Grooms served</dd></div>
          </dl>
        </div>

        <div className="hero__art" ref={art}>
          <div className="hero__frame">
            <Photo name="pattuCouple" eager className="hero__img" />
            <span className="hero__caption">Pattu Pancha · Couple</span>
          </div>
          <div className="hero__inset">
            <Photo name="templeSherwani" eager />
          </div>
          <svg className="hero__seal" viewBox="0 0 160 160" aria-hidden="true">
            <defs><path id="seal" d="M80 80m-62 0a62 62 0 1 1 124 0a62 62 0 1 1-124 0" /></defs>
            <text><textPath href="#seal">CELEBRATING GROOMS · FOR EVERY OCCASION · </textPath></text>
          </svg>
        </div>
      </div>
      <button className="hero__scroll" onClick={() => scrollToId('story')} aria-label="Scroll to story">
        <span>Scroll</span><i />
      </button>
    </section>
  );
}
