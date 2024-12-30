import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Home from './components/Home/Home';
import About from './components/About/About';
import Product from './pages/Product/Product'
import Code from './pages/Code/Code'
import TechRecruiter from './pages/TechRecruiter/TechRecruiter'

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/code" element={<Code />} />
        <Route path="/tech-recruiter" element={<TechRecruiter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
