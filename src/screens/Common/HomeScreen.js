
/*import React from 'react';
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

export default HomeScreen;*/
// screens/common/HomeScreen.js
// screens/common/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const HomeScreen = ({ navigation }) => {
    const { logout, userToken, userRole } = useContext(AuthContext);

    // Ce HomeScreen ne devrait être vu que par les utilisateurs non connectés
    // Si un utilisateur connecté arrive ici, c'est une erreur de navigation

    // Si l'utilisateur n'est pas connecté, afficher les options de connexion/inscription
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.welcomeText}>Bienvenue sur votre application de services touristiques !</Text>
            <Text style={styles.descriptionText}>
                Découvrez des guides locaux passionnants ou proposez vos services de guide.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f7fa',
        padding: 20,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#263238',
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#455a64',
        marginBottom: 40,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '80%',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    registerButton: {
        backgroundColor: '#28a745',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 30,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default HomeScreen;
