import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { scrollRoot } from '../../styles/motion';
import { useNavigate } from 'react-router-dom';

/* ── animations ── */

// Tipografía cinética: la fuente variable "gana peso" al entrar
const weightIn = keyframes`
  from { font-weight: 300; letter-spacing: 0.06em; }
  to   { font-weight: 800; letter-spacing: -0.02em; }
`;

const scrollBounce = keyframes`
  0%   { top: 8px;  opacity: 1; transform: translateX(-50%) scale(1);   }
  50%  {            opacity: 1; transform: translateX(-50%) scale(1.15); }
  100% { top: 30px; opacity: 0; transform: translateX(-50%) scale(1);   }
`;

/* ── layout ── */

const IntroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 6rem 1.5rem 5rem;
  text-align: center;
  overflow: hidden;
`;

const AmbientBg = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    bottom: -8%;
    left: 50%;
    transform: translateX(-50%);
    width: 75%;
    height: 55%;
    background: radial-gradient(ellipse at center, rgba(254,74,35,0.11) 0%, transparent 70%);
    filter: blur(48px);
  }

  &::after {
    content: '';
    position: absolute;
    top: -5%;
    right: -8%;
    width: 45%;
    height: 55%;
    background: radial-gradient(ellipse at center, rgba(155,89,182,0.09) 0%, transparent 70%);
    filter: blur(64px);
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.55rem;
  position: relative;
  z-index: 1;
`;

const Line = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6.4vw, 5.2rem);
  font-weight: 800;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.95;

  @media (max-width: 480px) {
    gap: 0.45rem;
  }
`;

const Word = styled.span`
  white-space: nowrap;
  animation: ${weightIn} 1.1s var(--ease-out) both;
  animation-delay: ${p => p.$d || 0}s;
  transition: font-weight var(--dur-base) var(--ease-out);

  @media (hover: hover) { &:hover { font-weight: 300; } }
`;

const Status = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.6rem;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line-strong);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--ink-muted);
  cursor: pointer;

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--product);
    box-shadow: 0 0 0 3px rgba(80,200,120,0.2);
  }
  &:hover { color: var(--ink); border-color: var(--ink-faint); }
`;

const Proof = styled(motion.ul)`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem 1.6rem;
  margin-top: 2.2rem;
  font-size: 0.85rem;
  color: var(--ink-faint);

  strong { font-family: var(--font-mono); color: var(--ink); font-weight: 600; margin-right: 0.35rem; }
`;

/* ── tag buttons ── */

const Tag = styled(motion.button)`
  background-color: ${p => p.$color || '#FE4A23'};
  color: var(--bg);
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 800;
  font-size: inherit;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  padding: 0.45rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  white-space: nowrap;
  border-radius: ${p => p.$alt ? '12px 6px 12px 6px' : '6px 12px 6px 12px'};
  transition: transform 0.18s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.18s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 22px ${p => p.$color ? `${p.$color}55` : 'rgba(254,74,35,0.35)'};
    }
  }

  &:active {
    transform: scale(0.97) translateY(0);
    box-shadow: none;
  }

  @media (max-width: 768px) {
    padding: 0.38rem 0.8rem;
    font-size: 0.9em;
  }
`;

const Arrow = styled.span`
  display: inline-flex;
  font-size: 0.82em;

  &::before { content: '➜'; }

  ${Tag}:hover & {
    animation: bounce 0.55s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateX(0); }
    50%       { transform: translateX(3px); }
  }
`;

/* ── tagline ── */

const Tagline = styled(motion.p)`
  margin-top: 1.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-faint);
`;

/* ── scroll indicator ── */

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.25s ease;

  &:hover { opacity: 0.9; }

  .track {
    width: 26px;
    height: 44px;
    border: 1.5px solid rgba(253,251,251,0.4);
    border-radius: 20px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 5px;
      height: 5px;
      background: var(--ink);
      border-radius: 50%;
      left: 50%;
      transform: translateX(-50%);
      top: 7px;
      animation: ${scrollBounce} 1.8s infinite;
    }
  }
`;

/* ── stagger variants ── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const lineVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};

/* ── component ── */

const Intro = () => {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll({ container: scrollRoot });
  const h = window.innerHeight;
  const heroScale   = useTransform(scrollY, [0, h * 0.7], [1, 0.9]);
  const heroOpacity = useTransform(scrollY, [0, h * 0.6], [1, 0]);
  const heroBlur    = useTransform(scrollY, [0, h * 0.7], ['blur(0px)', 'blur(10px)']);

  const go = (section) => {
    if (section === 'linkedin') { window.open('https://www.linkedin.com/in/abraham-huacchillo/', '_blank'); return; }
    if (section === 'github')   { window.open('https://github.com/jarbram', '_blank'); return; }
    navigate(`/${section}`);
  };

  const scrollToNext = () => scrollRoot.current.scrollTo({ top: window.innerHeight, behavior: 'smooth' });

  return (
    <IntroSection>
      <AmbientBg />
      <motion.div style={reduce ? undefined : { scale: heroScale, opacity: heroOpacity, filter: heroBlur }}>
      <TextContainer
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Status variants={lineVariants} onClick={() => go('about')}>
          Open to remote AI Ops roles · See my CV
        </Status>

        {/* HI, I'M [ABRAHAM] */}
        <Line variants={lineVariants}>
          <Word>HI, I'M</Word>
          <Tag $color="#F1C40F" onClick={() => go('about')}>
            ABRAHAM <Arrow />
          </Tag>
        </Line>

        {/* I BUILD [PRODUCTS] */}
        <Line variants={lineVariants}>
          <Word $d={0.1}>I BUILD</Word>
          <Tag $color="#50C878" $alt onClick={() => scrollToNext()}>
            PRODUCTS <Arrow />
          </Tag>
        </Line>

        {/* WITH [AI] AND [CODE] */}
        <Line variants={lineVariants}>
          <Word $d={0.2}>WITH</Word>
          <Tag $color="#FE4A23" onClick={() => go('systems')}>
            AI <Arrow />
          </Tag>
          <Word $d={0.25}>&amp;</Word>
          <Tag $color="#9B59B6" $alt onClick={() => go('github')}>
            CODE <Arrow />
          </Tag>
        </Line>

        {/* [LET'S CONNECT!] */}
        <Line variants={lineVariants} style={{ marginTop: '1.4rem', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
          <Tag
            $color="#0077B5"
            onClick={() => go('linkedin')}
            whileTap={{ scale: 0.96 }}
          >
            LET'S CONNECT <Arrow />
          </Tag>
        </Line>

        <Proof variants={lineVariants}>
          <li><strong>12G</strong>Startup Perú winner</li>
          <li><strong>60</strong>Fortune 500 IT hires</li>
          <li><strong>10</strong>LATAM countries</li>
        </Proof>

        <Tagline variants={lineVariants}>
          AI Ops Specialist · Product Builder · Peru
        </Tagline>
      </TextContainer>
      </motion.div>

      <ScrollIndicator
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={scrollToNext}
      >
        <div className="track" />
      </ScrollIndicator>
    </IntroSection>
  );
};

export default Intro;
