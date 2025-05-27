// Fichier: TouristGuideExpo/src/api/index.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// *** TRÈS IMPORTANT : L'URL de votre backend Spring Boot ***
// Adaptez cette ligne en fonction de votre environnement de test :
// - Pour un émulateur Android (le plus courant) : 'http://10.0.2.2:8085/api'
// - Pour un simulateur iOS : 'http://localhost:8085/api' ou 'http://127.0.0.1:8085/api'
// - Pour un appareil physique sur le même réseau Wi-Fi : 'http://VOTRE_ADRESSE_IP_MACHINE:8085/api' (ex: http://192.168.1.100:8085/api)

// REMPLACEZ '192.168.0.103' par l'adresse IPv4 réelle de votre machine Windows !
// Pour la trouver: ouvrez CMD/PowerShell sur Windows et tapez 'ipconfig'.
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
      await AsyncStorage.removeItem('userToken'); // Supprime le token invalide
      // Vous pourriez vouloir rediriger l'utilisateur vers l'écran de connexion ici
      // Cela nécessiterait un moyen d'accéder à la navigation globale,
      // ce qui est plus complexe dans les intercepteurs (Context API ou autre).
    }
    return Promise.reject(error);
  }
);

export default api;