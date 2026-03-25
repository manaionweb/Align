import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity } from '../types';

const STORAGE_KEY = 'ALIGN_ACTIVITIES';

export const saveActivities = async (activities: Activity[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(activities);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save activities', e);
  }
};

export const loadActivities = async (): Promise<Activity[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load activities', e);
    return [];
  }
};
export const clearActivities = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear activities', e);
  }
};
