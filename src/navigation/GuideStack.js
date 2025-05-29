//projects/TouristGuideExpo/src/navigation/GuideStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuideDashboardScreen from '../screens/Guide/GuideDashboardScreen'; // L'écran principal pour le guide

const Stack = createNativeStackNavigator();

const GuideStack = () => {
  return (
    <Stack.Navigator initialRouteName="GuideDashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GuideDashboard" component={GuideDashboardScreen} />
      {/* Ajoutez d'autres écrans spécifiques au guide ici (ex: RecevoirDemandesScreen)*/}
    </Stack.Navigator>
  );
};

export default GuideStack;