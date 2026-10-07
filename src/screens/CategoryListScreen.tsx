import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { useIkigai } from '../context/IkigaiContext';
import AddActivityModal from '../components/AddActivityModal';
import { Activity } from '../types';

import CustomAlertModal from '../components/CustomAlertModal';

export default function CategoryListScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { category, title } = route.params;
  const { activities, deleteActivity } = useIkigai();

  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    message: string;
    actions: { text: string; style?: 'default' | 'cancel' | 'destructive'; onPress?: () => void }[];
  }>({ title: '', message: '', actions: [] });

  const showCustomAlert = (title: string, message: string, actions: any[]) => {
    setAlertConfig({ title, message, actions });
    setAlertVisible(true);
  };

  const confirmDelete = (id: string) => {
    showCustomAlert(
      "Delete Activity",
      "Are you sure you want to remove this activity?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: () => {
            deleteActivity(id);
          }
        }
      ]
    );
  };

  const width = '100%'; 

  const listData = activities.filter((activity) => {
    const { love, skill, need, pay } = activity;
    if (category === 'passion') return love && skill;
    if (category === 'mission') return love && need;
    if (category === 'profession') return skill && pay;
    if (category === 'vocation') return need && pay;
    if (category === 'ikigai') return love && skill && need && pay;
    
    // Single activity view (from Ikigai chip)
    if (category === 'single') return activity.id === route.params?.activityId;

    // Single attributes for "Still Exploring"
    if (category === 'hobbies') return love && !skill && !need; 
    if (category === 'skills') return skill && !love && !pay;
    if (category === 'causes') return need && !love && !pay; 
    if (category === 'jobs') return pay && !skill && !need; 
    
    // Uncategorized
    if (category === 'uncategorized') return !love && !skill && !need && !pay;

    // Fallback for "All" or unknown
    return true; 
  });


  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <CustomIcon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <CustomIcon name="edit" size={20} color="#5A5348" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <CustomIcon name="trash" size={20} color="#C77D63" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <AddActivityModal 
        visible={modalVisible} 
        onClose={() => { setModalVisible(false); setEditingActivity(null); }}
        editingActivity={editingActivity}
      />

      <CustomAlertModal
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        actions={alertConfig.actions}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFE0', // Cream
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    color: '#5A5348',
  },
  listContent: {
    padding: SPACING.l,
    gap: SPACING.m,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: SPACING.m,
    flexDirection: 'row', // Row layout
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    boxShadow: '0 1 2 rgba(0,0,0,0.05)',
  },
  cardTitle: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: '#5A5348',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});
