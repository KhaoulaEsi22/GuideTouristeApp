// src/screens/GuideRequestScreen.js
/*import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import CustomInput from '../components/CustomInput';
import { AuthContext } from '../context/AuthContext'; // Supposons que vous ayez AuthContext pour touristId

const API_BASE_URL = 'http://192.168.0.103:8085/api'; 

const GuideRequestScreen = ({ route, navigation }) => {
  const { guideId, guideName } = route.params;
  const { user } = useContext(AuthContext); // Supposons que l'objet user contient touristId
  const touristId = user?.id; // Obtenir l'ID du touriste connecté

  const [guideDetails, setGuideDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Champs de formulaire pour la demande
  const [date, setDate] = useState(''); // ex: AAAA-MM-JJ
  const [time, setTime] = useState(''); // ex: HH:MM
  const [duration, setDuration] = useState(''); // en heures
  const [numPeople, setNumPeople] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchGuideDetails();
  }, []);

  const fetchGuideDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/guides/${guideId}`); // Supposons que vous pourriez ajouter un point d'accès GET /api/guides/{id}
      setGuideDetails(response.data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors de la récupération des détails du guide :', err);
      setError('Erreur lors du chargement des détails du guide.');
      Alert.alert('Erreur', 'Impossible de charger les détails du guide. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendRequest = async () => {
    if (!date || !time || !duration || !numPeople || !message) {
      Alert.alert('Champs manquants', 'Veuillez remplir tous les champs de la demande.');
      return;
    }

    if (!touristId) {
      Alert.alert('Erreur d\'authentification', 'Impossible de déterminer votre ID de touriste. Veuillez vous reconnecter.');
      return;
    }

    // Vous voudrez peut-être ajouter une validation plus robuste de la date/heure
    const demandeData = {
      guideId: guideId,
      touristeId: touristId, // L'ID du touriste connecté
      dateDemande: `${date}T${time}:00`, // Combiner la date et l'heure pour le backend (ajuster le format si nécessaire)
      duree: parseFloat(duration),
      nombrePersonnes: parseInt(numPeople),
      message: message,
      statut: 'EN_ATTENTE', // Statut initial
      // Ajoutez d'autres champs selon votre entité/DTO Demande
    };

    try {
      // Point d'accès pour créer une demande.
      // Basé sur le backend donné, vous devrez peut-être ajouter un DemandeController spécifique
      // ou un point d'accès à TouristeController pour cela.
      // Supposons un POST /api/demandes ou POST /api/touristes/{touristeId}/demandes
      const response = await axios.post(`${API_BASE_URL}/demandes`, demandeData); // Ajuster le point d'accès si différent

      Alert.alert('Demande envoyée', 'Votre demande a été envoyée avec succès au guide !');
      navigation.goBack(); // Retourner à la liste des guides
    } catch (err) {
      console.error('Erreur lors de l\'envoi de la demande :', err.response?.data || err.message);
      Alert.alert('Erreur', 'Impossible d\'envoyer la demande. Veuillez réessayer plus tard.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Détails du Guide: {guideName}</Text>

      {guideDetails ? (
        <View style={styles.detailsCard}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{guideDetails.email}</Text>

          <Text style={styles.detailLabel}>Téléphone:</Text>
          <Text style={styles.detailValue}>{guideDetails.telephone}</Text>

          <Text style={styles.detailLabel}>Bio:</Text>
          <Text style={styles.detailValue}>{guideDetails.bio || 'Non spécifiée'}</Text>

          <Text style={styles.detailLabel}>Langues parlées:</Text>
          <Text style={styles.detailValue}>{guideDetails.languesParlees || 'Non spécifiées'}</Text>

          <Text style={styles.detailLabel}>Tarif par heure:</Text>
          <Text style={styles.detailValue}>{guideDetails.tarifParHeure ? `${guideDetails.tarifParHeure} MAD` : 'N/A'}</Text>
        </View>
      ) : (
        <Text style={styles.noDetailsText}>Aucun détail de guide disponible.</Text>
      )}

      <Text style={styles.formTitle}>Faire une Demande</Text>
      <CustomInput
        placeholder="Date (AAAA-MM-JJ)"
        value={date}
        onChangeText={setDate}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Heure (HH:MM)"
        value={time}
        onChangeText={setTime}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Durée (en heures)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Nombre de personnes"
        value={numPeople}
        onChangeText={setNumPeople}
        keyboardType="numeric"
      />
      <CustomInput
        placeholder="Votre message au guide"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleSendRequest}>
        <Text style={styles.sendButtonText}>Envoyer la Demande</Text>
      </TouchableOpacity>
    </ScrollView>
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  detailsCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  noDetailsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007bff', // Couleur bleue
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30, // Laisser un peu d'espace en bas
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GuideRequestScreen;*/
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { API_BASE_URL } from '../../api'; // Assurez-vous que c'est bien l'export de API_BASE_URL et non l'instance 'api'
import RequestCard from '../../components/RequestCard';

const GuideDashboardScreen = ({ navigation }) => {
    const { userToken, userId, logout } = useContext(AuthContext);
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDemandes = useCallback(async () => {
        if (!userToken || !userId) {
            setError("Authentification requise ou données utilisateur manquantes.");
            setLoading(false);
            console.warn("GuideDashboardScreen - fetchDemandes: userToken or userId is missing.", { userToken: userToken ? 'PRESENT' : 'ABSENT', userId });
            return;
        }

        setLoading(true);
        setError(null);
        try {
            console.log(`GuideDashboardScreen - fetchDemandes: Attempting to fetch demands for user ID: ${userId}`);
            console.log(`GuideDashboardScreen - fetchDemandes: Calling API URL: ${API_BASE_URL}/api/demandes/guide/${userId}`);
            
            const response = await axios.get(`${API_BASE_URL}/api/demandes/guide/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            setDemandes(response.data);
            console.log('GuideDashboardScreen - fetchDemandes: Demands fetched successfully:', response.data.length, 'items');
        } catch (err) {
            console.error("GuideDashboardScreen - Erreur lors de la récupération des demandes du guide:", 
                err.response ? JSON.stringify(err.response.data, null, 2) : err.message, 
                err.response ? `(Status: ${err.response.status})` : ''
            );
            
            setError("Impossible de charger les demandes. Veuillez réessayer.");
            
            if (err.response && err.response.status === 401) {
                Alert.alert("Session expirée", "Votre session a expiré. Veuillez vous reconnecter.", [{ text: "OK", onPress: logout }]);
            } else if (err.code === 'ECONNABORTED') {
                Alert.alert("Erreur réseau", "La connexion au serveur a échoué ou a pris trop de temps. Vérifiez votre connexion internet.");
            } else if (axios.isAxiosError(err) && !err.response) {
                Alert.alert("Erreur réseau", "Impossible de se connecter au serveur. Vérifiez l'adresse IP du backend et votre connexion.");
            } else {
                // Pour toute autre erreur du serveur
                Alert.alert("Erreur de l'API", `Une erreur s'est produite: ${err.response?.data?.message || err.message}`);
            }
        } finally {
            setLoading(false);
            console.log('GuideDashboardScreen - fetchDemandes: Finished loading.');
        }
    }, [userToken, userId, logout]);

    useEffect(() => {
        fetchDemandes();
    }, [fetchDemandes]);

    const handleAction = async (demandeId, actionType) => {
        const actionText = actionType === 'accepter' ? 'accepter' : 'refuser';
        const confirmationMessage = `Êtes-vous sûr de vouloir ${actionText} cette demande ?`;

        Alert.alert(
            "Confirmation de l'action",
            confirmationMessage,
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: async () => {
                        try {
                            console.log(`GuideDashboardScreen - handleAction: Sending ${actionType} action for demande ID: ${demandeId}`);
                            // Optionnel: Ici, vous pourriez ajouter un indicateur de chargement temporaire spécifique à la carte ou désactiver les boutons de la carte
                            await axios.put(`${API_BASE_URL}/api/demandes/${demandeId}/${actionType}?guideId=${userId}`, {}, {
                                headers: {
                                    'Authorization': `Bearer ${userToken}`
                                }
                            });
                            Alert.alert("Succès", `Demande ${actionText} avec succès.`);
                            fetchDemandes(); // Rafraîchit la liste des demandes
                        } catch (err) {
                            console.error(`GuideDashboardScreen - Erreur lors de l'action ${actionType}:`, err.response ? err.response.data : err.message);
                            const errorMessage = err.response?.data?.message || `Vérifiez l'état de la demande ou votre connexion.`;
                            Alert.alert("Erreur", `Impossible de ${actionText} la demande. ${errorMessage}`);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    }

    const renderDemandeItem = ({ item }) => (
        <RequestCard
            demande={item}
            onAccept={() => handleAction(item.id, 'accepter')}
            onRefuse={() => handleAction(item.id, 'refuser')}
            isGuideView={true}
        />
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Chargement des demandes...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                    style={styles.retryButton} 
                    onPress={fetchDemandes}
                    accessibilityLabel="Réessayer de charger les demandes" // AJOUTÉ
                >
                    <Text style={styles.retryButtonText}>Réessayer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tableau de Bord du Guide</Text>
            <TouchableOpacity 
                style={styles.profileButton} 
                onPress={() => navigation.navigate('ProfileSettings')}
                accessibilityLabel="Gérer mon profil" // AJOUTÉ
            >
                <Text style={styles.profileButtonText}>Gérer mon profil</Text>
            </TouchableOpacity>
            <Text style={styles.subHeader}>Mes Demandes de Service</Text>
            {demandes.length === 0 ? (
                <Text style={styles.noDemandesText}>Aucune demande de service pour le moment.</Text>
            ) : (
                <FlatList
                    data={demandes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderDemandeItem}
                    contentContainerStyle={styles.listContent}
                />
            )}
            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={logout}
                accessibilityLabel="Se déconnecter de l'application" // AJOUTÉ
            >
                <Text style={styles.logoutButtonText}>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    retryButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    profileButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    profileButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10,
        color: '#555',
    },
    noDemandesText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#777',
        marginTop: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GuideDashboardScreen;