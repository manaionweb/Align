import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Share, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import CustomIcon from '../components/CustomIcon';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { useIkigai } from '../context/IkigaiContext';

import CustomAlertModal from '../components/CustomAlertModal';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const { activities, clearAllData } = useIkigai();

  const [alertVisible, setAlertVisible] = React.useState(false);
  const [alertConfig, setAlertConfig] = React.useState<{
    title: string;
    message: string;
    actions: { text: string; style?: 'default' | 'cancel' | 'destructive'; onPress?: () => void }[];
  }>({ title: '', message: '', actions: [] });

  const handleExport = async () => {
    // Navigate to Home with a share request param
    // We add a timestamp to ensure the param fails equality checks if pressed multiple times
    navigation.navigate('Home', { shareRequest: Date.now() });
  };

  const showCustomAlert = (title: string, message: string, actions: any[]) => {
    setAlertConfig({ title, message, actions });
    setAlertVisible(true);
  };

  const handleReset = () => {
    showCustomAlert(
      "Reset All Data",
      "Are you sure? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive", 
          onPress: async () => {
             // Close 'Reset' modal first (handled by component), then do action
             // But component closes immediately. We want to wait or chain.
             // The component calls onPress then onClose. 
             // We can fire the cleanup and then show success.
             
             // We need to keep it visible? Or close and open new one?
             // Since onClose triggers on button press too, simpler to close then re-open.
             // We can insert a small delay if needed.
             
             // Actually, clearAllData is async. 
             // Let's run it.
             await clearAllData();

             // Show Success
             setTimeout(() => {
                showCustomAlert(
                  "Success", 
                  "All data has been reset.",
                  [{ text: "OK", style: "default" }]
                );
             }, 300);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <CustomIcon name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionHeader}>Data</Text>
        
        <TouchableOpacity style={styles.card} onPress={handleExport}>
          <Text style={styles.cardText}>Export Map</Text>
          <ChevronRight size={20} color="#5A5348" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={handleReset}>
          <Text style={[styles.cardText, { color: '#C77D63' }]}>Reset All Data</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>App</Text>
        
         <TouchableOpacity style={styles.card} onPress={() => showCustomAlert("About Align", "Version 1.0", [{ text: "Close", style: "cancel" }])}>
          <Text style={styles.cardText}>About Align</Text>
          <Text style={styles.versionText}>version 1.0</Text>
        </TouchableOpacity>

         <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Framework')}>
          <Text style={styles.cardText}>The Framework</Text>
          <ChevronRight size={20} color="#5A5348" />
        </TouchableOpacity>

      </ScrollView>

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
    fontSize: 32,
    color: '#5A5348',
  },
  content: {
    padding: SPACING.l,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: FONTS.body, 
    fontWeight: '700',
    color: '#5A5348',
    marginBottom: SPACING.m,
    marginTop: SPACING.s,
    marginLeft: 4,
  },
  // cardContainer removed
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12, // Separate cards
    elevation: 2,
    boxShadow: '0 2 4 rgba(0,0,0,0.05)',
  },
  // lastCard removed
  cardText: {
    fontSize: 16,
    fontFamily: FONTS.body,
    color: '#5A5348',
  },
  versionText: {
    fontSize: 14,
    color: '#999',
    fontFamily: FONTS.body,
  },
});
