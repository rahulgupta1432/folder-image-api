import { useEffect, useState } from 'react';
import { business, photos } from '../content.js';
import { Photo, Kicker, Arrow } from './ui.jsx';

const looks = [
  { name: 'pattuCouple', title: 'Golden Vows', tag: 'Pattu Pancha · Couple' },
  { name: 'ivoryPancha', title: 'Ivory Grace', tag: 'Dhoti Function' },
  { name: 'templeSherwani', title: 'Temple Royale', tag: 'Peddamma Collection' },
];

export default function Lookbook() {
  const [idx, setIdx] = useState(null);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIdx(null);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % looks.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + looks.length) % looks.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [idx]);

  return (
    <section className="lookbook" id="lookbook">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Kicker>Lookbook</Kicker>
            <h2 data-reveal>Real grooms. <em>Real moments.</em></h2>
          </div>
          <p data-reveal>
            A few favourites from our {business.instagramPosts}+ posts. Follow along for new
            collections and real wedding looks.
          </p>
        </div>
        <div className="lookbook__grid">
          {looks.map((l, i) => (
            <button key={l.name} className={`look look--${i}`} onClick={() => setIdx(i)} data-reveal style={{ '--rd': `${i * 0.12}s` }} aria-label={`View ${l.title}`}>
              <Photo name={l.name} />
              <span className="look__cap"><small>{l.tag}</small>{l.title}</span>
              <span className="look__zoom" aria-hidden="true">+</span>
            </button>
          ))}
          <a className="look look--ig" href={business.instagram} target="_blank" rel="noopener noreferrer" data-reveal>
            <span className="look__ig-count">{business.instagramFollowers}</span>
            <span className="look__ig-label">grooms &amp; families follow us</span>
            <span className="link-arrow">Follow {business.instagramHandle} <Arrow /></span>
          </a>
        </div>
      </div>

      {idx !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={looks[idx].title} onClick={() => setIdx(null)}>
          <button className="lightbox__close" aria-label="Close" onClick={() => setIdx(null)}>×</button>
          <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setIdx((idx - 1 + looks.length) % looks.length); }}><Arrow dir="left" /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img key={idx} src={photos[looks[idx].name].webp} alt={photos[looks[idx].name].alt} />
            <figcaption><small>{looks[idx].tag}</small>{looks[idx].title}</figcaption>
          </figure>
          <button className="lightbox__nav lightbox__nav--next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setIdx((idx + 1) % looks.length); }}><Arrow /></button>
        </div>
      )}
    </section>
  );
}
