// screens/GuideDashboardScreen.js
/*
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Assurez-vous d'avoir axios installé (npm install axios)
import { AuthContext } from '../../context/AuthContext';
// IMPORT CRUCIAL : Assurez-vous que le chemin et l'export sont corrects.
// Si votre fichier API est src/api/index.js et exporte 'API_BASE_URL'
import { API_BASE_URL } from '../../api/index'; // <-- Vérifiez ce chemin !

import RequestCard from '../../components/RequestCard'; // Assurez-vous que le chemin est correct

const GuideDashboardScreen = ({ navigation }) => {
    const { userToken, userId, logout } = useContext(AuthContext);
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDemandes = useCallback(async () => {
        if (!userToken || !userId) {
            setError("Authentification requise ou données utilisateur manquantes. Veuillez vous reconnecter.");
            setLoading(false);
            console.warn("GuideDashboardScreen - fetchDemandes: userToken or userId is missing.", { userToken: userToken ? 'PRESENT' : 'ABSENT', userId });
            // Rediriger vers l'écran de login si les données sont manquantes
            if (!userToken) {
                Alert.alert("Session expirée", "Votre session est invalide. Veuillez vous reconnecter.", [{ text: "OK", onPress: logout }]);
            }
            return;
        }

        setLoading(true);
        setError(null); // Réinitialise l'erreur à chaque tentative
        try {
            // L'URL construite doit correspondre à votre contrôleur Spring Boot : /api/demandes/guide/{guideId}
            const apiUrl = `${API_BASE_URL}/api/demandes/guide/${userId}`;
            console.log(`GuideDashboardScreen - fetchDemandes: Attempting to fetch demands for user ID: ${userId}`);
            console.log(`GuideDashboardScreen - fetchDemandes: Calling API URL: ${apiUrl}`);
            
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
                timeout: 10000, // Timeout de 10 secondes pour cette requête
            });
            setDemandes(response.data);
            console.log('GuideDashboardScreen - fetchDemandes: Demands fetched successfully:', response.data.length, 'items');
        } catch (err) {
            console.error("GuideDashboardScreen - Erreur lors de la récupération des demandes du guide:", 
                err.response ? `Status: ${err.response.status}, Data: ${JSON.stringify(err.response.data)}` : err.message
            );
            
            setError("Impossible de charger les demandes. Veuillez réessayer.");
            
            // Gestion spécifique des erreurs
            if (err.response) {
                if (err.response.status === 401) {
                    Alert.alert("Session expirée", "Votre session a expiré. Veuillez vous reconnecter.", [{ text: "OK", onPress: logout }]);
                } else if (err.response.status === 404) {
                    // Si l'URL n'est pas trouvée côté Spring Boot
                    Alert.alert("Erreur Serveur (404)", `Endpoint non trouvé: ${err.response.config.url}. Veuillez vérifier le chemin API.`);
                } else if (err.response.status >= 500) {
                    // Erreurs serveur génériques
                    Alert.alert("Erreur Serveur", `Une erreur interne du serveur s'est produite (${err.response.status}).`);
                } else {
                    // Autres erreurs HTTP (ex: 400 Bad Request, 403 Forbidden)
                    Alert.alert("Erreur API", `Une erreur s'est produite lors de la récupération des demandes: ${err.response.data?.message || err.message}`);
                }
            } else if (axios.isAxiosError(err) && !err.response) {
                // Network Error, Timeout, ou autre problème sans réponse du serveur
                Alert.alert("Erreur Réseau", "Impossible de se connecter au serveur. Vérifiez votre connexion internet ou l'adresse IP du backend.");
            } else {
                // Erreur inattendue
                Alert.alert("Erreur", "Une erreur inattendue s'est produite.");
            }
        } finally {
            setLoading(false);
            console.log('GuideDashboardScreen - fetchDemandes: Finished loading.');
        }
    }, [userToken, userId, logout]); // Dépendances du useCallback

    useEffect(() => {
        // Appeler fetchDemandes au montage du composant
        fetchDemandes();
    }, [fetchDemandes]); // fetchDemandes est une dépendance stable grâce à useCallback

    // Fonctions pour gérer l'acceptation/refus/annulation des demandes
    const handleAction = useCallback(async (demandeId, actionType) => {
        if (!userToken || !userId) {
            Alert.alert("Erreur", "Données d'authentification manquantes.");
            return;
        }

        try {
            console.log(`GuideDashboardScreen - handleAction: Sending ${actionType} action for demande ID: ${demandeId}`);
            const actionUrl = actionType === 'accepter' ? 
                              `${API_BASE_URL}/api/demandes/${demandeId}/accepter?guideId=${userId}` :
                              `${API_BASE_URL}/api/demandes/${demandeId}/${actionType}`; // pour refuser, annuler, terminer
            
            console.log(`GuideDashboardScreen - handleAction: Calling API URL for action: ${actionUrl}`);

            await axios.put(actionUrl, {}, { // Le corps de la requête est vide pour ces actions PUT
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            Alert.alert("Succès", `Demande ${actionType === 'accepter' ? 'acceptée' : actionType === 'refuser' ? 'refusée' : actionType === 'annuler' ? 'annulée' : 'mise à jour'} avec succès.`);
            fetchDemandes(); // Rafraîchit la liste des demandes après l'action
        } catch (err) {
            console.error(`GuideDashboardScreen - Erreur lors de l'action ${actionType}:`, 
                err.response ? `Status: ${err.response.status}, Data: ${JSON.stringify(err.response.data)}` : err.message
            );
            Alert.alert("Erreur", `Impossible de ${actionType} la demande. ${err.response?.data?.message || err.message || "Veuillez réessayer."}`);
        }
    }, [userToken, userId, fetchDemandes]); // Dépendances du useCallback

   
    const renderDemandeItem = ({ item }) => (
        <RequestCard
            demande={item}
            onAccept={() => handleAction(item.id, 'accepter')}
            onRefuse={() => handleAction(item.id, 'refuser')}
            onCancel={() => handleAction(item.id, 'annuler')}
            onComplete={() => handleAction(item.id, 'terminer')}
            isGuideView={true}
            currentGuideId={userId} // <-- AJOUTEZ CETTE PROPRIÉTÉ
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
                <TouchableOpacity style={styles.retryButton} onPress={fetchDemandes}>
                    <Text style={styles.retryButtonText}>Réessayer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tableau de Bord du Guide</Text>
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('ProfileSettings')}>
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
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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

export default GuideDashboardScreen; */
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { API_BASE_URL } from '../../api/index'; // Assurez-vous que le chemin est correct et que l'export est 'API_BASE_URL'

import RequestCard from '../../components/RequestCard'; // Assurez-vous que le chemin est correct

const GuideDashboardScreen = ({ navigation }) => {
    const { userToken, userId, logout } = useContext(AuthContext);
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    //zdt
    const [refreshing, setRefreshing] = useState(false);

/*
    const fetchDemandes = useCallback(async () => {
        if (!userToken || !userId) {
            setError("Authentification requise ou données utilisateur manquantes. Veuillez vous reconnecter.");
            setLoading(false);
            console.warn("GuideDashboardScreen - fetchDemandes: userToken or userId is missing.", { userToken: userToken ? 'PRESENT' : 'ABSENT', userId });
            if (!userToken) {
                Alert.alert("Session expirée", "Votre session est invalide. Veuillez vous reconnecter.", [{ text: "OK", onPress: logout }]);
            }
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const apiUrl = `${API_BASE_URL}/api/demandes/guide/${userId}`;
            console.log(`GuideDashboardScreen - fetchDemandes: Attempting to fetch demands for user ID: ${userId}`);
            console.log(`GuideDashboardScreen - fetchDemandes: Calling API URL: ${apiUrl}`);
            
            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                },
                timeout: 10000,
            });
            setDemandes(response.data);
            console.log('GuideDashboardScreen - fetchDemandes: Demands fetched successfully:', response.data.length, 'items');
        } catch (err) {
            console.error("GuideDashboardScreen - Erreur lors de la récupération des demandes du guide:", 
                err.response ? `Status: ${err.response.status}, Data: ${JSON.stringify(err.response.data)}` : err.message
            );
            
            setError("Impossible de charger les demandes. Veuillez réessayer.");
            
            if (err.response) {
                if (err.response.status === 401) {
                    Alert.alert("Session expirée", "Votre session a expiré. Veuillez vous reconnecter.", [{ text: "OK", onPress: logout }]);
                } else if (err.response.status === 404) {
                    Alert.alert("Erreur Serveur (404)", `Endpoint non trouvé: ${err.response.config.url}. Veuillez vérifier le chemin API.`);
                } else if (err.response.status >= 500) {
                    Alert.alert("Erreur Serveur", `Une erreur interne du serveur s'est produite (${err.response.status}).`);
                } else {
                    Alert.alert("Erreur API", `Une erreur s'est produite lors de la récupération des demandes: ${err.response.data?.message || err.message}`);
                }
            } else if (axios.isAxiosError(err) && !err.response) {
                Alert.alert("Erreur Réseau", "Impossible de se connecter au serveur. Vérifiez votre connexion internet ou l'adresse IP du backend.");
            } else {
                Alert.alert("Erreur", "Une erreur inattendue s'est produite.");
            }
        } finally {
            setLoading(false);
            console.log('GuideDashboardScreen - fetchDemandes: Finished loading.');
        }
    }, [userToken, userId, logout]);

    useEffect(() => {
        fetchDemandes();
    }, [fetchDemandes]);

    const handleAction = useCallback(async (demandeId, actionType) => {
        if (!userToken || !userId) {
            Alert.alert("Erreur", "Données d'authentification manquantes.");
            return;
        }

        try {
            console.log(`GuideDashboardScreen - handleAction: Sending ${actionType} action for demande ID: ${demandeId}`);
            const actionUrl = actionType === 'accepter' ? 
                                    `${API_BASE_URL}/api/demandes/${demandeId}/accepter?guideId=${userId}` :
                                    `${API_BASE_URL}/api/demandes/${demandeId}/${actionType}`;
            
            console.log(`GuideDashboardScreen - handleAction: Calling API URL for action: ${actionUrl}`);

            await axios.put(actionUrl, {}, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            Alert.alert("Succès", `Demande ${actionType === 'accepter' ? 'acceptée' : actionType === 'refuser' ? 'refusée' : actionType === 'annuler' ? 'annulée' : 'mise à jour'} avec succès.`);
            fetchDemandes();
        } catch (err) {
            console.error(`GuideDashboardScreen - Erreur lors de l'action ${actionType}:`, 
                err.response ? `Status: ${err.response.status}, Data: ${JSON.stringify(err.response.data)}` : err.message
            );
            Alert.alert("Erreur", `Impossible de ${actionType} la demande. ${err.response?.data?.message || err.message || "Veuillez réessayer."}`);
        }
    }, [userToken, userId, fetchDemandes]);

    const renderDemandeItem = ({ item }) => (
        <RequestCard
            demande={item}
            onAccept={() => handleAction(item.id, 'accepter')}
            onRefuse={() => handleAction(item.id, 'refuser')}
            onCancel={() => handleAction(item.id, 'annuler')}
            onComplete={() => handleAction(item.id, 'terminer')}
            isGuideView={true}
            currentGuideId={userId} // Cette ligne est la clé pour le filtrage des actions dans RequestCard
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
                <TouchableOpacity style={styles.retryButton} onPress={fetchDemandes}>
                    <Text style={styles.retryButtonText}>Réessayer</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tableau de Bord du Guide</Text>
            <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('ProfileSettings')}>
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
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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

export default GuideDashboardScreen;*/
const fetchDemandes = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
        // Assurez-vous que votre backend a un endpoint pour récupérer les demandes d'un guide spécifique
        // et qu'il inclut les informations du touriste et du guide assigné.
        // L'ID du guide est maintenant récupéré du contexte d'authentification.
        const response = await api.get(`/demands/guide/${userId}`);
        // Adaptez si la structure de la réponse est différente
        setDemandes(response.data);
    } catch (err) {
        console.error('Erreur lors de la récupération des demandes:', err.response?.data || err.message);
        setError('Échec du chargement des demandes. Veuillez réessayer.');
    } finally {
        setLoading(false);
        setRefreshing(false);
    }
}, [userId]); // La dépendance est userId pour recharger si l'ID du guide change

useEffect(() => {
    if (userId) { // S'assurer que userId est disponible avant de fetch
        fetchDemandes();
    }
}, [userId, fetchDemandes]); // Recharger si userId change ou si fetchDemandes est mise à jour

const handleAction = async (demandId, actionType) => {
    Alert.alert(
        `Confirmer ${actionType}`,
        `Voulez-vous vraiment ${actionType.toLowerCase()} cette demande ?`,
        [
            { text: 'Annuler', style: 'cancel' },
            {
                text: 'Confirmer',
                onPress: async () => {
                    try {
                        setLoading(true); // Active un indicateur global pendant l'action
                        let endpoint;
                        let data = { guideId: userId }; // Par défaut, inclure guideId

                        if (actionType === 'Accepter') {
                            endpoint = `/demands/${demandId}/accept`;
                        } else if (actionType === 'Refuser') {
                            endpoint = `/demands/${demandId}/refuse`;
                        } else if (actionType === 'Marquer comme terminée') {
                            endpoint = `/demands/${demandId}/complete`;
                        } else if (actionType === 'Annuler') {
                            endpoint = `/demands/${demandId}/cancel`;
                        }

                        const response = await api.put(endpoint, data); // Utilisez PUT pour les mises à jour

                        if (response.data.success) { // Ajustez selon la réponse de votre backend
                            Alert.alert('Succès', `Demande ${actionType.toLowerCase()} avec succès !`);
                            fetchDemandes(); // Recharger les demandes après l'action
                        } else {
                            Alert.alert('Erreur', response.data.message || `Échec de l'action ${actionType}.`);
                        }
                    } catch (error) {
                        console.error(`Erreur lors de l'action ${actionType}:`, error.response?.data || error.message);
                        Alert.alert(
                            'Erreur',
                            error.response?.data?.message || `Une erreur est survenue lors de l'action ${actionType}.`
                        );
                    } finally {
                        setLoading(false); // Désactive l'indicateur
                    }
                },
            },
        ]
    );
};

const renderItem = ({ item }) => (
    <RequestCard
        demande={item}
        onAccept={() => handleAction(item.id, 'Accepter')}
        onRefuse={() => handleAction(item.id, 'Refuser')}
        onComplete={() => handleAction(item.id, 'Marquer comme terminée')}
        onCancel={() => handleAction(item.id, 'Annuler')}
        currentGuideId={userId} // Passer l'ID du guide actuel à la carte
        isGuideView={true} // Indiquer que c'est la vue du guide
    />
);

return (
    <View style={styles.container}>
        <Text style={styles.headerTitle}>Tableau de Bord du Guide</Text>
        <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('ProfileSettings')}
        >
            <Text style={styles.profileButtonText}>Gérer mon profil</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Mes Demandes de Service</Text>

        {loading && !refreshing ? ( // Afficher l'indicateur de chargement initial
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text>Chargement des demandes...</Text>
            </View>
        ) : error ? (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchDemandes}>
                    <Text style={styles.retryButtonText}>Réessayer</Text>
                </TouchableOpacity>
            </View>
        ) : demandes.length === 0 ? (
            <View style={styles.centered}>
                <Text style={styles.noDemandsText}>Aucune demande de service pour le moment.</Text>
            </View>
        ) : (
            <FlatList
                data={demandes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchDemandes} />
                }
            />
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Déconnexion</Text>
        </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#E8F0F8', // Arrière-plan bleu clair
    padding: 20,
    paddingTop: 60, // Pour laisser de la place à la barre de statut
},
headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
},
profileButton: {
    backgroundColor: '#5cb85c', // Vert
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
},
profileButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
},
sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
},
centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: 20,
    borderRadius: 5,
},
retryButtonText: {
    color: '#fff',
    fontSize: 16,
},
noDemandsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
},
listContent: {
    paddingBottom: 20,
},
logoutButton: {
    backgroundColor: '#dc3545', // Rouge
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    position: 'absolute', // Pour le positionner en bas
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
},
logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
},
});

export default GuideDashboardScreen;