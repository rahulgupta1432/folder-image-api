import { useRef, useState } from 'react';
import { collections, highlights, photos, waLink } from '../content.js';
import { Kicker, Arrow } from './ui.jsx';

function Preview({ item }) {
  if (item.photo) {
    const p = photos[item.photo];
    return <img src={p.webp} alt="" />;
  }
  if (item.image) return <img src={highlights[item.image]} alt="" />;
  return (
    <div className="preview__mono">
      <span>{item.name.charAt(0)}</span>
      <small>{item.note}</small>
    </div>
  );
}

export default function Collections() {
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(0);
  const listRef = useRef(null);
  const floatRef = useRef(null);

  const onMove = (e) => {
    const el = floatRef.current;
    if (!el) return;
    const r = listRef.current.getBoundingClientRect();
    el.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0) translate(-50%, -55%)`;
  };

  return (
    <section className="collections" id="collections">
      <div className="container">
        <div className="section-head section-head--split">
          <div>
            <Kicker>The Collections</Kicker>
            <h2 data-reveal>Eight ways to dress <em>the occasion</em></h2>
          </div>
          <p data-reveal>
            Every category we're known for, styled to fit you, your family's traditions and the
            moment. Tap a collection to explore it.
          </p>
        </div>

        <div className="coll-list" ref={listRef} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <div className={`coll-float${hover !== null ? ' is-on' : ''}`} ref={floatRef} aria-hidden="true">
            {collections.map((c, i) => (
              <div key={c.name} className={`coll-float__item${hover === i ? ' is-on' : ''}`}><Preview item={c} /></div>
            ))}
          </div>

          {collections.map((c, i) => (
            <article key={c.name} className={`coll-row${open === i ? ' is-open' : ''}`} onMouseEnter={() => setHover(i)}>
              <button className="coll-row__head" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="coll-row__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="coll-row__name">{c.name}</span>
                <span className="coll-row__note">{c.note}</span>
                <span className="coll-row__plus" aria-hidden="true" />
              </button>
              <div className="coll-row__body">
                <div className="coll-row__inner">
                  <div className="coll-row__thumb"><Preview item={c} /></div>
                  <div>
                    <p>{c.text}</p>
                    <div className="tags">{c.occasions.map((o) => <span key={o}>{o}</span>)}</div>
                    <a className="link-arrow" href={waLink(`Hello Groom2B, I'd like to know more about your ${c.name} collection.`)} target="_blank" rel="noopener noreferrer">
                      Enquire about {c.name} <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
