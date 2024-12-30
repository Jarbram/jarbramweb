import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';

const ProductSection = styled.section`
  background: var(--background);
  padding: 0 1rem;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
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
    
    strong {
      color: #4A90E2;
      font-weight: 700;
    }
    
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
    
    strong {
      color: #fdfbfb;
      font-weight: 700;
    }
    
    &:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  `}

  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
    font-size: 1rem;
  }
`;

const MethodologySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0;
  
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
  background: linear-gradient(145deg, #2A2A2A, #333333);
  padding: 2rem;
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatsList = styled.ul`
  list-style: none;
  margin-top: 1.5rem;
`;

const StatItem = styled(motion.li)`
  color: #fdfbfb;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &::before {
    content: '🚀';
  }
`;

const Product = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  
  const quotes = [
    // Famous product quotes
    "The best product isn't the prettiest, but the one that solves real problems – Eric Ries",
    "Fall in love with the problem, not the solution – Steve Blank",
    "If you're not embarrassed by your first MVP, you launched too late – Reid Hoffman",
    "Make things people want > Want people to make things – Paul Graham",
    "The best way to predict the future is to create it – Peter Drucker",
    // Fun product quotes
    "\"Product Market Fit\" is just fancy talk for \"People actually want this stuff\" 😅",
    "MVP: Minimum Viable Product or Most Valuable Player? Why not both! 🏆",
    "A product manager's best friend? Coffee and user feedback ☕️",
    "Agile is like pizza - even when it's bad, it's still pretty good 🍕",
    "User stories are like bedtime stories, but with more JIRA tickets 📚"
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
    <>
    <Header />
    <ProductSection>
      
      
      <HeroSection>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          From Ideas to Digital Reality
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Building successful digital products isn't about perfect code or fancy features. 
          It's about solving real problems for real people. Want to learn how?
        </Subtitle>
      </HeroSection>

      <ChatContainer>
        <ChatMessage isUser>
          Hey! I'd love to get into digital products 🚀
        </ChatMessage>
        <ChatMessage>
          What got you interested in digital products? 🤔
        </ChatMessage>
        <ChatMessage isUser>
          I've been reading about product development and startups. There's so much to learn! 📚
        </ChatMessage>
        <ChatMessage>
          Theory is great! But the real magic happens when you start building. Want to hear about my journey? 💡
        </ChatMessage>
        <ChatMessage isUser>
          Absolutely! How did you get started?
        </ChatMessage>
        <ChatMessage>
          My co-founder and I started DJPONLA at a startup incubator 🎵 We identified a real problem in the party scene and decided to solve it together!
        </ChatMessage>
        <ChatMessage isUser>
          That's interesting! How did you develop it?
        </ChatMessage>
        <ChatMessage>
          Through collaboration and constant user feedback 🔍 We explored the market, talked to DJs and partygoers, and kept improving with each iteration ✨
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
            The Startup Adventure Map 🗺️
          </h2>
          
          <StepContainer>
            <Emoji>🔍</Emoji>
            <StepContent>
              <h3>1. Problem Explorer</h3>
              <p>First rule of Product Club: We don't start with solutions! We dive deep into problems, talk to real users, and become obsessed with understanding their needs.</p>
            </StepContent>
          </StepContainer>
          
          <StepContainer>
            <Emoji>🧪</Emoji>
            <StepContent>
              <h3>2. Experiment Lab</h3>
              <p>Turn hypotheses into experiments. Quick tests, faster learnings. Remember: A failed experiment is just a successful learning in disguise!</p>
            </StepContent>
          </StepContainer>
          
          <StepContainer>
            <Emoji>🎯</Emoji>
            <StepContent>
              <h3>3. MVP Magic</h3>
              <p>Build the smallest thing that creates the biggest impact. Like a haiku in code - simple yet powerful. If it solves the problem, ship it!</p>
            </StepContent>
          </StepContainer>
          
          <StepContainer>
            <Emoji>📈</Emoji>
            <StepContent>
              <h3>4. Growth Engine</h3>
              <p>Measure what matters, iterate fast, and scale smart. Every feature should either make users happier or bring more users. Ideally both!</p>
            </StepContent>
          </StepContainer>
        </MethodologyCard>

        <CaseStudyCard>
          <h2 style={{ color: '#fdfbfb', fontSize: '2rem', marginBottom: '2rem' }}>
            Real Stories, Real Impact 🚀
          </h2>
          <p style={{ color: '#888', marginBottom: '2rem' }}>
            From startup incubation to co-founding DJPONLA, here's what we've learned:
          </p>
          <StatsList>
            <StatItem>
              1000+ user interviews that shaped our products ☕️
            </StatItem>
            <StatItem>
              3 pivots that transformed challenges into opportunities 🔄
            </StatItem>
            <StatItem>
              100+ features tested, 20% implemented (that's product life!) 🎯
            </StatItem>
            <StatItem>
              1 golden rule: Users first, code second, ego last 💫
            </StatItem>
          </StatsList>

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <h3 style={{ color: '#fdfbfb', marginBottom: '1rem' }}>Quick Tips 💡</h3>
            <ul style={{ color: '#888', listStyle: 'none' }}>
              <li style={{ marginBottom: '0.5rem' }}>• Start small, think big, move fast</li>
              <li style={{ marginBottom: '0.5rem' }}>• Your first version will be embarrassing (that's good!)</li>
              <li style={{ marginBottom: '0.5rem' }}>• Data - Opinions- Users - Data</li>
              <li>• Build → Measure → Learn → Repeat</li>
            </ul>
          </div>
        </CaseStudyCard>
      </MethodologySection>

      <Footer />
    </ProductSection>
    </>
  );
};

export default Product; 