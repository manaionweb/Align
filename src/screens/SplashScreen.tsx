import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import { COLORS, FONTS } from '../constants/theme';

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    // Navigate away after delay
    const timer = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    }, 2500); // Slightly longer to appreciate the logo

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        
        {/* Main Base Circle */}
        <View style={styles.mainCircle}>
           {/* Mask Circles */}
           <View style={[styles.maskCircle, styles.maskTop]} />
           <View style={[styles.maskCircle, styles.maskBottom]} />
           <View style={[styles.maskCircle, styles.maskLeft]} />
           <View style={[styles.maskCircle, styles.maskRight]} />

           {/* Inner Content */}
           <View style={styles.innerContent}>
             <CustomIcon name="ikigai" size={60} color="#808080" />
             <Text style={styles.title}>ALIGN</Text>
             <Text style={styles.subtitle}>FIND YOUR REASON</Text>
           </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EFE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // Removed transform/opacity since we aren't animating for now
  },
  mainCircle: {
    width: 280,
    height: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  maskCircle: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3EFE0',
  },
  maskTop: {
    top: -30,
  },
  maskBottom: {
    bottom: -30,
  },
  maskLeft: {
    left: -30,
  },
  maskRight: {
    right: -30,
  },
  innerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    gap: 12,
  },
  title: {
    fontSize: 36,
    color: '#5A5348',
    fontFamily: FONTS.heading,
    letterSpacing: 2,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#5A5348',
    fontFamily: FONTS.body,
    letterSpacing: 2,
    opacity: 0.8,
    textTransform: 'uppercase',
  },
});
