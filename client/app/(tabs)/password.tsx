import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function ChangePScreen() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

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
    router.back(); // Regresar a la pantalla anterior
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { user_id } = JSON.parse(userData);

        const response = await fetch('http://192.168.3.15:3000/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id, new_password: newPassword }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert('Éxito', 'Contraseña cambiada exitosamente');
          router.back(); // Regresar a la pantalla anterior
        } else {
          Alert.alert('Error', data.message || 'Error al cambiar la contraseña');
        }
      } else {
        Alert.alert('Error', 'No se encontró la información del usuario');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Error al cambiar la contraseña');
    }
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
            <Text style={styles.title}>Cambiar contraseña</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <FontAwesome name="lock" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <FontAwesome name="lock" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <TouchableOpacity style={styles.Button} onPress={handleChangePassword}>
              <Text style={styles.ButtonText}>Guardar contraseña</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
