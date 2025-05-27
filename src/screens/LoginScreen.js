/*/ src/screens/LoginScreen.js
import App from '../App';
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import CustomInput from '../components/CustomInput';
import api from '../api';
import { AuthContext } from '../App';

const logo = require('../assets/logo.png');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { user, token } = response.data;
        await signIn(token, user);
        Alert.alert('Succès', `Bienvenue ${user.prenom || user.email} !`);
      } else {
        Alert.alert('Erreur de Connexion', response.data.message || 'Échec de la connexion.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error.response?.data || error.message);
      Alert.alert(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue. Veuillez vérifier vos identifiants.'
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
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.buttonSpacing} />
      ) : (
        <TouchableOpacity style={styles.connectButton} onPress={handleLogin}>
          <Text style={styles.connectButtonText}>Connexion</Text>
        </TouchableOpacity>
      )}

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>Nouveau ?</Text>
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
  },
});
*/
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../components/CustomInput';
const logo = require('../assets/logo.png');

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

export default LoginScreen;