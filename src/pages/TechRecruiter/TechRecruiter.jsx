import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';

const ProductSection = styled.section`
  background: var(--background);
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

const ActionButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  margin: 1rem;
  transition: transform 0.3s ease;
  color: #fdfbfb;

  ${props => props.variant === 'talentcross' ? `
    background: linear-gradient(135deg, rgb(25, 230, 168), rgb(20, 184, 134));
    box-shadow: 0 5px 15px rgba(25, 230, 168, 0.3);
  ` : `
    background: linear-gradient(135deg, #4A90E2, #45B7D1);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.3);
  `}

  &:hover {
    transform: translateY(-3px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 2rem auto;
  max-width: 800px;
  padding: 0 1rem;
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
  color: rgb(25, 230, 168);
  padding: 0 2rem;
  
  &::before {
    content: '> ';
    color: #4A90E2;
  }
  
  .cursor {
    display: inline-block;
    width: 0.6em;
    height: 1.2em;
    background-color: rgb(25, 230, 168);
    margin-left: 2px;
    vertical-align: middle;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 1rem;
  }
`;

const TechRecruiter = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  
  const quotes = [
    "\" Hire character. Train skill.\" - Peter Schutz 🎯",
    "\"Great vision without great people is irrelevant.\" - Jim Collins 🌟",
    "\"Talent wins games, but teamwork wins championships.\" - Michael Jordan 🏆",
    "\"Do you have 5 minutes for a quick call?\" - Every Tech Recruiter Ever 😅",
    "\"The secret of my success is that we have gone to exceptional lengths to hire the best people.\" - Steve Jobs 🚀",
    "\"LinkedIn is where magic happens\" - Modern Recruiter Life 💫",
    "\"Time to hire is important, but quality of hire is everything\" - TalentCross Philosophy 🎯",
    "\"Hiring people is an art, not a science.\" - Howard Schultz ⭐",
    "\"Your network is your net worth\" - Tech Recruiting 101 🌐",
    "\"Culture eats strategy for breakfast\" - Peter Drucker 🍳",
    "\"The competition to hire the best will increase in the years ahead.\" - Bill Gates 📈",
    "\"Always be sourcing\" - Recruiter's Mantra 🎮",
    "\"Ghosting candidates is so 2020\" - Recruitment Ethics 👻",
    "\"Your next role might be just one connection away\" - LinkedIn Wisdom 🤝",
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
          {'< TalentHunter />'}
        </Title>
      </HeroSection>

      <ChatContainer>
        <ChatMessage isUser>
          Hey! I'm curious, how did you get into Tech Recruiting? 🎯
        </ChatMessage>
        <ChatMessage>
          It all started when TalentCross opened its doors for me! 🚀 I have incredible leaders and a team that makes every day a new learning adventure ✨
        </ChatMessage>
        <ChatMessage isUser>
          That's cool! What captivated you about this world? 🤔
        </ChatMessage>
        <ChatMessage>
          The magic of connecting people! 🌟 I've always been excited about being that bridge between talent and opportunities that can change lives. It's like being a tech matchmaker 💙
        </ChatMessage>
        <ChatMessage isUser>
          What's your secret for making great matches? 🎯
        </ChatMessage>
        <ChatMessage>
          I follow TalentCross methodology: trust + agility = success 🎨 No endless or bureaucratic processes. Here we make things happen fast and right! ⚡
        </ChatMessage>
        <ChatMessage isUser>
          What kind of roles do you usually look for? I'm curious 💼
        </ChatMessage>
        <ChatMessage>
          A bit of everything! From Full Stack and QA to Test Automation and Data Engineers. If you breathe technology, we probably have something cool for you! 🚀
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

      <ButtonContainer>
        <ActionButton 
          href="https://talentcross.peopleforce.io/careers" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Open Positions 🚀
        </ActionButton>
        <ActionButton 
          variant="talentcross"
          href="https://talentcross.biz" 
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More About TalentCross 🌟
        </ActionButton>
      </ButtonContainer>

      <Footer />
    </ProductSection>
    </>
  );
};

export default TechRecruiter; 