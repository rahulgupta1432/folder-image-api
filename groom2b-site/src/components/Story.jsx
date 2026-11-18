import { business } from '../content.js';
import { Kicker, Ornament } from './ui.jsx';

const categories = ['Pattu Pancha', 'Sherwani', 'Wedding Suits', 'Tuxedos', 'Jodhpuri', 'Indo-Western', 'Kurta', 'Sadri'];

export default function Story() {
  return (
    <section className="story" id="story">
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...categories, ...categories].map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>
      <div className="container story__inner">
        <Kicker>Our Story</Kicker>
        <p className="story__statement" data-reveal>
          Every wedding has many chapters, and the groom deserves to look his best in every one.
          At <em>Groom2B</em> we dress you for each of them, from the first ritual to the last dance.
        </p>
        <Ornament className="story__orn" />
        <div className="story__cols" data-reveal>
          <p>
            From our home in Jubilee Hills, opposite the Peddammathalli temple, we style grooms for
            every celebration. We bring together traditional South Indian silks, regal North Indian
            silhouettes and modern evening wear under one roof.
          </p>
          <p>
            Whether you are getting married in Hyderabad or flying in from the USA, we help you put
            together a wardrobe that feels like you and suits your family's traditions.
            <span className="story__sign">{business.reach}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
