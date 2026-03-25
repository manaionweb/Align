import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIkigai } from '../context/IkigaiContext';
import { COLORS, SPACING, FONTS, SHAPE } from '../constants/theme';
import CustomIcon from '../components/CustomIcon';
import { Activity } from '../types';

export default function ReflectionScreen() {
  const { activities } = useIkigai();

  const analysis = useMemo(() => {
    // Strict Inclusive Logic per user request
    
    // Passion = love === true AND skill === true
    const passion = activities.filter(a => a.love && a.skill).map(a => a.name);

    // Mission = love === true AND need === true
    const mission = activities.filter(a => a.love && a.need).map(a => a.name);

    // Profession = skill === true AND pay === true
    const profession = activities.filter(a => a.skill && a.pay).map(a => a.name);

    // Vocation = pay === true AND need === true
    const vocation = activities.filter(a => a.pay && a.need).map(a => a.name);

    // Ikigai = love === true AND skill === true AND need === true AND pay === true
    const ikigai = activities.filter(a => a.love && a.skill && a.need && a.pay).map(a => a.name);

    return { ikigai, passion, mission, profession, vocation };
  }, [activities]);

  const Section = ({ title, items, description }: { title: string, items: string[], description: string }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDesc}>{description}</Text>
      {items.length > 0 ? (
        <View style={styles.tagContainer}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyText}>No matches found yet.</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <CustomIcon name="ikigai" size={32} color={COLORS.primary} style={{ opacity: 0.8 }} />
          <Text style={styles.headerTitle}>Your Alignment</Text>
          <Text style={styles.headerSubtitle}>
            Reviewing your activities for alignment.
          </Text>
        </View>

        {analysis.ikigai.length > 0 && (
          <View style={[styles.ikigaiSection]}>
            <Text style={styles.ikigaiTitle}>IKIGAI</Text>
            <Text style={styles.ikigaiDesc}>Your reason for being.</Text>
            <View style={styles.tagContainer}>
              {analysis.ikigai.map((item, idx) => (
                <View key={idx} style={styles.ikigaiTag}>
                  <Text style={styles.ikigaiTagText}>{item.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <Section 
          title="Passion" 
          description="Love + Skill"
          items={analysis.passion} 
        />
        <Section 
          title="Mission" 
          description="Love + Need"
          items={analysis.mission} 
        />
        <Section 
          title="Profession" 
          description="Skill + Pay"
          items={analysis.profession} 
        />
        <Section 
          title="Vocation" 
          description="Need + Pay"
          items={analysis.vocation} 
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.l,
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    fontSize: 32,
    color: COLORS.text,
    fontFamily: FONTS.heading,
    marginTop: SPACING.s,
  },
  headerSubtitle: {
    textAlign: 'center',
    color: COLORS.text,
    marginTop: SPACING.s,
    fontSize: 16,
    fontFamily: FONTS.body,
    opacity: 0.7,
    lineHeight: 24,
  },
  section: {
    marginBottom: SPACING.l,
    padding: SPACING.m,
    borderRadius: SHAPE.radius,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  sectionTitle: {
    fontSize: 20,
    color: COLORS.text,
    fontFamily: FONTS.heading,
    marginBottom: 4,
  },
  sectionDesc: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: SPACING.m,
    fontFamily: FONTS.body,
    opacity: 0.6,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: SPACING.m,
    paddingVertical: 6,
    borderRadius: SHAPE.pill,
    backgroundColor: COLORS.background, 
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  tagText: {
    color: COLORS.text,
    fontFamily: FONTS.bodyMedium,
    fontSize: 14,
  },
  emptyText: {
    color: COLORS.text,
    fontFamily: FONTS.body,
    fontStyle: 'italic',
    opacity: 0.5,
  },
  ikigaiSection: {
    backgroundColor: COLORS.primary,
    padding: SPACING.l,
    borderRadius: 200, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
    aspectRatio: 1,
  },
  ikigaiTitle: {
    color: COLORS.surface,
    fontSize: 28,
    fontFamily: FONTS.heading,
    letterSpacing: 2,
    marginBottom: SPACING.s,
  },
  ikigaiDesc: {
    color: '#E0E0E0',
    marginBottom: SPACING.m,
    fontFamily: FONTS.body,
  },
  ikigaiTag: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    borderRadius: SHAPE.pill,
  },
  ikigaiTagText: {
    color: COLORS.primary,
    fontFamily: FONTS.bodyMedium,
    fontWeight: 'bold',
  },
});
