import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS, SHAPE } from '../constants/theme';
import { Activity } from '../types';
import CustomIcon from './CustomIcon';

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: string) => void;
}

export default function ActivityCard({ activity, onEdit, onDelete }: ActivityCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name} numberOfLines={1}>{activity.name}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => onEdit(activity)}
        >
          <CustomIcon name="edit" size={20} color={COLORS.text} style={{ opacity: 0.6 }} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => onDelete(activity.id)}
        >
          <CustomIcon name="trash" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // White Surface
    marginBottom: SPACING.s,
    borderRadius: SHAPE.radius,
    padding: SPACING.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    boxShadow: '0 1 2 rgba(0,0,0,0.05)',
  },
  name: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: FONTS.body,
    flex: 1,
    marginRight: SPACING.m,
  },
  actions: {
    flexDirection: 'row',
    gap: 16, // Space between icons
  },
  iconButton: {
    padding: 4,
  },
});
