import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { styles } from './styles';

const NavigationBar = ({ handleNavigation }) => (
   <View style={styles.navigationBar}>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => handleNavigation('/actEmp')}
                >
                  <Icon name="view-list" size={30} color="#71728a" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => handleNavigation('/grafyrepEmp')}
                >
                  <Icon name="alert-circle" size={30} color="#71728a" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navButton}
                >
                  <Icon name="account" size={30} color="#F2E527" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={() => handleNavigation('/calidadEmp')}
                >
                  <Icon name="cloud" size={30} color="#71728a" />
                </TouchableOpacity>
              </View>
);

export default function MiCuentaE() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          const response = await fetch(`http://192.168.1.71:3000/user-data?userId=${parsedUserData.user_id}`);
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
    router.push('/editarEmp');
  };

  const handleNavigation = (screen) => {
    router.push(screen); // Navegar a la pantalla específica
  };

  const handleLogout = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { user_id } = JSON.parse(userData);

        const response = await fetch('http://192.168.1.71:3000/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id }),
        });

        if (response.ok) {
          await AsyncStorage.removeItem('userData');
          router.push('../login');
        } else {
          console.error('Error during logout:', response.statusText);
        }
      } else {
        console.error('User data not found during logout');
      }
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

  const handleChangePassword = () => {
    router.push('/passwordEmp');
  };

  const handleDeleteAccount = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { user_id } = JSON.parse(userData);

        const response = await fetch('http://192.168.1.71:3000/user-delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id }),
        });

        if (response.ok) {
          await AsyncStorage.removeItem('userData');
          router.push('../registro');
        } else {
          console.error('Error deleting account:', response.statusText);
        }
      } else {
        console.error('User data not found during account deletion');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      'Confirmar Eliminación de Cuenta',
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: handleDeleteAccount,
        },
      ],
      { cancelable: false }
    );
  };

  const renderButtons = () => {
    if (!userData) return null;

    const buttons = [
      { label: 'Contraseña', icon: 'lock', action: handleChangePassword },
      { label: 'Cerrar sesión', icon: 'logout', action: confirmLogout }
    ];

    if (userData.user_type === 'admin' || userData.user_type === 'supervisor') {
      buttons.unshift({ label: 'Editar', icon: 'pencil', action: handleEditPress });
      buttons.push({ label: 'Eliminar', icon: 'delete', action: confirmDeleteAccount, style: styles.deleteButton });
    }

    return buttons.map((button, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.gridItem, button.style || {}]}
        onPress={button.action}
      >
        <Icon name={button.icon} size={50} color="#2B2C5E" />
        <Text style={styles.buttonText}>{button.label}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.containerV}>
      <Text style={styles.headerV}>Editar perfil</Text>
      <View style={styles.profileIconContainer}>
        <Icon name="account-hard-hat" size={100} color="#2B2C5E" />
      </View>
      {userData && (
        <>
          <Text style={styles.name}>{userData.user_name}</Text>
          <Text style={styles.name}>{userData.user_last_name}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Correo: {userData.user_email}</Text>
            <Text style={styles.label}>Nombre: {userData.user_name}</Text>
            <Text style={styles.label}>Puesto: {userData.user_type}</Text>
          </View>
        </>
      )}
      <View style={styles.gridContainer}>{renderButtons()}</View>

      <NavigationBar handleNavigation={handleNavigation} />
    </View>
  );
}
