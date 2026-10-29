/* Three.js elements are rendered by React Three Fiber, not the DOM. */
/* eslint-disable react/no-unknown-property */
import { Component, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="orbit-fallback" /> : this.props.children; }
}
SceneBoundary.propTypes = { children: () => null };

function Sculpture({ progress, reduced }) {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const targetX = 0.3 + (reduced ? 0 : state.pointer.y * 0.15) + progress.current * 0.6;
    const targetY = -0.35 + (reduced ? 0 : state.pointer.x * 0.22) + t * 0.065;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 3, 1);
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 3, 1);
    group.current.position.y = Math.sin(t * 0.55) * 0.08 - progress.current * 0.65;
  });
  return (
    <group ref={group} rotation={[0.3, -0.35, -0.35]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[i * Math.PI / 3, i * Math.PI / 3, 0]}>
          <torusGeometry args={[1.68, 0.19, 32, 160]} />
          <meshStandardMaterial color={i === 1 ? '#b78763' : '#b5b5ae'} metalness={1} roughness={0.22} />
        </mesh>
      ))}
      <mesh><sphereGeometry args={[0.67, 48, 48]} /><meshStandardMaterial color="#392b22" metalness={1} roughness={0.18} /></mesh>
    </group>
  );
}
Sculpture.propTypes = { progress: () => null, reduced: () => null };

export default function Hero() {
  const root = useRef();
  const progress = useRef(0);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current);
    return () => { media.removeEventListener('change', sync); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 32, opacity: 0, duration: 1.15, stagger: 0.13, ease: 'power3.out' });
      gsap.to(progress, { current: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.to('.hero-copy', { y: -95, opacity: 0.15, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray('main > section:not(#home)').forEach(section => {
        gsap.from(section, { y: 45, opacity: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 92%', once: true } });
      });
    }, root.current.parentElement);
    return () => { ctx.revert(); progress.current = 0; };
  }, [reduced]);
  return (
    <section ref={root} id="home" className="atelier-hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-topline hero-reveal"><span>INDEPENDENT DEVELOPER & CREATIVE THINKER</span><span className="availability"><i /> AVAILABLE FOR SELECT PROJECTS</span></div>
      <div className="hero-copy">
        <p className="hero-eyebrow hero-reveal"><span /> CODE WITH INTENTION. DESIGN WITH FEELING.</p>
        <h1 className="hero-reveal">Digital craft.<br /><span>Human</span> impact<span className="copper-period">.</span></h1>
        <p className="hero-description hero-reveal">I’m Muyiwa — a full-stack developer shaping thoughtful digital experiences. From the first interaction to the final detail.</p>
        <div className="hero-actions hero-reveal"><a className="atelier-button" href="#work">Explore my work <span>↗</span></a><a className="hero-contact" href="#contact">Let’s talk <span>↗</span></a></div>
      </div>
      <div className="hero-art" role="img" aria-label="An interactive sculpture of interlocking polished metal orbits">
        <div className="art-halo" />
        <SceneBoundary>
          <Canvas camera={{ position: [0, 0, 6.7], fov: 43 }} dpr={[1, 1.5]} frameloop={visible && !reduced ? 'always' : 'demand'} gl={{ antialias: true, alpha: true }} fallback={<div className="orbit-fallback" />}>
            <ambientLight intensity={0.35} />
            <directionalLight position={[3, 5, 4]} intensity={3} color="#fff1d8" />
            <Sculpture progress={progress} reduced={reduced} />
            <Environment resolution={128}>
              <Lightformer intensity={5} position={[-3, 3, 3]} scale={[2, 7, 1]} />
              <Lightformer intensity={3} position={[4, 0, 2]} scale={[2, 5, 1]} color="#c59a77" />
              <Lightformer intensity={2} position={[0, -4, 2]} scale={[5, 1, 1]} />
            </Environment>
          </Canvas>
        </SceneBoundary>
        <div className="art-caption"><span className="caption-cross">+</span><span>FORM / FUNCTION<br /><b>AN EXPLORATION IN BALANCE</b></span><span className="art-number">001</span></div>
      </div>
      <div className="hero-bottom hero-reveal"><a href="#about" className="scroll-cue"><span>↓</span> SCROLL TO DISCOVER</a><span>BASED IN NIGERIA · WORKING EVERYWHERE</span><span className="hero-index">DESIGN × TECHNOLOGY</span></div>
    </section>
  );
}

