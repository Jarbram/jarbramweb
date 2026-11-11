import styled from 'styled-components';
import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { reveal, scrollRoot } from '../../styles/motion';

/* ── Datos: solo hechos del CV / proyectos. kind: in | ai | tool | out ── */

// status: live | dev — se muestra como etiqueta; nada "en producción" sin evidencia
const SYSTEMS = [
  {
    name: 'Prisma, offer to reel',
    where: 'Subastop · VMC · 2026', status: 'live',
    problem: 'Every auction offer needed reels and carousels for @vmcsubastas. Editing each one by hand capped how many got promoted.',
    flow: [
      { kind: 'in',   label: 'Offer ID',        sub: 'scraper · photos · data' },
      { kind: 'ai',   label: 'Recipe + script', sub: 'Claude Code skill' },
      { kind: 'ai',   label: 'Shots',           sub: 'Veo · Kling · Seedance' },
      { kind: 'tool', label: 'Compose + audit', sub: 'Remotion · copy rules' },
      { kind: 'out',  label: 'Publish',         sub: 'Drive · content calendar' },
    ],
    results: [['44', 'pieces published'], ['111', 'Remotion compositions'], ['7', 'pieces in week one with an agency']],
  },
  {
    name: 'Carousels on autopilot',
    where: 'Subastop · VMC · 2026', status: 'live',
    problem: 'Out of 30–40 offers a week only 7 got a carousel. Covering all of them by hand meant 50 hours a month.',
    flow: [
      { kind: 'in',   label: 'Open offers',  sub: 'VMC API' },
      { kind: 'tool', label: 'Photos',       sub: 'Google Drive by plate' },
      { kind: 'ai',   label: 'Vision pick',  sub: 'best 3 shots · damage check' },
      { kind: 'tool', label: 'Render',       sub: 'Remotion · caption' },
      { kind: 'out',  label: 'Post',         sub: 'Instagram Graph API' },
    ],
    results: [['$0.0065', 'per carousel'], ['$0.20', 'per month'], ['35×', 'cheaper than planned']],
  },
  {
    name: 'LadraApp, AI inside a vet SaaS',
    where: 'LadraApp · 2025 — now', status: 'live',
    problem: 'Vets lose the end of every visit typing clinical notes. A one-person team had to build the fix and keep it cheap to run.',
    flow: [
      { kind: 'in',   label: 'Vet talks',         sub: 'voice note' },
      { kind: 'ai',   label: 'Transcribe',        sub: 'Whisper' },
      { kind: 'ai',   label: 'Structure',         sub: 'gpt-4o-mini' },
      { kind: 'out',  label: 'Clinical record',   sub: 'Supabase · cached summary' },
    ],
    results: [['Paying', 'clinics in production'], ['673', 'commits, solo'], ['56', 'self-tests + security audit']],
  },
  {
    name: 'Security audit with agents',
    where: 'LadraApp · 2026', status: 'live',
    problem: 'A multi-tenant SaaS holding clinical data, and no security team to review it.',
    flow: [
      { kind: 'in',   label: 'Whole repo',     sub: 'Next.js · Supabase' },
      { kind: 'ai',   label: 'Finder agents',  sub: 'Claude Code · one per lead' },
      { kind: 'ai',   label: 'Critic agents',  sub: 'challenge every finding' },
      { kind: 'tool', label: 'Ledger',         sub: 'coverage · decisions' },
      { kind: 'out',  label: 'Fixes shipped',  sub: 'to production' },
    ],
    results: [['87', 'agent runs'], ['31', 'leads triaged'], ['5', 'confirmed findings']],
  },
  {
    name: 'Subastín, support with RAG',
    where: 'Subastop · VMC · 2026 · team project', status: 'dev',
    problem: 'Replace Intercom with an in-house chat: AI resolves what it can and hands the rest to a human advisor.',
    flow: [
      { kind: 'in',   label: 'Buyer question', sub: 'signed widget · JWT' },
      { kind: 'tool', label: 'Queue',          sub: 'API Gateway · Lambda · SQS' },
      { kind: 'ai',   label: 'Retrieve + draft', sub: 'Pinecone RAG · Gemini' },
      { kind: 'out',  label: 'Answer or handoff', sub: 'advisor app · Slack' },
    ],
    results: [['89%', 'recall with reranker'], ['95%', 'correct refusals'], ['1,100', 'automated tests']],
  },
  {
    name: 'Recruiting ops on autopilot',
    where: 'TalentCross · 2024 — 2026', status: 'live',
    problem: 'Recruiters screened candidates by hand and data lived in five places. Every senior IT search started from zero.',
    flow: [
      { kind: 'in',   label: 'New candidate', sub: 'Manatal ATS' },
      { kind: 'tool', label: 'Webhook',       sub: 'n8n · Make' },
      { kind: 'ai',   label: 'Predictive filter', sub: 'LLM scoring' },
      { kind: 'tool', label: 'Single source', sub: 'Airtable · REST' },
      { kind: 'out',  label: 'Shortlist',     sub: 'to the recruiter' },
    ],
    results: [['−40%', 'operational workload'], ['100%', 'traceability'], ['60', 'senior IT roles closed']],
  },
  {
    name: 'Admissions funnel',
    where: 'Gestores de Cambio · 2024', status: 'live',
    problem: '640+ applicants and a team answering each one by hand. Replies took days.',
    flow: [
      { kind: 'in',   label: 'Application',  sub: 'form' },
      { kind: 'tool', label: 'Central data', sub: 'Airtable' },
      { kind: 'tool', label: 'Automation',   sub: 'Make' },
      { kind: 'out',  label: 'Reply',        sub: 'WhatsApp Business' },
    ],
    results: [['640+', 'applicants handled'], ['Days → min', 'response time']],
  },
];

// Prototipos y piezas de soporte: se listan, sin vender lo que no está en producción
const LAB = [
  ['Instagram reply agent', 'Prototype', 'DeepSeek drafts answers to comments with T&C cached as context; a human approves before posting. ~$0.09/month.'],
  ['Browser agent for a POS', 'In use', 'Reads a purchase invoice and operates a real point-of-sale through Chrome: creates products, logs the purchase, checks stock. 84 invoice lines loaded in its first two days.'],
  ['Instagram content loop', 'Live', 'Posts on schedule from a one-minute cron, then a daily job pulls Insights and compares every post against the account average.'],
  ['Atlas', 'Live', 'Tailors a CV to each job with DeepSeek and flags anything that is not in your profile. Chrome extension + PDF export.'],
  ['VMC knowledge base', 'In use', 'Terms and Help Center ingested into one versioned source (197 sections) that the agents cite.'],
  ['VMC Help Center', 'Live', '22 articles with llms.txt and JSON-LD so Google and AI engines find the official answer.'],
];

// Cada paso lleva una prueba real (del CV) para que no sea teoría
const METHOD = [
  ['Problem, not features', 'Talk to real users first. Write the problem down before the first prompt.', 'DJPONLA: roadmap shaped with a community of 40+ DJs'],
  ['Prototype fast', 'A working version in front of users the same week, no-code if that is faster.', 'LadraApp: no-code MVP selling from launch day'],
  ['Ship on real rails', 'Auth, data and payments on managed primitives. The prototype becomes the spec.', 'LadraApp: moved to Vercel + Supabase, −70% tech debt'],
  ['Review like an editor', 'AI writes the boilerplate. I own quality, security and how pieces fit.', 'Playwright UX/UI tests on every build'],
  ['Measure, then automate', 'Keep what moves the numbers. Hand repetitive ops to agents.', 'TalentCross: −40% operational workload'],
];

/* ── Layout ── */

const Page = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media (max-width: 768px) { padding: 1.5rem 1rem 4rem; gap: 3rem; }
`;

const Hero = styled.header`
  h1 {
    font-size: clamp(2.6rem, 7.5vw, 5.6rem);
    font-weight: 800;
    line-height: 0.92;
    text-transform: uppercase;
    animation: weight-in 1.1s var(--ease-out) both;
  }
  h1 span { color: var(--product); }
  p {
    margin-top: 1.4rem;
    max-width: 600px;
    font-size: 1.1rem;
    line-height: 1.65;
    color: var(--ink-muted);
  }
`;

const Eyebrow = styled.h2`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--product);
  margin-bottom: 1.2rem;
`;

const Card = styled(motion.article).attrs({ variants: reveal, initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-10% 0px' } })`
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: var(--radius-lg);
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  @media (max-width: 600px) { padding: 1.2rem; }
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;

  h3 { font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 800; text-transform: uppercase; line-height: 1; }
  span { font-family: var(--font-mono); font-size: 0.78rem; color: var(--ink-faint); }
`;

const Status = styled.em`
  font-style: normal;
  margin-right: 0.5rem;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-text);
  font-size: 0.72rem;
  font-weight: 700;
  color: ${p => p.$live ? 'var(--product)' : 'var(--about)'};
  border: 1px solid currentColor;
`;

const Lab = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.8rem;

  li { padding: 1.2rem; border-radius: var(--radius-md); background: var(--surface-1); border: 1px solid var(--surface-3); }
  h3 { font-family: var(--font-text); font-size: 1rem; font-weight: 600; letter-spacing: 0; display: flex; justify-content: space-between; gap: 0.6rem; }
  h3 span { font-family: var(--font-mono); font-size: 0.7rem; font-weight: 400; color: var(--ink-faint); }
  p { margin-top: 0.45rem; font-size: 0.88rem; color: var(--ink-muted); line-height: 1.55; }
`;

const Problem = styled.p`
  max-width: 68ch;
  color: var(--ink-muted);
  line-height: 1.6;

  b { color: var(--ink); font-weight: 600; }
`;

/* ── Diagrama de flujo: fila en escritorio, columna en móvil ── */

const Flow = styled.ol`
  list-style: none;
  display: flex;
  align-items: stretch;
  gap: 2.2rem;
  padding: 1.2rem;
  border-radius: var(--radius-md);
  background: var(--surface-2);
  overflow-x: auto;

  @media (max-width: 760px) { flex-direction: column; gap: 1.6rem; }
`;

const KIND = {
  in:   { border: 'var(--line-strong)', dot: 'var(--ink-faint)' },
  tool: { border: 'var(--line-strong)', dot: 'var(--code)' },
  ai:   { border: 'var(--accent)',      dot: 'var(--accent)' },
  out:  { border: 'var(--product)',     dot: 'var(--product)' },
};

const Node = styled.li`
  position: relative;
  flex: 1 1 0;
  min-width: 128px;
  padding: 0.8rem 0.9rem;
  border-radius: var(--radius-sm);
  border: 1px solid ${p => KIND[p.$kind].border};
  background: var(--surface-1);

  strong { display: flex; align-items: center; gap: 0.45rem; font-size: 0.9rem; font-weight: 600; }
  strong::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: ${p => KIND[p.$kind].dot}; flex-shrink: 0; }
  small { display: block; margin-top: 0.25rem; font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-faint); }

  &:not(:last-child)::after {
    content: '→';
    position: absolute;
    right: -1.6rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ink-faint);
  }

  @media (max-width: 760px) {
    &:not(:last-child)::after { content: '↓'; right: auto; left: 1rem; top: auto; bottom: -1.45rem; transform: none; }
  }
`;

const Legend = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.2rem;
  font-size: 0.78rem;
  color: var(--ink-faint);

  i { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 0.4rem; }
`;

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 2rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);

  div strong { display: block; font-family: var(--font-mono); font-size: 1.6rem; font-weight: 600; line-height: 1.1; }
  div span { font-size: 0.85rem; color: var(--ink-muted); }
`;

const Track = styled.div`
  position: relative;
  height: 2px;
  margin-bottom: 1.4rem;
  background: var(--line);
  border-radius: 2px;

  @media (max-width: 900px) { display: none; }
`;

const Fill = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: var(--product);
  transform-origin: 0 50%;
  border-radius: 2px;
`;

const Steps = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;

  li { display: flex; flex-direction: column; }
  b { font-family: var(--font-mono); font-size: 1.5rem; font-weight: 600; color: var(--product); }
  h3 { font-family: var(--font-text); font-size: 1rem; font-weight: 600; letter-spacing: 0; margin: 0.6rem 0 0.35rem; }
  p { font-size: 0.88rem; color: var(--ink-muted); line-height: 1.55; }
  mark {
    margin-top: auto;
    padding: 0.7rem 0.8rem;
    border-radius: var(--radius-sm);
    background: var(--surface-1);
    border: 1px solid var(--surface-3);
    color: var(--ink);
    font-size: 0.8rem;
    line-height: 1.45;
  }
  mark::before { content: 'Proof · '; font-family: var(--font-mono); color: var(--product); }
  p + mark { margin-top: 0.9rem; }

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    li { padding-top: 1rem; border-top: 2px solid var(--line); }
  }
  @media (max-width: 520px) { grid-template-columns: 1fr; }
`;

/* ── Componente ── */

const Method = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, container: scrollRoot, offset: ['start 85%', 'end 60%'] });
  return (
    <section aria-labelledby="method" ref={ref}>
      <Eyebrow id="method">How I build</Eyebrow>
      <Track aria-hidden="true"><Fill style={{ scaleX: scrollYProgress }} /></Track>
      <Steps>
        {METHOD.map(([t, d, proof], i) => (
          <li key={t}>
            <b>{String(i + 1).padStart(2, '0')}</b>
            <h3>{t}</h3>
            <p>{d}</p>
            <mark>{proof}</mark>
          </li>
        ))}
      </Steps>
    </section>
  );
};

const Systems = () => (
  <>
    <Header />
    <Page>
      <Hero>
        <h1>Systems I<br />put to work<span>.</span></h1>
        <p>
          AI Ops is not a tool list. It is finding the work a team repeats every week and
          turning it into a system that runs. Here is how {SYSTEMS.length} of them work inside.
        </p>
      </Hero>

      <section aria-labelledby="systems">
        <Eyebrow id="systems">Systems</Eyebrow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {SYSTEMS.map(sys => (
            <Card key={sys.name}>
              <CardHead>
                <h3>{sys.name}</h3>
                <span><Status $live={sys.status === 'live'}>{sys.status === 'live' ? 'Live' : 'In development'}</Status> {sys.where}</span>
              </CardHead>
              <Problem><b>The problem.</b> {sys.problem}</Problem>
              <Flow aria-label={`How ${sys.name} works`}>
                {sys.flow.map(n => (
                  <Node key={n.label} $kind={n.kind}>
                    <strong>{n.label}</strong>
                    <small>{n.sub}</small>
                  </Node>
                ))}
              </Flow>
              <Results>
                {sys.results.map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}
              </Results>
            </Card>
          ))}
        </div>
        <Legend style={{ marginTop: '1rem' }}>
          {[['in', 'Input'], ['tool', 'Integration'], ['ai', 'AI step'], ['out', 'Outcome']].map(([k, l]) => (
            <span key={k}><i style={{ background: KIND[k].dot }} />{l}</span>
          ))}
        </Legend>
      </section>

      <section aria-labelledby="lab">
        <Eyebrow id="lab">Also built</Eyebrow>
        <Lab>
          {LAB.map(([t, st, d]) => (
            <li key={t}><h3>{t}<span>{st}</span></h3><p>{d}</p></li>
          ))}
        </Lab>
      </section>

      <Method />
    </Page>
    <Footer />
  </>
);

export default Systems;
