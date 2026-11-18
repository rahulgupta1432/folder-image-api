import { testimonials } from '../content.js';
import { Kicker } from './ui.jsx';

/**
 * Shows real client reviews from content.js. Until they are added, a clearly marked
 * placeholder is shown. No reviews are invented.
 */
export default function Testimonials() {
  if (testimonials.length) {
    const t = testimonials[0];
    return (
      <section className="words">
        <div className="container words__inner">
          <Kicker>Kind Words</Kicker>
          <blockquote data-reveal>“{t.quote}”</blockquote>
          <p className="words__by">{t.name} · {t.occasion}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="words">
      <div className="container words__inner">
        <Kicker>Kind Words</Kicker>
        <blockquote data-reveal className="is-placeholder">“Your grooms' own words will live here.”</blockquote>
        <p className="words__by">Placeholder · add real client reviews in <code>src/content.js</code></p>
      </div>
    </section>
  );
}
