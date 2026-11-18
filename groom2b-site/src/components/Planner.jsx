import { occasions, waLink } from '../content.js';
import { Kicker, Arrow, WhatsAppIcon, scrollToId } from './ui.jsx';

export default function Planner({ selected, setSelected }) {
  const toggle = (id) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const chosen = occasions.filter((o) => selected.includes(o.id));
  const looks = new Set(chosen.flatMap((o) => o.looks));

  const message =
    `Hello Groom2B! I'm planning my wedding wardrobe.\n\n` +
    chosen.map((o) => `• ${o.name}: ${o.looks.join(' / ')}`).join('\n') +
    `\n\nCould you help me with a styling appointment?`;

  return (
    <section className="planner" id="planner">
      <div className="container planner__grid">
        <div className="planner__intro">
          <Kicker light>Wedding Wardrobe Planner</Kicker>
          <h2 data-reveal>How many looks does <em>your wedding</em> need?</h2>
          <p data-reveal>
            Choose the functions you're celebrating. We'll suggest a look for each one, which you can
            send straight to our stylists before your visit.
          </p>
          <div className="chips" role="group" aria-label="Wedding functions">
            {occasions.map((o) => (
              <button
                key={o.id}
                className={`chip${selected.includes(o.id) ? ' is-on' : ''}`}
                aria-pressed={selected.includes(o.id)}
                onClick={() => toggle(o.id)}
              >
                <span className="chip__check" aria-hidden="true" />
                {o.name}
              </button>
            ))}
          </div>
        </div>

        <div className="planner__board" aria-live="polite">
          <div className="board__head">
            <span>Your wardrobe</span>
            <strong>{chosen.length} {chosen.length === 1 ? 'function' : 'functions'} · {looks.size} {looks.size === 1 ? 'category' : 'categories'}</strong>
          </div>
          {chosen.length === 0 ? (
            <p className="board__empty">Select at least one function to begin.</p>
          ) : (
            <ol className="timeline">
              {chosen.map((o, i) => (
                <li key={o.id} style={{ '--i': i }}>
                  <span className="timeline__no">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <small>{o.when}</small>
                    <h3>{o.name}</h3>
                    <p>{o.hint}</p>
                  </div>
                  <span className="timeline__look">{o.looks.join(' / ')}</span>
                </li>
              ))}
            </ol>
          )}
          <div className="board__actions">
            <a className={`btn btn--gold${chosen.length ? '' : ' is-disabled'}`} href={chosen.length ? waLink(message) : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!chosen.length}>
              <WhatsAppIcon size={18} /> Send my plan on WhatsApp
            </a>
            <button className="btn btn--line" onClick={() => scrollToId('book')} disabled={!chosen.length}>
              Book with this plan <Arrow />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
