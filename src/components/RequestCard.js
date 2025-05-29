import React from 'react';
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

export default RequestCard;