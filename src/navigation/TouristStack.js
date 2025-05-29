// src/navigation/TouristStack.js
/*import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TouristHomeScreen from '../screens/TouristHomeScreen';
import GuideRequestScreen from '../screens/GuideRequestScreen'; // Nous allons créer cet écran

const Stack = createStackNavigator();

const TouristStack = () => {
  return (
    <Stack.Navigator initialRouteName="TouristHome">
      <Stack.Screen
        name="TouristHome"
        component={TouristHomeScreen}
        options={{ title: 'Rechercher un Guide' }}
      />
      <Stack.Screen
        name="GuideRequest"
        component={GuideRequestScreen}
        options={{ title: 'Détails du Guide & Demande' }}
      />
    </Stack.Navigator>
  );
};

export default TouristStack; */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchGuideScreen from '../screens/Tourist/SearchGuideScreen';
import DemandeDetailsScreen from '../screens/Tourist/DemandeDetailsScreen';
import ProfileScreen from '../screens/Tourist/ProfileScreen';
import TouristHomeScreen from '../screens/Tourist/TouristHomeScreen';

const Stack = createNativeStackNavigator();

const TouristStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="TouristDashboard" 
      screenOptions={{ headerShown: false }}
    >
      {/* Page principale pour les touristes */}
      <Stack.Screen name="TouristDashboard" component={TouristHomeScreen} />
      <Stack.Screen name="SearchGuides" component={SearchGuideScreen} />
      <Stack.Screen name="DemandeDetails" component={DemandeDetailsScreen} />
      <Stack.Screen name="TouristProfile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default TouristStack;