import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; // Importa FontAwesome5
import { styles } from './styles';

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
              <FontAwesome name="times" size={22} color="#F2E527" />
            </TouchableOpacity>
            <Text style={styles.title}>Iniciar sesión</Text>
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
            <TouchableOpacity style={styles.Button} onPress={handleLogin}>
              <Text style={styles.ButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

           <Text style={[styles.newUserText, { color: '#FFFFFF' }]}>
             ¿Aún no tienes cuenta?{' '}
             <Text style={styles.createAccountText} onPress={() => navigation.navigate('SignUp')}>
               ¡Regístrate Aquí!
             </Text>
           </Text>

           <Text style={[styles.orText, { color: '#FFFFFF', marginVertical: 25 }]}>
             ────────   Iniciar con   ────────
           </Text>

           <View style={styles.socialButtonsContainer}>
             <TouchableOpacity style={styles.socialButton}>
               <FontAwesome5 name="google" size={30} color="#F2E527" />
             </TouchableOpacity>
             <TouchableOpacity style={styles.socialButton}>
               <FontAwesome5 name="facebook" size={30} color="#F2E527" />
             </TouchableOpacity>
           </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
