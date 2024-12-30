import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';

const ProductSection = styled.section`
  background: var(--background);
  padding: 0;
  min-height: 100vh;
  padding: 0 1rem;
`;

const HeroSection = styled.div`
  text-align: center;
  max-width: 1200px;
  margin: 4rem auto;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  color: #fdfbfb;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #888;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 650px;
  margin: 4rem auto;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 25px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ChatMessage = styled(motion.div)`
  max-width: 80%;
  padding: 0.5rem 1.5rem;
  margin: 0.3rem 0;
  border-radius: 20px;
  font-family: "Buzz Black", sans-serif;
  font-weight: 500;
  line-height: 1.6;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  
  ${props => props.isUser ? `
    background: #fdfbfb;
    color: #131313;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transform-origin: bottom left;
    
    &:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  ` : `
    background: linear-gradient(135deg, #4A90E2, #45B7D1);
    color: #fdfbfb;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
    transform-origin: bottom right;
    
    &:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  `}
`;

const TechStackSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 4rem auto;
  padding: 2rem;
`;

const TechCard = styled(motion.div)`
  background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  img {
    width: 40px;
    height: 40px;
    margin-bottom: 1rem;
  }
  
  h4 {
    color: #fdfbfb;
    font-size: 1rem;
  }
`;

const MethodologySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 0.2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;
  }
`;

const MethodologyCard = styled(motion.div)`
  background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
  padding: 2rem;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const StepContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Emoji = styled.span`
  font-size: 2rem;
`;

const StepContent = styled.div`
  h3 {
    color: #fdfbfb;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #888;
  }
`;

const CaseStudyCard = styled(motion.div)`
  background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
  padding: 2rem;
  border-radius: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  h2 {
    color: #4A90E2;
    font-size: 2rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    
    span:last-child {
      color: #45B7D1;
    }
  }
`;

const StatsList = styled.ul`
  list-style: none;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StatItem = styled(motion.li)`
  color: #fdfbfb;
  padding: 1.5rem;
  background: rgba(26, 26, 26, 0.8);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  h4 {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #4A90E2;
  }
  
  p {
    color: #888;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .stat-box {
    background: rgba(74, 144, 226, 0.1);
    padding: 0.8rem;
    border-radius: 10px;
    text-align: center;

    .number {
      color: #45B7D1;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
    }

    .label {
      color: #888;
      font-size: 0.8rem;
    }
  }
  
  &:hover {
    transform: translateX(10px);
    background: rgba(26, 26, 26, 0.9);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const GithubSection = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
`;

const GithubEmbed = styled.div`
  background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
  border-radius: 25px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  iframe {
    width: 100%;
    height: 500px;
    border: none;
    border-radius: 15px;
  }
`;

const QuotesSection = styled.div`
  text-align: center;
  margin: 3rem auto 4rem;
  max-width: 800px;
  color: #fdfbfb;
  padding: 0 1rem;
`;

const QuotesSlider = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 80px;
  margin: 2rem auto;
  
  @media (max-width: 768px) {
    height: 120px;
  }
`;

const QuoteItem = styled(motion.div)`
  position: absolute;
  width: 100%;
  text-align: left;
  font-size: 1.5rem;
  font-family: 'Courier New', monospace;
  color: #4A90E2;
  padding: 0 2rem;
  
  &::before {
    content: '> ';
    color: #45B7D1;
  }
  
  .cursor {
    display: inline-block;
    width: 0.6em;
    height: 1.2em;
    background-color: #45B7D1;
    margin-left: 2px;
    vertical-align: middle;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 1rem;
  }
`;

const Code = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  
  const quotes = [
    "\"It works on my machine\" - Every dev ever 😅",
    "\"It's not a bug, it's an undocumented feature\" - Anonymous 🐛",
    "\"The best code is no code at all\" - Jeff Atwood 🧠",
    "\"If debugging is removing bugs, programming must be adding them\" - Edsger Dijkstra 🤔",
    "\"Code never lies, comments sometimes do\" - Ron Jeffries 📝",
    "\"Coffee is the primary requirement for code\" - Every dev at 3am ☕",
    "\"Git is like a time machine, but with more conflicts\" - Frustrated Dev 🕰️",
    "\"First, solve the problem. Then, write the code\" - John Johnson 🎯",
    "\"Code is like humor. When you have to explain it, it's bad\" - Cory House 😂",
    "\"Good developers copy, great ones steal from Stack Overflow\" - Anonymous Dev 🥷"
  ];

  useEffect(() => {
    let index = 0;
    const text = quotes[currentQuote];
    setDisplayedText('');
    
    const typing = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      
      if (index >= text.length) {
        clearInterval(typing);
        setTimeout(() => {
          setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 3000);
      }
    }, 35);

    return () => {
      clearInterval(typing);
    };
  }, [currentQuote]);

  return (
    <ProductSection>
      <Header />
      
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {'< CodeLife />'}
        </Title>
      </HeroSection>

      <ChatContainer>
        <ChatMessage isUser>
          Hey! How did you start this coding adventure? 🤓
        </ChatMessage>
        <ChatMessage>
          It all started with my brother and endless curiosity! Go was my first love 💙
        </ChatMessage>
        <ChatMessage isUser>
          Go as your first language! Wasn't that intense? 😱
        </ChatMessage>
        <ChatMessage>
          Haha! Let's say I jumped into the deep end first 🏊‍♂️ But I had an amazing mentor, my friend Carlos, who helped me navigate through goroutines and channels 🎯
        </ChatMessage>
        <ChatMessage isUser>
          And how did you end up in frontend? 🎨
        </ChatMessage>
        <ChatMessage>
          Plot twist! Fell in love with creating React interfaces ⚛️ Now I'm like a fullstack chef: cooking both backend and frontend 👨‍🍳✨
        </ChatMessage>
      </ChatContainer>

      <QuotesSection>
        <QuotesSlider>
          <QuoteItem>
            {displayedText}
            <motion.span 
              className="cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </QuoteItem>
        </QuotesSlider>
      </QuotesSection>

      <MethodologySection>
        <MethodologyCard>
          <h2 style={{ color: '#fdfbfb', fontSize: '2rem', marginBottom: '2rem' }}>
            My Tech Arsenal 🛠️
          </h2>
          
          <StepContainer>
            <Emoji>⚡</Emoji>
            <StepContent>
              <h3>Speed Demon Backend</h3>
              <p>Go + Node.js for lightning-fast APIs. Microservices that zoom! 🚀</p>
            </StepContent>
          </StepContainer>
          
          <StepContainer>
            <Emoji>✨</Emoji>
            <StepContent>
              <h3>Pixel-Perfect Frontend</h3>
              <p>React + TypeScript. Smooth UIs that spark joy ⚛️</p>
            </StepContent>
          </StepContainer>
          
          <StepContainer>
            <Emoji>🔒</Emoji>
            <StepContent>
              <h3>Ethical Hacking</h3>
              <p>Kali Linux + Burp Suite + Metasploit. Security ninja mode activated! 🐱‍💻</p>
            </StepContent>
          </StepContainer>

          <StepContainer>
            <Emoji>🔧</Emoji>
            <StepContent>
              <h3>DevOps & Security</h3>
              <p>Docker + AWS + Nmap. Making the cloud rain securely ☁️🛡️</p>
            </StepContent>
          </StepContainer>
        </MethodologyCard>

        <CaseStudyCard>
          <h2>
            <span>Cool Projects</span> 
            <span>🚀</span>
          </h2>
          <StatsList>
            <StatItem
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h4>
                <span>🎵</span>
                DJPONLA
              </h4>
              <p>
                Bridging DJs with their audience in real-time. 
                Tech magic that turns every beat into an experience!
              </p>
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="number">100+</div>
                  <div className="label">Happy DJs</div>
                </div>
                <div className="stat-box">
                  <div className="number">Live</div>
                  <div className="label">Party Mode</div>
                </div>
              </div>
            </StatItem>
            
            <StatItem
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4>
                <span>🕵</span>
                LatAm Tech Community
              </h4>
              <p>
                Where code meets culture! Growing together with amazing 
                developers across Latin America. Because coding is better with friends!
              </p>
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="number">15+</div>
                  <div className="label">Countries</div>
                </div>
                <div className="stat-box">
                  <div className="number">∞</div>
                  <div className="label">Good Vibes</div>
                </div>
              </div>
            </StatItem>
          </StatsList>
        </CaseStudyCard>
      </MethodologySection>

      <GithubSection>
        <GithubEmbed>
          <a 
            href="https://github.com/jarbram?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#4A90E2', 
              textDecoration: 'none', 
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}
          >
            <span>Check out my GitHub adventures</span>
            <svg height="32" viewBox="0 0 16 16" width="32">
              <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </GithubEmbed>
      </GithubSection>

      <Footer />
    </ProductSection>
  );
};

export default Code; 