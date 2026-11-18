import { useEffect, useRef } from 'react';
import { highlights, waLink } from '../content.js';
import { Photo, Kicker, Arrow } from './ui.jsx';

export default function Peddamma() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.setProperty('--p', Math.max(-1, Math.min(1, p)).toFixed(3));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="peddamma" id="peddamma">
      <div className="container peddamma__grid">
        <div className="peddamma__art" ref={ref} data-reveal>
          <div className="peddamma__arch"><Photo name="templeSherwani" /></div>
          <img className="peddamma__badge" src={highlights.peddamma} alt="Peddamma Collection emblem" loading="lazy" width="240" height="240" />
        </div>
        <div className="peddamma__copy">
          <Kicker light>Signature Collection</Kicker>
          <h2 data-reveal>The <em>Peddamma</em> Collection</h2>
          <p className="peddamma__lead" data-reveal>
            Named after the temple we stand across from. Temple-gold ivories, deep maroon drapes and
            heritage detailing for grooms who want tradition and presence in equal measure.
          </p>
          <ul className="peddamma__list" data-reveal>
            <li><span>i.</span> Ivory &amp; gold sherwanis with heritage motifs</li>
            <li><span>ii.</span> Maroon dupattas and pancha pairings</li>
            <li><span>iii.</span> Coordinated looks for the couple</li>
          </ul>
          <a className="btn btn--gold" data-reveal href={waLink('Hello Groom2B, I would like to see the Peddamma Collection.')} target="_blank" rel="noopener noreferrer">
            Request a Private Preview <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
