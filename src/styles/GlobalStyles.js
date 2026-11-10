import { createGlobalStyle } from 'styled-components';

/* Design system Jarbram — ver DESIGN.md */
const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Bricolage Grotesque';
    src: url('/fonts/bricolage-grotesque.woff2') format('woff2');
    font-weight: 200 800;
    font-display: swap;
  }
  @font-face {
    font-family: 'Instrument Sans';
    src: url('/fonts/instrument-sans.woff2') format('woff2');
    font-weight: 400 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('/fonts/jetbrains-mono.woff2') format('woff2');
    font-weight: 100 800;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    /* Superficies: cuatro escalones, nada más */
    --bg: #131313;
    --surface-1: #161616;
    --surface-2: #1b1b1b;
    --surface-3: #232323;
    --line: #2a2a2a;
    --line-strong: #383838;

    /* Tinta */
    --ink: #fdfbfb;
    --ink-muted: #9a9a9a;
    --ink-faint: #858585;

    /* Marca + un color por sección */
    --accent: #FE4A23;
    --accent-hover: #ff6340;
    --product: #50C878;
    --code: #9B59B6;
    --about: #F1C40F;
    --on-color: #131313;

    /* Alias heredados */
    --background: var(--bg);
    --text: var(--ink);

    /* Tipografía */
    --font-display: 'Bricolage Grotesque', 'Arial Narrow', sans-serif;
    --font-text: 'Instrument Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, monospace;

    /* Forma */
    --radius-sm: 8px;
    --radius-md: 14px;
    --radius-lg: 20px;
    --radius-pill: 999px;

    /* Movimiento */
    --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
    --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
    --dur-fast: 160ms;
    --dur-base: 280ms;
    --dur-slow: 560ms;
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
    font-family: var(--font-text);
    background-color: var(--bg);
    color: var(--ink);
    line-height: 1.5;
    overflow-x: hidden;
    width: 100%;
    min-height: 100vh;
    position: fixed;
    left: 0;
    right: 0;
    -webkit-overflow-scrolling: touch;
    caret-color: var(--accent);
  }

  h1, h2, h3, h4 {
    font-family: var(--font-display);
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  code, pre, kbd { font-family: var(--font-mono); }

  ::selection {
    background: var(--accent);
    color: var(--on-color);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
    border-radius: 4px;
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
    transition: transform var(--dur-fast) var(--ease-out);
  }

  button:active { transform: scale(0.96); }

  /* Prevenir selección de texto en elementos interactivos */
  .no-select {
    -webkit-touch-callout: none;
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
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--line-strong) transparent;
  }

  #root::-webkit-scrollbar { width: 8px; }
  #root::-webkit-scrollbar-thumb {
    background: var(--line-strong);
    border-radius: var(--radius-pill);
  }
`;

export default GlobalStyles;
