import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';

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

const HeroLabel = styled.p`
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #50C878;
  margin-bottom: 0.8rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: #fdfbfb;
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 1rem;
`;

const HeroSub = styled(motion.p)`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
  max-width: 560px;
  font-weight: 500;
`;

/* ── quote strip ── */

const QuoteStrip = styled.div`
  background: #161616;
  border: 1px solid #232323;
  border-radius: 12px;
  padding: 1rem 1.4rem;
  margin-bottom: 3rem;
  font-family: 'Courier New', monospace;
  font-size: 0.88rem;
  color: #FE4A23;
  min-height: 52px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before { content: '>'; color: #444; flex-shrink: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 0.9em;
  background: #FE4A23;
  vertical-align: middle;
  margin-left: 2px;
  animation: ${blink} 0.9s infinite;
`;

/* ── chat card ── */

const ChatCard = styled(motion.div)`
  background: #161616;
  border: 1px solid #232323;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ChatTopBar = styled.div`
  padding: 0.9rem 1.4rem;
  background: #1b1b1b;
  border-bottom: 1px solid #222;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.28);
`;

const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.4rem;
`;

const MsgMeta = styled.span`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(255,255,255,0.2);
  padding: 0 0.4rem;
  align-self: ${p => p.$right ? 'flex-end' : 'flex-start'};
`;

const Q = styled.div`
  background: #efefef;
  color: #131313;
  padding: 0.75rem 1.1rem;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  max-width: 82%;
  align-self: flex-start;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.55;
`;

const A = styled.div`
  background: linear-gradient(135deg, #FE4A23, #ff6340);
  color: #fff;
  padding: 0.75rem 1.1rem;
  border-radius: 16px;
  border-bottom-right-radius: 4px;
  max-width: 82%;
  align-self: flex-end;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.55;
  box-shadow: 0 4px 18px rgba(254,74,35,0.2);
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
  background: #161616;
  border: 1px solid #232323;
  border-radius: 20px;
  padding: 1.5rem;
`;

const CardLabel = styled.h3`
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.28);
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
  color: #FE4A23;
  border: 1px solid rgba(254,74,35,0.18);
  letter-spacing: 0;
`;

const StepText = styled.div`
  h4 {
    font-size: 0.88rem;
    color: #fdfbfb;
    font-weight: 700;
    margin-bottom: 0.3rem;
  }
  p {
    font-size: 0.8rem;
    color: #555;
    line-height: 1.55;
  }
`;

const StatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #1e1e1e;

  &:last-child { border-bottom: none; padding-bottom: 0; }
  &:first-child { padding-top: 0; }
`;

const StatLabel = styled.span`
  font-size: 0.82rem;
  color: #555;
  font-weight: 600;
`;

const StatValue = styled.span`
  font-size: 1rem;
  font-weight: 900;
  color: #50C878;
`;

/* ── component ── */

const Product = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayed, setDisplayed]   = useState('');

  const quotes = [
    "Fall in love with the problem, not the solution — Steve Blank",
    "If you're not embarrassed by your first MVP, you launched too late — Reid Hoffman",
    "Make things people want — Paul Graham",
    "The best way to predict the future is to create it — Peter Drucker",
    "A product manager's best friend? User feedback and a shipping deadline ☕",
    "MVP: build the smallest thing that creates the biggest impact",
    "Validate fast, learn faster, ship even faster",
  ];

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
            <HeroLabel>Product Builder</HeroLabel>
            <HeroTitle
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              From idea to<br />digital reality.
            </HeroTitle>
            <HeroSub
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              Building products isn't about perfect code or fancy features.
              It's about solving real problems — fast, validated, and shipped.
            </HeroSub>
          </Hero>

          <QuoteStrip>
            {displayed}<Cursor />
          </QuoteStrip>

          <ChatCard
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          >
            <ChatTopBar>How it started</ChatTopBar>
            <ChatBody>
              <MsgMeta>Incubator</MsgMeta>
              <Q>We want to build something for the party scene. Do you want to co-found it?</Q>
              <MsgMeta $right>Abraham</MsgMeta>
              <A>Talked to 100+ DJs and partygoers first. Validated the problem. Then we built.</A>
              <MsgMeta>Partner</MsgMeta>
              <Q>Now we need a SaaS for veterinary clinics. Same approach?</Q>
              <MsgMeta $right>Abraham</MsgMeta>
              <A>Problem first. 500+ clinics drowning in paperwork. LadraApp shipped in months.</A>
            </ChatBody>
          </ChatCard>

          <Grid>
            <Card
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            >
              <CardLabel>The method</CardLabel>
              <Step>
                <StepNum>01</StepNum>
                <StepText>
                  <h4>Problem first</h4>
                  <p>Never start with a solution. Talk to real users. Become obsessed with the problem.</p>
                </StepText>
              </Step>
              <Step>
                <StepNum>02</StepNum>
                <StepText>
                  <h4>Validate fast</h4>
                  <p>Quick experiments, faster learnings. A failed test is a successful data point.</p>
                </StepText>
              </Step>
              <Step>
                <StepNum>03</StepNum>
                <StepText>
                  <h4>Ship the MVP</h4>
                  <p>Build the smallest thing that creates the biggest impact. If it solves it, ship it.</p>
                </StepText>
              </Step>
              <Step>
                <StepNum>04</StepNum>
                <StepText>
                  <h4>Measure and iterate</h4>
                  <p>Every feature should make users happier or bring more users. Ideally both.</p>
                </StepText>
              </Step>
            </Card>

            <Card
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: 0.07, ease: [0.23, 1, 0.32, 1] }}
            >
              <CardLabel>By the numbers</CardLabel>
              <StatRow>
                <StatLabel>User interviews done</StatLabel>
                <StatValue>1,000+</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Products founded</StatLabel>
                <StatValue>3</StatValue>
              </StatRow>
              <StatRow>
                <StatLabel>Active clinics — LadraApp</StatLabel>
                <StatValue>500+</StatValue>
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

        </Container>
        <Footer />
      </Page>
    </>
  );
};

export default Product;
