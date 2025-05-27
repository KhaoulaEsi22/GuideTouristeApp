// src/components/CustomInput.js
// Fichier: TouristGuideApp/src/components/CustomInput.js

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

export default CustomInput;