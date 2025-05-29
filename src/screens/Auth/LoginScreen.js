
/*import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../components/CustomInput';
import { AuthContext } from '../../context/AuthContext';
const logo = require('../../assets/logo.png');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { success, user, token, message } = response.data; // Rectification: Destructuration

      if (success) {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userData', JSON.stringify(user));

        Alert.alert('Succès', `Bienvenue ${user.prenom || user.email} !`);
        navigation.replace('Home');
      } else {
        Alert.alert('Erreur de Connexion', message || 'Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.response?.data || error.message);
      Alert.alert(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue. Veuillez vérifier vos identifiants ou votre connexion internet.' // Rectification: Message d'erreur plus détaillé
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <CustomInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.buttonSpacing} />
      ) : (
        <TouchableOpacity style={styles.connectButton} onPress={handleLogin}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      )}

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Register</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Créer un nouveau compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#E8F0F8',
  },
  logo: {
    width: '80%',
    height: 180,
    marginBottom: 40,
  },
  connectButton: {
    width: '100%',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 16,
  },
  registerLink: {
    color: '#4A90E2',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonSpacing: {
    marginTop: 10,
  }
});

export default LoginScreen;*/

// src/screens/Auth/LoginScreen.js

import React, { useState, useContext } from 'react'; // <-- Assurez-vous d'importer useContext
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../../api';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Plus nécessaire ici si AuthContext gère le stockage
import CustomInput from '../../components/CustomInput';
import { AuthContext } from '../../context/AuthContext'; // Importez AuthContext
const logo = require('../../assets/logo.png');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext); // <-- Accédez à la fonction login du contexte

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Appelez la fonction login du contexte, elle se chargera de la logique API et de la mise à jour de l'état
      await login(email, password);

      // Si la fonction login du contexte gère les Alertes de succès, retirez celle-ci.
      // Ou gardez-la si vous voulez un feedback immédiat avant le changement d'écran.
      // Alert.alert('Succès', `Connexion réussie !`);

      // IMPORTANT : Ne faites AUCUNE navigation manuelle ici.
      // La navigation est gérée par le rendu conditionnel de App.js / AppNavigator.js
      // en fonction des changements de userToken/userRole dans AuthContext.
    } catch (error) {
      console.error('Erreur lors de la connexion dans LoginScreen :', error.response?.data || error.message);
      // L'erreur est probablement déjà gérée dans AuthContext.login, mais un fallback est bon.
      Alert.alert(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue lors de la connexion. Veuillez vérifier vos identifiants ou votre connexion internet.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      <CustomInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.buttonSpacing} />
      ) : (
        <TouchableOpacity style={styles.connectButton} onPress={handleLogin}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      )}

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Register</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Créer un nouveau compte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#E8F0F8',
  },
  logo: {
    width: '80%',
    height: 180,
    marginBottom: 40,
  },
  connectButton: {
    width: '100%',
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 16,
  },
  registerLink: {
    color: '#4A90E2',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonSpacing: {
    marginTop: 10,
  }
});

export default LoginScreen;