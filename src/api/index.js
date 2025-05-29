// Fichier: TouristGuideExpo/src/api/index.js
/*
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'http://192.168.0.103:8085/api'; // CONFIRMEZ CETTE IP

// Crée une instance Axios avec une URL de base et des en-têtes par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Rectification: Ajout d'un timeout pour les requêtes (10 secondes)
});

// Ajoute un intercepteur de requête pour inclure le token JWT dans toutes les requêtes
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Rectification: Ajout d'un intercepteur de réponse pour gérer globalement les erreurs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Exemple de gestion des erreurs 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access. Redirecting to login...');
      await AsyncStorage.removeItem('userToken'); 
    }
    return Promise.reject(error);
  }
);

export default api;*/

// Fichier: TouristGuideExpo/src/api/index.js
/*
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.0.103:8085/api'; // CONFIRMEZ CETTE IP

// Crée une instance Axios avec une URL de base et des en-têtes par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Rectification: Ajout d'un timeout pour les requêtes (10 secondes)
});

// Ajoute un intercepteur de requête pour inclure le token JWT dans toutes les requêtes
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Rectification: Ajout d'un intercepteur de réponse pour gérer globalement les erreurs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Exemple de gestion des erreurs 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access. Redirecting to login...');
      await AsyncStorage.removeItem('userToken'); 
      // NOTE IMPORTANTE : Pour une redirection complète vers l'écran de connexion,
      // vous devrez déclencher le `logout` du AuthContext ici ou un événement global.
      // `AsyncStorage.removeItem` ne suffit pas à réinitialiser l'état de l'application.
    }
    return Promise.reject(error);
  }
);

export default api;*/
// src/api.js (Assurez-vous que c'est le seul fichier api.js dans votre projet)
/* 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT : Remplacez par l'adresse IP de votre machine locale
// Si vous utilisez un émulateur Android, '10.0.2.2' est l'alias pour votre localhost.
// Si vous utilisez votre téléphone, utilisez l'IP de votre machine sur le réseau local (ex: 192.168.1.XX).
const API_BASE_URL = 'http://192.168.0.103:8085/api'; // Exemple

// Crée une instance Axios avec une URL de base et des en-têtes par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Ajout d'un timeout pour les requêtes (10 secondes)
});

// Ajoute un intercepteur de requête pour inclure le token JWT dans toutes les requêtes
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajout d'un intercepteur de réponse pour gérer globalement les erreurs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Exemple de gestion des erreurs 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access. Clearing token and attempting logout...');
      // Ici, vous devriez idéalement déclencher un logout global via AuthContext
      // Pour l'instant, on retire juste le token du stockage.
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('userId');
      // Une redirection vers l'écran de login se fera naturellement via AppNavigator
      // car le userToken sera null.
    }
    return Promise.reject(error);
  }
);

export default api;*/
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT : Remplacez par l'adresse IP de votre machine locale
// Si vous utilisez un émulateur Android, 'http://10.0.2.2:8085/api' est l'alias pour votre localhost.
// Si vous utilisez un simulateur iOS sur le même Mac, 'http://localhost:8085/api' peut fonctionner.
// Si vous utilisez votre téléphone physique (iOS ou Android), utilisez l'IP de votre machine sur le réseau local (ex: 192.168.1.XX:8085).
// Assurez-vous que votre téléphone et votre ordinateur sont sur le MÊME réseau Wi-Fi.
export const API_BASE_URL = 'http://192.168.0.103:8085/api'; // <--- REMPLACEZ CETTE IP SI NÉCESSAIRE

// Crée une instance Axios avec une URL de base et des en-têtes par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Ajout d'un timeout pour les requêtes (10 secondes)
});

// Ajoute un intercepteur de requête pour inclure le token JWT dans toutes les requêtes
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token dans l'intercepteur de requête:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Ajout d'un intercepteur de réponse pour gérer globalement les erreurs
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Exemple de gestion des erreurs 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access (401). Clearing token and attempting logout...');
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userRole');
        await AsyncStorage.removeItem('userId');
        // Un rechargement de l'application ou une redirection vers l'écran de login
        // sera géré par AppNavigator car le userToken sera null.
        // Optionnel : Si vous avez un mécanisme global de déconnexion dans AuthContext, appelez-le ici.
        // Par exemple: AuthContext.logout();
      } catch (e) {
        console.error("Erreur lors du nettoyage d'AsyncStorage après 401:", e);
      }
    } else if (error.code === 'ECONNABORTED') {
      // Gérer l'erreur de timeout
      console.error('La requête a expiré. Vérifiez votre connexion ou l\'accessibilité du serveur.');
    } else if (axios.isAxiosError(error) && !error.response) {
        // C'est un Network Error (pas de réponse du serveur)
        console.error('Erreur réseau : Le serveur est injoignable ou la connexion a été interrompue.');
    } else {
        console.error('Erreur de réponse API:', error.response ? error.response.data : error.message);
    }
    return Promise.reject(error);
  }
);

export default api;