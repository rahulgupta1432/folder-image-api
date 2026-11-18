import { useEffect, useState } from 'react';
import { waLink } from '../content.js';
import { WhatsAppIcon, scrollToId } from './ui.jsx';

export default function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const book = document.getElementById('book');
      const inBook = book && book.getBoundingClientRect().top < window.innerHeight * 0.6 && book.getBoundingClientRect().bottom > 0;
      setShow(window.scrollY > window.innerHeight * 0.7 && !inBook);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <a className={`fab${show ? ' is-on' : ''}`} href={waLink('Hello Groom2B!')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon size={24} />
      </a>
      <div className={`mobilebar${show ? ' is-on' : ''}`}>
        <a href={waLink('Hello Groom2B!')} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> WhatsApp</a>
        <button onClick={() => scrollToId('book')}>Book Appointment</button>
      </div>
    </>
  );
}
