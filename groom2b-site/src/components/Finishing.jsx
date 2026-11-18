import { finishing, highlights } from '../content.js';
import { Kicker, Ornament } from './ui.jsx';

export default function Finishing() {
  return (
    <section className="finishing">
      <div className="container">
        <div className="section-head section-head--center">
          <Kicker>Complete the Look</Kicker>
          <h2 data-reveal>Head to toe, <em>sorted</em></h2>
          <Ornament />
        </div>
        <div className="finishing__row">
          {finishing.map((f, i) => (
            <figure key={f.title} className="finishing__item" data-reveal style={{ '--rd': `${i * 0.12}s` }}>
              <div className="finishing__img">
                <img src={highlights[f.image]} alt={f.title} loading="lazy" width="240" height="240" />
              </div>
              <figcaption>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
