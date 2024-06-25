import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

export default function MiCuenta() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    // Function to fetch user data from AsyncStorage or your API
    const fetchUserData = async () => {
      try {
        // Replace with actual key used to store user data in AsyncStorage
        const storedUserData = await AsyncStorage.getItem('userData');

        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleEditPress = () => {
    // Navigate to the screen where user can edit information
    console.log('Editar información presionada');
    // Example navigation with Expo Router
    navigation.push('/editar-informacion');
  };

  const handleNavigation = (screenName, iconName) => {
    // Handle navigation logic
    console.log('Navigating to screen:', screenName);
    // Example navigation with Expo Router
    navigation.push(screenName);
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
          <Text style={styles.area}>{userData.area}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Correo: {userData.user_email}</Text>
            <Text style={styles.label}>Fecha de registro: {userData.registered_date}</Text>
            <Text style={styles.label}>Nombre: {userData.first_name}</Text>
            <Text style={styles.label}>Apellidos: {userData.last_name}</Text>
          </View>
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Editar información</Text>
      </TouchableOpacity>

      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen1', 'viewList')}
        >
          <Icon name="view-list" size={30} color="#2B2C5E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen2', 'alertCircle')}
        >
          <Icon name="alert-circle" size={30} color="#2B2C5E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen3', 'accountGroup')}
        >
          <Icon name="account-group" size={30} color="#2B2C5E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen4', 'account')}
        >
          <Icon name="account" size={30} color="#2B2C5E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen5', 'cloud')}
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
