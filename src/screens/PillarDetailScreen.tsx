import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useIkigai } from '../context/IkigaiContext';
import { COLORS, SPACING, FONTS, SHAPE } from '../constants/theme';
import { PillarType, Activity } from '../types';
import CustomIcon from '../components/CustomIcon';
import ActivityCard from '../components/ActivityCard';

type RootStackParamList = {
  PillarDetail: { pillar: PillarType };
};

type PillarDetailRouteProp = RouteProp<RootStackParamList, 'PillarDetail'>;

const getPillarTitle = (pillar: PillarType) => {
  switch (pillar) {
    case 'LOVE': return 'What you Love';
    case 'SKILL': return 'What you are Good at';
    case 'NEED': return 'What the World Needs';
    case 'PAY': return 'What you can be Paid for';
    default: return '';
  }
};

export default function PillarDetailScreen() {
  const route = useRoute<PillarDetailRouteProp>();
  const navigation = useNavigation();
  const { pillar } = route.params;
  const { activities, addActivity, deleteActivity, updateActivity } = useIkigai();
  const [text, setText] = useState('');

  const pillarKey = pillar.toLowerCase() as 'love' | 'skill' | 'need' | 'pay';
  const pillarActivities = activities.filter((a) => a[pillarKey]);

  const handleAdd = () => {
    if (text.trim()) {
      addActivity(text.trim(), { [pillarKey]: true });
      setText('');
    }
  };

  const handleEdit = (activity: any) => {
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <CustomIcon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{getPillarTitle(pillar)}</Text>
      </View>

      <FlatList
        data={pillarActivities}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ActivityCard 
            activity={item} 
            onEdit={handleEdit} 
            onDelete={deleteActivity} 
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nothing here yet.</Text>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Add new entry..."
          placeholderTextColor={COLORS.secondary}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
          selectionColor={COLORS.primary}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <CustomIcon name="add" size={24} color={COLORS.surface} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.l,
    paddingTop: SPACING.l,
  },
  backButton: {
    marginRight: SPACING.m,
  },
  title: {
    fontSize: 24,
    color: COLORS.text,
    fontFamily: FONTS.heading,
    flex: 1,
  },
  list: {
    padding: SPACING.l,
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.text,
    opacity: 0.5,
    marginTop: SPACING.xl,
    fontSize: 16,
    fontFamily: FONTS.body,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.l,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.m,
    borderRadius: SHAPE.pill,
    fontSize: 16,
    fontFamily: FONTS.body,
    color: COLORS.text,
    marginRight: SPACING.s,
    elevation: 2,
    boxShadow: '0 2 4 rgba(0,0,0,0.05)',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    elevation: 2,
  },
});
