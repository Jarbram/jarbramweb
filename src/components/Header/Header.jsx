import styled from 'styled-components';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background: transparent;
`;

const Logo = styled(Link)`
  font-family: 'Space Mono', monospace;
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  position: relative;
  letter-spacing: -1px;
  
  &:hover {
    .dot {
      transform: scale(1.5) translateY(-1px);
      opacity: 1;
    }
    
    &::after {
      width: 100%;
      opacity: 0.1;
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: #50fa7b;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: -1;
  }

  .dot {
    color: #50fa7b;
    opacity: 0.8;
    transition: all 0.3s ease;
    display: inline-block;
  }
  
  text-shadow: 
    0 0 1px rgba(255,255,255,0.1),
    0 0 2px rgba(255,255,255,0.1);
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 250px;
    height: 100vh;
    background: transparent;
    padding: 80px 1rem;
    transition: right 0.3s ease;
    gap: 0.5rem;
  }
`;

const NavLink = styled(Link)`
  padding: 0.3rem 0.8rem;
  font-weight: 900;
  text-decoration: none;
  color: ${props => props.isActive ? props.activeColor : '#131313'};
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  
  &:nth-child(1) {
    background-color: ${props => props.isActive ? '#FFFFFF' : '#50C878'};
    border-radius: 6px 12px 6px 12px;
    box-shadow: 0 0 10px rgba(80, 200, 120, 0.3);
  }
  
  &:nth-child(2) {
    background-color: ${props => props.isActive ? '#FFFFFF' : '#9B59B6'};
    border-radius: 12px 6px 12px 6px;
    box-shadow: 0 0 10px rgba(155, 89, 182, 0.3);
  }
  
  &:nth-child(3) {
    background-color: ${props => props.isActive ? '#FFFFFF' : '#4A90E2'};
    border-radius: 6px 12px 6px 12px;
    box-shadow: 0 0 10px rgba(74, 144, 226, 0.3);
  }

  &:nth-child(4) {
    background-color: ${props => props.isActive ? '#FFFFFF' : '#F1C40F'};
    border-radius: 12px 6px 12px 6px;
    box-shadow: 0 0 10px rgba(241, 196, 15, 0.3);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-bottom: 0.5rem;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
    padding: 0.5rem;
    border-radius: 6px;
    
    span {
      display: block;
      width: 25px;
      height: 3px;
      background-color: white;
      margin: 5px 0;
      transition: all 0.3s ease;
      
      &:first-child {
        transform: ${props => props.isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
      }

      &:nth-child(2) {
        opacity: ${props => props.isOpen ? '0' : '1'};
      }

      &:last-child {
        transform: ${props => props.isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none'};
      }
    }
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <Logo to="/">
        Jarbram<span className="dot">.</span>
      </Logo>
      <MenuButton isOpen={isMenuOpen} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>
      <Nav isOpen={isMenuOpen}>
        <NavLink 
          to="/product" 
          isActive={location.pathname === '/product'}
          activeColor="#50C878"
        >
          Product
        </NavLink>
        <NavLink 
          to="/code" 
          isActive={location.pathname === '/code'}
          activeColor="#9B59B6"
        >
          Code
        </NavLink>
        <NavLink 
          to="/tech-recruiter" 
          isActive={location.pathname === '/tech-recruiter'}
          activeColor="#4A90E2"
        >
          Tech Recruiter
        </NavLink>
        <NavLink 
          to="/about" 
          isActive={location.pathname === '/about'}
          activeColor="#F1C40F"
        >
          About
        </NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 