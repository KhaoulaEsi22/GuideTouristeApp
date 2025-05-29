// src/components/CustomInput.js
// Fichier: TouristGuideApp/src/components/CustomInput.js
/*qdim
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const CustomInput = ({ style, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#888"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default CustomInput;*/
// src/components/CustomInput.js
import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const CustomInput = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, multiline, numberOfLines }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  multilineInput: {
    minHeight: 100, // Ajuster selon les besoins
    textAlignVertical: 'top', // Pour Android
  },
});

export default CustomInput;