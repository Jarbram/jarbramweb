import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* ── container ── */

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background: ${p => p.$scrolled ? 'rgba(19,19,19,0.88)' : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(14px)' : 'none'};
  border-bottom: 1px solid ${p => p.$scrolled ? 'var(--surface-3)' : 'transparent'};
  transition: background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
  transition: background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease;

  @media (max-width: 768px) {
    padding: 1rem 1.2rem;
  }
`;

/* ── logo ── */

const Logo = styled(Link)`
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--ink);
  text-decoration: none;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  transition: opacity 0.2s ease;

  &:hover { opacity: 0.75; }

  .dot {
    color: var(--accent);
    display: inline-block;
  }
`;

/* ── nav ── */

const Nav = styled.nav`
  display: flex;
  gap: 0.55rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    flex-direction: column;
    top: 0;
    right: ${p => p.$open ? '0' : '-100%'};
    width: 240px;
    height: 100vh;
    background: var(--surface-1);
    border-left: 1px solid var(--surface-3);
    padding: 5rem 1.4rem 2rem;
    transition: right 0.32s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    gap: 0.7rem;
    align-items: stretch;
  }
`;

/* ── nav items ── */

const NavItem = styled(Link)`
  padding: 0.28rem 0.85rem;
  font-weight: 900;
  text-decoration: none;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${p => p.$active ? p.$color : '#131313'};
  background-color: ${p => p.$active ? '#ffffff' : p.$color};
  border-radius: ${p => p.$radius};
  box-shadow: ${p => p.$active ? 'none' : `0 0 12px ${p.$glow}`};
  transition: transform 0.18s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.18s ease, opacity 0.18s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px ${p => p.$glow};
      opacity: 0.92;
    }
  }

  &:active {
    transform: scale(0.96) translateY(0);
    box-shadow: none;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    border-radius: 10px;
  }
`;

/* ── overlay ── */

const Overlay = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(4px);
    z-index: 999;
    opacity: ${p => p.$open ? 1 : 0};
    pointer-events: ${p => p.$open ? 'all' : 'none'};
    transition: opacity 0.32s ease;
  }
`;

/* ── hamburger ── */

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 8px;
  cursor: pointer;
  padding: 0 8px;
  z-index: 1001;
  transition: border-color 0.2s ease;

  &:hover { border-color: var(--line-strong); }

  @media (max-width: 768px) { display: flex; }

  span {
    display: block;
    height: 2px;
    background: var(--ink);
    border-radius: 2px;
    transition: transform 0.28s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.28s ease;

    &:first-child {
      transform: ${p => p.$open ? 'translateY(7px) rotate(45deg)' : 'none'};
    }
    &:nth-child(2) {
      opacity: ${p => p.$open ? '0' : '1'};
      transform: ${p => p.$open ? 'scaleX(0)' : 'none'};
    }
    &:last-child {
      transform: ${p => p.$open ? 'translateY(-7px) rotate(-45deg)' : 'none'};
    }
  }
`;

/* ── component ── */

const NAV_ITEMS = [
  { to: '/product', label: 'Product', color: '#50C878', glow: 'rgba(80,200,120,0.28)',  radius: '6px 12px 6px 12px'  },
  { to: '/code',    label: 'Code',    color: '#9B59B6', glow: 'rgba(155,89,182,0.28)', radius: '12px 6px 12px 6px' },
  { to: '/about',   label: 'About',   color: '#F1C40F', glow: 'rgba(241,196,15,0.28)', radius: '6px 12px 6px 12px'  },
];

const Header = () => {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location                  = useLocation();

  useEffect(() => {
    // ponytail: el scroll vive en #root (body es fixed), no en window
    const root = document.getElementById('root');
    const onScroll = () => setScrolled(root.scrollTop > 24);
    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />

      <HeaderContainer $scrolled={scrolled}>
        <Logo to="/">
          Jarbram<span className="dot">.</span>
        </Logo>

        <Hamburger $open={menuOpen} onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
          <span /><span /><span />
        </Hamburger>

        <Nav $open={menuOpen}>
          {NAV_ITEMS.map(item => (
            <NavItem
              key={item.to}
              to={item.to}
              $active={location.pathname === item.to}
              $color={item.color}
              $glow={item.glow}
              $radius={item.radius}
            >
              {item.label}
            </NavItem>
          ))}
        </Nav>
      </HeaderContainer>
    </>
  );
};

export default Header;
