// ~/projects/TouristGuideExpo/src/screens/Tourist/DemandDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import CustomInput from '../../components/CustomInput';
import api from '../../api'; // Votre instance Axios
import AsyncStorage from '@react-native-async-storage/async-storage';

const DemandDetailsScreen = ({ route, navigation }) => {
  const { guideId, guideName } = route.params; // Récupère l'ID et le nom du guide depuis la navigation

  const [serviceDescription, setServiceDescription] = useState('');
  const [date, setDate] = useState(''); // Vous pouvez utiliser un DatePicker pour une meilleure UX
  const [time, setTime] = useState(''); // Vous pouvez utiliser un TimePicker
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitDemand = async () => {
    if (!serviceDescription || !date || !time || !location) {
      Alert.alert('Champs manquants', 'Veuillez remplir tous les champs pour la demande.');
      return;
    }

    setLoading(true);
    try {
      // Récupérer l'ID du touriste connecté (utilisateur courant)
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        Alert.alert('Erreur', 'Impossible de récupérer les informations de l\'utilisateur.');
        setLoading(false);
        return;
      }
      const userData = JSON.parse(userDataString);
      const touristId = userData.id; // Assurez-vous que votre objet utilisateur contient bien un champ 'id'

      const demandData = {
        touristId: touristId,
        guideId: guideId,
        description: serviceDescription,
        date: date, // Format "YYYY-MM-DD" idéalement pour le backend
        time: time, // Format "HH:MM" idéalement
        location: location,
        status: 'PENDING' // Statut initial de la demande
      };

      const response = await api.post('/demands', demandData); // Endpoint pour créer une demande

      if (response.data.success) { // Assurez-vous que votre backend renvoie un champ 'success'
        Alert.alert('Succès', 'Votre demande a été envoyée au guide !');
        navigation.goBack(); // Revenir à la liste des guides ou à un autre écran
      } else {
        Alert.alert('Erreur', response.data.message || 'Échec de l\'envoi de la demande.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la demande :', error.response?.data || error.message);
      Alert.alert(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue lors de l\'envoi de la demande. Veuillez vérifier vos informations.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Demander un service à {guideName}</Text>

        <CustomInput
          placeholder="Description du service"
          value={serviceDescription}
          onChangeText={setServiceDescription}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />
        <CustomInput
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
          keyboardType="numeric" // Ou 'default' avec un DatePicker
        />
        <CustomInput
          placeholder="Heure (HH:MM)"
          value={time}
          onChangeText={setTime}
          keyboardType="numeric" // Ou 'default' avec un TimePicker
        />
        <CustomInput
          placeholder="Lieu de rendez-vous"
          value={location}
          onChangeText={setLocation}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" style={styles.buttonSpacing} />
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitDemand}>
            <Text style={styles.submitButtonText}>Envoyer la Demande</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F8',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    paddingTop: 60,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  textArea: {
    height: 100, // Plus grand pour la description
    textAlignVertical: 'top', // Pour que le texte commence en haut
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#28a745', // Couleur verte pour envoyer
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSpacing: {
    marginTop: 20,
  }
});

export default DemandDetailsScreen;