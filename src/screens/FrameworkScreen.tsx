import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import { COLORS, SPACING, FONTS } from '../constants/theme';

export default function FrameworkScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <CustomIcon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>The Framework</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.subheading}>What is Ikigai?</Text>
          <Text style={styles.body}>
            Originating from Okinawa, Japan, Ikigai (ee-key-guy) roughly translates to "a reason for being." 
            It is the intersection where your passions and talents converge with the things that the world needs and is willing to pay for.
          </Text>
          <Text style={[styles.body, { marginTop: 12 }]}>
            The goal of this map is not to be perfect, but to find balance.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>The Four Pillars</Text>
          <Text style={styles.body}>These are the questions you ask yourself for every activity.</Text>
          
          <View style={styles.list}>
            <Text style={styles.listItem}><Text style={styles.bold}>1. Do you love it?</Text> Does this activity bring you joy? Do you lose track of time when you are doing it?</Text>
            <Text style={styles.listItem}><Text style={styles.bold}>2. Are you good at it?</Text> Do you have a natural talent or a skill you have worked hard to build?</Text>
            <Text style={styles.listItem}><Text style={styles.bold}>3. Does the world need it?</Text> Does this solve a problem, help others, or create value for your community?</Text>
            <Text style={styles.listItem}><Text style={styles.bold}>4. Does it pay well?</Text> Can this activity sustain you financially? Is it a viable career path?</Text>
          </View>
        </View>

         <View style={styles.section}>
          <Text style={styles.subheading}>The Intersections</Text>
          <Text style={styles.body}>When two pillars meet, they create a foundation.</Text>
          
          <View style={styles.list}>
            <Text style={styles.listItem}><Text style={styles.bold}>Passion</Text> (Love + Skill) You enjoy it and you excel at it, but you may not be paid or helping others yet.</Text>
            <Text style={styles.listItem}><Text style={styles.bold}>Mission</Text> (Love + Need) You love it and it helps others, but there is no wealth creation involved.</Text>
            <Text style={styles.listItem}><Text style={styles.bold}>Profession</Text> (Skill + Pay) You are competent and paid well, but the work may feel empty or boring.</Text>
             <Text style={styles.listItem}><Text style={styles.bold}>Vocation</Text> (Pay + Need) You are paid to do something needed, but it may not utilize your best talents.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>The Center</Text>
          <Text style={styles.listItem}><Text style={styles.bold}>My Ikigai</Text> (All 4 Intersect) The sweet spot. Balance. Satisfaction. A life where what you do supports who you are.</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  content: {
    padding: SPACING.l,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  subheading: {
    fontFamily: FONTS.heading,
    fontSize: 20,
    color: '#5A5348',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  body: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: '#5A5348',
    lineHeight: 24,
  },
  list: {
    marginTop: SPACING.s,
    gap: 16,
  },
  listItem: {
    fontFamily: FONTS.body,
    fontSize: 16,
    color: '#5A5348',
    lineHeight: 24,
  },
  bold: {
    fontFamily: FONTS.heading, // Using Tenor for bold/emphasis as Inter bold might be missing or less distinct
    fontWeight: 'bold',
  },
});
