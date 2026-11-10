// Tokens de movimiento (espejo de --ease-out / --dur-* en GlobalStyles)
export const ease = [0.23, 1, 0.32, 1];

// Momento principal: entrada de página — enfoque desde un leve desenfoque
export const page = {
  initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.56, ease }, transitionEnd: { filter: 'none' } },
  exit:    { opacity: 0, y: -8, filter: 'blur(4px)', transition: { duration: 0.2, ease } },
};

// Aparición al hacer scroll
export const reveal = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease }, transitionEnd: { filter: 'none' } },
};

export const hoverLift = { y: -4, transition: { duration: 0.28, ease } };
