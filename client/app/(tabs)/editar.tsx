import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';

export default function EditScreen({ navigation }) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleIconPress = () => {
    console.log('Icono presionado');
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={handleIconPress}>
              <FontAwesome name="times" size={22} color="#F2E527" />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Información</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#A9A9A9"
              />
              <FontAwesome name="user" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Apellidos"
                placeholderTextColor="#A9A9A9"
              />
              <FontAwesome name="user" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
              />
              <FontAwesome name="envelope" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
              />
              <FontAwesome name="lock" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <TouchableOpacity style={styles.Button}>
              <Text style={styles.ButtonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
