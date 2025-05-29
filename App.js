/*/ App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator'; // Importe votre AppNavigator
import { AuthProvider } from './src/context/AuthContext'; // Importe votre AuthProvider

const App = () => {
  return (
    // L'AuthProvider enveloppe toute l'application pour fournir le contexte d'authentification
    <AuthProvider>
      {/* AppNavigator gérera la logique de navigation en fonction de l'état d'authentification et du rôle */
    //  <AppNavigator />
    //</AuthProvider>
 // );
//};

//export default App;
// ~/projects/TouristGuideExpo/App.js

// App.js
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const loadInitialToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token ? token : null);
      } catch (e) {
        console.error("Failed to load initial token from storage in App.js", e);
        setUserToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialToken();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    // AuthProvider doit wrapper tout, mais NavigationContainer est dans AppNavigator
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;