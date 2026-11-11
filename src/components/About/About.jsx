import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import AskMe from '../AskMe/AskMe';
import { reveal, hoverLift } from '../../styles/motion';

/* ── Datos del CV (fuente: CV nov-2026) ── */

const EMAIL = 'huacchillocastillo@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/abraham-huacchillo/';
const GITHUB = 'https://github.com/jarbram';

const METRICS = [
  { value: '60',   label: 'Senior IT roles closed for Fortune 500 companies' },
  { value: '12G',  label: 'Startup Perú innovation fund winner with DJPONLA' },
  { value: '10',   label: 'LATAM countries reached by DJPONLA' },
  { value: '−40%', label: 'Operational workload, automating an ATS with n8n + Make' },
  { value: '3×',   label: 'Product iteration speed with Claude Code workflows' },
  { value: '−70%', label: 'Technical debt after re-platforming LadraApp' },
];

const EXPERIENCE = [
  {
    company: 'Subastop · VMC Subastas', url: 'https://www.vmcsubastas.com',
    role: 'AI Ops Specialist', period: 'May 2026 — Present', current: true,
    points: [
      'Built Prisma, an AI content studio that turns an auction offer into a reel: 44 pieces published, 111 Remotion compositions.',
      'Automated carousels end to end with a vision model that picks photos and flags damage, at $0.0065 per carousel.',
      'Co-building Subastín, an in-house support agent on AWS serverless with RAG over the Help Center (89% recall in benchmark).',
    ],
    stack: ['Claude Code', 'Remotion', 'Gemini', 'Pinecone', 'AWS'],
  },
  {
    company: 'LadraApp', url: 'https://ladraapp.com',
    role: 'Product Lead & Founder', period: 'Jan 2026 — Present', current: true,
    points: [
      'Validated a veterinary HealthTech MVP with a no-code stack, converting sales from launch day.',
      'Migrated to Vercel + Supabase, cutting technical debt by 70% with an architecture ready for AI agents.',
      'Designed Claude Code dev workflows that tripled iteration speed; UX/UI test suite with Playwright.',
    ],
    stack: ['Next.js', 'Supabase', 'Vercel', 'Playwright'],
  },
  {
    company: 'TalentCross', url: 'https://talentcross.biz',
    role: 'AI Systems & Automation Specialist · Recruiter', period: 'Oct 2024 — May 2026',
    points: [
      'Automated the Manatal ATS with n8n, Make and AI predictive filtering, cutting operational load by 40%.',
      'Closed a record 60 senior IT roles for Fortune 500 clients, with data centralized in Airtable via REST APIs and webhooks.',
      'Translated technical concepts for non-technical stakeholders and drove AI adoption inside the team.',
    ],
    stack: ['n8n', 'Make', 'Airtable', 'LLMs'],
  },
  {
    company: 'DJPONLA', url: 'https://djponla.com',
    role: 'Product Manager & Co-Founder', period: 'May 2024 — Jan 2026',
    points: [
      'Won the Startup Perú 12G innovation fund and led expansion to 10 LATAM countries.',
      'Owned the roadmap (v0.dev, TypeScript) with a community of 40+ DJs, tracking retention, churn and LTV.',
    ],
    stack: ['TypeScript', 'v0.dev', 'Product metrics'],
  },
  {
    company: 'Programa Gestores de Cambio',
    role: 'Systems & Operations Assistant', period: 'Jul 2024 — Sep 2024',
    points: [
      'Automated the admissions funnel for 640+ applicants with Airtable, Make and WhatsApp Business, cutting replies from days to minutes.',
      'Centralized applicant data so the team could track the funnel and decide with numbers.',
    ],
    stack: ['Airtable', 'Make', 'WhatsApp Business'],
  },
];

// Proyectos y etapas que también fueron escuela
const EARLIER = [
  { period: '2026', role: 'Builder', org: 'Atlas', url: 'https://atlas-web-ten-liard.vercel.app/', note: 'AI CV tailoring with DeepSeek that flags anything not in your profile. Chrome extension + PDF.' },
  { period: '2026', role: 'Freelance developer', org: 'Enlace Comunicación', url: 'https://www.enlacecomunicacion.pe', note: 'New Next.js site for the first communications agency in Piura.' },
  { period: '2025', role: 'Founder', org: 'Sinkarta', url: 'https://sinkarta.com', note: 'Digital wedding invitations with real-time RSVP and a shared photo gallery.' },
  { period: '2023', role: 'Freelance web developer', org: 'HUB UDEP', url: 'https://www.hub.udep.pe/curso-de-especializacion-en-inversion-angel', note: 'Landing page for the Angel Investment specialization course, from brief to live in days.' },
  { period: '2022 — 2023', role: 'Self-taught developer', org: 'Go & React', url: 'https://github.com/jarbram', note: 'JWT auth microservice in Go, a payment gateway with the Strategy pattern, CRUD apps on PostgreSQL and MongoDB.' },
];

const SKILLS = [
  { group: 'AI & agents', items: ['Claude Code', 'Agents', 'Prompt engineering', 'Context management', 'Function/tool calling', 'RAG · Pinecone', 'Gemini', 'OpenAI', 'DeepSeek'] },
  { group: 'Automation',  items: ['n8n', 'Make', 'Airtable', 'REST APIs', 'Webhooks', 'Python'] },
  { group: 'Product & code', items: ['Next.js', 'TypeScript', 'Supabase', 'SQL', 'Vercel', 'Playwright', 'Remotion'] },
  { group: 'Ways of working', items: ['Lean Startup', 'Scrum', 'Kanban', 'Product metrics'] },
];

const EDUCATION = [
  { title: 'B.A. Business Administration', org: 'Universidad de Piura', year: '2017 — 2022' },
  { title: 'Diploma in Open Innovation', org: 'Universidad Tecnológica Nacional, Argentina', year: '2024' },
  { title: 'Ethical Hacking', org: 'Hackmetrix Hackers Academy', year: '2024' },
  { title: 'Frontend Development', org: 'Oracle ONE · Alura', year: '2023' },
];

const CHAT = [
  { q: 'Business degree, shipping code. How?', a: 'Founding startups forced it. I needed MVPs faster than I could hire, so I learned to build them. Today AI lets me go from idea to production in days.' },
  { q: 'What does AI Ops mean for you?', a: 'Finding the work a team repeats every week and turning it into a system: agents, automations and LLMs wired to real business problems.' },
  { q: 'How do you decide what to build?', a: 'Outcome first, feature second. Validate cheap, measure, then scale what works. Speed beats perfection.' },
  { q: 'What does your stack look like?', a: 'Claude Code is my daily pair. Next.js and Supabase for products, n8n and Make to glue systems, Gemini and DeepSeek with RAG for agents, Remotion for video, AWS serverless when it has to scale.' },
  { q: 'Biggest win so far?', a: 'Winning Startup Perú 12G with DJPONLA and taking it to 10 LATAM countries. Close second: 60 senior IT roles closed for Fortune 500 clients.' },
  { q: 'Why should we hire you?', a: 'I have sat on both sides: recruiter who knows what teams need, founder who ships it. You get someone who finds the problem and builds the fix.' },
];

/* ── Layout ── */

const Page = styled.main`
  max-width: 1080px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 4.5rem;

  @media (max-width: 768px) { padding: 1.5rem 1rem 4rem; gap: 3.5rem; }
`;

const Section = styled(motion.section).attrs({ variants: reveal, initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-10% 0px' } })`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const Eyebrow = styled.h2`
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--about);
`;

/* ── Hero ── */

const Hero = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 700px) { grid-template-columns: 1fr; gap: 1.4rem; }
`;

const Photo = styled.img`
  width: 168px;
  height: 168px;
  border-radius: var(--radius-lg);
  object-fit: cover;
  border: 1px solid var(--surface-3);

  @media (max-width: 700px) { width: 112px; height: 112px; }
`;

const Name = styled.h1`
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  font-weight: 800;
  line-height: 0.95;
  text-transform: uppercase;
`;

const Role = styled.p`
  margin-top: 0.7rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--about);
`;

const Summary = styled.p`
  margin-top: 0.9rem;
  max-width: 62ch;
  color: var(--ink-muted);
  line-height: 1.65;
`;

const Meta = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.2rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--ink-faint);
`;

const Available = styled.li`
  color: var(--product);
  display: flex;
  align-items: center;
  gap: 0.45rem;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.4rem;
`;

const Btn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border-radius: var(--radius-pill);
  font-weight: 700;
  font-size: 0.88rem;
  border: 1px solid ${p => p.$primary ? 'var(--about)' : 'var(--line-strong)'};
  background: ${p => p.$primary ? 'var(--about)' : 'transparent'};
  color: ${p => p.$primary ? 'var(--on-color)' : 'var(--ink)'};
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-out), border-color var(--dur-base) var(--ease-out);

  &:hover { border-color: ${p => p.$primary ? 'var(--about)' : 'var(--ink-faint)'}; }
  &:active { transform: scale(0.96); }
`;

/* ── Métricas (bento) ── */

const Bento = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;

  @media (max-width: 800px) { grid-template-columns: repeat(2, 1fr); }
`;

const Metric = styled(motion.div)`
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: var(--radius-lg);
  padding: 1.3rem 1.2rem;

  strong {
    display: block;
    font-family: var(--font-mono);
    font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700;
    line-height: 1;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
  }
  span {
    display: block;
    margin-top: 0.6rem;
    font-size: 0.85rem;
    line-height: 1.45;
    color: var(--ink-muted);
  }
`;

/* ── Experiencia (timeline) ── */

const Timeline = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const Job = styled.li`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 1.5rem;
  padding: 1.6rem 0;
  border-top: 1px solid var(--line);

  @media (max-width: 700px) { grid-template-columns: 1fr; gap: 0.5rem; }
`;

const Period = styled.p`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--ink-faint);
  padding-top: 0.25rem;

  em {
    display: inline-block;
    margin-top: 0.5rem;
    font-style: normal;
    color: var(--product);
  }
`;

const JobTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;

  a { color: var(--about); }
  a:hover { text-decoration: underline; text-underline-offset: 3px; }
`;

const Points = styled.ul`
  margin-top: 0.7rem;
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  color: var(--ink-muted);
  line-height: 1.6;
  max-width: 70ch;

  li::marker { color: var(--about); }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: ${p => p.$tight ? '0' : '0.9rem'};
`;

const Chip = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  border: 1px solid var(--surface-3);
  color: var(--ink-muted);
`;

const Earlier = styled.ul`
  list-style: none;
  margin-top: 0.5rem;

  h3 { font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-faint); margin-bottom: 0.4rem; }
  li {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 1.5rem;
    padding: 0.9rem 0;
    border-top: 1px solid var(--line);
    break-inside: avoid;
  }
  li > span { font-family: var(--font-mono); font-size: 0.78rem; color: var(--ink-faint); padding-top: 0.15rem; }
  strong { font-weight: 600; }
  a { color: var(--about); }
  p { margin-top: 0.2rem; font-size: 0.9rem; color: var(--ink-muted); line-height: 1.55; }

  @media (max-width: 700px) { li { grid-template-columns: 1fr; gap: 0.2rem; } }
`;

const SideNote = styled.p`
  padding-top: 1.2rem;
  border-top: 1px solid var(--line);
  font-size: 0.9rem;
  color: var(--ink-faint);

  a { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
`;

/* ── Skills + educación ── */

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2.5rem;

  @media (max-width: 800px) { grid-template-columns: 1fr; gap: 3.5rem; }
`;

const SkillRow = styled.div`
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 0.8rem;
  padding: 0.9rem 0;
  border-top: 1px solid var(--line);

  h3 { font-family: var(--font-text); font-size: 0.85rem; font-weight: 600; color: var(--ink); letter-spacing: 0; }

  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

const EduItem = styled.div`
  padding: 0.9rem 0;
  border-top: 1px solid var(--line);

  h3 { font-family: var(--font-text); font-size: 0.95rem; font-weight: 600; letter-spacing: 0; }
  p  { font-size: 0.85rem; color: var(--ink-faint); margin-top: 0.15rem; }
  span { font-family: var(--font-mono); font-size: 0.75rem; }
`;

/* ── CTA ── */

const Cta = styled(Section)`
  align-items: flex-start;
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  background: var(--surface-1);
  border: 1px solid var(--surface-3);

  h2 {
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 800;
    line-height: 1;
    text-transform: uppercase;
  }
  p { color: var(--ink-muted); max-width: 52ch; }

  @media (max-width: 600px) { padding: 1.6rem; }
`;

/* ── Componente ── */

// ponytail: "Download CV" imprime esta misma página (estilos print en GlobalStyles); sin PDF que mantener aparte
const printCV = (e) => { e.preventDefault(); window.print(); };

const About = () => (
  <>
    <Header />
    <Page>
      <Hero variants={reveal} initial="hidden" animate="visible">
        <Photo src="/abraham.jpeg" alt="Abraham Huacchillo" width="168" height="168" />
        <div>
          <Name>Abraham Huacchillo</Name>
          <Role>AI Ops Specialist · Product Builder</Role>
          <Summary>
            I turn repetitive business work into AI systems: agents, automations and LLM integrations
            that ship to production. Two-time founder, Startup Perú winner, and the person who builds
            the MVP himself — usually with Claude Code as pair.
          </Summary>
          <Meta>
            <Available>Open to remote AI Ops / Product roles</Available>
            <li>Piura, Perú · Remote</li>
            <li>Spanish (native) · English (B2+)</li>
          </Meta>
          <Actions data-noprint>
            <Btn $primary href="#" onClick={printCV}>Download CV</Btn>
            <Btn href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</Btn>
            <Btn href={`mailto:${EMAIL}`}>Email me</Btn>
          </Actions>
          <Meta className="print-only">
            <li>{EMAIL}</li><li>linkedin.com/in/abraham-huacchillo</li><li>github.com/jarbram</li>
          </Meta>
        </div>
      </Hero>

      <Section aria-labelledby="impact">
        <Eyebrow id="impact">Impact</Eyebrow>
        <Bento>
          {METRICS.map(m => (
            <Metric key={m.label} whileHover={hoverLift}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </Metric>
          ))}
        </Bento>
      </Section>

      <Section aria-labelledby="experience">
        <Eyebrow id="experience">Experience</Eyebrow>
        <Timeline>
          {EXPERIENCE.map(job => (
            <Job key={job.company}>
              <Period>
                {job.period}
                {job.current && <><br /><em>● Now</em></>}
              </Period>
              <div>
                <JobTitle>
                  {job.role} · <a href={job.url} target="_blank" rel="noopener noreferrer">{job.company}</a>
                </JobTitle>
                <Points>{job.points.map(p => <li key={p}>{p}</li>)}</Points>
                <Chips>{job.stack.map(s => <Chip key={s}>{s}</Chip>)}</Chips>
              </div>
            </Job>
          ))}
        </Timeline>
        <Earlier>
          <h3>Also part of the path</h3>
          {EARLIER.map(e => (
            <li key={e.org}>
              <span>{e.period}</span>
              <div>
                <strong>{e.role} · <a href={e.url} target="_blank" rel="noopener noreferrer">{e.org}</a></strong>
                <p>{e.note}</p>
              </div>
            </li>
          ))}
        </Earlier>
        <SideNote>How these systems work inside: <Link to="/systems">Systems</Link>.</SideNote>
      </Section>

      <Section aria-labelledby="words" data-noprint>
        <Eyebrow id="words">In my words</Eyebrow>
        <AskMe
          items={CHAT}
          title="Ask me anything."
          sub="Well, almost. Pick a question and I’ll answer like I would in an interview."
        />
      </Section>

      <TwoCol>
        <Section aria-labelledby="skills">
          <Eyebrow id="skills">Skills</Eyebrow>
          <div>
            {SKILLS.map(s => (
              <SkillRow key={s.group}>
                <h3>{s.group}</h3>
                <Chips $tight>{s.items.map(i => <Chip key={i}>{i}</Chip>)}</Chips>
              </SkillRow>
            ))}
          </div>
        </Section>

        <Section aria-labelledby="education">
          <Eyebrow id="education">Education & certifications</Eyebrow>
          <div>
            {EDUCATION.map(e => (
              <EduItem key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.org} · <span>{e.year}</span></p>
              </EduItem>
            ))}
          </div>
        </Section>
      </TwoCol>

      <Cta aria-labelledby="cta" data-noprint>
        <h2 id="cta">Let’s automate something.</h2>
        <p>Open to remote roles in AI Operations, automation and product. I reply within a day.</p>
        <Actions>
          <Btn $primary href={`mailto:${EMAIL}`}>{EMAIL}</Btn>
          <Btn href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</Btn>
        </Actions>
      </Cta>
    </Page>
  </>
);

export default About;
