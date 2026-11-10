import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { scrollRoot } from '../../styles/motion';
import { useNavigate } from 'react-router-dom';

/* ── animations ── */

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
  font-size: clamp(1.6rem, 4.5vw, 2.8rem);
  font-weight: 900;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  line-height: 1;

  @media (max-width: 480px) {
    gap: 0.45rem;
  }
`;

const Word = styled.span`
  white-space: nowrap;
`;

/* ── tag buttons ── */

const Tag = styled(motion.button)`
  background-color: ${p => p.$color || '#FE4A23'};
  color: var(--bg);
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 900;
  font-size: inherit;
  letter-spacing: 0.05em;
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
  color: var(--line-strong);
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
        {/* HI, I'M [ABRAHAM] */}
        <Line variants={lineVariants}>
          <Word>HI, I'M</Word>
          <Tag $color="#F1C40F" onClick={() => go('about')}>
            ABRAHAM <Arrow />
          </Tag>
        </Line>

        {/* I BUILD [PRODUCTS] */}
        <Line variants={lineVariants}>
          <Word>I BUILD</Word>
          <Tag $color="#50C878" $alt onClick={() => go('product')}>
            PRODUCTS <Arrow />
          </Tag>
        </Line>

        {/* WITH [AI] AND [CODE] */}
        <Line variants={lineVariants}>
          <Word>WITH</Word>
          <Tag $color="#FE4A23" onClick={() => go('github')}>
            AI <Arrow />
          </Tag>
          <Word>&amp;</Word>
          <Tag $color="#9B59B6" $alt onClick={() => go('code')}>
            CODE <Arrow />
          </Tag>
        </Line>

        {/* [LET'S CONNECT!] */}
        <Line variants={lineVariants} style={{ marginTop: '0.6rem' }}>
          <Tag
            $color="#0077B5"
            onClick={() => go('linkedin')}
            whileTap={{ scale: 0.96 }}
          >
            LET'S CONNECT <Arrow />
          </Tag>
        </Line>

        <Tagline
          variants={lineVariants}
        >
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
