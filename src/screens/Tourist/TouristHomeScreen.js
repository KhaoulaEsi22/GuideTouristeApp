
/*import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios'; //npm install axios
import CustomInput from '../components/CustomInput'; // composant d'entrée personnalisé

const API_BASE_URL = 'http://192.168.0.103:8085/api';

const TouristHomeScreen = ({ navigation }) => {
  const [guides, setGuides] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      // Vous pourriez avoir besoin de passer un jeton d'authentification ici si votre API est sécurisée
      const response = await axios.get(`${API_BASE_URL}/guides`);
      setGuides(response.data);
      setError(null); // Effacer les erreurs précédentes
    } catch (err) {
      console.error('Erreur lors de la récupération des guides :', err);
      setError('Erreur lors du chargement des guides.');
      Alert.alert('Erreur', 'Impossible de charger les guides. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  const filteredGuides = guides.filter(guide =>
    guide.nom.toLowerCase().includes(searchText.toLowerCase()) ||
    guide.prenom.toLowerCase().includes(searchText.toLowerCase()) ||
    (guide.languesParlees && guide.languesParlees.toLowerCase().includes(searchText.toLowerCase()))
  );

  const renderGuideItem = ({ item }) => (
    <TouchableOpacity
      style={styles.guideCard}
      onPress={() => navigation.navigate('GuideRequest', { guideId: item.id, guideName: `${item.prenom} ${item.nom}` })}
    >
      <Text style={styles.guideName}>{item.prenom} {item.nom}</Text>
      <Text style={styles.guideDetail}>Email: {item.email}</Text>
      <Text style={styles.guideDetail}>Téléphone: {item.telephone}</Text>
      <Text style={styles.guideDetail}>Bio: {item.bio || 'Non spécifiée'}</Text>
      <Text style={styles.guideDetail}>Langues: {item.languesParlees || 'Non spécifiées'}</Text>
      <Text style={styles.guideDetail}>Tarif par heure: {item.tarifParHeure ? `${item.tarifParHeure} MAD` : 'N/A'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Rechercher par nom, prénom ou langue..."
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredGuides.length === 0 ? (
        <Text style={styles.noGuidesText}>Aucun guide trouvé.</Text>
      ) : (
        <FlatList
          data={filteredGuides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGuideItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  loadingIndicator: {
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  noGuidesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  guideCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // pour l'ombre Android
    shadowColor: '#000', // pour l'ombre iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  guideName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  guideDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default TouristHomeScreen;*/
// ~/projects/TouristGuideExpo/src/screens/Tourist/TouristHomeScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

const TouristHomeScreen = ({ navigation }) => {
    const { logout, userRole } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.welcomeText}>Bienvenue, Touriste !</Text>
            <Text style={styles.descriptionText}>
                Découvrez des guides locaux passionnants pour enrichir votre voyage.
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SearchGuides')}
            >
                <Text style={styles.buttonText}>Rechercher des guides</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.profileButton]}
                onPress={() => navigation.navigate('TouristProfile')}
            >
                <Text style={styles.buttonText}>Mon profil</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={logout}
            >
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
    profileButton: {
        backgroundColor: '#6c757d',
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

export default TouristHomeScreen;