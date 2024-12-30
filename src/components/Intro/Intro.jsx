import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IntroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem;
  text-align: center;
`;

const TextContainer = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const TextLine = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #fdfbfb;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    gap: 0.4rem;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    gap: 0.3rem;
  }
`;

const Tag = styled(motion.button)`
  background-color: ${props => props.bgColor || '#FE4A23'};
  padding: 0.5rem 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  border: none;
  cursor: pointer;
  font-weight: 900;
  font-size: inherit;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #131313;
  transition: all 0.3s ease;
  flex-direction: row-reverse;
  justify-content: center;

  &:nth-of-type(1) {
    border-radius: 6px 12px 6px 12px;
  }

  &:nth-of-type(2) {
    border-radius: 12px 6px 12px 6px;
  }

  &:nth-of-type(3) {
    border-radius: 6px 12px 6px 12px;
  }

  &:nth-of-type(4) {
    border-radius: 12px 6px 12px 6px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(254, 74, 35, 0.3);
    background-image: linear-gradient(
      45deg,
      ${props => props.bgColor || '#FE4A23'} 0%,
      ${props => props.bgColor ? `${props.bgColor}dd` : '#ff6b4a'} 100%
    );
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9em;
  }
`;

const Arrow = styled.span`
  font-size: 0.8em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-left: 0.3rem;
  
  &::before {
    content: '➜';
    transform: scale(1.2);
    display: inline-block;
    font-weight: 900;
    -webkit-text-stroke: 1px #131313;
  }
  
  ${Tag}:hover & {
    animation: arrowBounce 0.6s infinite;
  }
  
  @keyframes arrowBounce {
    0% {
      transform: translateX(0) scale(1.2);
    }
    50% {
      transform: translateX(2px) scale(1.3);
    }
    100% {
      transform: translateX(0) scale(1.2);
    }
  }
`;

const MobileLineBreak = styled.br`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  
  .scroll-icon {
    width: 30px;
    height: 50px;
    border: 2px solid #fdfbfb;
    border-radius: 25px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      background: #fdfbfb;
      left: 50%;
      transform: translateX(-50%);
      top: 8px;
      border-radius: 50%;
      animation: scrollAnim 2s infinite;
    }
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    
    .scroll-icon {
      width: 24px;
      height: 40px;
      
      &::before {
        width: 4px;
        height: 4px;
        top: 6px;
      }
    }
  }

  @media (max-width: 480px) {
    bottom: 1rem;
    
    .scroll-icon {
      width: 20px;
      height: 34px;
      border-width: 1.5px;
      
      &::before {
        width: 3px;
        height: 3px;
        top: 5px;
      }
    }
  }

  @keyframes scrollAnim {
    0% { top: 8px; opacity: 1; }
    100% { top: 32px; opacity: 0; }
  }

  @media (max-width: 768px) {
    @keyframes scrollAnim {
      0% { top: 6px; opacity: 1; }
      100% { top: 26px; opacity: 0; }
    }
  }

  @media (max-width: 480px) {
    @keyframes scrollAnim {
      0% { top: 5px; opacity: 1; }
      100% { top: 22px; opacity: 0; }
    }
  }
`;

const Intro = () => {
  const navigate = useNavigate();

  const handleNavigation = (section) => {
    if (section === 'linkedin') {
      window.open('https://www.linkedin.com/in/abraham-huacchillo/', '_blank');
      return;
    }
    navigate(`/${section}`);
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <IntroSection>
      <TextContainer>
        <TextLine>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            HI, I'M{" "}
            <Tag 
              onClick={() => handleNavigation('about')}
              bgColor="#F1C40F"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ marginLeft: '0.5rem' }}
            >
              ABRAHAM <Arrow />
            </Tag>
          </motion.div>
        </TextLine>
        
        <TextLine>
          I'M A <MobileLineBreak />
          <Tag 
            onClick={() => handleNavigation('tech-recruiter')}
            bgColor="#4A90E2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            TECH RECRUITER <Arrow />
          </Tag>
        </TextLine>
        
        <TextLine>
          WHO KNOWS <MobileLineBreak />
          <Tag 
            onClick={() => handleNavigation('product')}
            bgColor="#50C878"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            PRODUCT <Arrow />
          </Tag>
        </TextLine>

        <TextLine>
          AND <MobileLineBreak />
          <Tag 
            onClick={() => handleNavigation('code')}
            bgColor="#9B59B6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            CODE <Arrow />
          </Tag>
        </TextLine>

        <TextLine style={{ marginTop: '1rem' }}>
          <Tag 
            onClick={() => handleNavigation('linkedin')}
            bgColor="#0077B5"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LET'S CONNECT! <Arrow />
          </Tag>
        </TextLine>
      </TextContainer>
      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToNext}
      >
        <div className="scroll-icon" />
      </ScrollIndicator>
    </IntroSection>
  );
};

export default Intro; 