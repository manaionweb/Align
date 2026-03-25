import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, useWindowDimensions, StatusBar, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { captureRef } from 'react-native-view-shot';
import { shareAsync } from 'expo-sharing';
import { COLORS, SPACING, FONTS, SHAPE } from '../constants/theme';
import { useActivityAnalysis } from '../hooks/useActivityAnalysis';
import CustomIcon from '../components/CustomIcon';
import AddActivityModal from '../components/AddActivityModal';
import { Activity } from '../types';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const analysis = useActivityAnalysis();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const circleSize = Math.min(width * 0.85, 340); 

  const navigateToCategory = (category: string, title: string, params?: any) => {
    navigation.navigate('CategoryList', { category, title, ...params });
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setModalVisible(true);
  };

  const IkigaiCircle = () => (
    <View style={styles.circleContainer}>
      <View style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}>
        <CustomIcon name="ikigai" size={58} color={COLORS.surface} style={{ opacity: 0.9, marginBottom: 8 }} />
        <Text style={styles.circleTitle}>My Ikigai</Text>
        
        <View style={styles.circleChipsVertical}>
          {analysis.ikigai.slice(0, 3).map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.circleChipWhite}
              onPress={() => navigateToCategory('single', 'My Ikigai', { activityId: item.id })}
            >
              <Text style={styles.circleChipTextDark} numberOfLines={1}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          {analysis.ikigai.length > 3 && (
            <TouchableOpacity 
              style={[styles.circleChipWhite, { opacity: 0.8 }]}
              onPress={() => navigateToCategory('ikigai', 'My Ikigai')}
            >
               <Text style={styles.circleChipTextDark}>+{analysis.ikigai.length - 3} more</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.circleMatchesText}>
          {analysis.ikigai.length} Matches Found
        </Text>
      </View>
    </View>
  );

  const GridCard = ({ title, count, category, icon }: any) => {
    // Determine icon color based on visual hierarchy or keep uniform dark
    const iconColor = '#5A5348'; 

    if (count === 0) return null;

    return (
      <TouchableOpacity 
        style={styles.gridCard} 
        onPress={() => navigateToCategory(category, title)}
      >
        <View style={styles.gridIconContainer}>
          <CustomIcon name={icon} color={iconColor} size={28} />
        </View>
        
        <Text style={styles.gridTitle}>{title}</Text>
        <Text style={styles.gridSubtitle}>{count} Items</Text>

        {count > 0 && (
           <View style={styles.gridChip}>
             {/* @ts-ignore */}
             <Text style={styles.gridChipText} numberOfLines={1}>{analysis[category][0].name}</Text>
           </View>
        )}
      </TouchableOpacity>
    );
  };

  const ExploringCard = ({ title, count, category, icon }: any) => {
    if (count === 0) return null;

    return (
      <TouchableOpacity 
        style={styles.exploringCard}
        onPress={() => navigateToCategory(category, title)}
      >
        <View style={styles.exploringLeft}>
          <CustomIcon name={icon} size={24} color="#5A5348" />
          <Text style={styles.exploringTitle}>{title}</Text>
        </View>

        <View style={styles.exploringRight}>
          {count > 0 ? (
             <View style={styles.exploringChipsContainer}>
               <View style={styles.exploringChip}>
                  {/* @ts-ignore */}
                 <Text style={styles.exploringChipText} numberOfLines={1}>{analysis[category][0].name}</Text>
               </View>
               {count > 1 && (
                 <View style={[styles.exploringChip, { marginTop: 4 }]}>
                    {/* @ts-ignore */}
                   <Text style={styles.exploringChipText} numberOfLines={1}>{analysis[category][1].name}</Text>
                 </View>
               )}
              <Text style={styles.exploringCountText}>{count} Items</Text>
             </View>
          ) : (
            <Text style={styles.exploringCountText}>0 Items</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const hasExploringItems = analysis.hobbies.length > 0 || analysis.skills.length > 0 || analysis.jobs.length > 0 || analysis.causes.length > 0;

  const viewRef = React.useRef(null);
  const route = useRoute<any>();

  React.useEffect(() => {
    if (route.params?.shareRequest) {
      // Small delay to ensure render/transition is mostly done
      setTimeout(() => {
        captureAndShare();
      }, 500);
      
      // Reset params so it doesn't trigger again on focus
      navigation.setParams({ shareRequest: undefined });
    }
  }, [route.params?.shareRequest]);

  const captureAndShare = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
        result: 'tmpfile',
      });
      
      await shareAsync(uri);
    } catch (error) {
      console.error("Snapshot failed", error);
      alert("Failed to capture screenshot.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <CustomIcon name="menu" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Map</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Platform.OS === 'android' ? 120 : 100 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View 
          ref={viewRef}
          collapsable={false}
          style={{ 
            backgroundColor: '#F3EFE0', 
            paddingBottom: 20,
            paddingHorizontal: SPACING.l, // Include margins in capture
            paddingTop: SPACING.m, // Add some top padding too for balance
          }}
        >
          <IkigaiCircle />

          <View style={styles.grid}>
            <GridCard 
              title="Passion" 
              category="passion"
              count={analysis.passion.length} 
              icon="passion"
            />
            <GridCard 
              title="Mission" 
              category="mission"
              count={analysis.mission.length} 
              icon="mission"
            />
            <GridCard 
              title="Profession" 
              category="profession"
              count={analysis.profession.length} 
              icon="profession"
            />
            <GridCard 
              title="Vocation" 
              category="vocation"
              count={analysis.vocation.length} 
              icon="vocation" 
            />
          </View>

          {hasExploringItems && (
            <>
              <Text style={styles.sectionHeader}>Still Exploring</Text>
              
              <View style={styles.listSection}>
                <ExploringCard 
                  title="Hobbies" 
                  category="hobbies"
                  count={analysis.hobbies.length} 
                  icon="hobbies"
                />
                 <ExploringCard 
                  title="Skills" 
                  category="skills"
                  count={analysis.skills.length} 
                  icon="skills" 
                />
                 <ExploringCard 
                  title="Jobs" 
                  category="jobs"
                  count={analysis.jobs.length} 
                  icon="jobs" 
                />
                 <ExploringCard 
                  title="Causes" 
                  category="causes"
                  count={analysis.causes.length} 
                  icon="causes" 
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Full Width FAB */}
      <View style={[styles.fabContainer, { bottom: Math.max(insets.bottom + SPACING.m, Platform.OS === 'android' ? SPACING.xl + 8 : SPACING.l) }]}>
        <TouchableOpacity 
          style={styles.fab} 
          onPress={() => setModalVisible(true)}
        >
          <CustomIcon name="add" size={24} color={COLORS.surface} />
          <Text style={styles.fabText}>Add New Activity</Text>
        </TouchableOpacity>
      </View>

      <AddActivityModal 
        visible={modalVisible} 
        onClose={() => {
          setModalVisible(false);
          setEditingActivity(null);
        }} 
        editingActivity={editingActivity}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFE0', // More distinct cream from mock
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.l,
    paddingTop: SPACING.m,
    marginBottom: SPACING.s,
  },
  headerTitle: {
    fontFamily: FONTS.heading,
    fontSize: 34,
    color: '#5A5348', // Dark Brownish Grey
  },
  scrollContent: {
    // paddingHorizontal moved to inner view for screenshot capture
    paddingBottom: 100,
  },
  // Ikigai Circle
  circleContainer: {
    alignItems: 'center',
    marginVertical: SPACING.l,
  },
  circle: {
    backgroundColor: '#B5C4A6', // Sage Green from mock
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  circleTitle: {
    fontFamily: FONTS.heading,
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: SPACING.m,
  },
  circleChipsVertical: {
    gap: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  circleChipWhite: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: '60%',
    alignItems: 'center',
  },
  circleChipTextDark: {
    color: '#5A5348',
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
  },
  circleMatchesText: {
    color: '#5A5348',
    opacity: 0.7,
    fontFamily: FONTS.body,
    fontSize: 14,
  },
  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SPACING.m,
    marginBottom: SPACING.xl,
  },
  gridCard: {
    width: '48%', // Slightly wider
    backgroundColor: '#D1C8B4', // Sand/Beige from mock
    borderRadius: 16,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.m,
    alignItems: 'center',
    aspectRatio: 0.85, 
    justifyContent: 'center',
  },
  gridIconContainer: {
    marginBottom: SPACING.s,
  },
  gridTitle: {
    fontFamily: FONTS.heading,
    fontSize: 20,
    color: '#5A5348',
    marginBottom: 4,
  },
  gridSubtitle: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: '#5A5348',
    opacity: 0.7,
    marginBottom: 10,
  },
  gridChip: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    maxWidth: '100%',
  },
  gridChipText: {
    fontSize: 11,
    color: '#5A5348',
    fontFamily: FONTS.bodyMedium,
  },
  // Exploring List
  sectionHeader: {
    fontFamily: FONTS.heading,
    fontSize: 26,
    color: '#5A5348',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  listSection: {
    gap: SPACING.m,
    marginBottom: 80, 
  },
  exploringCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: SPACING.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 80,
    alignItems: 'flex-start', // Align tops
  },
  exploringLeft: {
    justifyContent: 'flex-start',
    gap: 8,
    marginTop: 4,
  },
  exploringTitle: {
    fontFamily: FONTS.heading,
    fontSize: 18,
    color: '#5A5348',
  },
  exploringRight: {
    alignItems: 'flex-end',
    flex: 1,
    marginLeft: SPACING.m,
  },
  exploringChipsContainer: {
    alignItems: 'flex-end',
    gap: 0,
    marginBottom: 4,
  },
  exploringChip: {
    backgroundColor: '#D1C8B4', // Sand bg for these chips
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  exploringChipText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: FONTS.bodyMedium,
  },
  exploringCountText: {
    fontSize: 10,
    color: '#5A5348',
    opacity: 0.6,
    marginTop: 4,
  },
  // FAB
  fabContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? SPACING.xl + 8 : SPACING.l,
    left: SPACING.l,
    right: SPACING.l,
  },
  fab: {
    backgroundColor: '#868B75', // Dark Sage
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 30,
    gap: 8,
    elevation: 5,
    boxShadow: '0 4 8 rgba(0,0,0,0.2)',
  },
  fabText: {
    color: '#FFFFFF',
    fontFamily: FONTS.bodyMedium,
    fontSize: 16,
  },
});
