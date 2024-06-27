import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export default function EditScreen() {
  const router = useRouter();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [userData, setUserData] = useState({
    user_id: '',
    user_name: '',
    user_last_name: '',
    user_email: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserData(userData);
      } else {
        throw new Error('User data not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };

  const handleIconPress = () => {
    console.log('Icono presionado');
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://10.13.0.68:3000/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user_id,
          user_name: userData.user_name,
          user_last_name: userData.user_last_name,
          user_email: userData.user_email
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Cambios guardados exitosamente:', data.message);
        // Actualizar los datos en AsyncStorage y en el estado local
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        setUserData(userData);

        // Navegar de vuelta a la pantalla de perfil
        router.push('/porfile'); // Ajusta la ruta según tu configuración
      } else {
        console.error('Error al guardar los cambios:', data.message);
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
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
            <Text style={styles.title}>Editar Información</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                placeholderTextColor="#A9A9A9"
                value={userData.user_name}
                onChangeText={(text) => setUserData({ ...userData, user_name: text })}
              />
              <FontAwesome name="user" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Apellidos"
                placeholderTextColor="#A9A9A9"
                value={userData.user_last_name}
                onChangeText={(text) => setUserData({ ...userData, user_last_name: text })}
              />
              <FontAwesome name="user" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#A9A9A9"
                value={userData.user_email}
                onChangeText={(text) => setUserData({ ...userData, user_email: text })}
              />
              <FontAwesome name="envelope" size={24} color="#F2E527" style={styles.icon} />
            </View>
            {/* Add more fields as needed */}

            <TouchableOpacity style={styles.Button} onPress={handleSaveChanges}>
              <Text style={styles.ButtonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}