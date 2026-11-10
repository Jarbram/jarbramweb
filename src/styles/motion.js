import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Tokens de movimiento (espejo de --ease-out / --dur-* en GlobalStyles)
export const ease = [0.23, 1, 0.32, 1];

// ponytail: el scroll vive en #root (body es fixed); todo useScroll usa este contenedor
export const scrollRoot = { current: document.getElementById('root') };

// Cambio de página — enfoque desde un leve desenfoque
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

// Momento principal: la conversación se reproduce mensaje a mensaje
export const thread = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const message = {
  hidden:  { opacity: 0, y: 10, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 420, damping: 32, mass: 0.8 } },
};

export const threadProps = {
  variants: thread,
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-15% 0px' },
};

// La captura "se abre" a medida que entra en pantalla (ligado al scroll)
export function useScreenReveal(ref) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, container: scrollRoot, offset: ['start end', 'start 45%'] });
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(10% 7% 10% 7% round 12px)', 'inset(0% 0% 0% 0% round 12px)']);
  return reduce ? undefined : { clipPath };
}
