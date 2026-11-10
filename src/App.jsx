import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import GlobalStyles from './styles/GlobalStyles';
import { page } from './styles/motion';
import Home from './components/Home/Home';
import About from './components/About/About';
import Product from './pages/Product/Product'
import Code from './pages/Code/Code'

function App() {
  const location = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <GlobalStyles />
      <AnimatePresence mode="wait" onExitComplete={() => document.getElementById('root')?.scrollTo(0, 0)}>
        <motion.div key={location.pathname} variants={page} initial="initial" animate="animate" exit="exit">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/code" element={<Code />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

export default App;
