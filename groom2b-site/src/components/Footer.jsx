import { business, waLink } from '../content.js';
import { scrollToId, WhatsAppIcon } from './ui.jsx';

export default function Footer() {
  const nav = [['collections', 'Collections'], ['planner', 'Wardrobe Planner'], ['peddamma', 'Peddamma Collection'], ['lookbook', 'Lookbook'], ['visit', 'Visit'], ['book', 'Book Appointment']];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <p className="footer__mark">GROOM<span>2</span>B</p>
            <p className="footer__tag">{business.tagline}</p>
          </div>
          <div className="footer__cols">
            <div>
              <h4>Explore</h4>
              {nav.map(([id, l]) => <button key={id} onClick={() => scrollToId(id)}>{l}</button>)}
            </div>
            <div>
              <h4>Collections</h4>
              <p>Pattu Pancha · Sherwani · Wedding Suits · Tuxedos · Jodhpuri · Indo-Western · Kurta · Sadri</p>
            </div>
            <div>
              <h4>Contact</h4>
              <p>{business.address}</p>
              <a href={business.instagram} target="_blank" rel="noopener noreferrer">Instagram {business.instagramHandle}</a>
              <a href={waLink('Hello Groom2B!')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={15} /> WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Groom2B · {business.reach}</span>
          <span>Website concept preview prepared for Groom2B's review</span>
          <button onClick={() => scrollToId('top')}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}
