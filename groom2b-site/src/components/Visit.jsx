import { business, waLink } from '../content.js';
import { Kicker, Arrow, WhatsAppIcon, scrollToId } from './ui.jsx';

export default function Visit() {
  const q = encodeURIComponent(business.mapsQuery);
  return (
    <section className="visit" id="visit">
      <div className="container visit__grid">
        <div className="visit__info">
          <Kicker>Visit the Store</Kicker>
          <h2 data-reveal>Jubilee Hills, <em>Hyderabad</em></h2>
          <dl className="visit__list" data-reveal>
            <div><dt>Address</dt><dd>{business.address}</dd></div>
            <div>
              <dt>Hours</dt>
              <dd>{business.hours.map(([d, h]) => <span key={d} className="visit__hours"><b>{d}</b><span className="ph">{h}</span></span>)}</dd>
            </div>
            <div><dt>WhatsApp</dt><dd><span className="ph">{business.phoneDisplay}</span></dd></div>
            <div><dt>Instagram</dt><dd><a href={business.instagram} target="_blank" rel="noopener noreferrer">{business.instagramHandle}</a></dd></div>
          </dl>
          <div className="visit__actions" data-reveal>
            <a className="btn btn--dark" href={`https://www.google.com/maps/dir/?api=1&destination=${q}`} target="_blank" rel="noopener noreferrer">Get Directions <Arrow /></a>
            <a className="btn btn--line-dark" href={waLink('Hello Groom2B, I would like to visit your store.')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> Chat with us</a>
          </div>
          <p className="visit__usa" data-reveal>
            <strong>Planning from the USA?</strong> Book a video consultation and we'll style you from wherever you are.{' '}
            <button className="link-inline" onClick={() => scrollToId('book')}>Book a video call</button>
          </p>
        </div>
        <div className="visit__map" data-reveal>
          <iframe
            title="Groom2B location on Google Maps"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <span className="visit__pin">Opposite Peddammathalli Temple</span>
        </div>
      </div>
    </section>
  );
}
