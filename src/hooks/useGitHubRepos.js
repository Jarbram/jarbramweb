import { useState, useEffect } from 'react';

const useGitHubRepos = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=30&type=public`
        );
        if (!response.ok) throw new Error('GitHub API error');
        const data = await response.json();
        const filtered = data
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
};

export default useGitHubRepos;
