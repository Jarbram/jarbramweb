import { useState } from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  background: var(--background);
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, 
      rgba(19, 19, 19, 0.3), 
      transparent
    );
    pointer-events: none;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding-top: 4rem;
  padding: 4rem 1rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem 1rem;
  }
`;

const ChatCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
  border-radius: 25px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(145deg, #2A2A2A, #333333);
  padding: 1rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

const ProfileInfo = styled.div`
  h1 {
    font-size: 1.5rem;
    color: #fdfbfb;
    font-weight: 800;
    margin-bottom: 0.3rem;
  }

  span {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const QAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QAGroup = styled.div`
  margin-bottom: 1rem;
  opacity: 0.95;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const QuestionBubble = styled(motion.div)`
  background: linear-gradient(145deg, #fdfbfb, #f5f5f5);
  color: #131313;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  border-bottom-left-radius: 5px;
  position: relative;
  max-width: 80%;
  font-weight: 500;
  margin-bottom: 0.8rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transform-origin: bottom left;
  line-height: 1.4;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
    background: linear-gradient(145deg, #ffffff, #fafafa);
  }
`;

const AnswerBubble = styled(motion.div)`
  background: linear-gradient(135deg, #4A90E2, #45B7D1);
  color: #fdfbfb;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  border-bottom-right-radius: 5px;
  position: relative;
  max-width: 80%;
  align-self: flex-end;
  font-weight: 500;
  box-shadow: 0 8px 20px rgba(74, 144, 226, 0.2);
  transform-origin: bottom right;
  margin-left: 20%;
  line-height: 1.4;
  font-size: 1.1rem;
  letter-spacing: 0.02em;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
    background: linear-gradient(135deg, #5A9FE2, #55C7D1);
  }
`;

const InfoSection = styled(motion.div)`
  background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
  border-radius: 25px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CurrentSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #fdfbfb;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 800;
  
  &::after {
    content: '';
    display: block;
    width: 30px;
    height: 2px;
    background: #4A90E2;
    margin-top: 0.5rem;
  }
`;

const RoleItem = styled(motion.div)`
  margin-bottom: 1rem;
  padding: 1rem;
  background: linear-gradient(145deg, #2A2A2A, #333333);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    background: linear-gradient(145deg, #2A2A2A, #383838);
  }
`;

const RoleTitle = styled.h4`
  font-size: 1rem;
  color: #fdfbfb;
  margin-bottom: 0.3rem;
  font-weight: 700;
`;

const CompanyName = styled.span`
  color: #4A90E2;
  font-size: 0.9rem;
  font-weight: 500;
`;

const SocialsSection = styled.div`
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  color: #fdfbfb;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 12px;
  background: linear-gradient(145deg, #2A2A2A, #333333);
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 0.5rem;
  
  &:hover {
    transform: translateX(5px);
    background: linear-gradient(145deg, #2A2A2A, #383838);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const HighlightText = styled.span`
  color: #4A90E2;
  font-weight: 600;
`;

const TechBadge = styled(motion.span)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.9rem;
  margin: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const TechStack = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #50C878;
  border-radius: 50%;
  margin-left: 8px;
  box-shadow: 0 0 0 2px rgba(80, 200, 120, 0.2);
`;

const About = () => {
  const [content] = useState([
    {
      question: "What makes your journey in tech unique? 🚀",
      answer: "My path combines entrepreneurship with hands-on tech expertise! 🌟 As a founder and product manager, I've developed a holistic business vision that perfectly complements my technical skills. Building products from scratch taught me to think beyond code, focusing on creating solutions that truly impact users' lives. 💡"
    },
    {
      question: "How has your entrepreneurial background shaped you? 🎯",
      answer: "My entrepreneurial journey gave me unique superpowers! 💪 As Babson College coordinator at UDEP, I built an invaluable network of brilliant startup founders and entrepreneurs. This experience taught me to approach technical challenges with a business mindset and effectively communicate across all organizational levels. The mentors I met along the way have been instrumental in my growth! 🌱"
    },
    {
      question: "What's your secret to versatility in tech? 🔄",
      answer: "My experience across tech recruiting, development, and entrepreneurship gives me a unique 360° perspective! 🎯 I deeply understand technical, business, and talent needs. This versatility allows me to bridge gaps between teams and create more comprehensive solutions. The amazing network of mentors and friends I've built continues to inspire my professional growth! 🤝"
    },
    {
      question: "How do you approach creating impact? 💫",
      answer: "I'm passionate about building solutions that create real value! 🌟 My startup experience taught me the power of innovation and agility. I blend technical expertise with an entrepreneurial mindset to develop products that not only work flawlessly but solve real problems. The incredible mentors I met at Babson inspired me to always strive for excellence! 🚀"
    }
  ]);

  return (
    <>
      <Header />
      <AboutSection>
        <ContentContainer>
          <ChatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileSection>
            <ProfileImage 
              src="/abraham.jpeg" 
              alt="Profile"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <ProfileInfo>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Abraham
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span>Tech Recruiter & Developer</span>
                <StatusDot />
              </motion.div>
            </ProfileInfo>
          </ProfileSection>
          
          <QAContainer>
            {content.map((item, index) => (
              <QAGroup 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <QuestionBubble>{item.question}</QuestionBubble>
                <AnswerBubble>
                  {item.answer}
                  {index === 2 && (
                    <TechStack>
                      <TechBadge whileHover={{ scale: 1.1 }}>React.js</TechBadge>
                      <TechBadge whileHover={{ scale: 1.1 }}>Go</TechBadge>
                      <TechBadge whileHover={{ scale: 1.1 }}>JavaScript</TechBadge>
                      <TechBadge whileHover={{ scale: 1.1 }}>Linux</TechBadge>
                    </TechStack>
                  )}
                </AnswerBubble>
              </QAGroup>
            ))}
          </QAContainer>
        </ChatCard>
        
        <InfoSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CurrentSection>
            <SectionTitle>Currently</SectionTitle>
            {[
              { 
                title: "Talent Acquisition", 
                company: "Talent Cross",
                url: "https://talentcross.biz" 
              },
              { 
                title: "Product & Developer", 
                company: "DJPONLA",
                url: "https://djponla.com" 
              },
              { 
                title: "Freelance Developer", 
                company: "Open to opportunities" 
              }
            ].map((role, index) => (
              <RoleItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <RoleTitle>{role.title}</RoleTitle>
                {role.url ? (
                  <CompanyName>
                    @ <a href={role.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                      {role.company}
                    </a>
                  </CompanyName>
                ) : (
                  <CompanyName>@ {role.company}</CompanyName>
                )}
              </RoleItem>
            ))}
          </CurrentSection>

          <SocialsSection>
            <SectionTitle>Let's Connect</SectionTitle>
            <SocialLink 
              href="https://linkedin.com/in/abraham-huacchillo" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
              </svg>
              LinkedIn
            </SocialLink>
            <SocialLink 
              href="https://instagram.com/abrahamhuacchillo" 
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 7.082c1.602 0 1.792.006 2.425.035 1.627.074 2.385.845 2.46 2.459.028.633.034.822.034 2.424s-.006 1.792-.034 2.424c-.075 1.613-.832 2.386-2.46 2.46-.633.028-.822.035-2.425.035-1.602 0-1.792-.006-2.424-.035-1.63-.075-2.385-.849-2.46-2.46-.028-.632-.035-.822-.035-2.424s.007-1.792.035-2.424c.074-1.615.832-2.386 2.46-2.46.632-.029.822-.034 2.424-.034zm0-1.082c-1.63 0-1.833.007-2.474.037-2.18.1-3.39 1.309-3.49 3.489-.029.641-.036.845-.036 2.474 0 1.63.007 1.834.036 2.474.1 2.179 1.31 3.39 3.49 3.49.641.029.844.036 2.474.036 1.63 0 1.834-.007 2.475-.036 2.176-.1 3.391-1.309 3.489-3.49.029-.64.036-.844.036-2.474 0-1.629-.007-1.833-.036-2.474-.098-2.177-1.309-3.39-3.489-3.489-.641-.03-.845-.037-2.475-.037zm0 2.919c-1.701 0-3.081 1.379-3.081 3.081s1.38 3.081 3.081 3.081 3.081-1.379 3.081-3.081c0-1.701-1.38-3.081-3.081-3.081zm0 5.081c-1.105 0-2-.895-2-2 0-1.104.895-2 2-2 1.104 0 2.001.895 2.001 2s-.897 2-2.001 2zm3.202-5.922c-.397 0-.72.322-.72.72 0 .397.322.72.72.72.398 0 .721-.322.721-.72 0-.398-.322-.72-.721-.72z"/>
              </svg>
              Instagram
            </SocialLink>
          </SocialsSection>
        </InfoSection>
      </ContentContainer>
    </AboutSection>
    </>
  );
};

export default About; 