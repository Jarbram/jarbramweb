import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import WeatherMood from './WeatherMood';
import TicTacToe from './TicTacToe';

/* ── animations ── */

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.5; }
`;

/* ── layout ── */

const FooterWrap = styled.footer`
  border-top: 1px solid var(--surface-2);
  padding: 3rem 2rem 2.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: start;
  position: relative;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 2rem 1.2rem 2rem;
    gap: 2rem;
  }
`;

/* ── left column ── */

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const BrandName = styled.p`
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 0.02em;

  span { color: #FE4A23; }
`;

const Meta = styled.p`
  font-size: 0.75rem;
  color: #3a3a3a;
  font-weight: 600;
  letter-spacing: 0.03em;
`;

const GameToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.6rem;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: ${p => p.$active ? '#FE4A23' : '#383838'};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: color 0.2s ease;
  animation: ${p => !p.$active ? pulse : 'none'} 2.5s infinite;

  &:hover { color: var(--accent); }

  &::before {
    content: '›';
    transform: ${p => p.$active ? 'rotate(90deg)' : 'none'};
    transition: transform 0.2s ease;
    display: inline-block;
  }
`;

const GameStats = styled.span`
  color: #333;
  font-size: 0.65rem;
`;

/* ── center column (game) ── */

const CenterCol = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    display: none;
  }
`;

/* ── right column ── */

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;

  @media (max-width: 600px) {
    align-items: flex-start;
  }
`;

const HireBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--accent);
  color: var(--bg);
  font-weight: 900;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 0.5rem 1.1rem;
  border-radius: 6px 12px 6px 12px;
  text-decoration: none;
  margin-bottom: 0.6rem;
  transition: transform 0.18s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.18s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(254,74,35,0.3);
    }
  }

  &:active {
    transform: scale(0.97) translateY(0);
    box-shadow: none;
  }
`;

const SocialRow = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  width: 180px;
  padding: 0.65rem 0.9rem;
  color: var(--ink-muted);
  text-decoration: none;
  background: var(--surface-1);
  border: 1px solid #222;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  transition: color 0.18s ease, border-color 0.18s ease, transform 0.18s cubic-bezier(0.23, 1, 0.32, 1);

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: var(--ink);
      border-color: var(--line);
      transform: translateX(-3px);
    }
  }

  &:active {
    transform: scale(0.97);
  }

  svg { width: 14px; height: 14px; flex-shrink: 0; }

  @media (max-width: 600px) {
    width: 100%;

    &:hover { transform: translateX(3px); }
  }
`;

const SocialLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
`;

/* ── icons ── */

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.082c1.602 0 1.792.006 2.425.035 1.627.074 2.385.845 2.46 2.459.028.633.034.822.034 2.424s-.006 1.792-.034 2.424c-.075 1.613-.832 2.386-2.46 2.46-.633.028-.822.035-2.425.035-1.602 0-1.792-.006-2.424-.035-1.63-.075-2.385-.849-2.46-2.46-.028-.632-.035-.822-.035-2.424s.007-1.792.035-2.424c.074-1.615.832-2.386 2.46-2.46.632-.029.822-.034 2.424-.034zm0-1.082c-1.63 0-1.833.007-2.474.037-2.18.1-3.39 1.309-3.49 3.489-.029.641-.036.845-.036 2.474 0 1.63.007 1.834.036 2.474.1 2.179 1.31 3.39 3.49 3.49.641.029.844.036 2.474.036 1.63 0 1.834-.007 2.475-.036 2.176-.1 3.391-1.309 3.489-3.49.029-.64.036-.844.036-2.474 0-1.629-.007-1.833-.036-2.474-.098-2.177-1.309-3.39-3.489-3.489-.641-.03-.845-.037-2.475-.037zm0 2.919c-1.701 0-3.081 1.379-3.081 3.081s1.38 3.081 3.081 3.081 3.081-1.379 3.081-3.081c0-1.701-1.38-3.081-3.081-3.081zm0 5.081c-1.105 0-2-.895-2-2 0-1.104.895-2 2-2 1.104 0 2.001.895 2.001 2s-.897 2-2.001 2zm3.202-5.922c-.397 0-.72.322-.72.72 0 .397.322.72.72.72.398 0 .721-.322.721-.72 0-.398-.322-.72-.721-.72z"/>
  </svg>
);

const IconGitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

/* ── component ── */

const SOCIALS = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/abraham-huacchillo', icon: <IconLinkedIn />  },
  { label: 'Instagram', href: 'https://instagram.com/abrahamhuacchillo',    icon: <IconInstagram /> },
  { label: 'GitHub',    href: 'https://github.com/jarbram',                 icon: <IconGitHub />    },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const [showGame, setShowGame] = useState(false);
  const [wins, setWins]         = useState({ X: 0, O: 0 });

  const handleGameEnd = (winner) => {
    if (winner) setWins(p => ({ ...p, [winner]: p[winner] + 1 }));
  };

  return (
    <FooterWrap>

      {/* left */}
      <LeftCol>
        <BrandName>Jarbram<span>.</span></BrandName>
        <Meta>© {year} · AI Ops Specialist & Product Builder</Meta>
        <WeatherMood />
        <GameToggle
          $active={showGame}
          onClick={() => setShowGame(p => !p)}
        >
          {showGame ? 'game in progress' : 'start game'}
          {(wins.X > 0 || wins.O > 0) && (
            <GameStats>· X:{wins.X} O:{wins.O}</GameStats>
          )}
        </GameToggle>
      </LeftCol>

      {/* center — game */}
      <CenterCol>
        <TicTacToe show={showGame} onGameEnd={handleGameEnd} />
      </CenterCol>

      {/* right */}
      <RightCol>
        <HireBtn href="mailto:huacchillocastillo@gmail.com">
          Work with me ➜
        </HireBtn>
        {SOCIALS.map(s => (
          <SocialRow key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            <SocialLeft>
              {s.icon}
              {s.label}
            </SocialLeft>
            <ArrowIcon />
          </SocialRow>
        ))}
      </RightCol>

    </FooterWrap>
  );
};

export default Footer;
