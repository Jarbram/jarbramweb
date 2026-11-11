import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { reveal, ease, threadProps, message, useScreenReveal } from '../../styles/motion';
import { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';

/* ── Layout ── */

const ProjectsSection = styled.section`
  background: var(--background);
  position: relative;
`;

const ProjectsContent = styled.div`
  padding: 0 1.5rem 5rem;

  @media (max-width: 768px) {
    padding: 0 1rem 4rem;
  }
`;

const Title = styled.h2`
  max-width: 1180px;
  margin: 0 auto 2.5rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  font-size: clamp(2.4rem, 7vw, 5.5rem);
  font-weight: 800;
  line-height: 0.9;
  text-transform: uppercase;
  color: var(--ink);

  small {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: none;
    color: var(--ink-faint);
  }
`;

// Tarjetas que se apilan (sticky stacking): cada una se queda fija y la siguiente la tapa
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1180px;
  margin: 0 auto;
`;

/* ── Project card ── */

const ProjectCard = styled(motion.article)`
  position: sticky;
  top: calc(84px + ${p => p.$i * 14}px);
  background: var(--surface-1);
  border-radius: var(--radius-lg);
  border: 1px solid var(--surface-3);
  box-shadow: 0 -18px 40px -24px rgba(0, 0, 0, 0.9);
  padding: 1.6rem;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 1.8rem;
  align-items: center;
  transition: border-color var(--dur-base) var(--ease-out);

  &:hover { border-color: var(--line-strong); }

  @media (max-width: 900px) {
    position: relative;
    top: 0;
    grid-template-columns: 1fr;
    padding: 1.2rem;
    gap: 1.2rem;
  }
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const Index = styled.span`
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--ink-faint);
`;

const Meta = styled.p`
  font-size: 0.85rem;
  color: var(--ink-muted);
  margin-top: 0.3rem;
`;

const Impact = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--line);
  font-size: 0.85rem;
  color: var(--ink-muted);

  strong { font-family: var(--font-mono); font-weight: 600; color: var(--ink); margin-right: 0.3rem; }
`;

const Visit = styled.a`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 1.05rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--line-strong);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ink);
  transition: border-color var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out);

  svg { width: 14px; height: 14px; transition: transform var(--dur-base) var(--ease-out); }
  &:hover { border-color: var(--ink-faint); }
  &:hover svg { transform: translateX(3px); }
  &:active { transform: scale(0.96); }
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const ProjectLogo = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  object-fit: contain;
  flex-shrink: 0;
`;

const ProjectTitle = styled.h3`
  font-size: clamp(1.8rem, 3.4vw, 2.6rem);
  font-weight: 800;
  line-height: 1;
  color: var(--ink);
  text-transform: uppercase;
`;

const TagRow = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: ${props => {
    switch (props.type?.toLowerCase()) {
      case 'entertainment':    return '#FF6B6B';
      case 'product':          return '#4ECDC4';
      case 'personal branding':return '#45B7D1';
      case 'investment':       return '#96CEB4';
      case 'education':        return '#9B59B6';
      case 'health tech':      return '#50C878';
      case 'saas':             return '#FE4A23';
      case 'ai ops':
      case 'ai':               return '#B39DFF';
      case 'automation':       return '#FFD166';
      case 'career':           return '#F7A072';
      case 'events':           return '#FFB4A2';
      case 'agency':
      case 'web':              return '#45B7D1';
      default:                 return '#252525';
    }
  }};
  color: ${props => props.type ? '#131313' : '#fff'};
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

/* ── Chat bubbles ── */

const ChatArea = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MsgMeta = styled(motion.span)`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--ink-faint);
  padding: 0 0.4rem;
  align-self: ${props => props.$right ? 'flex-end' : 'flex-start'};
`;

const QuestionBubble = styled(motion.div)`
  transform-origin: bottom left;
  background: var(--ink);
  color: var(--bg);
  padding: 0.75rem 1.1rem;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  max-width: 82%;
  align-self: flex-start;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.55;
`;

const ResponseBubble = styled(motion.div)`
  transform-origin: bottom right;
  background: var(--accent);
  color: #fff;
  padding: 0.75rem 1.1rem;
  border-radius: 16px;
  border-bottom-right-radius: 4px;
  max-width: 82%;
  align-self: flex-end;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.55;
  box-shadow: 0 4px 18px rgba(254,74,35,0.2);
`;


/* ── Image slider ── */

const SliderImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: var(--surface-2);
  transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
`;

const SliderWrap = styled(motion.div)`
  position: relative;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    padding-bottom: 56.25%;

    @media (max-width: 768px) {
      padding-bottom: 160%;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover ${SliderImage} {
      transform: scale(1.04);
    }
  }
`;



const SliderControls = styled.div`
  position: absolute;
  bottom: 0.8rem;
  right: 0.8rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
`;

const SliderDots = styled.div`
  position: absolute;
  bottom: 0.8rem;
  left: 0.8rem;
  display: flex;
  gap: 0.4rem;
  z-index: 10;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.$active ? '#fff' : 'rgba(255,255,255,0.3)'};
  transition: background 0.3s ease;
`;

const IconBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(19,19,19,0.7);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.18s ease, transform 0.18s cubic-bezier(0.23, 1, 0.32, 1);

  @media (hover: hover) and (pointer: fine) {
    &:hover { background: rgba(19,19,19,0.9); }
  }

  &:active { transform: scale(0.92); }

  svg { width: 16px; height: 16px; }
`;

const ExpandBtn = styled(IconBtn)`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  z-index: 10;
`;

/* ── Modal ── */

const Modal = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalImg = styled(motion.img)`
  max-width: 90%;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 12px;
`;

const ModalClose = styled(IconBtn)`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1001;
`;

const ModalNav = styled(IconBtn)`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;

  &.prev { left: 1.5rem; }
  &.next { right: 1.5rem; }

  @media (max-width: 768px) {
    &.prev { left: 0.8rem; }
    &.next { right: 0.8rem; }
  }
`;

/* ── SVG icons ── */

const IconLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
  </svg>
);

const IconRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconExpand = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14"/>
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6L18 18"/>
  </svg>
);

/* ── Card animation variants ── */

const cardVariants = reveal;
const MOBILE = '(max-width: 768px)';

/* ── Captura que se abre con el scroll ── */

const RevealWrap = ({ children, ...props }) => {
  const ref = useRef(null);
  const style = useScreenReveal(ref);
  return <SliderWrap ref={ref} style={style} {...props}>{children}</SliderWrap>;
};

/* ── Component ── */

const Projects = () => {
  const [currentSlides, setCurrentSlides] = useState({});
  const [touchStart, setTouchStart]       = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE).matches);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const projects = [
    {
      id: 5,
      title: "Subastop · VMC",
      role: "AI Ops Specialist",
      year: "2026 \u2014 now",
      impact: [["44", "AI-made pieces published"], ["$0.0065", "per automated carousel"]],
      logo: null,
      tags: [
        { type: "AI OPS",     label: "AI OPS" },
        { type: "AUTOMATION", label: "AUTOMATION" },
      ],
      images: {
        d: ["/subastop-d1.webp","/subastop-d2.webp","/subastop-d3.webp","/subastop-d4.webp","/subastop-d5.webp","/subastop-d6.webp"],
        m: ["/subastop-m1.webp","/subastop-m2.webp","/subastop-m3.webp","/subastop-m4.webp","/subastop-m5.webp","/subastop-m6.webp"],
      },
      description: "VMC sells cars at auction across Peru. Support, content and tooling all had to move faster — without a new team for each.",
      response: "I build the AI layer: the new VMC home, Prisma (our video studio), the buyer help center, Subastín and the Concorde design system.",
      additionalResponses: [
        "Where does it all run?",
        "Live at vmcsubastas.com",
      ],
      websiteUrl: "https://www.vmcsubastas.com",
    },
    {
      id: 4,
      title: "LadraApp",
      role: "Founder & Product Lead",
      year: "2026 \u2014 now",
      impact: [["−70%", "technical debt"], ["3×", "iteration speed"]],
      logo: null,
      tags: [
        { type: "HEALTH TECH", label: "HEALTH TECH" },
        { type: "SAAS",        label: "SAAS" },
      ],
      images: {
        d: ["/ladraapp-d1.webp","/ladraapp-d2.webp","/ladraapp-d3.webp","/ladraapp-d4.webp"],
        m: ["/ladraapp-m1.webp","/ladraapp-m2.webp","/ladraapp-m3.webp","/ladraapp-m4.webp"],
      },
      description: "Veterinary clinics in Peru were drowning in paperwork — appointments, clinical histories, prescriptions, all manual. I built the solution.",
      response: "Clinical records you dictate, vaccine reminders ready for WhatsApp, cash and stock — all from your phone.",
      additionalResponses: [
        "Can clinics try it before paying?",
        "7 days free at ladraapp.com",
      ],
      websiteUrl: "https://ladraapp.com",
    },
    {
      id: 6,
      title: "Atlas",
      role: "Builder",
      year: "2026",
      impact: [["0", "invented experience"], ["1-click", "job import"]],
      logo: null,
      tags: [
        { type: "AI",     label: "AI" },
        { type: "CAREER", label: "CAREER" },
      ],
      images: {
        d: ["/atlas-d1.webp"],
        m: ["/atlas-m1.webp"],
      },
      description: "Job hunting means rewriting the same CV for every role — and AI tools happily invent experience you don't have.",
      response: "Atlas adapts your CV to each job using only what's in your profile. A Chrome extension brings any job post in with one click.",
      additionalResponses: [
        "Where do I start?",
        "Sign in at atlas-web-ten-liard.vercel.app",
      ],
      websiteUrl: "https://atlas-web-ten-liard.vercel.app/",
    },
    {
      id: 1,
      title: "DJPONLA",
      role: "Co-founder & PM",
      year: "2024 \u2014 2026",
      impact: [["12G", "Startup Perú winner"], ["10", "countries"], ["40+", "DJs in the community"]],
      logo: "/djponla.png",
      tags: [
        { type: "ENTERTAINMENT", label: "ENTERTAINMENT" },
        { type: "PRODUCT",       label: "PRODUCT" },
      ],
      images: {
        d: ["/djponla-d1.webp","/djponla-d2.webp","/djponla-d3.webp"],
        m: ["/project1-1.png","/project1-2.png","/project1-3.png","/project1-4.png","/project1-5.png","/project1-6.png","/project1-7.png"],
      },
      description: "The platform where partygoers request songs directly to the live DJ, built with a community of 40+ DJs.",
      response: "Product, design, and code — all built by me.",
      additionalResponses: [
        "This completely changed how we manage song requests at every event.",
        "See it live at www.djponla.com",
      ],
      websiteUrl: "https://www.djponla.com",
    },
    {
      id: 3,
      title: "HUB UDEP",
      role: "Freelance",
      year: "2023",
      impact: [["Days", "from brief to live"]],
      logo: "/hubudep_logo.jpeg",
      tags: [
        { type: "EDUCATION",  label: "EDUCATION" },
        { type: "INVESTMENT", label: "INVESTMENT" },
      ],
      images: {
        d: ["/hubudep-d1.webp","/hubudep-d2.webp","/hubudep-d3.webp"],
        m: ["/project3-1.png","/project3-2.png","/project3-3.png","/project3-4.png"],
      },
      description: "UDEP needed a landing page for their angel investor course — built and shipped from scratch in days.",
      response: "Let's get it live.",
      additionalResponses: [
        "Great work Jarbram, always a pleasure working with you.",
        "Explore the course at hub.udep.pe",
      ],
      websiteUrl: "https://www.hub.udep.pe/curso-de-especializacion-en-inversion-angel",
    },
    {
      id: 7,
      title: "Sinkarta",
      role: "Founder",
      year: "2025",
      impact: [["Live", "RSVPs + photo gallery"]],
      logo: null,
      tags: [
        { type: "EVENTS",  label: "EVENTS" },
        { type: "PRODUCT", label: "PRODUCT" },
      ],
      images: {
        d: ["/sinkarta-d1.webp"],
        m: ["/sinkarta-m1.webp"],
      },
      description: "Couples wanted invitations as beautiful as paper ones — that guests could actually RSVP to from their phone.",
      response: "Each one designed to measure, with RSVPs and a shared photo gallery in real time. One link, any phone.",
      additionalResponses: [
        "Can we see one?",
        "Start at sinkarta.com",
      ],
      websiteUrl: "https://sinkarta.com",
    },
    {
      id: 8,
      title: "Enlace",
      role: "Freelance developer",
      year: null,
      impact: [["Next.js", "in progress"]],
      logo: null,
      tags: [
        { type: "AGENCY", label: "AGENCY" },
        { type: "WEB",    label: "WEB" },
      ],
      images: {
        d: ["/enlace-d1.webp"],
        m: ["/enlace-m1.webp"],
      },
      description: "The first communications agency in Piura needed a site that showed its full range of services.",
      response: "I'm building their new site in Next.js — services, projects and a contact form that lands straight in their inbox.",
      additionalResponses: [
        "Where can we see the agency today?",
        "Current site: enlacecomunicacion.pe",
      ],
      websiteUrl: "https://www.enlacecomunicacion.pe",
    },
  ];

  const imgsOf = (projectId) => projects.find(p => p.id === projectId).images[isMobile ? 'm' : 'd'];
  // ponytail: índice con módulo, sobrevive al cambio desktop↔mobile con distinto nº de imágenes
  const idxOf = (projectId) => (currentSlides[projectId] || 0) % imgsOf(projectId).length;

  const slide = (projectId, dir) => {
    const len = imgsOf(projectId).length;
    setCurrentSlides(prev => {
      const cur = (prev[projectId] || 0) % len;
      return { ...prev, [projectId]: dir === 'next' ? (cur + 1) % len : cur === 0 ? len - 1 : cur - 1 };
    });
  };

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);

  const handleTouchEnd = (e, projectId) => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) slide(projectId, diff > 0 ? 'next' : 'prev');
  };

  const openModal = (projectId, idx) => {
    setExpandedProjectId(projectId);
    setExpandedImage(imgsOf(projectId)[idx]);
  };

  const navigateModal = (dir) => {
    if (!expandedProjectId) return;
    const imgs = imgsOf(expandedProjectId);
    const cur  = imgs.indexOf(expandedImage);
    setExpandedImage(dir === 'next' ? imgs[(cur + 1) % imgs.length] : imgs[cur === 0 ? imgs.length - 1 : cur - 1]);
  };

  return (
    <ProjectsSection id="projects">
      <Header />
      <ProjectsContent>
        <Title>Selected work <small>{String(projects.length).padStart(2, '0')} projects</small></Title>

        <CardList>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              $i={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <CardText>
                <ProjectHeader>
                  <Index>{String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</Index>
                  <TitleRow>
                    {project.logo && <ProjectLogo src={project.logo} alt="" />}
                    <ProjectTitle>{project.title}</ProjectTitle>
                  </TitleRow>
                  <Meta>{project.role}{project.year && ` · ${project.year}`}</Meta>
                  <TagRow>
                    {project.tags.map(tag => (
                      <Tag key={tag.label} type={tag.type}>{tag.label}</Tag>
                    ))}
                  </TagRow>
                </ProjectHeader>

                <ChatArea {...threadProps}>
                  <MsgMeta variants={message}>Client</MsgMeta>
                  <QuestionBubble variants={message}>{project.description}</QuestionBubble>
                  <MsgMeta variants={message} $right>Abraham</MsgMeta>
                  <ResponseBubble variants={message}>{project.response}</ResponseBubble>
                </ChatArea>

                <Impact>
                  {project.impact.map(([n, l]) => <span key={l}><strong>{n}</strong>{l}</span>)}
                </Impact>

                <Visit href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                  {project.additionalResponses[1]} <IconRight />
                </Visit>
              </CardText>

              {imgsOf(project.id).length > 0 && (
                <RevealWrap
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, project.id)}
                >
                  <AnimatePresence initial={false}>
                    <SliderImage
                      key={idxOf(project.id)}
                      src={imgsOf(project.id)[idxOf(project.id)]}
                      alt={`${project.title} — captura ${idxOf(project.id) + 1}`}
                      loading="lazy"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                    />
                  </AnimatePresence>
                  <ExpandBtn aria-label="Ampliar captura" onClick={() => openModal(project.id, idxOf(project.id))}>
                    <IconExpand />
                  </ExpandBtn>
                  {imgsOf(project.id).length > 1 && <>
                    <SliderDots>
                      {imgsOf(project.id).map((_, j) => <Dot key={j} $active={idxOf(project.id) === j} />)}
                    </SliderDots>
                    <SliderControls>
                      <IconBtn aria-label="Anterior" onClick={() => slide(project.id, 'prev')}><IconLeft /></IconBtn>
                      <IconBtn aria-label="Siguiente" onClick={() => slide(project.id, 'next')}><IconRight /></IconBtn>
                    </SliderControls>
                  </>}
                </RevealWrap>
              )}
            </ProjectCard>
          ))}
        </CardList>

      </ProjectsContent>

      {/* Modal */}
      {expandedImage && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => { setExpandedImage(null); setExpandedProjectId(null); }}
        >
          <ModalImg
            src={expandedImage}
            initial={{ scale: 0.88 }}
            animate={{ scale: 1 }}
            onClick={e => e.stopPropagation()}
          />
          <ModalClose onClick={() => { setExpandedImage(null); setExpandedProjectId(null); }}>
            <IconClose />
          </ModalClose>
          <ModalNav className="prev" onClick={e => { e.stopPropagation(); navigateModal('prev'); }}>
            <IconLeft />
          </ModalNav>
          <ModalNav className="next" onClick={e => { e.stopPropagation(); navigateModal('next'); }}>
            <IconRight />
          </ModalNav>
        </Modal>
      )}
    </ProjectsSection>
  );
};

export default Projects;
