import React, { useCallback } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts, TenorSans_400Regular } from '@expo-google-fonts/tenor-sans';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';

import { IkigaiProvider } from './src/context/IkigaiContext';
import HomeScreen from './src/screens/HomeScreen';
import CategoryListScreen from './src/screens/CategoryListScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FrameworkScreen from './src/screens/FrameworkScreen';
import CustomSplashScreen from './src/screens/SplashScreen';
import { COLORS } from './src/constants/theme';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    TenorSans_400Regular,
    Inter_400Regular,
    Inter_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <IkigaiProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor={COLORS.background} />
          <Stack.Navigator 
            initialRouteName="Splash"
            screenOptions={{ 
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.background },
            }}
          >
            <Stack.Screen name="Splash" component={CustomSplashScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CategoryList" component={CategoryListScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Framework" component={FrameworkScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </IkigaiProvider>
  );
}
