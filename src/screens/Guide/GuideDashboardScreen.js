// screens/GuideDashboardScreen.js
/*
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; // Assurez-vous d'avoir un contexte d'authentification
import { API_BASE_URL } from '../../api'; // Fichier de configuration pour l'URL de l'API
import RequestCard from '../../components/RequestCard'; // Un composant pour afficher une demande

const GuideDashboardScreen = ({ navigation }) => {
    const { userToken, userId, logout } = useContext(AuthContext); // Récupère le token et l'ID de l'utilisateur connecté
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDemandes = useCallback(async () => {
        if (!userToken || !userId) {
            setError("Authentification requise.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Récupère les demandes spécifiques à ce guide
            const response = await axios.get(`${API_BASE_URL}/api/demandes/guide/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            setDemandes(response.data);
        } catch (err) {
            console.error("Erreur lors de la récupération des demandes du guide:", err.response ? err.response.data : err.message);
            setError("Impossible de charger les demandes. Veuillez réessayer.");
            if (err.response && err.response.status === 401) {
                Alert.alert("Session expirée", "Votre session a expiré. Veuillez vous reconnecter.", [{ text: "OK", onPress: logout }]);
            }
        } finally {
            setLoading(false);
        }
    }, [userToken, userId, logout]);

    useEffect(() => {
        fetchDemandes();
    }, [fetchDemandes]);

    // Fonctions pour gérer l'acceptation/refus/annulation des demandes
    const handleAction = async (demandeId, actionType) => {
        try {
            await axios.put(`${API_BASE_URL}/api/demandes/${demandeId}/${actionType}?guideId=${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            Alert.alert("Succès", `Demande ${actionType === 'accepter' ? 'acceptée' : 'refusée'} avec succès.`);
            fetchDemandes(); // Rafraîchit la liste des demandes
        } catch (err) {
            console.error(`Erreur lors de l'action ${actionType}:`, err.response ? err.response.data : err.message);
            Alert.alert("Erreur", `Impossible de ${actionType} la demande. ${err.response?.data?.message || err.message}`);
        }
    };

    const renderDemandeItem = ({ item }) => (
        <RequestCard
            demande={item}
            onAccept={() => handleAction(item.id, 'accepter')}
            onRefuse={() => handleAction(item.id, 'refuser')}
            // Ajoutez d'autres actions si nécessaire (ex: terminer)
            isGuideView={true} // Indique que c'est la vue du guide pour afficher les bons boutons
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
/*
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

    // Fonctions pour gérer l'acceptation/refus/annulation des demandes
    const handleAction = async (demandeId, actionType) => {
        try {
            console.log(`GuideDashboardScreen - handleAction: Sending ${actionType} action for demande ID: ${demandeId}`);
            await axios.put(`${API_BASE_URL}/api/demandes/${demandeId}/${actionType}?guideId=${userId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            });
            Alert.alert("Succès", `Demande ${actionType === 'accepter' ? 'acceptée' : 'refusée'} avec succès.`);
            fetchDemandes(); // Rafraîchit la liste des demandes
        } catch (err) {
            console.error(`GuideDashboardScreen - Erreur lors de l'action ${actionType}:`, err.response ? err.response.data : err.message);
            Alert.alert("Erreur", `Impossible de ${actionType} la demande. ${err.response?.data?.message || err.message}`);
        }
    }; 
    

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
/*import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { API_BASE_URL } from '../../api';
//import api from '../../api';  // Assurez-vous que c'est bien l'export de API_BASE_URL et non l'instance 'api'
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

export default GuideDashboardScreen; */
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
            onCancel={() => handleAction(item.id, 'annuler')} // Ajout de l'annulation
            onComplete={() => handleAction(item.id, 'terminer')} // Ajout de la complétion
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

export default GuideDashboardScreen;