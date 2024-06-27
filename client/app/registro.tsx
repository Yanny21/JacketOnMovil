import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons'; // No se necesita FontAwesome5 según los estilos proporcionados
import { styles } from './styles'; // Importar los estilos definidos
import { useRouter } from 'expo-router'; // Importar useRouter desde expo-router
import Login from './login';

export default function SignUpScreen() {
  const router = useRouter(); // Obtener router usando useRouter hook
  const [user_email, setUserEmail] = useState('');
  const [user_password, setUserPassword] = useState('');
  const [user_name, setUserName] = useState('');
  const [user_last_name, setUserLastName] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://10.13.0.68:3000/signup', {
        user_email: user_email,
        user_password: user_password,
        user_name: user_name,
        user_last_name: user_last_name,
      });
      Alert.alert('Registro exitoso', response.data.message);
      // Redirigir a la siguiente pantalla después del registro exitoso si es necesario
    } catch (error) {
      Alert.alert('Error', error.response.data.message || 'Error al intentar registrarse');
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
              <FontAwesome name="times" size={22} color="#F2E527" />
            </TouchableOpacity>
            <Text style={styles.title}>Registro</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre/s"
                placeholderTextColor="#A9A9A9"
                value={user_name}
                onChangeText={text => setUserName(text)}
              />
              <FontAwesome name="user" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Apellido/s"
                placeholderTextColor="#A9A9A9"
                value={user_last_name}
                onChangeText={text => setUserLastName(text)}
              />
              <FontAwesome name="user" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="#A9A9A9"
                value={user_email}
                onChangeText={text => setUserEmail(text)}
              />
              <FontAwesome name="envelope" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#A9A9A9"
                secureTextEntry
                value={user_password}
                onChangeText={text => setUserPassword(text)}
              />
              <FontAwesome name="lock" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <TouchableOpacity style={styles.Button} onPress={handleSignup}>
              <Text style={styles.ButtonText}>Registrarme</Text>
            </TouchableOpacity>

            <Text style={[styles.newUserText, { color: '#FFFFFF' }]}>
              ¿Ya tienes una cuenta? {' '}
              <Text style={styles.createAccountText} onPress={() => router.push('/login')}>
                ¡Inicia sesión Aquí!
              </Text>
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}