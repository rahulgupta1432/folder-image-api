import { photos } from '../content.js';

/** Brand photo (optimised WebP), lazy-loaded below the fold. */
export function Photo({ name, className = '', eager = false, style }) {
  const p = photos[name];
  return (
    <picture className={className} style={style}>
      <img src={p.webp} alt={p.alt} width="392" height="456" loading={eager ? 'eager' : 'lazy'} decoding="async" fetchpriority={eager ? 'high' : 'auto'} />
    </picture>
  );
}

export function Kicker({ children, light }) {
  return <span className={`kicker${light ? ' kicker--light' : ''}`}>{children}</span>;
}

export function Arrow({ dir = 'right' }) {
  const d = { right: 'M4 12h15m-5-6 6 6-6 6', left: 'M20 12H5m5-6-6 6 6 6', down: 'M12 4v15m-6-5 6 6 6-6', up: 'M12 20V5m-6 5 6-6 6 6' }[dir];
  return (
    <svg className="ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.8-1.1-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6-.3.4c-.1.1-.2.3-.1.5.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.2.1.4.1.5-.1l.7-.9c.2-.2.4-.2.6-.1l1.9.9c.3.1.4.2.5.3 0 .2 0 .8-.2 1.4z" />
    </svg>
  );
}

/** Ornamental divider used sparingly between headings and body copy. */
export function Ornament({ className = '' }) {
  return (
    <svg className={`ornament ${className}`} width="88" height="14" viewBox="0 0 88 14" fill="none" aria-hidden="true">
      <path d="M0 7h34M54 7h34" stroke="currentColor" strokeWidth=".8" />
      <path d="M44 1l6 6-6 6-6-6z" stroke="currentColor" strokeWidth=".8" />
      <circle cx="44" cy="7" r="1.4" fill="currentColor" />
    </svg>
  );
}

export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
