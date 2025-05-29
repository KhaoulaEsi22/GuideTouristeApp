
// TouristGuideExpo/src/context/AuthContext.js
/*
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api'; // Importez l'instance 'api' configurée
import { Alert } from 'react-native'; // Pour les alertes

// Créez le AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // 'TOURIST' ou 'GUIDE'
  const [userId, setUserId] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // Assurez-vous que votre API renvoie bien ces champs
      const { token, role, id, message } = response.data; 

      if (token && role && id) {
        setUserToken(token);
        setUserRole(role);
        setUserId(id);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userRole', role);
        await AsyncStorage.setItem('userId', id.toString());
        console.log('Login successful:', { token, role, id });
        Alert.alert('Succès', `Bienvenue !`); // Alerte après login réussi
      } else {
        // Si l'API retourne un succès mais sans les données attendues
        console.error('Login successful but missing token/role/id in response:', response.data);
        Alert.alert('Erreur', message || 'Données de connexion incomplètes.');
        throw new Error('Données de connexion incomplètes.'); // Propage l'erreur
      }
    } catch (e) {
      console.error('Login error in AuthContext:', e.response?.data || e.message);
      // Afficher un message d'erreur plus spécifique si l'API en fournit un
      const errorMessage = e.response?.data?.message || 'Identifiants incorrects ou erreur réseau.';
      Alert.alert('Erreur de Connexion', errorMessage);
      throw e; // Renvoyez l'erreur pour que LoginScreen puisse la capturer
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUserToken(null);
      setUserRole(null);
      setUserId(null);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userId');
      console.log('User logged out');
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const role = await AsyncStorage.getItem('userRole');
      const id = await AsyncStorage.getItem('userId');
      if (token && role && id) {
        setUserToken(token);
        setUserRole(role);
        setUserId(parseInt(id)); // Convertir en nombre
      }
    } catch (e) {
      console.error('Failed to retrieve login status from storage:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Vérifie l'état de connexion au démarrage de l'application
  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, userId, userRole, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; */
/*import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api'; // Importez l'instance 'api' configurée
import { Alert } from 'react-native'; // Pour les alertes

// Créez et EXPORTEZ le AuthContext pour qu'il soit utilisable par useContext ailleurs
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null); // Ex: 'ROLE_TOURISTE' ou 'ROLE_GUIDE'
  const [userId, setUserId] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email,
        password, // Assurez-vous que le nom du champ pour le mot de passe est 'password' ou 'motDePasse' selon votre backend
      });

      // RECTIFICATION CLÉ ICI : DÉSTRUCTUREZ L'OBJET 'user' car le backend le renvoie ainsi
      // D'après les logs précédents, la réponse est { success, token, user: { id, role, ... }, message }
      const { token, user, message } = response.data; 

      if (token && user && user.role && user.id) { // Vérifiez que 'user', 'user.role' et 'user.id' existent
        setUserToken(token);
        setUserRole(user.role); // Utilisez user.role
        setUserId(user.id);     // Utilisez user.id
        
        // Stockage dans AsyncStorage pour la persistance
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userRole', user.role); // Stockez user.role
        await AsyncStorage.setItem('userId', user.id.toString()); // Convertir en string pour AsyncStorage

        console.log('Login successful:', { token, role: user.role, id: user.id });
        Alert.alert('Succès', `Bienvenue !`); // Alerte après login réussi
      } else {
        // Si l'API retourne un succès mais sans les données essentielles attendues (token/user/user.role/user.id)
        console.error('Login successful but missing token/role/id in response:', response.data);
        Alert.alert('Erreur', message || 'Données de connexion incomplètes fournies par le serveur.');
        throw new Error('Données de connexion incomplètes.'); // Propage l'erreur
      }
    } catch (e) {
      console.error('Login error in AuthContext:', e.response?.data || e.message);
      // Afficher un message d'erreur plus spécifique si l'API en fournit un
      const errorMessage = e.response?.data?.message || 'Identifiants incorrects ou erreur réseau.';
      Alert.alert('Erreur de Connexion', errorMessage);
      throw e; // Renvoyez l'erreur pour que LoginScreen puisse la capturer
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUserToken(null);
      setUserRole(null);
      setUserId(null);
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userId');
      console.log('User logged out');
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const role = await AsyncStorage.getItem('userRole');
      const id = await AsyncStorage.getItem('userId');
      if (token && role && id) {
        setUserToken(token);
        setUserRole(role);
        setUserId(parseInt(id, 10)); // Convertir en nombre (base 10)
      }
    } catch (e) {
      console.error('Failed to retrieve login status from storage:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Vérifie l'état de connexion au démarrage de l'application
  useEffect(() => {
    checkLoginStatus();
  }, []); // Le tableau de dépendances vide assure qu'il ne s'exécute qu'une fois au montage

  return (
    // Exposez les setters dans la valeur du contexte pour plus de flexibilité si d'autres composants en ont besoin
    <AuthContext.Provider value={{ userToken, userId, userRole, isLoading, login, logout, setUserToken, setUserRole, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};*/
/*import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

    /*const login = async (token, role) => {
        try {
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userRole', role);
            setUserToken(token);
            setUserRole(role);
        } catch (error) {
            console.log('Erreur lors de la sauvegarde du token:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userRole');
            setUserToken(null);
            setUserRole(null);
        } catch (error) {
            console.log('Erreur lors de la suppression du token:', error);
        }
    };

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const role = await AsyncStorage.getItem('userRole');
            if (token) {
                setUserToken(token);
                setUserRole(role);
            }
        } catch (error) {
            console.log('Erreur lors de la récupération du token:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{
            userToken,
            userRole,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};*/
// src/context/AuthContext.js
/*
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api'; // N'oubliez pas d'importer api
import { Alert } from 'react-native'; // N'oubliez pas d'importer Alert

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', { email, password });

            console.log('API Login Response Data:', JSON.stringify(response.data, null, 2));
            const { token, user, message } = response.data;

            if (token && user && user.role && user.id) {
                console.log('Role before setting state (from API):', user.role);
                setUserToken(token);
                setUserRole(user.role);
                setUserId(user.id);

                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userRole', user.role);
                await AsyncStorage.setItem('userId', user.id.toString());
                console.log('Role saved to AsyncStorage:', user.role);

                console.log('Login successful:', { token, role: user.role, id: user.id });
                Alert.alert('Succès', `Bienvenue !`);
            } else {
                console.error('Login successful but missing token/role/id in response:', response.data);
                Alert.alert('Erreur', message || 'Données de connexion incomplètes fournies par le serveur.');
                throw new Error('Données de connexion incomplètes.');
            }
        } catch (e) {
            console.error('Login error in AuthContext:', e.response?.data || e.message);
            const errorMessage = e.response?.data?.message || 'Identifiants incorrects ou erreur réseau.';
            Alert.alert('Erreur de Connexion', errorMessage);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    // NOUVELLE FONCTION LOGOUT À AJOUTER OU DÉCOMMENTER
    const logout = async () => {
        setIsLoading(true); // Optionnel : mettre à jour l'état de chargement pendant la déconnexion
        try {
            setUserToken(null);
            setUserRole(null);
            setUserId(null);
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userRole');
            await AsyncStorage.removeItem('userId');
            console.log('User logged out successfully.');
        } catch (e) {
            console.error('Logout error:', e);
            Alert.alert('Erreur de Déconnexion', 'Une erreur est survenue lors de la déconnexion.');
        } finally {
            setIsLoading(false);
        }
    };

    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const role = await AsyncStorage.getItem('userRole');
            const id = await AsyncStorage.getItem('userId');
            console.log('Role retrieved from AsyncStorage in checkLoginStatus:', role);
            if (token && role && id) {
                setUserToken(token);
                setUserRole(role);
                setUserId(parseInt(id, 10));
            }
        } catch (e) {
            console.error('Failed to retrieve login status from storage:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, userId, userRole, isLoading, login, logout, setUserToken, setUserRole, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
}; */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import api from '../api';
import api from '../api/index'; // Assurez-vous que le chemin est correct

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [userId, setUserId] = useState(null);

    const checkLoginStatus = async () => {
        try {
            console.log('AuthContext - checkLoginStatus: Checking stored data...');
            const storedToken = await AsyncStorage.getItem('userToken');
            const storedRole = await AsyncStorage.getItem('userRole');
            const storedId = await AsyncStorage.getItem('userId');

            if (storedToken && storedRole && storedId) {
                // Optionnel: Vous pouvez ajouter ici une vérification de validité du token avec le backend
                // Pour l'instant, on se base sur la présence du token.
                setUserToken(storedToken);
                setUserRole(storedRole);
                setUserId(storedId);
                console.log('AuthContext - checkLoginStatus: Session found. Token:', storedToken ? 'PRESENT' : 'ABSENT', 'Role:', storedRole, 'ID:', storedId);
            } else {
                console.log('AuthContext - checkLoginStatus: No valid session found in AsyncStorage.');
                setUserToken(null);
                setUserRole(null);
                setUserId(null);
            }
        } catch (e) {
            console.error('AuthContext - checkLoginStatus Error:', e);
            // En cas d'erreur de lecture, s'assurer que l'état est clean
            setUserToken(null);
            setUserRole(null);
            setUserId(null);
        } finally {
            setIsLoading(false); // Toujours mettre fin au chargement
            console.log('AuthContext - checkLoginStatus: Finished loading status.');
        }
    };

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            console.log('AuthContext - login: Attempting to log in for:', email);
            const response = await api.post('/auth/login', { email, password });
            console.log('AuthContext - login: API Login Response Data:', JSON.stringify(response.data, null, 2));

            const { token, user } = response.data;
            if (token && user && user.role && user.id) {
                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userRole', user.role);
                await AsyncStorage.setItem('userId', String(user.id)); // Assurez-vous que l'ID est stocké comme une chaîne

                setUserToken(token);
                setUserRole(user.role);
                setUserId(user.id);
                console.log('AuthContext - login: Login successful. UserRole set to:', user.role);
            } else {
                console.error('AuthContext - login: Login failed. Missing token or user data in API response.', response.data);
                throw new Error("Invalid API response during login.");
            }
        } catch (e) {
            console.error('AuthContext - login Error:', e.response ? e.response.data : e.message);
            // Gérer les erreurs spécifiques de l'API (ex: identifiants invalides)
            throw e; // Propage l'erreur pour que l'écran de login puisse l'afficher
        } finally {
            setIsLoading(false); // Toujours mettre fin au chargement
            console.log('AuthContext - login: Finished login attempt.');
        }
    };

    const logout = async () => {
        setIsLoading(true); // Optionnel, pour montrer un état de chargement pendant la déconnexion
        try {
            console.log('AuthContext - logout: Clearing all authentication data...');
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userRole');
            await AsyncStorage.removeItem('userId');
            setUserToken(null);
            setUserRole(null);
            setUserId(null);
            console.log('AuthContext - logout: Successfully logged out.');
        } catch (e) {
            console.error('AuthContext - logout Error:', e);
        } finally {
            setIsLoading(false); // Toujours mettre fin au chargement
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    // Ajoutez un useEffect pour observer les changements d'état
    useEffect(() => {
        console.log('AuthContext State Changed - userToken:', userToken ? 'PRESENT' : 'ABSENT', 'userRole:', userRole, 'userId:', userId, 'isLoading:', isLoading);
    }, [userToken, userRole, userId, isLoading]);

    return (
        <AuthContext.Provider value={{ userToken, userRole, userId, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};