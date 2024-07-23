import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export default function detEmpAct() {

 const handleNavigation = (screen) => {
    router.push(screen); // Navegar a la pantalla específica
  };

  const [activities, setActivities] = useState([]);

  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserName(`${parsedUserData.user_name} ${parsedUserData.user_last_name}`);
          const response = await fetch(`http://192.168.3.15:3000/actividades/${parsedUserData.user_id}`);
          const data = await response.json();
          if (response.ok) {
            setActivities(data); // Directamente establece las actividades ya que la respuesta es un array de objetos
          } else {
            console.error('Error fetching activities from server:', data.message);
          }
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
  
    fetchActivities();
  }, []);


  const handleStartActivity = async (activityId) => {
    try {
      const response = await fetch(`http://192.168.3.15:3000/start-activity/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // Actualizar la actividad localmente si es necesario
        const updatedActivities = activities.map(activity => {
          if (activity.id_act === activityId) {
            return {
              ...activity,
              fech_ini: new Date().toISOString().slice(0, 10), // Solo la fecha en formato MySQL
            };
          }
          return activity;
        });
        setActivities(updatedActivities);
        console.log('Actividad iniciada con éxito');
      } else {
        console.error('Error al iniciar la actividad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al iniciar la actividad:', error);
    }
  };

  const handleFinishActivity = async (activityId) => {
    try {
      const response = await fetch(`http://192.168.3.15:3000/end-activity/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        // Actualizar la actividad localmente si es necesario
        const updatedActivities = activities.map(activity => {
          if (activity.id_act === activityId) {
            return {
              ...activity,
              fech_fin: new Date().toISOString().slice(0, 10), // Solo la fecha en formato MySQL
              estatus: 0, // Marcar como completada
            };
          }
          return activity;
        });
        setActivities(updatedActivities);
        Alert.alert('Éxito', 'Actividad finalizada con éxito');
        console.log('Actividad finalizada con éxito');
      } else {
        console.error('Error al finalizar la actividad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al finalizar la actividad:', error);
    }
  };

  return (
    <View style={styles.containerV}>
      <Text style={styles.headerV}>Actividades de: {userName}</Text>
      <ScrollView style={styles.activityList}>
      {activities.map(activity => (
          <View key={activity.id_act} style={styles.activityCard}>
            <View style={styles.activityContent}>
              <View>
                <Text style={styles.activityTitle}>Actividad {activity.id_act}</Text>
                <Text style={styles.activityDescription}>{activity.actividad}</Text>
                <Text style={styles.activityDescription}>{activity.descripcion}</Text>
                <Text style={styles.activityDetail}>Fecha de inicio: {activity.fech_ini}</Text>
                <Text style={styles.activityDetail}>Fecha límite: {activity.fech_lim}</Text>
                <Text style={styles.activityDetail}>Estado: {activity.estatus === 1 ? 'Pendiente' : 'Completada'}</Text>
                <Text style={styles.activityDetail}>Fecha de finalización: {activity.fech_fin}</Text>
              </View>
              {activity.estatus === 1 && (
                <View style={styles.activityIcons}>
                  <TouchableOpacity onPress={() => handleStartActivity(activity.id_act)} style={styles.completedContainer}>
                    <Icon name="arrow-right-circle" size={30} color="#F2E527" />
                    <Text style={styles.completedText}>Comenzar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleFinishActivity(activity.id_act)} style={styles.completedContainer}>
                    <Icon name="check-bold" size={30} color="#F2E527" />
                    <Text style={styles.completedText}>Realizado</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.navigationBar}>
              <TouchableOpacity
                style={styles.navButton}
              >
                <Icon name="view-list" size={30} color="#F2E527" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleNavigation('/grafyrepEmp')}
              >
                <Icon name="alert-circle" size={30} color="#71728a" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleNavigation('/profile')}
              >
                <Icon name="account" size={30} color="#71728a" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navButton}
                onPress={() => handleNavigation('/calidadEmp')}
              >
                <Icon name="cloud" size={30} color="#71728a" />
              </TouchableOpacity>
            </View>
    </View>
  );
}