import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { message } from '../../styles/motion';

// Chat interactivo: eliges una pregunta y Abraham "escribe" la respuesta.
// items: [{ q, a }] · color: color de la sección para el hover de las preguntas
/* ── Chat interactivo (momento de marca) ── */

const AskGrid = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 860px) { grid-template-columns: 1fr; gap: 1.2rem; }
`;

const AskIntro = styled.div`
  h3 {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    line-height: 0.95;
    text-transform: uppercase;
  }
  p { margin-top: 0.8rem; color: var(--ink-muted); }
`;

const Prompts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.4rem;
`;

const Prompt = styled.button`
  padding: 0.6rem 0.95rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line-strong);
  color: var(--ink);
  font-size: 0.88rem;
  font-weight: 600;
  text-align: left;
  transition: border-color var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), opacity var(--dur-base);

  &:hover:not(:disabled) { border-color: ${p => p.$color}; color: ${p => p.$color}; }
  &:disabled { opacity: 0.4; cursor: default; text-decoration: line-through; }
`;

const Window = styled.div`
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

const WindowBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.85rem 1.1rem;
  background: var(--surface-2);
  border-bottom: 1px solid var(--surface-3);

  img { width: 34px; height: 34px; border-radius: 9px; object-fit: cover; }
  strong { display: block; font-size: 0.9rem; }
  span { font-size: 0.75rem; color: var(--product); }
`;

const Thread = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1.2rem;
  height: 420px;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
`;

const Bubble = styled(motion.p)`
  max-width: 82%;
  padding: 0.8rem 1.05rem;
  border-radius: var(--radius-md);
  line-height: 1.55;
  font-weight: 500;
  font-size: 0.95rem;
  align-self: ${p => p.$me ? 'flex-end' : 'flex-start'};
  transform-origin: ${p => p.$me ? 'bottom right' : 'bottom left'};
  background: ${p => p.$me ? 'var(--accent)' : 'var(--ink)'};
  color: ${p => p.$me ? '#fff' : 'var(--bg)'};
  ${p => p.$me ? 'border-bottom-right-radius: 4px;' : 'border-bottom-left-radius: 4px;'}

  @media (max-width: 600px) { max-width: 92%; }
`;

const blink = keyframes`
  0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
  40%           { opacity: 1;    transform: translateY(-3px); }
`;

const Typing = styled(motion.div)`
  align-self: flex-end;
  display: flex;
  gap: 4px;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
  border-bottom-right-radius: 4px;
  background: var(--accent);

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation: ${blink} 1s infinite;
  }
  i:nth-child(2) { animation-delay: 0.15s; }
  i:nth-child(3) { animation-delay: 0.3s; }
`;

// ponytail: respuestas escritas a mano, sin LLM; cambia a un endpoint si algún día quieres preguntas libres
const AskMe = ({ items, title, sub, color = 'var(--about)' }) => {
  const [asked, setAsked] = useState([0]);
  const [typing, setTyping] = useState(null); // índice de la pregunta que se está respondiendo
  const threadRef = useRef(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [asked, typing]);

  const ask = (i) => {
    if (typing !== null || asked.includes(i)) return;
    setTyping(i);
    setTimeout(() => { setAsked(a => [...a, i]); setTyping(null); }, 900);
  };

  return (
    <AskGrid>
      <AskIntro>
        <h3>{title}</h3>
        {sub && <p>{sub}</p>}
        <Prompts>
          {items.map((c, i) => (
            <Prompt
              key={c.q}
              $color={color}
              disabled={asked.includes(i) || typing === i}
              onClick={() => ask(i)}
            >
              {c.q}
            </Prompt>
          ))}
        </Prompts>
      </AskIntro>

      <Window>
        <WindowBar>
          <img src="/abraham.jpeg" alt="" />
          <div><strong>Abraham</strong><span>● online · replies fast</span></div>
        </WindowBar>
        <Thread ref={threadRef} aria-live="polite">
          {asked.flatMap(i => [
            <Bubble key={`q${i}`} variants={message} initial="hidden" animate="visible">{items[i].q}</Bubble>,
            <Bubble key={`a${i}`} variants={message} initial="hidden" animate="visible" $me>{items[i].a}</Bubble>,
          ])}
          {typing !== null && (
            <>
              <Bubble variants={message} initial="hidden" animate="visible">{items[typing].q}</Bubble>
              <Typing aria-label="Abraham is typing" variants={message} initial="hidden" animate="visible"><i /><i /><i /></Typing>
            </>
          )}
        </Thread>
      </Window>
    </AskGrid>
  );
};

export default AskMe;
