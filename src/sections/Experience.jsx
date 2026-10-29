import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workExperiences } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const roleNotes = {
  4: {
    company: 'BridgePay', type: 'FINTECH', dates: 'NOV 2025 — PRESENT',
    summary: 'Building the connections between a reliable backend and a thoughtful customer experience.',
    contributions: ['Engineered the platform end to end, connecting backend infrastructure with the frontend interface.', 'Built modular services, secure authentication, and database workflows with NestJS, Prisma, and PostgreSQL.', 'Worked with stakeholders and the engineering team to turn product requirements into working systems.'],
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'Neon'],
  },
  2: {
    company: 'Ubakco', type: 'LOGISTICS · FREELANCE', dates: 'AUG — SEP 2025',
    summary: 'Translating a delivery platform’s visual language into a responsive, accessible interface.',
    contributions: ['Built the delivery web application’s frontend from the supplied UI designs.', 'Created responsive components using Next.js, TypeScript, ShadCN, and Tailwind CSS.', 'Collaborated with the design team on visual consistency and accessibility.'],
    stack: ['Next.js', 'TypeScript', 'ShadCN', 'Tailwind CSS'],
  },
  1: {
    company: 'BridgePay', type: 'FINTECH · INTERNSHIP', dates: 'JUN — NOV 2025',
    summary: 'Helping customers and administrators navigate the everyday complexity of payments.',
    contributions: ['Collaborated with a cross-functional team on customer and admin dashboards.', 'Integrated REST APIs and refined performance across key product flows.', 'Delivered responsive interfaces with Next.js, RTK, TanStack Query, and Framer Motion.'],
    stack: ['Next.js', 'TypeScript', 'RTK', 'TanStack Query', 'Framer Motion'],
  },
  3: {
    company: 'Dradiant Bags', type: 'E-COMMERCE', dates: 'AUG 2024 — FEB 2025',
    summary: 'Bringing a commerce experience to life, from the storefront to the systems behind it.',
    contributions: ['Delivered the frontend from design requirements using reusable, responsive components.', 'Built with Next.js, TypeScript, ShadCN, and Tailwind CSS.', 'Supported the product architecture across frontend and backend development.'],
    stack: ['Next.js', 'TypeScript', 'ShadCN', 'Tailwind CSS'],
  },
};
const roles = [4, 2, 1, 3].map(id => ({ ...workExperiences.find(role => role.id === id), ...roleNotes[id] }));

export default function Experience() {
  const root = useRef(null);
  const [expanded, setExpanded] = useState([4]);

  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray('[data-career-reveal]').forEach(element => {
          gsap.from(element, { opacity: 0, y: 28, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
        });
        gsap.fromTo('.career-rail-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.career-timeline', start: 'top 75%', end: 'bottom 75%', scrub: 0.7 } });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  const toggleRole = id => setExpanded(previous => previous.includes(id) ? previous.filter(item => item !== id) : [...previous, id]);

  return (
    <section id="experience" ref={root} className="atelier-career" aria-labelledby="career-title">
      <div className="about-section-label" data-career-reveal><span><i /> THE WORK BEHIND THE WORK</span><span>03 / EXPERIENCE</span></div>
      <header className="career-heading" data-career-reveal><h2 id="career-title">Built over time.<br /><em>Better with every chapter.</em></h2><p>Different teams. New challenges.<br />The same attention to the details that matter.</p></header>

      <div className="career-layout">
        <aside className="career-perspective" aria-label="Professional approach" data-career-reveal>
          <div className="career-tenure"><span>4<span>+</span></span><p>YEARS OF TURNING<br />IDEAS INTO EXPERIENCES</p></div>
          <div className="career-blueprint" aria-hidden="true">
            <svg viewBox="0 0 280 210" fill="none"><defs><linearGradient id="career-copper" x1="50" y1="0" x2="220" y2="210" gradientUnits="userSpaceOnUse"><stop stopColor="#bd9678" /><stop offset="1" stopColor="#bd9678" stopOpacity="0.15" /></linearGradient></defs><path className="blueprint-guide" d="M30 170 140 108 250 170M140 108V14M30 67l110 63 110-63M30 108l110 63 110-63" /><g className="blueprint-base"><path d="m140 82 91 52-91 52-91-52 91-52Z" /><path d="m49 134 91 52 91-52v16l-91 52-91-52v-16Z" /></g><g className="blueprint-middle"><path d="m140 48 75 43-75 43-75-43 75-43Z" /><path d="M65 91v15l75 43 75-43V91M140 134v15" /></g><g className="blueprint-top"><path d="m140 15 55 32-55 32-55-32 55-32Z" /><path d="M85 47v14l55 32 55-32V47M140 79v14" /></g><circle cx="140" cy="47" r="3" fill="#bd9678" stroke="none" /><path className="blueprint-guide" d="M22 191h28M36 177v28M230 20h28M244 6v28" /></svg>
            <span>INTERFACE → INFRASTRUCTURE</span>
          </div>
          <h3>A wider perspective.<br /><em>A stronger foundation.</em></h3><p className="career-philosophy">Every role adds another layer — how I think, how I collaborate, and how I build products that hold together.</p>
          <div className="career-current"><span className="career-live-dot" /><div><span>CURRENT CHAPTER</span><p>Full-Stack Engineer · BridgePay</p></div></div>
        </aside>

        <div className="career-timeline">
          <div className="career-rail" aria-hidden="true"><span className="career-rail-fill" /></div>
          {roles.map((role, index) => {
            const open = expanded.includes(role.id);
            return (
              <article key={role.id} className={`career-entry ${role.id === 4 ? 'is-current' : ''} ${open ? 'is-expanded' : ''}`} data-career-reveal>
                <span className="career-node" aria-hidden="true"><span /></span>
                <div className="career-entry-meta"><span>{role.dates}</span>{role.id === 4 ? <span className="career-current-badge"><i /> CURRENT ROLE</span> : <span className="career-chapter">CHAPTER 0{roles.length - index}</span>}</div>
                <div className="career-entry-heading"><img src={role.icon} alt="" width="40" height="40" loading="lazy" /><div><span className="career-company">{role.company}</span><span className="career-industry">{role.type}</span></div></div>
                <h3><button id={`career-trigger-${role.id}`} onClick={() => toggleRole(role.id)} aria-expanded={open} aria-controls={`career-detail-${role.id}`}><span>{role.pos}</span><span className="career-toggle" aria-hidden="true"><i /><i /></span></button></h3>
                <p className="career-summary">{role.summary}</p>
                <div id={`career-detail-${role.id}`} className="career-detail" role="region" aria-labelledby={`career-trigger-${role.id}`} aria-hidden={!open} onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === 'grid-template-rows') ScrollTrigger.refresh(); }}><div className="career-detail-inner"><div className="career-contributions"><span className="about-micro">THE CONTRIBUTION</span><ul>{role.contributions.map(item => <li key={item}>{item}</li>)}</ul><div className="career-technologies" aria-label="Technologies used">{role.stack.map(name => <span key={name}>{name}</span>)}</div></div></div></div>
                <button className="career-detail-link" onClick={() => toggleRole(role.id)} aria-expanded={open} aria-controls={`career-detail-${role.id}`}>{open ? 'LESS DETAIL' : 'EXPLORE THE ROLE'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
              </article>
            );
          })}
        </div>
      </div>
      <div className="career-next" data-career-reveal><div><span className="about-micro">THE NEXT CHAPTER</span><p>Something meaningful.<em> Built together.</em></p></div><a href="#contact">Let’s make it happen <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
