import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.cdnfonts.com/css/buzz');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    --background: #131313;
    --text: #FFFFFF;
    --accent: #FE4A23;
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
    --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  html {
    font-size: 16px;
    
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: "Buzz Black", sans-serif;
    background-color: var(--background);
    color: var(--text);
    line-height: 1.5;
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
    position: fixed;
    left: 0;
    right: 0;
    -webkit-overflow-scrolling: touch;
  }

  a {
    text-decoration: none;
    color: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  /* Prevenir selección de texto en elementos interactivos */
  .no-select {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #root {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default GlobalStyles;
