import styled from 'styled-components';
import { useState, useEffect } from 'react';

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WeatherInfo = styled.div`
  color: #888;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WeatherMood = () => {
  const [weather, setWeather] = useState({ icon: '·', temp: '' });
  const [time, setTime] = useState('');

  useEffect(() => {
    const getWeatherIcon = (hour) => {
      if (hour >= 23 || hour < 6) return '○';  // noche
      if (hour < 10) return '◐';               // amanecer
      if (hour < 17) return '●';               // día
      if (hour < 20) return '◑';               // atardecer
      return '○';                              // noche
    };

    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      setTime(`${hour}:${minutes.toString().padStart(2, '0')}`);
      setWeather(prev => ({ ...prev, icon: getWeatherIcon(hour) }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    setWeather(prev => ({ ...prev, temp: `${Math.floor(Math.random() * 10) + 20}°` }));

    return () => clearInterval(interval);
  }, []);

  return (
    <WeatherContainer>
      <WeatherInfo>
        {weather.icon} {time} • {weather.temp}
      </WeatherInfo>
    </WeatherContainer>
  );
};

export default WeatherMood; 