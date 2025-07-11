import React, { createContext, useContext, useState, useEffect } from 'react';

const MotivationContext = createContext();

export const useMotivation = () => {
  const context = useContext(MotivationContext);
  if (!context) {
    throw new Error('useMotivation must be used within a MotivationProvider');
  }
  return context;
};

export const MotivationProvider = ({ children }) => {
  const [motivationData, setMotivationData] = useState({
    streak: {
      current: 0,
      longest: 0,
      history: []
    },
    weeklyChallenges: [],
    seasonalEvents: [],
    competitions: [],
    rewards: []
  });

  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const savedData = localStorage.getItem('motivationData');
    if (savedData) {
      setMotivationData(JSON.parse(savedData));
    }
  }, []);

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('motivationData', JSON.stringify(motivationData));
  }, [motivationData]);

  // Обновление стрика
  const updateStreak = (completed) => {
    setMotivationData(prev => {
      const newStreak = completed
        ? {
            ...prev.streak,
            current: prev.streak.current + 1,
            longest: Math.max(prev.streak.current + 1, prev.streak.longest),
            history: [
              ...prev.streak.history,
              { date: new Date().toISOString(), completed: true }
            ]
          }
        : {
            ...prev.streak,
            current: 0,
            history: [
              ...prev.streak.history,
              { date: new Date().toISOString(), completed: false }
            ]
          };

      return {
        ...prev,
        streak: newStreak
      };
    });
  };

  // Обновление недельных вызовов
  const updateWeeklyChallenges = (challengeId, progress) => {
    setMotivationData(prev => ({
      ...prev,
      weeklyChallenges: prev.weeklyChallenges.map(challenge =>
        challenge.id === challengeId
          ? { ...challenge, progress }
          : challenge
      )
    }));
  };

  // Обновление сезонных событий
  const updateSeasonalEvents = (eventId, progress) => {
    setMotivationData(prev => ({
      ...prev,
      seasonalEvents: prev.seasonalEvents.map(event =>
        event.id === eventId
          ? { ...event, progress }
          : event
      )
    }));
  };

  // Обновление соревнований
  const updateCompetitions = (competitionId, points) => {
    setMotivationData(prev => ({
      ...prev,
      competitions: prev.competitions.map(competition =>
        competition.id === competitionId
          ? {
              ...competition,
              leaderboard: [
                ...competition.leaderboard,
                { rank: competition.leaderboard.length + 1, points }
              ]
            }
          : competition
      )
    }));
  };

  // Разблокировка наград
  const unlockReward = (rewardId) => {
    setMotivationData(prev => ({
      ...prev,
      rewards: prev.rewards.map(reward =>
        reward.id === rewardId
          ? { ...reward, unlocked: true }
          : reward
      )
    }));
  };

  const value = {
    motivationData,
    updateStreak,
    updateWeeklyChallenges,
    updateSeasonalEvents,
    updateCompetitions,
    unlockReward
  };

  return (
    <MotivationContext.Provider value={value}>
      {children}
    </MotivationContext.Provider>
  );
};

export default MotivationContext; 