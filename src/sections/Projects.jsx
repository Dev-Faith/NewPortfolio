import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { myProjects } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const projectNotes = [
  { name: 'BridgePay', category: 'FINTECH PLATFORM', role: 'Frontend engineering', headline: 'Complex payments.\nClear experiences.', stack: ['Next.js', 'TypeScript', 'RTK', 'TanStack Query', 'Tailwind CSS', 'Framer Motion'], color: '#a995b8', surface: '#302b37' },
  { name: 'Ubakco', category: 'DELIVERY & LOGISTICS', role: 'Freelance frontend development', headline: 'From first click.\nTo the final mile.', stack: ['Next.js', 'TypeScript', 'ShadCN', 'Tailwind CSS'], color: '#a7b5a0', surface: '#29352e' },
  { name: 'Dradiant Bags', category: 'E-COMMERCE EXPERIENCE', role: 'Full-stack development', headline: 'A considered home\nfor everyday essentials.', stack: ['Next.js', 'TypeScript', 'ShadCN', 'Tailwind CSS'], color: '#c5a283', surface: '#3b3028' },
];

export default function Projects() {
  const [selected, setSelected] = useState(0);
  const [reduced, setReduced] = useState(true);
  const [wantsPlayback, setWantsPlayback] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef(null);
  const video = useRef(null);
  const preview = useRef(null);
  const project = myProjects[selected];
  const notes = projectNotes[selected];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => { setReduced(preference.matches); setWantsPlayback(!preference.matches); };
    sync();
    preference.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(root.current);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.from('.work-heading', { y: 30, opacity: 0, duration: 0.9, scrollTrigger: { trigger: '.work-heading', start: 'top 92%', once: true } });
        gsap.fromTo('.work-preview-stage', { y: 22 }, { y: -16, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      }, root);
      return () => ctx.revert();
    });
    return () => { preference.removeEventListener('change', sync); observer.disconnect(); media.revert(); };
  }, []);

  useEffect(() => {
    const element = video.current;
    const updatePlayback = () => {
      if (wantsPlayback && inView && !document.hidden) element?.play().catch(() => setPlaying(false));
      else element?.pause();
    };
    updatePlayback();
    document.addEventListener('visibilitychange', updatePlayback);
    return () => { document.removeEventListener('visibilitychange', updatePlayback); element?.pause(); };
  }, [selected, wantsPlayback, inView]);

  useEffect(() => {
    if (reduced) return;
    const context = gsap.context(() => {
      gsap.from('.work-project-copy > *, .work-browser', { opacity: 0, y: 14, duration: 0.55, stagger: 0.055, ease: 'power2.out', clearProps: 'all' });
    }, root);
    return () => context.revert();
  }, [selected, reduced]);

  const selectProject = index => { setMediaError(false); setSelected((index + myProjects.length) % myProjects.length); };
  const movePreview = event => {
    if (reduced || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    preview.current?.style.setProperty('--tilt-x', `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
    preview.current?.style.setProperty('--tilt-y', `${((event.clientX - rect.left) / rect.width - 0.5) * 5}deg`);
  };
  const resetPreview = () => { preview.current?.style.setProperty('--tilt-x', '0deg'); preview.current?.style.setProperty('--tilt-y', '0deg'); };

  return (
    <section id="work" ref={root} className="atelier-work" style={{ '--project-accent': notes.color, '--project-surface': notes.surface }}>
      <div className="about-section-label"><span><i /> IDEAS, MADE REAL</span><span>02 / SELECTED WORK</span></div>
      <header className="work-heading"><h2>Built with purpose.<br /><em>Made to be experienced.</em></h2><p>A selection of products I’ve helped bring to life.<br />Real challenges. Thoughtful execution.</p></header>
      <div className="work-selector" aria-label="Choose a project">
        {myProjects.map((item, index) => <button key={item.title} onClick={() => selectProject(index)} aria-pressed={selected === index} aria-controls="featured-project"><span className="work-selector-index">0{index + 1}</span><span>{projectNotes[index].name}</span><span className="work-selector-category">{projectNotes[index].category}</span><span className="work-selector-arrow" aria-hidden="true">↗</span></button>)}
      </div>

      <article id="featured-project" className="work-feature" aria-label={project.title}>
        <div className="work-project-copy" key={`copy-${selected}`}>
          <div className="work-project-kicker"><span className="about-micro">{notes.category}</span><span>0{selected + 1} / 0{myProjects.length}</span></div>
          <h3>{notes.headline.split('\n').map((line, index) => <span key={line} className={index === 1 ? 'work-title-second' : ''}>{line}</span>)}</h3>
          <p className="work-project-description">{project.desc}</p>
          <dl className="work-project-role"><dt>MY CONTRIBUTION</dt><dd>{notes.role}</dd></dl>
          <div className="work-stack"><span className="about-micro">BUILT WITH</span><ul>{notes.stack.map(name => <li key={name}>{name}</li>)}</ul></div>
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="work-live-link">Explore {notes.name}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
        </div>
        <div className="work-preview" onPointerMove={movePreview} onPointerLeave={resetPreview}>
          <div className="work-preview-grid" aria-hidden="true" />
          <span className="work-preview-label">A CLOSER LOOK / {notes.name.toUpperCase()}</span>
          <div className="work-preview-stage"><div className="work-preview-tilt" ref={preview}>
            <div className="work-browser" key={`preview-${selected}`}>
              <div className="work-browser-bar"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span>{new URL(project.href).hostname}</span><span aria-hidden="true">↗</span></div>
              <div className="work-video-wrap">
                {mediaError ? <div className="work-video-fallback"><img src={project.logo} alt="" /><p>See {notes.name} in action.</p><a href={project.href} target="_blank" rel="noopener noreferrer">Open live website ↗</a></div> : <video key={project.texture} ref={video} src={project.texture} muted loop playsInline preload="metadata" aria-label={`${notes.name} product walkthrough`} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setMediaError(true); }} onLoadedData={event => { if (!wantsPlayback) event.currentTarget.currentTime = 0.1; }} />}
              </div>
              <div className="work-browser-footer"><span><i /> {playing ? 'PLAYING WALKTHROUGH' : 'PRODUCT WALKTHROUGH'}</span><button disabled={mediaError} onClick={() => setWantsPlayback(previous => !previous)} aria-label={wantsPlayback ? 'Pause project preview' : 'Play project preview'}>{wantsPlayback ? 'Ⅱ PAUSE' : '▷ PLAY'}</button></div>
            </div>
          </div></div>
          <div className="work-preview-caption"><span>DESIGN MEETS DEVELOPMENT</span><span>WEB EXPERIENCE ↗</span></div>
        </div>
      </article>
      <div className="work-footer"><p role="status" aria-live="polite">SHOWING <span>0{selected + 1}</span> OF 0{myProjects.length} <span className="work-footer-name">— {notes.name}</span></p><div className="work-navigation"><button onClick={() => selectProject(selected - 1)} aria-label="Previous project">←</button><span className="work-nav-line" /><button onClick={() => selectProject(selected + 1)} aria-label="Next project">→</button></div></div>
    </section>
  );
}


