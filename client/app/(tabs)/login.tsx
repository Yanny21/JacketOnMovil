// login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const [user_email, setUserEmail] = useState('');
  const [user_password, setUserPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.13.14.68:3000/login', {
        user_email: user_email,
        user_password: user_password,
      });
      Alert.alert('Inicio de sesión exitoso', response.data.message);
      // Aquí podrías redirigir a la siguiente pantalla si fuera necesario
    } catch (error) {
      Alert.alert('Error', error.response.data.message || 'Error al intentar iniciar sesión');
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
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#A9A9A9"
              value={user_email}
              onChangeText={text => setUserEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A9A9A9"
              secureTextEntry
              value={user_password}
              onChangeText={text => setUserPassword(text)}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <Text style={styles.newUserText}>
              Nuevo usuario?{' '}
              <Text style={styles.createAccountText} onPress={() => navigation.navigate('SignUp')}>
                Crear una cuenta
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#333557',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 10,
    backgroundColor: '#2F2F2F',
    borderRadius: 45,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#24224B',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  newUserText: {
    color: '#A9A9A9',
    marginBottom: 30,
  },
  createAccountText: {
    color: '#27A4F2',
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    backgroundColor: '#2F2F2F',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#24224B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
