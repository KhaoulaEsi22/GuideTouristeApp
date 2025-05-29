/* import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RequestCard = ({ demande, onAccept, onRefuse, isGuideView }) => {
  // Ce composant affichera les détails d'une demande
  // et offrira des actions (accepter/refuser) si c'est la vue du guide.

  return (
    <View style={styles.card}>
      <Text style={styles.description}>{demande.description}</Text>
      <Text style={styles.info}>Date: {demande.date}</Text>
      <Text style={styles.info}>Heure: {demande.time}</Text>
      <Text style={styles.info}>Lieu: {demande.location}</Text>
      <Text style={styles.info}>Statut: {demande.status}</Text>

      {isGuideView && demande.status === 'PENDING' && (
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
            <Text style={styles.buttonText}>Accepter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.refuseButton]} onPress={onRefuse}>
            <Text style={styles.buttonText}>Refuser</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#28a745', // Vert
  },
  refuseButton: {
    backgroundColor: '#dc3545', // Rouge
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RequestCard; */
/*
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
//
import defaultAvatar from '../../assets/default_avatar.png';

const RequestCard = ({ demande, onAccept, onRefuse, onCancel, onComplete, isGuideView, currentGuideId }) => { // Ajout de currentGuideId
    const touriste = demande.touriste;
    // Utilisez les noms de propriétés de l'objet touriste comme retourné par votre API
    const touristeNomComplet = touriste ? `${touriste.prenom || ''} ${touriste.nom || ''}`.trim() : 'Touriste Inconnu';

    // Pour la photo, si votre entité Touriste ou User a un champ 'photoUrl'
    // Sinon, utilisez l'avatar par défaut que vous avez dans 'assets'
    const touristePhoto = touriste && touriste.photoUrl
                             ? { uri: touriste.photoUrl }
                             : require('../../assets/adaptive-icon.png'); // <-- CORRECTION ICI

    return (
        <View style={styles.card}>
          <View style={styles.header}>
          <Image
                    source={demande.touriste.photoUrl ? { uri: demande.touriste.photoUrl } : defaultAvatar} // <-- Cette ligne est cruciale
                    style={styles.touristPhoto}
                />   
            </View>
            <Text style={styles.description}>Description: {demande.description}</Text>
            <Text style={styles.info}>Titre: {demande.titre}</Text>
            <Text style={styles.info}>Date de la visite: {demande.dateVisite}</Text>
            <Text style={styles.info}>Heure: {demande.heureVisite}</Text>
            <Text style={styles.info}>Lieu: {demande.lieu}</Text>
            <Text style={styles.info}>Langue: {demande.langue}</Text>
            <Text style={styles.info}>Nombre de personnes: {demande.nombrePersonnes}</Text>
            <Text style={styles.info}>Exigences spéciales: {demande.exigencesSpeciales}</Text>
            <Text style={styles.infoStatus}>Statut: {demande.statut}</Text>

            {demande.guide && demande.guide.prenom && (
                <Text style={styles.info}>Guide assigné: {demande.guide.prenom} {demande.guide.nom}</Text>
            )}

            {isGuideView && demande.statut === 'EN_ATTENTE' && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
                        <Text style={styles.buttonText}>Accepter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.refuseButton]} onPress={onRefuse}>
                        <Text style={styles.buttonText}>Refuser</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* Correction de la condition pour que globalUserId soit currentGuideId passé en props }
            {isGuideView && demande.statut === 'ACCEPTEE' && demande.guide && demande.guide.id === currentGuideId && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.completeButton]} onPress={onComplete}>
                        <Text style={styles.buttonText}>Marquer comme terminée</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            )}
            {/* On n'affiche pas d'actions si la demande est REFUSEE, ANNULEE, ou TERMINEE pour le guide }
        </View
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    touristPhoto: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
      backgroundColor: '#ccc', // Fond de secours si l'image ne charge pas
  },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    description: {
        fontSize: 15,
        color: '#444',
        marginBottom: 8,
        marginTop: 5,
    },
    info: {
        fontSize: 14,
        color: '#555',
        marginBottom: 3,
    },
    infoStatus: {
        fontSize: 14,
        color: '#007bff', // Couleur distincte pour le statut
        fontWeight: 'bold',
        marginBottom: 3,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    acceptButton: {
        backgroundColor: '#28a745', // Vert
    },
    refuseButton: {
        backgroundColor: '#dc3545', // Rouge
    },
    completeButton: {
        backgroundColor: '#007bff', // Bleu
    },
    cancelButton: {
        backgroundColor: '#ffc107', // Jaune/Orange
    },
});

export default RequestCard; */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// Corrected import path
import defaultAvatar from '../assets/default_avatar.png'; // <-- Changed from '../../assets/default_avatar.png'

const RequestCard = ({ demande, onAccept, onRefuse, onCancel, onComplete, isGuideView, currentGuideId }) => {
    const touriste = demande.touriste;
    const touristeNomComplet = touriste ? `${touriste.prenom || ''} ${touriste.nom || ''}`.trim() : 'Touriste Inconnu';

    const touristePhoto = touriste && touriste.photoUrl
                             ? { uri: touriste.photoUrl }
                             : require('../assets/adaptive-icon.png'); // <-- This might also need correction if adaptive-icon.png is in the same 'assets' folder

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Image
                    source={demande.touriste.photoUrl ? { uri: demande.touriste.photoUrl } : defaultAvatar}
                    style={styles.touristPhoto}
                />
            </View>
            <Text style={styles.description}>Description: {demande.description}</Text>
            <Text style={styles.info}>Titre: {demande.titre}</Text>
            <Text style={styles.info}>Date de la visite: {demande.dateVisite}</Text>
            <Text style={styles.info}>Heure: {demande.heureVisite}</Text>
            <Text style={styles.info}>Lieu: {demande.lieu}</Text>
            <Text style={styles.info}>Langue: {demande.langue}</Text>
            <Text style={styles.info}>Nombre de personnes: {demande.nombrePersonnes}</Text>
            <Text style={styles.info}>Exigences spéciales: {demande.exigencesSpeciales}</Text>
            <Text style={styles.infoStatus}>Statut: {demande.statut}</Text>

            {demande.guide && demande.guide.prenom && (
                <Text style={styles.info}>Guide assigné: {demande.guide.prenom} {demande.guide.nom}</Text>
            )}

            {isGuideView && demande.statut === 'EN_ATTENTE' && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={onAccept}>
                        <Text style={styles.buttonText}>Accepter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.refuseButton]} onPress={onRefuse}>
                        <Text style={styles.buttonText}>Refuser</Text>
                    </TouchableOpacity>
                </View>
            )}
            {isGuideView && demande.statut === 'ACCEPTEE' && demande.guide && demande.guide.id === currentGuideId && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.completeButton]} onPress={onComplete}>
                        <Text style={styles.buttonText}>Marquer comme terminée</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    touristPhoto: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
      backgroundColor: '#ccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    description: {
        fontSize: 15,
        color: '#444',
        marginBottom: 8,
        marginTop: 5,
    },
    info: {
        fontSize: 14,
        color: '#555',
        marginBottom: 3,
    },
    infoStatus: {
        fontSize: 14,
        color: '#007bff',
        fontWeight: 'bold',
        marginBottom: 3,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    acceptButton: {
        backgroundColor: '#28a745',
    },
    refuseButton: {
        backgroundColor: '#dc3545',
    },
    completeButton: {
        backgroundColor: '#007bff',
    },
    cancelButton: {
        backgroundColor: '#ffc107',
    },
});

export default RequestCard;