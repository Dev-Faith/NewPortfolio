const socials = [
  { name: 'GitHub', href: 'https://github.com/Dev-Faith/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/adebayo-faith-eyitope-1b4502185/' },
  { name: 'X / Twitter', href: 'https://x.com/FaithMuyiwa' },
];

export default function Footer() {
  return (
    <footer className="atelier-footer">
      <div className="footer-top"><a href="#home" className="footer-wordmark" aria-label="Muyiwa home">muyiwa<span>®</span></a><p>Considered code.<br /><em>Lasting impressions.</em></p><a href="#home" className="footer-back">BACK TO TOP <span aria-hidden="true">↑</span></a></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} FAITH ADEBAYO MUYIWA</span><nav aria-label="Social links">{socials.map(social => <a href={social.href} key={social.name} target="_blank" rel="noopener noreferrer">{social.name}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>)}</nav><span className="footer-location"><i /> MADE IN NIGERIA. FOR THE WORLD.</span></div>
    </footer>
  );
}
