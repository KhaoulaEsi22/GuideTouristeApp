// ~/projects/TouristGuideExpo/src/screens/Tourist/SearchGuidesScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../api'; // Votre instance Axios
import CustomInput from '../../components/CustomInput'; // Si vous avez un composant CustomInput
import { Ionicons } from '@expo/vector-icons'; // Pour l'icône de recherche

const SearchGuideScreen = ({ navigation }) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchGuides = async () => {
    setLoading(true);
    setError(null);
    try {
      // Endpoint pour récupérer les guides
      // Adapter l'URL si votre backend gère la recherche via des paramètres de requête
      const response = await api.get(`/guides?search=${searchQuery}`); // Exemple d'appel API
      setGuides(response.data); // Assurez-vous que la réponse est un tableau de guides
    } catch (err) {
      console.error("Erreur lors de la récupération des guides:", err.response?.data || err.message);
      setError("Échec de la récupération des guides. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuides(); // Charger les guides au montage du composant
  }, []); // Exécuter une seule fois au chargement

  const handleSearch = () => {
    fetchGuides(); // Relancer la recherche avec le nouveau query
  };

  const renderGuideItem = ({ item }) => (
    <TouchableOpacity
      style={styles.guideCard}
      onPress={() => navigation.navigate('DemandDetailsScreen', { guideId: item.id, guideName: item.prenom + ' ' + item.nom })}
    >
      <Text style={styles.guideName}>{item.prenom} {item.nom}</Text>
      <Text style={styles.guideEmail}>{item.email}</Text>
      <Text style={styles.guideRating}>Note: {item.averageRating || 'N/A'}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="#4A90E2" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rechercher un Guide</Text>

      <View style={styles.searchContainer}>
        <CustomInput
          placeholder="Rechercher par nom, email, ville..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" style={styles.loading} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : guides.length === 0 ? (
        <Text style={styles.noGuidesText}>Aucun guide trouvé pour votre recherche.</Text>
      ) : (
        <FlatList
          data={guides}
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
    padding: 20,
    backgroundColor: '#E8F0F8',
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guideCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  guideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  guideEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  guideRating: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  loading: {
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
  listContent: {
    paddingBottom: 20, // Pour éviter que le dernier élément soit coupé
  }
});

export default SearchGuideScreen;