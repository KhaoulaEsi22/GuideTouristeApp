// Fichier: TouristGuideApp/src/screens/RegisterScreen.js

/* import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView // Rectification: Utilisez ScrollView pour les longs formulaires
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import api from '../../api';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext'; 

const RegisterScreen = ({ navigation }) => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [role, setRole] = useState('ROLE_TOURISTE'); // Rôle par défaut
  const [loading, setLoading] = useState(false);
  
  const { login, setUserToken, setUserRole, setUserId } = useContext(AuthContext); // Adaptez selon ce que votre AuthContext exporte


  const handleRegister = async () => {
    // Rectification: Validation client-side plus robuste
    if (!prenom || !nom || !email || !password || !confirmPassword || !telephone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) { // Exemple de validation de longueur de mot de passe
        Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex pour email
    if (!emailRegex.test(email)) {
        Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
        return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/register', {
        prenom,
        nom,
        email,
        motDePasse: password,
        telephone,
        role,
      });

      const { success, message, token, user }  = response.data; // Destructuration

      if (success) {
        Alert.alert('Succès', 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erreur d\'inscription', message || 'Échec de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.response?.data || error.message);
      Alert.alert(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription. Veuillez vérifier les informations ou réessayer plus tard.' // Rectification: Message d'erreur plus détaillé
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}> {/* Rectification: Utilisation de ScrollView }
      <Text style={styles.title}>Créer un nouveau compte</Text>

      <CustomInput placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
      <CustomInput placeholder="Nom" value={nom} onChangeText={setNom} />
      <CustomInput
        placeholder="Téléphone"
        keyboardType="phone-pad"
        value={telephone}
        onChangeText={setTelephone}
      />
      <CustomInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <CustomInput
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.roleSelection}>
        <Text style={styles.roleLabel}>Je suis un :</Text>
        <TouchableOpacity
          style={[styles.roleButton, role === 'ROLE_TOURISTE' && styles.roleButtonSelected]}
          onPress={() => setRole('ROLE_TOURISTE')}
        >
          <Text style={[styles.roleButtonText, role === 'ROLE_TOURISTE' && styles.roleButtonTextSelected]}>Touriste</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'ROLE_GUIDE' && styles.roleButtonSelected]}
          onPress={() => setRole('ROLE_GUIDE')}
        >
          <Text style={[styles.roleButtonText, role === 'ROLE_GUIDE' && styles.roleButtonTextSelected]}>Guide</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.buttonSpacing} />
      ) : (
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Déjà un compte ? Connectez-vous</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Rectification: Important pour ScrollView
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#E8F0F8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#4A90E2',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  buttonSpacing: {
    marginTop: 20,
  },
  roleSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  roleLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  roleButtonSelected: {
    backgroundColor: '#4A90E2',
  },
  roleButtonText: {
    color: '#4A90E2',
    fontSize: 15,
    fontWeight: 'bold',
  },
  roleButtonTextSelected: {
    color: '#fff',
  },
});

export default RegisterScreen;*/
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomInput from '../../components/CustomInput'; // Adjust path if necessary
import api from '../../api'; // Adjust path if necessary, this is your Axios instance
import { AuthContext } from '../../context/AuthContext'; // Import AuthContext if you use its functions here

const RegisterScreen = ({ navigation }) => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [role, setRole] = useState('ROLE_TOURISTE'); // Default role: Tourist
  const [loading, setLoading] = useState(false);

  // If your register API automatically logs in the user, you might need 'login' from AuthContext.
  // Otherwise, if it just creates the account, you don't need 'login' here.
  // const { login } = useContext(AuthContext); // Uncomment if needed for auto-login after register

  const handleRegister = async () => {
    // Client-side validation
    if (!prenom || !nom || !email || !password || !confirmPassword || !telephone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) { // Example password length validation
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
      return;
    }

    setLoading(true);
    try {
      // Make sure the field names (motDePasse, telephone, role) match your backend API
      const response = await api.post('/auth/register', {
        prenom,
        nom,
        email,
        motDePasse: password,
        telephone,
        role,
      });

      const { success, message } = response.data; // Destructure token and user if your API sends them

      if (success) {
        Alert.alert('Succès', 'Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
        // This navigation is CORRECT if your API only creates the account and DOES NOT auto-login.
        // It sends the user back to the Login screen.
        navigation.navigate('Login');

        // If your API *does* auto-login, you would remove navigation.navigate('Login');
        // and instead update AuthContext here using the 'token' and 'user' data from response.data:
        /*
        if (token && user && user.role && user.id) {
            // Assuming AuthContext provides setters for token, role, id
            // const { setUserToken, setUserRole, setUserId } = useContext(AuthContext);
            // setUserToken(token);
            // setUserRole(user.role);
            // setUserId(user.id);
            // Also save to AsyncStorage if AuthContext's setters don't do it automatically
            // await AsyncStorage.setItem('userToken', token);
            // await AsyncStorage.setItem('userRole', user.role);
            // await AsyncStorage.setItem('userId', user.id.toString());
        }
        */

      } else {
        Alert.alert('Erreur d\'inscription', message || 'Échec de l\'inscription.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error.response?.data || error.message);
      Alert.alert(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription. Veuillez vérifier les informations ou réessayer plus tard.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Créer un nouveau compte</Text>

      <CustomInput placeholder="Prénom" value={prenom} onChangeText={setPrenom} />
      <CustomInput placeholder="Nom" value={nom} onChangeText={setNom} />
      <CustomInput
        placeholder="Téléphone"
        keyboardType="phone-pad"
        value={telephone}
        onChangeText={setTelephone}
      />
      <CustomInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <CustomInput
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <View style={styles.roleSelection}>
        <Text style={styles.roleLabel}>Je suis un :</Text>
        <TouchableOpacity
          style={[styles.roleButton, role === 'ROLE_TOURISTE' && styles.roleButtonSelected]}
          onPress={() => setRole('ROLE_TOURISTE')}
        >
          <Text style={[styles.roleButtonText, role === 'ROLE_TOURISTE' && styles.roleButtonTextSelected]}>Touriste</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'ROLE_GUIDE' && styles.roleButtonSelected]}
          onPress={() => setRole('ROLE_GUIDE')}
        >
          <Text style={[styles.roleButtonText, role === 'ROLE_GUIDE' && styles.roleButtonTextSelected]}>Guide</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.buttonSpacing} />
      ) : (
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Déjà un compte ? Connectez-vous</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#E8F0F8',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#4A90E2',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  buttonSpacing: {
    marginTop: 20,
  },
  roleSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  roleLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  roleButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A90E2',
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  roleButtonSelected: {
    backgroundColor: '#4A90E2',
  },
  roleButtonText: {
    color: '#4A90E2',
    fontSize: 15,
    fontWeight: 'bold',
  },
  roleButtonTextSelected: {
    color: '#fff',
  },
});

export default RegisterScreen;