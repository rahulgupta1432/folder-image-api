import { useMemo, useState } from 'react';
import { business, occasions, waLink } from '../content.js';
import { Kicker, Arrow, WhatsAppIcon } from './ui.jsx';

// PLACEHOLDER slots: replace with Groom2B's real appointment times.
const SLOTS = ['11:00', '12:30', '14:00', '15:30', '17:00', '18:30', '20:00'];
const TYPES = [
  { id: 'store', title: 'In-store styling', text: 'A private session at our Jubilee Hills store.', dur: '60–90 min' },
  { id: 'video', title: 'Video consultation', text: 'For grooms anywhere in India or the USA.', dur: '30–45 min' },
];

const fmt = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

function nextDays(n) {
  const out = [];
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  for (let i = 1; i <= n; i++) { const d = new Date(t); d.setDate(t.getDate() + i); out.push(d); }
  return out;
}

function downloadIcs({ type, date, slot, name }) {
  const [h, m] = slot.split(':').map(Number);
  const start = new Date(date); start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const z = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Groom2B//Booking//EN', 'BEGIN:VEVENT',
    `UID:${Date.now()}@groom2b`, `DTSTAMP:${z(new Date())}`, `DTSTART:${z(start)}`, `DTEND:${z(end)}`,
    `SUMMARY:Groom2B ${type.title}`,
    `DESCRIPTION:Styling appointment for ${name}`,
    `LOCATION:${type.id === 'store' ? business.address.replace(/,/g, '\\,') : 'Video call'}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'groom2b-appointment.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export default function Booking({ selected, setSelected }) {
  const days = useMemo(() => nextDays(14), []);
  const [step, setStep] = useState(0);
  const [type, setType] = useState(null);
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', city: '', wedding: '', notes: '' });
  const [errors, setErrors] = useState({});

  const t = TYPES.find((x) => x.id === type);
  const chosenOcc = occasions.filter((o) => selected.includes(o.id));
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const toggleOcc = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = 'Please enter your name';
    if (form.phone.replace(/\D/g, '').length < 8) err.phone = 'Please enter a valid phone number';
    setErrors(err);
    if (!Object.keys(err).length) setStep(3);
  };

  const summary =
    `Hello Groom2B! I'd like to book a ${t?.title.toLowerCase()}.\n\n` +
    `Date: ${date ? fmt(date) : ''} at ${slot}\nName: ${form.name}\nPhone: ${form.phone}` +
    (form.city ? `\nCity: ${form.city}` : '') +
    (form.wedding ? `\nWedding date: ${form.wedding}` : '') +
    (chosenOcc.length ? `\nFunctions: ${chosenOcc.map((o) => o.name).join(', ')}` : '') +
    (form.notes ? `\nNotes: ${form.notes}` : '');

  const reset = () => { setStep(0); setType(null); setDate(null); setSlot(null); setForm({ name: '', phone: '', city: '', wedding: '', notes: '' }); };
  const stepsLabel = ['Visit type', 'Date & time', 'Your details'];

  return (
    <section className="book" id="book">
      <div className="container book__grid">
        <div className="book__intro">
          <Kicker light>Book an Appointment</Kicker>
          <h2 data-reveal>Let's find <em>your look</em></h2>
          <p data-reveal>
            Tell us about your celebration and we'll have looks ready before you arrive. Bring your
            family, your ideas and your wedding dates.
          </p>
          <ol className="book__how" data-reveal>
            <li><b>01</b> Choose a store visit or a video call</li>
            <li><b>02</b> Pick a time that suits you</li>
            <li><b>03</b> Our stylist confirms on WhatsApp</li>
          </ol>
        </div>

        <div className="book__panel">
          {step < 3 && (
            <div className="stepper" aria-label="Booking progress">
              {stepsLabel.map((s, i) => (
                <button key={s} className={`stepper__item${i === step ? ' is-on' : ''}${i < step ? ' is-done' : ''}`} onClick={() => i < step && setStep(i)} disabled={i > step}>
                  <span>{i < step ? '✓' : i + 1}</span>{s}
                </button>
              ))}
            </div>
          )}

          {step === 0 && (
            <div className="step" key="s0">
              <h3>How would you like to meet?</h3>
              <div className="options">
                {TYPES.map((x) => (
                  <button key={x.id} className={`option${type === x.id ? ' is-on' : ''}`} onClick={() => setType(x.id)} aria-pressed={type === x.id}>
                    <span className="option__radio" aria-hidden="true" />
                    <span className="option__body"><b>{x.title}</b><span>{x.text}</span></span>
                    <span className="option__dur">{x.dur}</span>
                  </button>
                ))}
              </div>
              <div className="step__nav">
                <span />
                <button className="btn btn--gold" disabled={!type} onClick={() => setStep(1)}>Continue <Arrow /></button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="step" key="s1">
              <h3>Choose a date</h3>
              <div className="dates" role="listbox" aria-label="Available dates">
                {days.map((d) => {
                  const on = date && d.getTime() === date.getTime();
                  return (
                    <button key={d.toISOString()} role="option" aria-selected={on} className={`date${on ? ' is-on' : ''}`} onClick={() => { setDate(d); setSlot(null); }}>
                      <small>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</small>
                      <b>{d.getDate()}</b>
                      <small>{d.toLocaleDateString('en-IN', { month: 'short' })}</small>
                    </button>
                  );
                })}
              </div>
              <h3 className="step__sub">Choose a time {type === 'video' && <small>(IST)</small>}</h3>
              <div className="slots">
                {SLOTS.map((s) => (
                  <button key={s} className={`slot${slot === s ? ' is-on' : ''}`} disabled={!date} onClick={() => setSlot(s)}>{s}</button>
                ))}
              </div>
              <div className="step__nav">
                <button className="btn btn--text" onClick={() => setStep(0)}><Arrow dir="left" /> Back</button>
                <button className="btn btn--gold" disabled={!date || !slot} onClick={() => setStep(2)}>Continue <Arrow /></button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form className="step" key="s2" onSubmit={submit} noValidate>
              <h3>Your details</h3>
              <div className="fields">
                <label className={`field${errors.name ? ' has-err' : ''}`}>
                  <span>Full name *</span>
                  <input value={form.name} onChange={set('name')} autoComplete="name" />
                  {errors.name && <em>{errors.name}</em>}
                </label>
                <label className={`field${errors.phone ? ' has-err' : ''}`}>
                  <span>Phone / WhatsApp *</span>
                  <input value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder="+91 or +1" />
                  {errors.phone && <em>{errors.phone}</em>}
                </label>
                <label className="field">
                  <span>City</span>
                  <input value={form.city} onChange={set('city')} placeholder={type === 'video' ? 'e.g. Dallas, USA' : 'e.g. Hyderabad'} />
                </label>
                <label className="field">
                  <span>Wedding date</span>
                  <input value={form.wedding} onChange={set('wedding')} type="date" />
                </label>
              </div>
              <div className="field">
                <span>Functions you're shopping for</span>
                <div className="mini-chips">
                  {occasions.map((o) => (
                    <button type="button" key={o.id} className={selected.includes(o.id) ? 'is-on' : ''} onClick={() => toggleOcc(o.id)} aria-pressed={selected.includes(o.id)}>{o.name}</button>
                  ))}
                </div>
              </div>
              <label className="field">
                <span>Anything we should know?</span>
                <textarea rows="3" value={form.notes} onChange={set('notes')} placeholder="Colours you love, family traditions, budget range…" />
              </label>
              <div className="step__nav">
                <button type="button" className="btn btn--text" onClick={() => setStep(1)}><Arrow dir="left" /> Back</button>
                <button type="submit" className="btn btn--gold">Review Booking <Arrow /></button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="step confirm" key="s3">
              <div className="confirm__seal" aria-hidden="true">✓</div>
              <h3>Almost done, {form.name.split(' ')[0]}</h3>
              <p>Send your request to Groom2B on WhatsApp and our stylist will confirm your slot.</p>
              <dl className="confirm__sum">
                <div><dt>Appointment</dt><dd>{t.title}</dd></div>
                <div><dt>When</dt><dd>{fmt(date)} · {slot}</dd></div>
                {chosenOcc.length > 0 && <div><dt>Functions</dt><dd>{chosenOcc.map((o) => o.name).join(', ')}</dd></div>}
                <div><dt>Where</dt><dd>{type === 'store' ? 'Jubilee Hills store' : 'Video call'}</dd></div>
              </dl>
              <div className="confirm__actions">
                <a className="btn btn--gold" href={waLink(summary)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} /> Confirm on WhatsApp</a>
                <button className="btn btn--line" onClick={() => downloadIcs({ type: t, date, slot, name: form.name })}>Add to Calendar</button>
              </div>
              <button className="btn btn--text confirm__again" onClick={reset}>Start a new booking</button>
              <p className="demo-note">Demo booking flow · connects to Groom2B's WhatsApp once their number is added</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
