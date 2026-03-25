import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import * as Crypto from 'expo-crypto';
import { Activity, IkigaiContextType } from '../types';
import { loadActivities, saveActivities } from '../utils/storage';

const IkigaiContext = createContext<IkigaiContextType | undefined>(undefined);

export const IkigaiProvider = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const savedActivities = await loadActivities();
      setActivities(savedActivities);
    };
    loadData();
  }, []);

  const addActivity = async (name: string, initialPillars: { love?: boolean; skill?: boolean; need?: boolean; pay?: boolean }) => {
    const newActivity: Activity = {
      id: Crypto.randomUUID(),
      name,
      love: !!initialPillars.love,
      skill: !!initialPillars.skill,
      need: !!initialPillars.need,
      pay: !!initialPillars.pay,
      createdAt: Date.now(),
    };
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    await saveActivities(updatedActivities);
  };

  const updateActivity = async (id: string, updates: Partial<Activity>) => {
    const updatedActivities = activities.map((activity) => 
      activity.id === id ? { ...activity, ...updates } : activity
    );
    setActivities(updatedActivities);
    await saveActivities(updatedActivities);
  };

  const deleteActivity = async (id: string) => {
    const updatedActivities = activities.filter((activity) => activity.id !== id);
    setActivities(updatedActivities);
    await saveActivities(updatedActivities);
  };

  const clearAllData = async () => {
    try {
      await import('../utils/storage').then(m => m.clearActivities());
      setActivities([]);
    } catch (error) {

    }
  };

  return (
    <IkigaiContext.Provider value={{ activities, addActivity, updateActivity, deleteActivity, clearAllData }}>
      {children}
    </IkigaiContext.Provider>
  );
};

export const useIkigai = () => {
  const context = useContext(IkigaiContext);
  if (context === undefined) {
    throw new Error('useIkigai must be used within an IkigaiProvider');
  }
  return context;
};
