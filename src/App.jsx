import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { page, scrollRoot } from './styles/motion';
import Home from './components/Home/Home';
import About from './components/About/About';
import Systems from './pages/Systems/Systems';

const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  transform-origin: 0 50%;
  z-index: 2000;
  pointer-events: none;
`;

const SECTION_COLOR = { '/systems': 'var(--product)', '/about': 'var(--about)' };

function App() {
  const location = useLocation();
  const { scrollYProgress } = useScroll({ container: scrollRoot });
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  return (
    <MotionConfig reducedMotion="user">
      <GlobalStyles />
      <ProgressBar data-noprint style={{ scaleX, background: SECTION_COLOR[location.pathname] || 'var(--accent)' }} />
      <AnimatePresence mode="wait" onExitComplete={() => document.getElementById('root')?.scrollTo(0, 0)}>
        <motion.div key={location.pathname} variants={page} initial="initial" animate="animate" exit="exit">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/systems" element={<Systems />} />
            {/* ponytail: links viejos compartidos siguen funcionando */}
            <Route path="/product" element={<Navigate to="/systems" replace />} />
            <Route path="/code" element={<Navigate to="/systems" replace />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

export default App;
