import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import useGitHubRepos from '../../hooks/useGitHubRepos';

const LANGUAGE_COLORS = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  Go: '#00ADD8',
  HTML: '#E34F26',
  CSS: '#1572B6',
  Rust: '#DEA584',
  Java: '#B07219',
  'C++': '#F34B7D',
  Shell: '#89E051',
  Vue: '#41B883',
  Svelte: '#FF3E00',
};

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const Section = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 900;
  color: #fdfbfb;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const GithubLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #FE4A23;
  color: #131313;
  font-weight: 900;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.4rem 0.9rem;
  border-radius: 6px 12px 6px 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-left: auto;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(254, 74, 35, 0.3);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #FE4A23;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`;

const RepoName = styled.h3`
  font-size: 1rem;
  font-weight: 900;
  color: #fdfbfb;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.2;
  word-break: break-word;
`;

const StarCount = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: #888;
  white-space: nowrap;
  flex-shrink: 0;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #aaa;
  line-height: 1.5;
  flex: 1;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const TopicTag = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background: #252525;
  color: #FE4A23;
  border: 1px solid #333;
`;

const CardBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.6rem;
  border-top: 1px solid #252525;
`;

const LangBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #bbb;

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${props => props.color || '#888'};
    flex-shrink: 0;
  }
`;

const LinksRow = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const CardLink = styled.a`
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${props => props.primary ? '#FE4A23' : '#888'};
  text-decoration: none;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.primary ? '#FE4A23' : '#333'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.primary ? '#FE4A23' : '#333'};
    color: ${props => props.primary ? '#131313' : '#fff'};
  }
`;

const SkeletonCard = styled.div`
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 1.4rem;
  height: 180px;
`;

const SkeletonLine = styled.div`
  height: ${props => props.h || '14px'};
  width: ${props => props.w || '100%'};
  border-radius: 4px;
  margin-bottom: ${props => props.mb || '0.6rem'};
  background: linear-gradient(90deg, #222 25%, #2a2a2a 50%, #222 75%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;

const ErrorMsg = styled.p`
  color: #888;
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
};

const GitHubRepos = ({ username = 'jarbram' }) => {
  const { repos, loading, error } = useGitHubRepos(username);

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Open Source</SectionTitle>
        <GithubLink
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{username} ➜
        </GithubLink>
      </SectionHeader>

      {error && <ErrorMsg>Could not load repos — {error}</ErrorMsg>}

      <Grid>
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i}>
                <SkeletonLine w="60%" h="16px" mb="1rem" />
                <SkeletonLine w="90%" />
                <SkeletonLine w="75%" />
                <SkeletonLine w="40%" mb="1.2rem" />
                <SkeletonLine w="30%" h="10px" />
              </SkeletonCard>
            ))
          : repos.map((repo, i) => (
              <Card
                key={repo.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                <CardTop>
                  <RepoName>{repo.name.replace(/-/g, ' ')}</RepoName>
                  {repo.stargazers_count > 0 && (
                    <StarCount>★ {repo.stargazers_count}</StarCount>
                  )}
                </CardTop>

                {repo.description && (
                  <Description>{repo.description}</Description>
                )}

                {repo.topics?.length > 0 && (
                  <TagsRow>
                    {repo.topics.slice(0, 4).map(topic => (
                      <TopicTag key={topic}>{topic}</TopicTag>
                    ))}
                  </TagsRow>
                )}

                <CardBottom>
                  {repo.language ? (
                    <LangBadge color={LANGUAGE_COLORS[repo.language] || '#888'}>
                      {repo.language}
                    </LangBadge>
                  ) : (
                    <span />
                  )}
                  <LinksRow>
                    {repo.homepage && (
                      <CardLink
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        primary
                      >
                        Live ↗
                      </CardLink>
                    )}
                    <CardLink
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code ↗
                    </CardLink>
                  </LinksRow>
                </CardBottom>
              </Card>
            ))}
      </Grid>
    </Section>
  );
};

export default GitHubRepos;
