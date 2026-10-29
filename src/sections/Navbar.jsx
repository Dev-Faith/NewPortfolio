import { useState } from 'react';
import { navLinks } from '../constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="atelier-nav">
      <a href="#home" className="atelier-wordmark" aria-label="Muyiwa home">muyiwa<span>®</span></a>
      <button className="atelier-menu" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-controls="main-navigation">{isOpen ? 'Close −' : 'Menu +'}</button>
      <nav id="main-navigation" className={isOpen ? 'atelier-links is-open' : 'atelier-links'} aria-label="Main navigation">
        {navLinks.map(({ id, href, name }) => <a key={id} href={href} onClick={() => setIsOpen(false)}><span>0{id}</span>{name}{name === 'Contact' && <b>↗</b>}</a>)}
      </nav>
    </header>
  );
}
