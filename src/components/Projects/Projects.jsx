import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';

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
  font-size: 1.8rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 3rem;
  color: white;
  letter-spacing: 0.02em;

  &::after {
    content: 'Spoiler: they are awesome.';
    display: block;
    font-size: 0.85rem;
    font-weight: 500;
    color: #444;
    text-transform: none;
    margin-top: 0.4rem;
    letter-spacing: 0.01em;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 680px;
  margin: 0 auto;
`;

/* ── Project card ── */

const ProjectCard = styled(motion.div)`
  background: #161616;
  border-radius: 20px;
  border: 1px solid #232323;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  background: #1b1b1b;
  border: 1px solid #252525;
  border-radius: 14px;
  padding: 1rem 1.1rem;
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
  font-size: 1rem;
  font-weight: 900;
  color: #fdfbfb;
  letter-spacing: 0.02em;
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

const ChatArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MsgMeta = styled.span`
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: rgba(255,255,255,0.2);
  padding: 0 0.4rem;
  align-self: ${props => props.$right ? 'flex-end' : 'flex-start'};
`;

const QuestionBubble = styled.div`
  background: #efefef;
  color: #131313;
  padding: 0.75rem 1.1rem;
  border-radius: 16px;
  border-bottom-left-radius: 4px;
  max-width: 82%;
  align-self: flex-start;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.55;
`;

const ResponseBubble = styled.div`
  background: linear-gradient(135deg, #FE4A23 0%, #ff6340 100%);
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

const ProjectLink = styled.a`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

/* ── Image slider ── */

const SliderImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #1b1b1b;
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

/* ── Bottom CTA ── */

const BottomCTA = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 4rem;
  text-align: center;
`;

const CTALabel = styled.p`
  font-size: 1.1rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #fdfbfb;
  letter-spacing: 0.02em;
`;

const CTARow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 0.9rem;
  color: #555;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CTAButton = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: ${props => props.$color || '#4A90E2'};
  color: #131313;
  font-weight: 900;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.45rem 1rem;
  border-radius: ${props => props.$left ? '12px 6px 12px 6px' : '6px 12px 6px 12px'};
  text-decoration: none;
  transition: transform 0.18s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.18s ease;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 18px rgba(0,0,0,0.22);
    }
  }

  &:active {
    transform: scale(0.97) translateY(0);
    box-shadow: none;
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

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
};

/* ── Component ── */

const Projects = () => {
  const [currentSlides, setCurrentSlides] = useState({});
  const [touchStart, setTouchStart]       = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const projects = [
    {
      id: 5,
      title: "Subastop · VMC",
      logo: null,
      tags: [
        { type: "AI OPS",     label: "AI OPS" },
        { type: "AUTOMATION", label: "AUTOMATION" },
      ],
      images: ["/subastop-1.webp","/subastop-2.webp","/subastop-3.webp","/subastop-4.webp","/subastop-5.webp","/subastop-6.webp"],
      description: "VMC sells cars at auction across Peru. Support, content and tooling all had to move faster — without a new team for each.",
      response: "I build the AI layer: a buyer help center, Subastín our support chatbot, a video studio and the Concorde design system.",
      additionalResponses: [
        "Where does it all run?",
        "Live at vmcsubastas.com",
      ],
      websiteUrl: "https://www.vmcsubastas.com",
    },
    {
      id: 4,
      title: "LadraApp",
      logo: null,
      tags: [
        { type: "HEALTH TECH", label: "HEALTH TECH" },
        { type: "SAAS",        label: "SAAS" },
      ],
      images: ["/ladraapp-1.webp","/ladraapp-2.webp","/ladraapp-3.webp","/ladraapp-4.webp"],
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
      logo: null,
      tags: [
        { type: "AI",     label: "AI" },
        { type: "CAREER", label: "CAREER" },
      ],
      images: ["/atlas-1.webp"],
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
      logo: "/djponla.png",
      tags: [
        { type: "ENTERTAINMENT", label: "ENTERTAINMENT" },
        { type: "PRODUCT",       label: "PRODUCT" },
      ],
      images: ["/project1-1.png","/project1-2.png","/project1-3.png","/project1-4.png","/project1-5.png","/project1-6.png","/project1-7.png"],
      description: "The platform where partygoers request songs directly to the live DJ — 100+ DJs already running their sets with it.",
      response: "Product, design, and code — all built by me.",
      additionalResponses: [
        "This completely changed how we manage song requests at every event.",
        "See it live at www.djponla.com",
      ],
      websiteUrl: "https://www.djponla.com",
    },
    {
      id: 2,
      title: "Coaching Al Millón",
      logo: "/CALMILLON.png",
      tags: [
        { type: "PERSONAL BRANDING", label: "PERSONAL BRANDING" },
        { type: "INVESTMENT",        label: "INVESTMENT" },
      ],
      images: ["/project2-1.png","/project2-2.png","/project2-3.png","/project2-4.png"],
      description: "A platform to bring the AGV investment methodology to young people in Peru — from zero to a full brand presence online.",
      response: "Shipped design and dev faster than they expected.",
      additionalResponses: [
        "The speed and quality were unmatched. Abraham always delivers.",
        "Check it out at www.micaminoalmillon.com",
      ],
      websiteUrl: "https://www.micaminoalmillon.com/",
    },
    {
      id: 3,
      title: "HUB UDEP",
      logo: "/hubudep_logo.jpeg",
      tags: [
        { type: "EDUCATION",  label: "EDUCATION" },
        { type: "INVESTMENT", label: "INVESTMENT" },
      ],
      images: ["/project3-1.png","/project3-2.png","/project3-3.png","/project3-4.png"],
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
      logo: null,
      tags: [
        { type: "EVENTS",  label: "EVENTS" },
        { type: "PRODUCT", label: "PRODUCT" },
      ],
      images: ["/sinkarta-1.webp"],
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
      logo: null,
      tags: [
        { type: "AGENCY", label: "AGENCY" },
        { type: "WEB",    label: "WEB" },
      ],
      images: ["/enlace-1.webp","/enlace-2.webp","/enlace-3.webp"],
      description: "The first communications agency in Piura needed a site that showed its full range of services.",
      response: "Designed and built in Next.js, with a contact form that lands straight in their inbox.",
      additionalResponses: [
        "Is it live?",
        "Visit enlacecomunicacion.pe",
      ],
      websiteUrl: "https://www.enlacecomunicacion.pe",
    },
  ];

  const slide = (projectId, dir) => {
    const len = projects.find(p => p.id === projectId).images.length;
    setCurrentSlides(prev => {
      const cur = prev[projectId] || 0;
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
    setExpandedImage(projects.find(p => p.id === projectId).images[idx]);
  };

  const navigateModal = (dir) => {
    if (!expandedProjectId) return;
    const imgs = projects.find(p => p.id === expandedProjectId).images;
    const cur  = imgs.indexOf(expandedImage);
    setExpandedImage(dir === 'next' ? imgs[(cur + 1) % imgs.length] : imgs[cur === 0 ? imgs.length - 1 : cur - 1]);
  };

  return (
    <ProjectsSection id="projects">
      <Header />
      <ProjectsContent>
        <Title>SELECTED WORK</Title>

        <CardList>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {/* Header */}
              <ProjectHeader>
                <TitleRow>
                  {project.logo && <ProjectLogo src={project.logo} alt={project.title} />}
                  <ProjectTitle>{project.title}</ProjectTitle>
                </TitleRow>
                <TagRow>
                  {project.tags.map(tag => (
                    <Tag key={tag.label} type={tag.type}>{tag.label}</Tag>
                  ))}
                </TagRow>
              </ProjectHeader>

              {/* Chat */}
              <ChatArea>
                <MsgMeta>Client</MsgMeta>
                <QuestionBubble>{project.description}</QuestionBubble>
                <MsgMeta $right>Abraham</MsgMeta>
                <ResponseBubble>{project.response}</ResponseBubble>
              </ChatArea>

              {/* Slider */}
              {project.images.length > 0 && (
                <SliderWrap
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={(e) => handleTouchEnd(e, project.id)}
                >
                  <SliderImage
                    src={project.images[currentSlides[project.id] || 0]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <ExpandBtn onClick={() => openModal(project.id, currentSlides[project.id] || 0)}>
                    <IconExpand />
                  </ExpandBtn>
                  <SliderDots>
                    {project.images.map((_, i) => (
                      <Dot key={i} $active={( currentSlides[project.id] || 0) === i} />
                    ))}
                  </SliderDots>
                  <SliderControls>
                    <IconBtn onClick={() => slide(project.id, 'prev')}><IconLeft /></IconBtn>
                    <IconBtn onClick={() => slide(project.id, 'next')}><IconRight /></IconBtn>
                  </SliderControls>
                </SliderWrap>
              )}

              {/* Closing chat */}
              <ChatArea>
                <MsgMeta>Client</MsgMeta>
                <QuestionBubble>{project.additionalResponses[0]}</QuestionBubble>
                <MsgMeta $right>Abraham</MsgMeta>
                <ResponseBubble>
                  {project.websiteUrl
                    ? <ProjectLink href={project.websiteUrl} target="_blank" rel="noopener noreferrer">{project.additionalResponses[1]}</ProjectLink>
                    : project.additionalResponses[1]
                  }
                </ResponseBubble>
              </ChatArea>
            </ProjectCard>
          ))}
        </CardList>

        {/* Bottom CTA */}
        <BottomCTA>
          <CTALabel>Hungry for more?</CTALabel>
          <CTARow>
            <span>Deep dive into</span>
            <CTAButton to="/product" $color="#50C878" $left>
              <IconRight style={{ width: 14 }} /> Product
            </CTAButton>
            <span>or</span>
            <CTAButton to="/code" $color="#9B59B6">
              <IconRight style={{ width: 14 }} /> Code
            </CTAButton>
          </CTARow>
        </BottomCTA>
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
