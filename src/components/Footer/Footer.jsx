import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const EMAIL = 'huacchillocastillo@gmail.com';

/* ── Cierre: CTA + footer en un solo bloque ── */

const Wrap = styled.footer`
  max-width: 1180px;
  margin: 0 auto;
  padding: 5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 768px) { padding: 3.5rem 1rem 1.5rem; gap: 2rem; }
`;

const Eyebrow = styled.p`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
`;

const Headline = styled.h2`
  margin-top: 0.9rem;
  max-width: 16ch;
  font-size: clamp(2.2rem, 6.5vw, 5rem);
  font-weight: 800;
  line-height: 0.95;
  text-transform: uppercase;

  em { font-style: normal; color: var(--accent); }
`;

const Contact = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
`;

// El email es el CTA: un clic lo copia
const EmailBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1.3rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line-strong);
  font-family: var(--font-mono);
  font-size: clamp(0.85rem, 2vw, 1.05rem);
  color: var(--ink);
  transition: border-color var(--dur-base) var(--ease-out);

  span {
    font-family: var(--font-text);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-pill);
    background: ${p => p.$done ? 'var(--product)' : 'var(--surface-3)'};
    color: ${p => p.$done ? 'var(--on-color)' : 'var(--ink-muted)'};
    transition: background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);
  }
  &:hover { border-color: var(--ink-faint); }
`;

const WriteBtn = styled.a`
  padding: 0.95rem 1.4rem;
  border-radius: var(--radius-pill);
  background: var(--accent);
  color: var(--on-color);
  font-weight: 700;
  transition: background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out);

  &:hover { background: var(--accent-hover); }
  &:active { transform: scale(0.96); }
`;

/* ── Siguiente paso: la tarjeta se llena con el color de su sección ── */

const NextGrid = styled.nav`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 0.8rem;
`;

const NextCard = styled(Link)`
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface-3);
  background: var(--surface-1);
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: ${p => p.$color};
    clip-path: circle(0% at 100% 100%);
    transition: clip-path 0.6s var(--ease-out);
  }

  small { font-family: var(--font-mono); font-size: 0.72rem; color: ${p => p.$color}; transition: color var(--dur-base); }
  strong { display: block; margin-top: 0.5rem; font-family: var(--font-display); font-size: 1.7rem; font-weight: 800; text-transform: uppercase; line-height: 1; }
  p { margin-top: 0.5rem; font-size: 0.9rem; color: var(--ink-muted); transition: color var(--dur-base); }

  @media (hover: hover) {
    &:hover::before { clip-path: circle(150% at 100% 100%); }
    &:hover, &:hover small, &:hover p { color: var(--on-color); }
  }
`;

/* ── Barra final ── */

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  font-size: 0.85rem;
  color: var(--ink-faint);

  b { color: var(--ink); font-family: var(--font-display); font-weight: 800; text-transform: uppercase; }
  b span { color: var(--accent); }
  time { font-family: var(--font-mono); color: var(--ink-muted); }
`;

const Socials = styled.ul`
  list-style: none;
  display: flex;
  gap: 1.2rem;

  a { color: var(--ink-muted); font-weight: 600; transition: color var(--dur-base) var(--ease-out); }
  a:hover { color: var(--ink); }
`;

const NEXT = [
  { to: '/systems', color: 'var(--product)', tag: 'how it works', title: 'Systems', desc: 'How my AI systems run inside, step by step.' },
  { to: '/about',   color: 'var(--about)',   tag: 'resume',       title: 'About · CV', desc: 'Experience, impact and a printable CV.' },
  { to: '/',        color: 'var(--accent)',  tag: 'portfolio',    title: 'Selected work', desc: 'Seven products, from idea to live.' },
];

const SOCIALS = [
  ['LinkedIn',  'https://linkedin.com/in/abraham-huacchillo'],
  ['GitHub',    'https://github.com/jarbram'],
  ['Instagram', 'https://instagram.com/abrahamhuacchillo'],
];

// Hora real en Piura: dato útil para quien contrata en remoto
const usePiuraTime = () => {
  const fmt = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Lima', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 30000);
    return () => clearInterval(id);
  }, []);
  return time;
};

const Footer = () => {
  const { pathname } = useLocation();
  const time = usePiuraTime();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <Wrap data-noprint>
      <div>
        <Eyebrow>What’s next</Eyebrow>
        <Headline>Got work that repeats every week? <em>Let’s make it a system.</em></Headline>
      </div>

      <Contact>
        <EmailBtn type="button" onClick={copy} $done={copied} aria-live="polite">
          {EMAIL}<span>{copied ? 'Copied ✓' : 'Copy'}</span>
        </EmailBtn>
        <WriteBtn href={`mailto:${EMAIL}`}>Write me</WriteBtn>
      </Contact>

      <NextGrid aria-label="Keep exploring">
        {NEXT.filter(n => n.to !== pathname).map(n => (
          <NextCard key={n.to} to={n.to} $color={n.color}>
            <small>{n.tag}</small>
            <strong>{n.title}</strong>
            <p>{n.desc}</p>
          </NextCard>
        ))}
      </NextGrid>

      <Bar>
        <span><b>Jarbram<span>.</span></b> · © {new Date().getFullYear()} · Piura, Perú · <time>{time}</time> local time</span>
        <Socials>
          {SOCIALS.map(([l, h]) => <li key={l}><a href={h} target="_blank" rel="noopener noreferrer">{l}</a></li>)}
        </Socials>
      </Bar>
    </Wrap>
  );
};

export default Footer;
