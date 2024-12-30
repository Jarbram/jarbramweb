import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../Header/Header';
import { NavLink } from 'react-router-dom';

const ProjectsSection = styled.section`
  background: var(--background);
  padding: 0;
  position: relative;
  margin-bottom: 5rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to bottom, 
      rgba(19, 19, 19, 0.3), 
      transparent
    );
    pointer-events: none;
  }
`;

const ProjectsContent = styled.div`
  position: relative;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  margin-bottom: 4rem;
  text-align: left;
  color: white;
  padding-left: 2rem;
  position: relative;

  &::after {
    content: 'Spoiler: They are awesome!';
    display: block;
    font-size: 1rem;
    font-weight: 400;
    color: #888;
    text-transform: none;
    margin-top: 0.5rem;
  }

  @media (min-width: 768px) {
    text-align: center;
    padding-left: 0;
    
    &::before {
      left: -2rem;
    }
  }
  
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    
    &::before {
      animation: bounce 0.6s infinite;
    }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(-5px); }
    50% { transform: translateY(0); }
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 650px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const ProjectCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: linear-gradient(145deg, #1A1A1A, #2A2A2A);
  border-radius: 25px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background: ${props => {
    switch (props.type?.toLowerCase()) {
      case 'entertainment':
        return '#FF6B6B';
      case 'product':
        return '#4ECDC4';
      case 'personal branding':
        return '#45B7D1';
      case 'investment':
        return '#96CEB4';
      case 'education':
        return '#9B59B6';
      default:
        return '#2A2A2A';
    }
  }};
  color: ${props => props.type ? '#131313' : 'white'};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: #fdfbfb;
`;

const ChatMessage = styled(motion.div)`
  max-width: 80%;
  padding: 0.5rem 2rem;
  border-radius: 20px;
  font-family: "Buzz Black", sans-serif;
  font-weight: 500;
  line-height: 1.6;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  
  ${props => props.isResponse ? `
    background: linear-gradient(135deg, #4A90E2, #45B7D1);
    color: #fdfbfb;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
    transform-origin: bottom right;
    
    &:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  ` : `
    background: #fdfbfb;
    color: #131313;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transform-origin: bottom left;
    
    &:hover {
      transform: scale(1.02);
      transition: transform 0.3s ease;
    }
  `}

  animation: fadeIn 0.5s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SliderContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  align-self: center;
  margin-top: 0.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(to top, 
      rgba(0, 0, 0, 0.5), 
      transparent
    );
    pointer-events: none;
    z-index: 1;
  }
  
  &::after {
    content: '';
    display: block;
    padding-bottom: 56.25%; // 16:9 aspect ratio
  }
`;

const SliderImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #2A2A2A;
  border-radius: 15px;
`;

const SliderButtons = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.8rem;
  z-index: 10;
`;

const SliderButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    
    svg {
      transform: scale(1.2);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: linear-gradient(145deg, #2A2A2A, #333333);
  padding: 1rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ProjectLogo = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  object-fit: contain;
`;

const ProjectLink = styled.a`
  color: inherit;
  text-decoration: none;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: linear-gradient(90deg, #4A90E2, #45B7D1);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const FinalSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 5rem;
  text-align: center;
`;

const FinalText = styled.h6`
  font-family: "Buzz Black", sans-serif;
  font-size: 1.2rem;
  text-transform: uppercase;
  color: white;
  text-align: center;
  line-height: 1;
  letter-spacing: 0.02em;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 0;
  }
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  font-family: "Buzz Black", sans-serif;
  font-size: 1.2rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const ActionButton = styled(NavLink)`
  background-color: ${props => props.bgColor || '#4A90E2'};
  padding: 0.2rem 0.5rem;
  border-radius: ${props => props.isLeft ? '12px 6px 12px 6px' : '6px 12px 6px 12px'};
  font-family: "Buzz Black", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #131313;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
  }

  &:hover {
    transform: translateY(-2px) rotate(-1deg);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const SliderProgress = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const ProgressDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
`;

const ExpandButton = styled(SliderButton)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalImage = styled(motion.img)`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 15px;
`;

const CloseButton = styled(SliderButton)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 1001;
`;

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ModalNavButton = styled(SliderButton)`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  
  &.prev {
    left: 2rem;
  }
  
  &.next {
    right: 2rem;
  }

  @media (max-width: 768px) {
    &.prev {
      left: 1rem;
    }
    
    &.next {
      right: 1rem;
    }
  }
`;

const Projects = () => {
  const [currentSlides, setCurrentSlides] = useState({});
  const [touchStart, setTouchStart] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "DJPONLA",
      logo: "/djponla.png",
      tags: [
        { type: "ENTERTAINMENT", label: "ENTERTAINMENT" },
        { type: "PRODUCT", label: "PRODUCT" }
      ],
      images: ["/project1-1.png", "/project1-2.png", "/project1-3.png","/project1-4.png","/project1-5.png","/project1-6.png","/project1-7.png"],
      description: "What if people at parties could request songs from the live dj, would you join the project?",
      response: "Where do I sign?",
      additionalResponses: [
        "I love what we're achieving!",
        "Learn more at www.djponla.com"
      ],
      websiteUrl: "https://www.djponla.com"
    },
    {
        id: 2,
        title: "Coaching Al Millón",
        logo: "/CALMILLON.png",
        tags: [
          { type: "PERSONAL BRANDING", label: "PERSONAL BRANDING" },
          { type: "INVESTMENT", label: "INVESTMENT" }
        ],
        images: ["/project2-1.png", "/project2-2.png", "/project2-3.png","/project2-4.png"],
        description: "I would like to help young people in Peru who know the AGV method. ",
        response: "It sounds interesting, let's do it",
        additionalResponses: [
          "I know it was urgent, I loved the speed.",
          "I know, but I love how it turned out. "
        ],
        websiteUrl: "https://www.micaminoalmillon.com/"
      },
      {
        id: 3,
        title: "HUB UDEP",
        logo: "/hubudep_logo.jpeg",
        tags: [
          { type: "EDUCATION", label: "EDUCATION" },
          { type: "INVESTMENT", label: "INVESTMENT" }
        ],
        images: ["/project3-1.png", "/project3-2.png", "/project3-3.png","/project3-4.png"],
        description: "We are launching an angel investor course, can you help us with a website?",
        response: "Of course, let's get down to business",
        additionalResponses: [
          "Great work Jarbram, always a pleasure to work with you.",
          "I love what you do let's keep in touch"
        ],
        websiteUrl: "https://www.hub.udep.pe/curso-de-especializacion-en-inversion-angel"
      },
    // Agrega más proyectos aquí
  ];

  const nextSlide = (projectId) => {
    setCurrentSlides(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % projects.find(p => p.id === projectId).images.length
    }));
  };

  const prevSlide = (projectId) => {
    setCurrentSlides(prev => ({
      ...prev,
      [projectId]: prev[projectId] === 0 
        ? projects.find(p => p.id === projectId).images.length - 1 
        : prev[projectId] - 1
    }));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e, projectId) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide(projectId);
      } else {
        prevSlide(projectId);
      }
    }
  };

  // Inicializar currentSlides para cada proyecto
  useState(() => {
    const initialSlides = {};
    projects.forEach(project => {
      initialSlides[project.id] = 0;
    });
    setCurrentSlides(initialSlides);
  }, []);

  const handleExpandImage = (projectId, imageIndex) => {
    setExpandedProjectId(projectId);
    setExpandedImage(projects.find(p => p.id === projectId).images[imageIndex]);
  };

  const handleModalNavigation = (direction) => {
    if (!expandedProjectId) return;
    
    const project = projects.find(p => p.id === expandedProjectId);
    const currentIndex = project.images.indexOf(expandedImage);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % project.images.length;
    } else {
      newIndex = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
    }
    
    setExpandedImage(project.images[newIndex]);
  };

  return (
    <ProjectsSection id="projects">
      <Header />
      <ProjectsContent>
        <Title>CHECK OUT MY COOL STUFF!</Title>
        <ChatContainer>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectHeader>
                <TitleContainer>
                  {project.logo && <ProjectLogo src={project.logo} alt={project.title} />}
                  <ProjectTitle>{project.title}</ProjectTitle>
                </TitleContainer>
                <TagContainer>
                  {project.tags.map((tag) => (
                    <Tag key={tag.label} type={tag.type}>
                      {tag.label}
                    </Tag>
                  ))}
                </TagContainer>
              </ProjectHeader>
              
              <ChatMessage
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {project.description}
              </ChatMessage>
              
              <ChatMessage
                isResponse
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                {project.response}
              </ChatMessage>
              
              <SliderContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, project.id)}
              >
                <SliderImage
                  src={project.images[currentSlides[project.id] || 0]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <ExpandButton onClick={() => handleExpandImage(project.id, currentSlides[project.id] || 0)}>
                  <ExpandIcon />
                </ExpandButton>
                <SliderProgress>
                  {project.images.map((_, index) => (
                    <ProgressDot 
                      key={index} 
                      active={currentSlides[project.id] === index} 
                    />
                  ))}
                </SliderProgress>
                <SliderButtons>
                  <SliderButton onClick={() => prevSlide(project.id)}>
                    <ArrowLeft />
                  </SliderButton>
                  <SliderButton onClick={() => nextSlide(project.id)}>
                    <ArrowRight />
                  </SliderButton>
                </SliderButtons>
              </SliderContainer>
              <ChatMessage
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                {project.additionalResponses[0]}
              </ChatMessage>

              <ChatMessage
                isResponse
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                {project.websiteUrl ? (
                  <ProjectLink 
                    href={project.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {project.additionalResponses[1]}
                  </ProjectLink>
                ) : (
                  project.additionalResponses[1]
                )}
              </ChatMessage>
            </ProjectCard>
          ))}
        </ChatContainer>
        <FinalSection>
          <FinalText>
            HUNGRY FOR MORE? 
          </FinalText>
          <TextRow>
            <span>CHECK ON</span>
            <ActionButton 
              to="/product" 
              bgColor="#00D26A"
              isLeft
            >
              <ArrowRight /> Product 
            </ActionButton>
            <span>OR</span>
            <ActionButton 
              to="/code" 
              bgColor="#0095FF"
            >
              <ArrowRight /> Code
            </ActionButton>
          </TextRow>
        </FinalSection>
      </ProjectsContent>
      {expandedImage && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setExpandedImage(null);
            setExpandedProjectId(null);
          }}
        >
          <ModalImage
            src={expandedImage}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          />
          <CloseButton onClick={() => {
            setExpandedImage(null);
            setExpandedProjectId(null);
          }}>
            <CloseIcon />
          </CloseButton>
          <ModalNavButton 
            className="prev" 
            onClick={(e) => {
              e.stopPropagation();
              handleModalNavigation('prev');
            }}
          >
            <ArrowLeft />
          </ModalNavButton>
          <ModalNavButton 
            className="next" 
            onClick={(e) => {
              e.stopPropagation();
              handleModalNavigation('next');
            }}
          >
            <ArrowRight />
          </ModalNavButton>
        </Modal>
      )}
    </ProjectsSection>
  );
};

export default Projects; 