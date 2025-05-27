/*/ ~/projects/TouristGuideExpo/src/screens/HomeScreen.js

import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ajoutez cet import si ce n'est pas déjà fait

const HomeScreen = ({ navigation }) => { // Ou GuideHomeScreen
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData'); // Assurez-vous de supprimer aussi les données utilisateur

      Alert.alert('Déconnexion', 'Vous avez été déconnecté avec succès.');

      // --- LE CHANGEMENT CLÉ ICI ---
      // Réinitialise la pile de navigation pour aller à l'écran de Login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      // --- FIN DU CHANGEMENT ---

    } catch (e) {
      console.error('Erreur lors de la déconnexion:', e);
      Alert.alert('Erreur', 'Impossible de se déconnecter.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'écran d'accueil !</Text>
      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

await AsyncStorage.removeItem('userToken');
await AsyncStorage.removeItem('userData');
// Rediriger vers Login

export default HomeScreen; // Ou GuideHomeScreen*/

// Fichier: TouristGuideApp/src/screens/HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Ou await AsyncStorage.removeItem('userToken'); pour être plus spécifique
      navigation.replace('AuthStack');
    } catch (e) {
      console.error("Failed to clear AsyncStorage or navigate", e);
      Alert.alert('Erreur', 'Échec de la déconnexion. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur l'écran d'accueil !</Text>
      <Text style={styles.subtitle}>Vous êtes connecté.</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F0F8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;