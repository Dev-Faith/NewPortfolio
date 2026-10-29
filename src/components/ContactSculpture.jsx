/* React Three Fiber uses Three.js scene properties. */
/* eslint-disable react/no-unknown-property */
import { Component, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';

function RibbonFallback() {
  return <div className="contact-ribbon-fallback" aria-hidden="true"><span /><span /><span /></div>;
}
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <RibbonFallback /> : this.props.children; }
}
SceneBoundary.propTypes = { children: () => null };

function Connection({ reduced }) {
  const mesh = useRef(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    const time = reduced ? 0 : state.clock.elapsedTime;
    const x = 0.35 + (reduced ? 0 : state.pointer.y * 0.13);
    const y = -0.3 + time * 0.075 + (reduced ? 0 : state.pointer.x * 0.2);
    mesh.current.rotation.x += (x - mesh.current.rotation.x) * Math.min(delta * 2, 1);
    mesh.current.rotation.y += (y - mesh.current.rotation.y) * Math.min(delta * 2, 1);
    mesh.current.position.y = Math.sin(time * 0.6) * 0.06;
  });
  return <mesh ref={mesh} rotation={[0.35, -0.3, -0.4]}><torusKnotGeometry args={[1.08, 0.24, 192, 32, 2, 3]} /><meshStandardMaterial color="#b68c6a" metalness={1} roughness={0.2} /></mesh>;
}
Connection.propTypes = { reduced: () => null };

export default function ContactSculpture() {
  const root = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => { setVisible(entry.isIntersecting); if (entry.isIntersecting) setLoaded(true); }, { rootMargin: '100px' });
    observer.observe(root.current);
    return () => { media.removeEventListener('change', sync); observer.disconnect(); };
  }, []);
  return <div ref={root} className="contact-sculpture" role="img" aria-label="A continuous copper knot, a sculpture about connection"><div className="contact-orbit-line" aria-hidden="true" />{loaded && <SceneBoundary><Canvas camera={{ position: [0, 0, 5.8], fov: 42 }} dpr={[1, 1.5]} frameloop={visible && !reduced ? 'always' : 'demand'} gl={{ alpha: true, antialias: true }} fallback={<RibbonFallback />}><Suspense fallback={null}><ambientLight intensity={0.4} /><directionalLight position={[3, 4, 5]} intensity={3} color="#fff0d9" /><Connection reduced={reduced} /><Environment resolution={128}><Lightformer position={[-3, 2, 3]} scale={[2, 6, 1]} intensity={6} /><Lightformer position={[4, 1, 2]} scale={[2, 5, 1]} intensity={4} color="#e0b596" /><Lightformer position={[0, -4, 2]} scale={[5, 1, 1]} intensity={3} /></Environment></Suspense></Canvas></SceneBoundary>}<span className="contact-art-index" aria-hidden="true">∞ / POSSIBILITIES</span></div>;
}
