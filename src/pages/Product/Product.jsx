import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import { reveal, threadProps, message } from '../../styles/motion';

/* ── animations ── */

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

/* ── layout ── */

const Page = styled.div`
  background: var(--background);
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: -200px;
    left: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(80,200,120,0.06) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
    filter: blur(20px);
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 6rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2rem 1rem 5rem;
  }
`;

/* ── hero ── */

const Hero = styled.div`
  margin-bottom: 3rem;
`;

const Dot = styled.span`
  color: var(--product);
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: var(--ink);
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
`;

const HeroSub = styled(motion.p)`
  font-size: 0.95rem;
  color: var(--ink-muted);
  line-height: 1.7;
  max-width: 560px;
  font-weight: 500;
`;

/* ── quote strip ── */

const QuoteStrip = styled.div`
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: 12px;
  padding: 1rem 1.4rem;
  margin-bottom: 3rem;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--accent);
  min-height: 52px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before { content: '>'; color: var(--ink-faint); flex-shrink: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 0.9em;
  background: var(--accent);
  vertical-align: middle;
  margin-left: 2px;
  animation: ${blink} 0.9s infinite;
`;

/* ── chat card ── */

const ChatCard = styled(motion.div)`
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ChatTopBar = styled.div`
  padding: 0.9rem 1.4rem;
  background: var(--surface-2);
  border-bottom: 1px solid #222;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-faint);
`;

const ChatBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.4rem;
`;

const MsgMeta = styled(motion.span)`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--ink-faint);
  padding: 0 0.4rem;
  align-self: ${p => p.$right ? 'flex-end' : 'flex-start'};
`;

const Q = styled(motion.div)`
  transform-origin: bottom left;
  background: var(--ink);
  color: var(--bg);
  padding: 0.75rem 1.1rem;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  max-width: 82%;
  align-self: flex-start;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.55;
`;

const A = styled(motion.div)`
  transform-origin: bottom right;
  background: var(--accent);
  color: #fff;
  padding: 0.75rem 1.1rem;
  border-radius: 16px;
  border-bottom-right-radius: 4px;
  max-width: 82%;
  align-self: flex-end;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.55;
  box-shadow: 0 8px 20px -10px rgba(254,74,35,0.45);
`;

/* ── grid ── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
`;

const CardLabel = styled.h3`
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-faint);
  margin-bottom: 1.2rem;
`;

const Step = styled.div`
  display: flex;
  gap: 0.9rem;
  margin-bottom: 1.3rem;

  &:last-child { margin-bottom: 0; }
`;

const StepNum = styled.span`
  font-size: 0.65rem;
  font-weight: 900;
  flex-shrink: 0;
  margin-top: 0.18rem;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(254,74,35,0.1);
  color: var(--accent);
  border: 1px solid rgba(254,74,35,0.18);
  letter-spacing: 0;
`;

const StepText = styled.div`
  h4 {
    font-size: 0.88rem;
    color: var(--ink);
    font-weight: 700;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 0.8rem;
    color: var(--ink-muted);
    line-height: 1.55;
  }
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--surface-2);

  &:last-child { border-bottom: none; padding-bottom: 0; }
  &:first-child { padding-top: 0; }
`;

const StatLabel = styled.span`
  font-size: 0.82rem;
  color: var(--ink-muted);
  font-weight: 600;
`;

const StatValue = styled.span`
  font-size: 1rem;
  font-weight: 900;
  color: var(--product);
`;

const ShipRow = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--surface-2);
  transition: padding var(--dur-base) var(--ease-out);

  &:last-child { border-bottom: none; padding-bottom: 0; }

  strong {
    display: block;
    font-family: var(--font-display);
    font-size: 1rem;
    color: var(--ink);
    text-transform: uppercase;
  }
  em {
    font-style: normal;
    font-size: 0.82rem;
    color: var(--ink-muted);
  }

  @media (hover: hover) {
    &:hover { padding-left: 0.4rem; }
    &:hover span:last-child { color: var(--product); }
  }
`;

const ShipArrow = styled.span`
  color: var(--ink-faint);
  font-size: 1.1rem;
  transition: color var(--dur-base) var(--ease-out);
`;

const shipped = [
  { name: 'LadraApp', what: 'SaaS for veterinary clinics', url: 'https://ladraapp.com' },
  { name: 'DJPONLA',  what: 'Live song requests for DJs', url: 'https://www.djponla.com' },
  { name: 'Atlas',    what: 'CV adapted to every job, no invented experience', url: 'https://atlas-web-ten-liard.vercel.app/' },
  { name: 'Sinkarta', what: 'Digital invitations with real-time RSVP', url: 'https://sinkarta.com' },
];

/* ── component ── */

const quotes = [
  "Fall in love with the problem, not the solution — Steve Blank",
  "If you're not embarrassed by your first MVP, you launched too late — Reid Hoffman",
  "Make things people want — Paul Graham",
  "The best way to predict the future is to create it — Peter Drucker",
  "A product manager's best friend? User feedback and a shipping deadline ☕",
  "MVP: build the smallest thing that creates the biggest impact",
  "Validate fast, learn faster, ship even faster",
  "Prompts are cheap. Problems worth solving are not.",
  "The prototype is the spec.",
];

const Product = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayed, setDisplayed]   = useState('');


  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const t = quotes[quoteIndex];
    const timer = setInterval(() => {
      setDisplayed(t.slice(0, i + 1));
      i++;
      if (i >= t.length) {
        clearInterval(timer);
        setTimeout(() => setQuoteIndex(p => (p + 1) % quotes.length), 3000);
      }
    }, 32);
    return () => clearInterval(timer);
  }, [quoteIndex]);

  return (
    <>
      <Header />
      <Page>
        <Container>

          <Hero>
            <HeroTitle
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            >
              From idea to<br />live product<Dot>.</Dot>
            </HeroTitle>
            <HeroSub
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              AI made building cheap. Knowing what to build didn't get any easier.
              I validate with users, vibe-code the first version, and ship it on real infrastructure.
            </HeroSub>
          </Hero>

          <QuoteStrip>
            {displayed}<Cursor />
          </QuoteStrip>

          <ChatCard
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            <ChatTopBar>How it started</ChatTopBar>
            <ChatBody {...threadProps}>
              <MsgMeta variants={message}>Incubator</MsgMeta>
              <Q variants={message}>We want to build something for the party scene. Do you want to co-found it?</Q>
              <MsgMeta variants={message} $right>Abraham</MsgMeta>
              <A variants={message}>Talked to 100+ DJs and partygoers first. Validated the problem. Then we built.</A>
              <MsgMeta variants={message}>Partner</MsgMeta>
              <Q variants={message}>Now we need a SaaS for veterinary clinics. Same approach?</Q>
              <MsgMeta variants={message} $right>Abraham</MsgMeta>
              <A variants={message}>Problem first. Clinics drowning in paperwork. LadraApp shipped in months.</A>
              <MsgMeta variants={message}>Subastop</MsgMeta>
              <Q variants={message}>VMC has to scale support and content without hiring a team for each. Can AI carry it?</Q>
              <MsgMeta variants={message} $right>Abraham</MsgMeta>
              <A variants={message}>Where it saves hours, yes. Subastín answers buyers and hands off to an advisor; Prisma turns an auction lot into a reel.</A>
            </ChatBody>
          </ChatCard>

          <Grid>
            <Card
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            >
              <CardLabel>The method</CardLabel>
              <Step>
                <StepNum>01</StepNum>
                <StepText>
                  <h4>Problem, not features</h4>
                  <p>Talk to real users first. I write the problem down before I write a single prompt.</p>
                </StepText>
              </Step>
              <Step>
                <StepNum>02</StepNum>
                <StepText>
                  <h4>Prototype in hours</h4>
                  <p>Vibe-code a clickable version with V0, Lovable or Claude Code and put it in front of users that same week.</p>
                </StepText>
              </Step>
              <Step>
                <StepNum>03</StepNum>
                <StepText>
                  <h4>Ship on real rails</h4>
                  <p>Auth, data and payments on managed primitives — Supabase, Vercel. The prototype becomes the spec.</p>
                </StepText>
              </Step>
              <Step>
                <StepNum>04</StepNum>
                <StepText>
                  <h4>Review like an editor</h4>
                  <p>AI writes the boilerplate. I own quality, security and how the pieces fit.</p>
                </StepText>
              </Step>
              <Step>
                <StepNum>05</StepNum>
                <StepText>
                  <h4>Measure, then automate</h4>
                  <p>Keep what moves the numbers, and hand the repetitive ops to agents so the team stays small.</p>
                </StepText>
              </Step>
            </Card>

            <Card
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            >
              <CardLabel>By the numbers</CardLabel>
              <StatRow>
                <StatLabel>User interviews done</StatLabel>
                <StatValue>1,000+</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Own products live</StatLabel>
                <StatValue>4</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>DJs on DJPONLA</StatLabel>
                <StatValue>100+</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Features tested vs shipped</StatLabel>
                <StatValue>5:1</StatValue>
              </StatRow>
            </Card>
          </Grid>

          <Card
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            style={{ marginTop: '1.2rem' }}
          >
            <CardLabel>Shipped</CardLabel>
            {shipped.map(item => (
              <ShipRow key={item.name} href={item.url} target="_blank" rel="noopener noreferrer">
                <span>
                  <strong>{item.name}</strong>
                  <em>{item.what}</em>
                </span>
                <ShipArrow aria-hidden="true">→</ShipArrow>
              </ShipRow>
            ))}
          </Card>

        </Container>
        <Footer />
      </Page>
    </>
  );
};

export default Product;
