// src/api.js (Ceci est le fichier qui gère les appels à votre API backend)

// src/api.js
// Ce fichier se trouve dans le dossier 'src/', à côté de 'screens', 'components', etc.
// Fichier: ~/projects/TouristGuideApp/src/api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// *** TRÈS IMPORTANT : L'URL de votre backend Spring Boot ***
// REMPLACEZ '192.168.0.103' par l'adresse IPv4 réelle de votre machine Windows !
// Pour la trouver: ouvrez CMD/PowerShell sur Windows et tapez 'ipconfig'.
const API_BASE_URL = 'http://192.168.0.103:8085/api'; // (Confirmez cette IP)

// Crée une instance Axios avec une URL de base et des en-têtes par défaut
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajoute un intercepteur de requête pour inclure le token JWT
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

// Exporte l'instance Axios configurée
export default api;// Exporte l'instance Axios configurée pour être importée ailleurs (ex: dans RegisterScreen.js)// Exporte l'instance Axios configurée