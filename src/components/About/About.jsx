import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../Header/Header';
import { motion } from 'framer-motion';
import { reveal } from '../../styles/motion';

const pulseGreen = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(80, 200, 120, 0.5); }
  60%       { box-shadow: 0 0 0 7px rgba(80, 200, 120, 0); }
`;

const AboutPage = styled.div`
  background: var(--background);
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    position: fixed;
    top: -300px;
    right: -300px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(254,74,35,0.08) 0%, transparent 65%);
    pointer-events: none;
    z-index: 0;
    filter: blur(20px);
  }
`;

const ContentContainer = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.5rem;
  padding: 2rem 1.5rem 5rem;
  position: relative;
  z-index: 1;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 1.5rem 1rem 4rem;
  }
`;

/* ── Left column: chat ── */

const ChatCard = styled(motion.div)`
  background: var(--surface-1);
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface-3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatTopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.4rem;
  background: var(--surface-2);
  border-bottom: 1px solid #222;
`;

const AvatarWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  object-fit: cover;
  display: block;
  border: 1.5px solid var(--line);
`;

const OnlineDot = styled.span`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 11px;
  height: 11px;
  background: var(--product);
  border-radius: 50%;
  border: 2px solid var(--surface-2);
  animation: ${pulseGreen} 2.5s infinite;
`;

const ChatMeta = styled.div``;

const ChatName = styled.h1`
  font-size: 0.95rem;
  color: var(--ink);
  font-weight: 800;
  margin-bottom: 0.15rem;
  letter-spacing: 0.01em;
`;

const ChatRole = styled.p`
  font-size: 0.72rem;
  color: var(--ink-faint);
  font-weight: 500;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;

const MessagesArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding: 1.6rem 1.4rem;
`;

const MsgGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

const MsgMeta = styled.span`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--ink-faint);
  padding: 0 0.4rem;
  align-self: ${props => props.$right ? 'flex-end' : 'flex-start'};
`;

const QuestionBubble = styled.div`
  background: var(--ink);
  color: var(--bg);
  padding: 0.8rem 1.1rem;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  max-width: 84%;
  align-self: flex-start;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.55;
  letter-spacing: 0.01em;
`;

const AnswerBubble = styled.div`
  background: var(--accent);
  color: #fff;
  padding: 0.8rem 1.1rem;
  border-radius: 16px;
  border-bottom-right-radius: 4px;
  max-width: 84%;
  align-self: flex-end;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.55;
  letter-spacing: 0.01em;
  box-shadow: 0 6px 24px rgba(254,74,35,0.22);
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255,255,255,0.18);
`;

const TechBadge = styled(motion.span)`
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.22rem 0.55rem;
  border-radius: 5px;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.18);
  cursor: default;
`;

/* ── Right column ── */

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const InfoCard = styled(motion.div)`
  background: var(--surface-1);
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface-3);
  padding: 1.4rem;
`;

const CardLabel = styled.h3`
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-faint);
  margin-bottom: 1.1rem;
`;

const RoleItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  background: ${props => props.$current ? 'rgba(80,200,120,0.06)' : '#1c1c1c'};
  border-radius: 12px;
  border: 1px solid ${props => props.$current ? 'rgba(80,200,120,0.22)' : '#252525'};
  margin-bottom: 0.55rem;
  transition: border-color 0.25s ease, background 0.25s ease;

  &:last-child { margin-bottom: 0; }

  &:hover {
    border-color: ${props => props.$current ? 'rgba(80,200,120,0.4)' : '#303030'};
    background: ${props => props.$current ? 'rgba(80,200,120,0.09)' : '#1e1e1e'};
  }
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const RoleTitle = styled.h4`
  font-size: 0.88rem;
  color: var(--ink);
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const CompanyLink = styled.a`
  font-size: 0.77rem;
  color: #484848;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;

  &:hover { color: #707070; }
`;

const NowBadge = styled.span`
  font-size: 0.58rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--product);
  background: rgba(80,200,120,0.1);
  padding: 0.18rem 0.45rem;
  border-radius: 4px;
  border: 1px solid rgba(80,200,120,0.22);
  flex-shrink: 0;
  margin-top: 0.1rem;
  animation: ${pulseGreen} 3s infinite;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  color: var(--ink-muted);
  text-decoration: none;
  background: var(--surface-2);
  border-radius: 12px;
  border: 1px solid var(--surface-3);
  margin-bottom: 0.55rem;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;

  &:last-child { margin-bottom: 0; }

  &:hover {
    color: var(--ink);
    border-color: var(--line);
    background: var(--surface-2);
  }

  svg { width: 16px; height: 16px; flex-shrink: 0; }
`;

const SocialLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
`;

/* ── Animation variants ── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const msgVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } },
};

const roleVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.22, ease: [0.23, 1, 0.32, 1] } }),
};

/* ── Icons ── */

const IconArrow = () => (
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

/* ── Component ── */

const About = () => {
  const [content] = useState([
    {
      question: "What's your current focus in tech? 🤖",
      answer: "I'm fully focused on AI Operations — designing workflows, building automations, and connecting AI tools to real business problems. It's the perfect intersection of my product mindset and technical background. The goal is always the same: ship things that actually work. 🚀"
    },
    {
      question: "How did you get into AI Operations? 🎯",
      answer: "It grew naturally from building products. As a founder I was always trying to make things run faster and smarter. AI gave me the tools to do that at scale — going from building MVPs manually to orchestrating entire workflows with LLMs and AI agents. 💡"
    },
    {
      question: "What does your stack look like right now? 🔄",
      answer: "Claude Code is my daily pair. Around it: Next.js and Supabase for products, Python and Remotion for automation and video, n8n to glue it all together. Whatever ships fastest and solves the problem. 🛠️"
    },
    {
      question: "How do you approach creating real impact? 💫",
      answer: "I start with the outcome, not the feature. My startup background taught me that speed and validation matter more than perfection. I blend AI, product thinking, and code to build things that solve real problems — and then I ship them. 🌟"
    }
  ]);

  const roles = [
    { title: "AI Ops Specialist",      company: "Subastop · VMC", url: "https://www.vmcsubastas.com", current: true },
    { title: "Founder & Developer",    company: "LadraApp",       url: "https://ladraapp.com",        current: true },
    { title: "Builder",                company: "Atlas",          url: "https://atlas-web-ten-liard.vercel.app/" },
    { title: "Founder",                company: "Sinkarta",       url: "https://sinkarta.com"                    },
    { title: "Co-Founder & Developer", company: "DJPONLA",        url: "https://djponla.com"                     },
    { title: "Talent Acquisition",     company: "TalentCross",    url: "https://talentcross.biz"                 },
  ];

  const socials = [
    { label: "LinkedIn",   href: "https://linkedin.com/in/abraham-huacchillo", icon: <IconLinkedIn />  },
    { label: "Instagram",  href: "https://instagram.com/abrahamhuacchillo",    icon: <IconInstagram /> },
    { label: "GitHub",     href: "https://github.com/jarbram",                 icon: <IconGitHub />    },
  ];

  const tools = ["Claude Code", "Claude", "OpenAI", "Gemini", "n8n", "Next.js", "Supabase", "Python", "Remotion", "Playwright", "Vercel", "AWS"];

  return (
    <>
      <Header />
      <AboutPage>
        <ContentContainer>

          {/* ── Chat column ── */}
          <ChatCard
            variants={reveal}
            initial="hidden"
            animate="visible"
          >
            <ChatTopBar>
              <AvatarWrap>
                <Avatar src="/abraham.jpeg" alt="Abraham" />
                <OnlineDot />
              </AvatarWrap>
              <ChatMeta>
                <ChatName>Abraham Huacchillo</ChatName>
                <ChatRole>AI Ops Specialist @ Subastop · Product Builder</ChatRole>
              </ChatMeta>
            </ChatTopBar>

            <MessagesArea
              as={motion.div}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {content.map((item, index) => (
                <MsgGroup key={index} variants={msgVariants}>
                  <MsgMeta>You</MsgMeta>
                  <QuestionBubble>{item.question}</QuestionBubble>
                  <MsgMeta $right>Abraham</MsgMeta>
                  <AnswerBubble>
                    {item.answer}
                    {index === 2 && (
                      <TechStack>
                        {tools.map(tool => (
                          <TechBadge
                            key={tool}
                            whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.22)' }}
                          >
                            {tool}
                          </TechBadge>
                        ))}
                      </TechStack>
                    )}
                  </AnswerBubble>
                </MsgGroup>
              ))}
            </MessagesArea>
          </ChatCard>

          {/* ── Info column ── */}
          <InfoColumn>

            <InfoCard
              variants={reveal}
              initial="hidden"
              animate="visible"
            >
              <CardLabel>Experience</CardLabel>
              {roles.map((role, i) => (
                <RoleItem
                  key={i}
                  $current={role.current}
                  custom={i}
                  variants={roleVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <RoleInfo>
                    <RoleTitle>{role.title}</RoleTitle>
                    {role.url
                      ? <CompanyLink href={role.url} target="_blank" rel="noopener noreferrer">@ {role.company}</CompanyLink>
                      : <CompanyLink as="span">@ {role.company}</CompanyLink>
                    }
                  </RoleInfo>
                  {role.current && <NowBadge>now</NowBadge>}
                </RoleItem>
              ))}
            </InfoCard>

            <InfoCard
              variants={reveal}
              initial="hidden"
              animate="visible"
            >
              <CardLabel>Connect</CardLabel>
              {socials.map((s, i) => (
                <SocialLink
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.24 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <SocialLeft>
                    {s.icon}
                    {s.label}
                  </SocialLeft>
                  <IconArrow />
                </SocialLink>
              ))}
            </InfoCard>

          </InfoColumn>
        </ContentContainer>
      </AboutPage>
    </>
  );
};

export default About;
