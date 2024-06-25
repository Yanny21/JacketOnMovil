import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function MiCuenta() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          const response = await fetch(`http://10.13.14.111:3000/user-data?userId=${parsedUserData.user_id}`);
          const data = await response.json();
          if (response.ok) {
            setUserData(data.user);
          } else {
            console.error('Error fetching user data from server:', data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditPress = () => {
    router.push('/editar-informacion');
  };

  const handleNavigation = (screenName) => {
    router.push(screenName);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      router.push('../login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirmar Cierre de Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: handleLogout,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MI CUENTA</Text>
      <View style={styles.profileIconContainer}>
        <Icon name="account-circle" size={100} color="#2B2C5E" />
      </View>
      {userData && (
        <>
          <Text style={styles.name}>{userData.user_name}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Correo: {userData.user_email}</Text>
            <Text style={styles.label}>Nombre: {userData.user_name}</Text>
            <Text style={styles.label}>Apellidos: {userData.user_last_name}</Text>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Editar información</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={confirmLogout}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity>

      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen1')}
        >
          <Icon name="view-list" size={30} color="#2B2C5E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen2')}
        >
          <Icon name="alert-circle" size={30} color="#2B2C5E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen3')}
        >
          <Icon name="account-group" size={30} color="#2B2C5E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen4')}
        >
          <Icon name="account" size={30} color="#2B2C5E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen5')}
        >
          <Icon name="cloud" size={30} color="#2B2C5E" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#2B2C5E',
    marginTop: 10,
    marginBottom: 20,
  },
  profileIconContainer: {
    marginVertical: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2C5E',
  },
  area: {
    fontSize: 18,
    color: '#2B2C5E',
    marginVertical: 10,
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 300,
    paddingBottom: 20,
    borderTopColor: '#2B2C5E',
  },
  navButton: {
    alignItems: 'center',
  },
});
