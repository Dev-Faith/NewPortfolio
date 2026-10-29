import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const toolkit = {
  Frontend: [['React / Next.js', 'Interfaces with purpose'], ['TypeScript', 'Clarity at every scale'], ['React Native / Expo', 'Experiences beyond the browser'], ['Tailwind CSS', 'Details, thoughtfully composed']],
  Backend: [['NestJS / Node.js', 'Structure behind the experience'], ['PostgreSQL / Prisma', 'Data built on solid foundations'], ['REST APIs', 'Connecting the moving parts'], ['Authentication', 'Secure by design']],
  Creative: [['Three.js', 'A new dimension of interaction'], ['GSAP', 'Motion with intention'], ['Framer Motion', 'Small moments that feel right'], ['Responsive design', 'Considered at every size']],
};
const email = 'adebayofaith0@gmail.com';
const localTime = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());

export default function About() {
  const root = useRef(null);
  const resetTimer = useRef(null);
  const [active, setActive] = useState('Frontend');
  const [copyStatus, setCopyStatus] = useState('');
  const [time, setTime] = useState(localTime);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(localTime()), 30000);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray('[data-about-reveal]').forEach(element => {
          gsap.from(element, { y: 32, opacity: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
        });
        gsap.fromTo('.about-portrait img', { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.about-portrait', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      }, root);
      return () => context.revert();
    });
    return () => { window.clearInterval(timer); window.clearTimeout(resetTimer.current); media.revert(); };
  }, []);

  const copyEmail = async () => {
    window.clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('Email copied');
    } catch {
      setCopyStatus('Could not copy. Use the email link instead.');
    }
    resetTimer.current = window.setTimeout(() => setCopyStatus(''), 4000);
  };

  return (
    <section id="about" ref={root} className="atelier-about">
      <div className="about-section-label" data-about-reveal><span><i /> THE PERSON BEHIND THE PIXELS</span><span>01 / ABOUT</span></div>
      <header className="about-heading" data-about-reveal>
        <h2>Equal parts logic.<br /><em>A little more soul.</em></h2>
        <p>Good software should do more than work.<br />It should feel like someone cared.</p>
      </header>

      <div className="about-main">
        <figure className="about-portrait" data-about-reveal>
          <div className="portrait-window"><img src="/assets/faith-adebayo-muyiwa.png" alt="Faith Adebayo Muyiwa in a suit, full-stack developer" loading="lazy" width="640" height="640" /></div>
          <div className="portrait-corner" aria-hidden="true">+</div>
          <figcaption><span>FAITH ADEBAYO MUYIWA</span><span>DEVELOPER & MAKER</span></figcaption>
          <span className="portrait-note">A HUMAN, BEFORE ANYTHING ELSE.</span>
        </figure>

        <div className="about-story">
          <div className="about-intro" data-about-reveal><span className="about-micro">A LITTLE ABOUT ME</span><h3>Curiosity is the starting point.<br />Craft is what comes next.</h3><p>I’m Faith Adebayo Muyiwa, known in tech as Muyiwa — a full-stack developer based in Minna, Nigeria. For over four years, I’ve been turning complex ideas into digital products that are simple to use and hard to forget.</p><p>I move between frontend detail and backend architecture, with a particular love for expressive motion, immersive 3D, and the small interactions that make a product feel alive.</p></div>
          <div className="about-toolkit" data-about-reveal>
            <div className="toolkit-heading"><span className="about-micro">MY TOOLKIT</span><span>ALWAYS EVOLVING ↗</span></div>
            <div className="toolkit-tabs" role="tablist" aria-label="Development disciplines">
              {Object.keys(toolkit).map(category => <button key={category} id={`tab-${category}`} role="tab" aria-selected={active === category} aria-controls="toolkit-panel" tabIndex={active === category ? 0 : -1} onClick={() => setActive(category)} onKeyDown={event => {
                const keys = Object.keys(toolkit);
                const index = keys.indexOf(category);
                const next = event.key === 'ArrowRight' ? keys[(index + 1) % keys.length] : event.key === 'ArrowLeft' ? keys[(index + keys.length - 1) % keys.length] : event.key === 'Home' ? keys[0] : event.key === 'End' ? keys[keys.length - 1] : null;
                if (next) { event.preventDefault(); setActive(next); document.getElementById(`tab-${next}`)?.focus(); }
              }}>{category}<span>{active === category ? '−' : '+'}</span></button>)}
            </div>
            <div id="toolkit-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0}>
              {toolkit[active].map(([name, description], index) => <div className="toolkit-row" key={name}><span className="toolkit-index">0{index + 1}</span><span>{name}</span><span className="toolkit-detail">{description}</span><span className="toolkit-dot" /></div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="about-bottom">
        <div className="about-location" data-about-reveal>
          <div className="location-globe" aria-hidden="true"><svg viewBox="0 0 220 220" fill="none"><circle cx="110" cy="110" r="86" /><ellipse cx="110" cy="110" rx="39" ry="86" /><ellipse cx="110" cy="110" rx="68" ry="86" /><ellipse cx="110" cy="110" rx="86" ry="32" /><ellipse cx="110" cy="110" rx="86" ry="62" /><path d="M24 110h172M110 24v172" /><ellipse className="globe-orbit" cx="110" cy="110" rx="107" ry="38" transform="rotate(-32 110 110)" /><circle className="globe-pin-halo" cx="88" cy="104" r="10" /><circle className="globe-pin" cx="88" cy="104" r="3" /></svg></div>
          <div className="location-copy"><span className="about-micro">ROOTED LOCALLY. CONNECTED GLOBALLY.</span><h3>From Nigeria.<br /><em>To wherever you are.</em></h3><p>Open to remote collaborations across time zones.</p><div className="location-meta"><span className="location-live" /> MINNA, NG <span className="location-time">{time} WAT · UTC+1</span></div></div>
        </div>
        <div className="about-invitation" data-about-reveal><span className="about-micro">GOOD THINGS START WITH A CONVERSATION</span><a className="about-talk" href="#contact">Have something<br />in mind? <em>Let’s talk.</em><span aria-hidden="true">↗</span></a><div className="about-email-row"><a href={`mailto:${email}`}>{email}</a><button onClick={copyEmail} aria-label="Copy email address" title="Copy email address">{copyStatus === 'Email copied' ? '✓' : <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="7" y="7" width="9" height="10" rx="1" /><path d="M12 7V3H3v10h4" /></svg>}</button></div><p className="about-copy-status" role="status">{copyStatus}</p></div>
      </div>
      <div className="about-footnote"><span>THOUGHTFUL BY DESIGN. PRECISE BY NATURE.</span><a href="#work">NEXT UP — SELECTED WORK <span>↓</span></a></div>
    </section>
  );
}
