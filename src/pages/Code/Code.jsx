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
    right: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(155,89,182,0.07) 0%, transparent 65%);
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
  color: var(--code);
  margin-bottom: 0.8rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: var(--ink);
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 1rem;
  font-family: var(--font-mono);
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
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: 12px;
  padding: 1rem 1.4rem;
  margin-bottom: 3rem;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  color: var(--code);
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
  background: var(--code);
  vertical-align: middle;
  margin-left: 2px;
  animation: ${blink} 0.9s infinite;
`;

/* ── chat card ── */

const ChatCard = styled(motion.div)`
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: 20px;
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

const A = styled.div`
  background: linear-gradient(135deg, var(--accent), var(--accent-hover));
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
  margin-bottom: 1.2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
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

const ToolGroup = styled.div`
  margin-bottom: 1.3rem;

  &:last-child { margin-bottom: 0; }
`;

const ToolGroupLabel = styled.p`
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #444;
  margin-bottom: 0.6rem;
`;

const BadgeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Badge = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.28rem 0.65rem;
  border-radius: 6px;
  background: var(--surface-2);
  color: #888;
  border: 1px solid var(--line);
`;

const GitHubCard = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--surface-1);
  border: 1px solid var(--surface-3);
  border-radius: 20px;
  padding: 1.4rem 1.6rem;
  text-decoration: none;
  transition: border-color 0.25s ease, background 0.25s ease;

  &:hover {
    border-color: var(--accent);
    background: #191919;
  }
`;

const GitHubLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const GitHubLabel = styled.span`
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.28);
`;

const GitHubTitle = styled.span`
  font-size: 1rem;
  font-weight: 900;
  color: var(--ink);
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const GitHubIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#555">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ── component ── */

const Code = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayed, setDisplayed]   = useState('');

  const quotes = [
    '"It works on my machine" — Every dev ever 😅',
    '"The best code is no code at all" — Jeff Atwood',
    '"First, solve the problem. Then, write the code" — John Johnson',
    '"Good developers copy, great ones steal from Stack Overflow" — Anonymous',
    '"Code never lies, comments sometimes do" — Ron Jeffries',
    'Now AI writes the code. We architect the thinking.',
    'The fastest ship is the one that validates before it builds.',
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
            <HeroLabel>Code & AI</HeroLabel>
            <HeroTitle
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {'< CodeLife />'}
            </HeroTitle>
            <HeroSub
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              Started with Go. Moved to React. Now orchestrating AI agents and vibe coding
              products into existence. The stack evolves — the shipping never stops.
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
            <ChatTopBar>The journey</ChatTopBar>
            <ChatBody>
              <MsgMeta>Curious</MsgMeta>
              <Q>How did you start coding? 🤓</Q>
              <MsgMeta $right>Abraham</MsgMeta>
              <A>Go was my first language. Deep end first. Had an amazing mentor — Carlos — who made goroutines click.</A>
              <MsgMeta>Curious</MsgMeta>
              <Q>And how does AI fit into that now?</Q>
              <MsgMeta $right>Abraham</MsgMeta>
              <A>AI is the new layer. I use Claude, Gemini, V0, and n8n to build and automate faster than ever. Code is still the foundation — AI multiplies it.</A>
            </ChatBody>
          </ChatCard>

          <Grid>
            <Card
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
            >
              <CardLabel>AI Stack</CardLabel>
              <ToolGroup>
                <ToolGroupLabel>Models</ToolGroupLabel>
                <BadgeRow>
                  <Badge>Claude</Badge>
                  <Badge>Gemini</Badge>
                </BadgeRow>
              </ToolGroup>
              <ToolGroup>
                <ToolGroupLabel>Vibe coding</ToolGroupLabel>
                <BadgeRow>
                  <Badge>V0</Badge>
                  <Badge>Bolt.new</Badge>
                  <Badge>Lovable</Badge>
                </BadgeRow>
              </ToolGroup>
              <ToolGroup>
                <ToolGroupLabel>Automation</ToolGroupLabel>
                <BadgeRow>
                  <Badge>n8n</Badge>
                  <Badge>Airtable</Badge>
                  <Badge>Softr</Badge>
                </BadgeRow>
              </ToolGroup>
              <ToolGroup>
                <ToolGroupLabel>Deploy</ToolGroupLabel>
                <BadgeRow>
                  <Badge>Vercel</Badge>
                  <Badge>Antigravity</Badge>
                </BadgeRow>
              </ToolGroup>
            </Card>

            <Card
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: 0.07, ease: [0.23, 1, 0.32, 1] }}
            >
              <CardLabel>Dev Stack</CardLabel>
              <ToolGroup>
                <ToolGroupLabel>Frontend</ToolGroupLabel>
                <BadgeRow>
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Vite</Badge>
                </BadgeRow>
              </ToolGroup>
              <ToolGroup>
                <ToolGroupLabel>Backend</ToolGroupLabel>
                <BadgeRow>
                  <Badge>Go</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>Python</Badge>
                </BadgeRow>
              </ToolGroup>
              <ToolGroup>
                <ToolGroupLabel>Security</ToolGroupLabel>
                <BadgeRow>
                  <Badge>Kali Linux</Badge>
                  <Badge>Burp Suite</Badge>
                </BadgeRow>
              </ToolGroup>
              <ToolGroup>
                <ToolGroupLabel>DevOps</ToolGroupLabel>
                <BadgeRow>
                  <Badge>Docker</Badge>
                  <Badge>AWS</Badge>
                </BadgeRow>
              </ToolGroup>
            </Card>
          </Grid>

          <GitHubCard
            href="https://github.com/jarbram"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          >
            <GitHubLeft>
              <GitHubLabel>Repos & open source</GitHubLabel>
              <GitHubTitle>github.com/jarbram</GitHubTitle>
            </GitHubLeft>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <GitHubIcon />
              <ArrowIcon />
            </div>
          </GitHubCard>

        </Container>
        <Footer />
      </Page>
    </>
  );
};

export default Code;
