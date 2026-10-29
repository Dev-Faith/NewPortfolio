import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef(null);
  const hands = useRef(null);
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 32, opacity: 0, duration: 1.15, stagger: 0.13, ease: 'power3.out' });
      gsap.from('.hero-hand-stage', { opacity: 0, scale: 0.95, duration: 1.8, delay: 0.2, ease: 'power2.out' });
      gsap.to('.hero-hand-scroll', { y: -100, rotation: -3, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to('.hero-copy', { y: -70, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray('main > section:not(#home)').forEach(section => {
        gsap.from(section, { y: 45, opacity: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 92%', once: true } });
      });
    }, root.current.parentElement);
    return () => ctx.revert();
  }, [reduced]);

  const moveHands = event => {
    if (reduced || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    hands.current?.style.setProperty('--hand-x', `${x * 18}px`);
    hands.current?.style.setProperty('--hand-y', `${y * 12}px`);
    hands.current?.style.setProperty('--hand-rotation', `${x * 1.4}deg`);
  };
  const resetHands = () => {
    hands.current?.style.setProperty('--hand-x', '0px');
    hands.current?.style.setProperty('--hand-y', '0px');
    hands.current?.style.setProperty('--hand-rotation', '0deg');
  };

  return (
    <section ref={root} id="home" className="atelier-hero connection-hero" onPointerMove={moveHands} onPointerLeave={resetHands}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline hero-reveal"><span>INDEPENDENT DEVELOPER & CREATIVE THINKER</span><span className="availability"><i /> AVAILABLE FOR SELECT PROJECTS</span></div>
      <div className="hero-copy">
        <p className="hero-eyebrow hero-reveal"><span /> HUMAN INSTINCT. DIGITAL PRECISION.</p>
        <h1 className="hero-reveal">Digital craft.<br /><span>Human</span> impact<span className="copper-period">.</span></h1>
        <p className="hero-description hero-reveal">I’m Muyiwa — a full-stack developer bringing human ideas and technology together. Thoughtful experiences, built with feeling.</p>
        <div className="hero-actions hero-reveal"><a className="atelier-button" href="#work">Explore my work <span>↗</span></a><a className="hero-contact" href="#contact">Let’s talk <span>↗</span></a></div>
        <a className="hero-cv hero-reveal" href="/documents/Faith-Adebayo-Muyiwa-CV.pdf" download="Faith-Adebayo-Muyiwa-CV.pdf">Download CV <span className="hero-cv-format">PDF</span><span aria-hidden="true">↓</span></a>
      </div>
      <div className="hero-art hero-connection-art">
        <div className="hero-hand-scroll"><div className="hero-hand-stage"><div ref={hands} className="hero-hand-parallax"><img className="hero-hands-image" src="/assets/human-machine-connection.webp" width="1536" height="1024" fetchPriority="high" decoding="async" alt="A human hand and a copper-and-titanium robotic hand reach toward one another, their index fingertips almost touching." /></div></div></div>
        <span className="hand-study-label" aria-hidden="true">THE ART OF CONNECTION <span>001</span></span>
        <div className="art-caption"><span className="caption-cross" aria-hidden="true">+</span><span>HUMAN / MACHINE<br /><b>GREAT THINGS HAPPEN IN BETWEEN</b></span><span className="art-number" aria-hidden="true">↗</span></div>
      </div>
      <div className="hero-bottom hero-reveal"><a href="#about" className="scroll-cue"><span>↓</span> SCROLL TO DISCOVER</a><span>BASED IN NIGERIA · WORKING EVERYWHERE</span><span className="hero-index">HUMAN × TECHNOLOGY</span></div>
    </section>
  );
}
