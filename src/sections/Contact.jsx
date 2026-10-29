import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ContactSculpture = lazy(() => import('../components/ContactSculpture'));
gsap.registerPlugin(ScrollTrigger);
const RECIPIENT_EMAIL = 'adebayofaith0@gmail.com';
const interests = ['A new project', 'Join your team', 'Something else'];

export default function Contact() {
  const root = useRef(null);
  const sending = useRef(false);
  const successHeading = useRef(null);
  const [interest, setInterest] = useState('A new project');
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray('[data-contact-reveal]').forEach(element => {
          gsap.from(element, { y: 35, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
        });
        gsap.fromTo('.contact-statement em', { backgroundPosition: '100% 50%' }, { backgroundPosition: '0% 50%', ease: 'none', scrollTrigger: { trigger: '.contact-statement', start: 'top 90%', end: 'bottom 35%', scrub: 1 } });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  useEffect(() => { if (status === 'success') successHeading.current?.focus(); }, [status]);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(previous => ({ ...previous, [name]: value }));
    if (status === 'error' || status === 'invalid') setStatus('idle');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (sending.current) return;
    if (!form.name.trim() || !form.message.trim()) {
      setStatus('invalid');
      return;
    }
    sending.current = true;
    setStatus('sending');
    try {
      await emailjs.send('service_d0gj3b1', 'template_zui6iq6', {
        from_name: form.name.trim(), to_name: 'Muyiwa', from_email: form.email.trim(),
        to_email: RECIPIENT_EMAIL, reply_to: form.email.trim(),
        message: `Interested in: ${interest}\n\n${form.message.trim()}`,
      }, 'f4EKJAupzyKpvw2wA');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  };

  return (
    <section id="contact" className="atelier-contact" ref={root} aria-labelledby="contact-title">
      <div className="about-section-label" data-contact-reveal><span><i /> EVERY GOOD THING STARTS SOMEWHERE</span><span>04 / SAY HELLO</span></div>
      <header className="contact-statement" data-contact-reveal><h2 id="contact-title">Let’s make<br /><em>something matter.</em><span className="contact-title-star" aria-hidden="true">✳</span></h2><div className="contact-statement-foot"><p>Your ambition. My craft.<br />A little conversation could go a long way.</p><a href="#contact-form" aria-label="Start a conversation"><span aria-hidden="true">↓</span></a></div></header>

      <div className="contact-body">
        <div className="contact-connection" data-contact-reveal><div className="contact-art-heading"><span className="about-micro">GOOD CONNECTIONS. GREAT POSSIBILITIES.</span><span aria-hidden="true">+</span></div><Suspense fallback={<div className="contact-sculpture" />}><ContactSculpture /></Suspense><div className="contact-direct"><span className="about-micro">PREFER TO KEEP IT SIMPLE?</span><a href={`mailto:${RECIPIENT_EMAIL}`}>{RECIPIENT_EMAIL}<span aria-hidden="true">↗</span></a><div className="contact-availability"><i /> OPEN TO SELECT PROJECTS & OPPORTUNITIES</div></div></div>

        <div id="contact-form" className="contact-form-panel" data-contact-reveal>
          {status === 'success' ? <div className="contact-success"><span className="contact-success-mark" aria-hidden="true">↗</span><span className="about-micro">A GOOD BEGINNING</span><h3 ref={successHeading} tabIndex={-1}>Message received.<br /><em>Possibilities ahead.</em></h3><p>Thanks for reaching out. Your message is on its way to me, and I look forward to learning more.</p><button type="button" onClick={() => { setStatus('idle'); setInterest(interests[0]); }}>Start another conversation <span aria-hidden="true">↗</span></button></div> : <form onSubmit={handleSubmit} aria-busy={status === 'sending'}>
            <div className="contact-form-heading"><span className="about-micro">TELL ME WHAT YOU HAVE IN MIND</span><span>LET’S BEGIN ↙</span></div>
            <fieldset disabled={status === 'sending'} className="contact-intent"><legend>I’m here for…</legend><div>{interests.map(item => <button type="button" key={item} aria-pressed={interest === item} onClick={() => setInterest(item)}><span aria-hidden="true">{interest === item ? '↗' : '+'}</span>{item}</button>)}</div></fieldset>
            <fieldset disabled={status === 'sending'} className="contact-fields"><legend className="sr-only">Your contact details and message</legend><div className="contact-name-email"><label><span><b>01</b> What’s your name?</span><input type="text" name="name" autoComplete="name" maxLength={120} value={form.name} onChange={handleChange} required placeholder="Your name" /></label><label><span><b>02</b> Your email address</span><input type="email" name="email" autoComplete="email" maxLength={254} value={form.email} onChange={handleChange} required placeholder="you@company.com" /></label></div><label className="contact-message"><span><b>03</b> What are we creating?</span><textarea name="message" value={form.message} onChange={handleChange} required maxLength={5000} rows={4} placeholder="An idea, a challenge, a possibility… I’m listening." /><span className="contact-message-count" aria-hidden="true">{String(form.message.length).padStart(3, '0')} / 5000</span></label></fieldset>
            <div className="contact-send-row"><p>A real person.<br />A thoughtful reply.</p><button type="submit" disabled={status === 'sending'} className="contact-send"><span>{status === 'sending' ? 'Sending your message' : 'Send your message'}</span><span className={status === 'sending' ? 'contact-send-spinner' : 'contact-send-arrow'} aria-hidden="true">{status === 'sending' ? '' : '↗'}</span></button></div>
            <div className="contact-form-status" role="status" aria-live="polite">{status === 'error' && <p>The message couldn’t be sent. Your draft is still here — try again, or <a href={`mailto:${RECIPIENT_EMAIL}`}>email me directly ↗</a>.</p>}{status === 'invalid' && <p>Please add your name and a message before sending.</p>}{status === 'sending' && <span>Making the connection…</span>}</div>
          </form>}
        </div>
      </div>
      <div className="contact-signoff" aria-hidden="true"><span>THOUGHTFULLY BUILT.</span><span>PERSONALLY CRAFTED.</span><span>ALWAYS EVOLVING.</span></div>
    </section>
  );
}

