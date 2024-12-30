import styled from 'styled-components';
import { useState } from 'react';
import WeatherMood from './WeatherMood';
import TicTacToe from './TicTacToe';

const FooterSection = styled.footer`
  background: var(--background);
  padding: 3rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  min-height: 200px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    align-items: center;
    text-align: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  z-index: 15;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const Year = styled.div`
  font-family: "Buzz Black", sans-serif;
  font-size: 1rem;
  color: #888;
  margin-bottom: 0.5rem;
  
  &::after {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #888;
    margin-top: 6px;

    @media (max-width: 768px) {
      margin: 6px auto 0;
    }
  }
`;

const Info = styled.div`
  color: #888;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const SocialLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  padding: 4px 0;
  font-family: monospace;

  &:hover {
    color: #50fa7b;
    transform: translateX(3px);
  }

  &::before {
    content: '›';
    opacity: 0;
    transition: all 0.2s ease;
    position: absolute;
    left: -12px;
  }
`;

const ConnectColumn = styled(Column)`
  text-align: left;
  min-width: 200px;
  
  @media (max-width: 768px) {
    text-align: center;
    width: 100%;
    align-items: center;
    
    ${SocialLink} {
      justify-content: center;
      width: auto;
      padding: 8px 0;
      border-bottom: none;
      
      &:hover {
        transform: translateX(3px);
        background: transparent;
      }
    }
  }
`;

const ConnectTitle = styled.h3`
  font-family: "Buzz Black", sans-serif;
  font-size: 1rem;
  color: #888;
  margin-bottom: 1rem;
  
  &::after {
    content: '';
    display: block;
    width: 20px;
    height: 1px;
    background: #888;
    margin-top: 6px;

    @media (max-width: 768px) {
      margin: 6px auto 0;
    }
  }
`;

const NavColumn = styled(Column)`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NavLink = styled(SocialLink)`
  font-size: 0.75rem;
  color: #888;
`;

const FooterDivider = styled.div`
  height: 1px;
  background: #333;
  width: 100%;
  margin: 2rem 0;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Agregamos un componente para animación de emojis
const AnimatedEmoji = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
  cursor: default;

  &:hover {
    transform: scale(1.4) rotate(10deg);
  }
`;

// Agregamos un componente para el estado de ánimo
const MoodInfo = styled(Info)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const GameButton = styled(Info)`
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 8px;
  margin-left: -8px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
    justify-content: center;
  }
  
  &::before {
    content: '›';
    opacity: ${props => props.active ? '1' : '0'};
    transform: ${props => props.active ? 'translateX(0)' : 'translateX(-10px)'};
    transition: all 0.3s ease;
  }

  &:hover {
    color: #50fa7b;
    transform: translateX(3px);
    
    &::before {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const GameStats = styled.span`
  color: #666;
  font-family: monospace;
  transition: color 0.3s ease;
  
  ${GameButton}:hover & {
    color: #50fa7b;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showGame, setShowGame] = useState(false);
  const [gameWins, setGameWins] = useState({ X: 0, O: 0 });

  const handleGameEnd = (winner) => {
    if (winner) {
      setGameWins(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    }
  };

  return (
    <FooterSection>
      <Column>
        <Year>© {currentYear}</Year>
        <WeatherMood />
        <GameButton 
          active={showGame}
          onClick={() => setShowGame(!showGame)}
        >
          {showGame ? '[ game in progress ]' : '[ start game ]'}
          {(gameWins.X > 0 || gameWins.O > 0) && (
            <GameStats>
              · wins X:{gameWins.X} O:{gameWins.O}
            </GameStats>
          )}
        </GameButton>
        <Info>Diseñado & Desarrollado con ♥</Info>
      </Column>

      <TicTacToe show={showGame} onGameEnd={handleGameEnd} />

      <FooterDivider />

      <ConnectColumn>
        <ConnectTitle>@ CONNECT</ConnectTitle>
        <SocialLink 
          href="https://linkedin.com/in/abraham-huacchillo" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          LINKEDIN
        </SocialLink>
        <SocialLink 
          href="https://instagram.com/abrahamhuacchillo" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          INSTAGRAM
        </SocialLink>
        <SocialLink 
          href="https://github.com/jarbram" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          GITHUB
        </SocialLink>
      </ConnectColumn>
    </FooterSection>
  );
};

export default Footer; 