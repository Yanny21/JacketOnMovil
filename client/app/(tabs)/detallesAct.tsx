import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from './styles';

export default function DetallesAct() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iconColors, setIconColors] = useState({
    viewList: '#71728a',
    alertCircle: '#71728a',
    accountGroup: '#71728a',
    account: '#71728a',
    cloud: '#71728a',
  });
  const [userType, setUserType] = useState(null); // Estado para almacenar el tipo de usuario

  const router = useRouter();
  const { id_emp, name } = useLocalSearchParams();

  useEffect(() => {
    const checkUserType = async () => {
      try {
        // Obtener los datos del usuario desde AsyncStorage
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { user_type } = JSON.parse(userData);
          console.log('Tipo de usuario recuperado:', user_type); // Mostrar el tipo de usuario en el log
          setUserType(user_type);
          if (user_type !== 'admin' && user_type !== 'supervisor') {
            // Redirigir a /actividad si el tipo de usuario no es admin o supervisor
            router.push('/actividad');
            return;
          }
        } else {
          // Redirigir a /actividad si no hay datos de usuario en AsyncStorage
          router.push('/actividad');
          return;
        }
        // Si el tipo de usuario es válido, entonces obtener las actividades
        fetchActivities();
      } catch (error) {
        console.error('Error al obtener el tipo de usuario:', error);
        // En caso de error, redirigir a /actividad
        router.push('/actividad');
      }
    };

    checkUserType();
  }, [id_emp]);

  const fetchActivities = async () => {
    try {
      if (id_emp) {
        console.log(`Fetching activities for user ID: ${id_emp}`);
        const response = await axios.get(`http://192.168.3.30:3000/actividades/${id_emp}`);
        console.log('Response data:', response.data);

        // Verifica el tipo de contenido de la respuesta
        if (response.headers['content-type'] === 'application/json; charset=utf-8') {
          if (response.status === 404) {
            // Manejo del caso en que no hay actividades
            setActivities([]);
            Alert.alert('No hay actividades', 'No hay actividades registradas para este usuario.');
          } else if (Array.isArray(response.data)) {
            setActivities(response.data);
          } else {
            console.error("The response is not an array:", response.data);
            setActivities([]);
          }
        } else {
          console.error('The response is not JSON:', response.headers['content-type']);
          setActivities([]);
        }
      } else {
        console.error('No user ID provided');
        setActivities([]);
      }
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
      Alert.alert('Error', 'No se pudieron obtener las actividades');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (screen, icon) => {
    router.push(screen);
    setIconColors(prevState => ({
      ...prevState,
      [icon]: '#F2E527',
    }));
  };

  const handleAssignActivity = () => {
    router.push({
      pathname: '/actividad',
      params: {
        name: name,
        id_emp: id_emp,
      },
    });
  };

  const handleEditActivity = (id) => {
    router.push({
      pathname: '/editAct',
      params: {
        id_act: id,
      },
    });
  };

  const handleDeleteActivity = (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta actividad?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            axios.delete(`http://192.168.3.30:3000/delete-act/${id}`)
              .then(response => {
                console.log('Actividad eliminada:', response.data.message);
                setActivities(prevActivities => prevActivities.filter(activity => activity.id_act !== id));
              })
              .catch(error => {
                console.error('Error al eliminar la actividad:', error);
                Alert.alert('Error', 'No se pudo eliminar la actividad');
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (userType !== 'admin' && userType !== 'supervisor') {
    // Redirigir a /actividad si el tipo de usuario no es admin o supervisor
    router.push('/actividad');
    return null; // Asegurarse de no renderizar nada si no es admin o supervisor
  }

  return (
    <View style={styles.containerV}>
      <Text style={styles.headerV}>Actividades de: {name}</Text>
      <TouchableOpacity style={styles.assignButton} onPress={handleAssignActivity}>
        <Text style={styles.assignButtonText}>Asignar actividad</Text>
      </TouchableOpacity>
      <ScrollView style={styles.activityList}>
        {activities.length > 0 ? (
          activities.map(activity => (
            <View key={activity.id_act} style={styles.activityCard}>
              <View style={styles.activityContent}>
                <View>
                  <Text style={styles.activityTitle}>Actividad</Text>
                  <Text style={styles.activityDescription}>{activity.actividad}</Text>
                  <Text style={styles.activityDetail}>Fecha de inicio: {activity.fech_ini}</Text>
                  <Text style={styles.activityDetail}>Fecha límite: {activity.fech_lim}</Text>
                  <Text style={styles.activityDetail}>Área: {activity.area}</Text>
                </View>
                <View style={styles.activityIcons}>
                  <TouchableOpacity onPress={() => handleEditActivity(activity.id_act)}>
                    <Icon name="pencil" size={30} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteActivity(activity.id_act)}>
                    <Icon name="delete" size={30} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noActivities}>No hay actividades para este usuario.</Text>
        )}
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/detallesAct', 'viewList')}
        >
          <Icon name="view-list" size={30} color={iconColors.viewList} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen3', 'alertCircle')}
        >
          <Icon name="alert-circle" size={30} color={iconColors.alertCircle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen3', 'accountGroup')}
        >
          <Icon name="account-group" size={30} color={iconColors.accountGroup} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/porfile', 'account')}
        >
          <Icon name="account" size={30} color={iconColors.account} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen5', 'cloud')}
        >
          <Icon name="cloud" size={30} color={iconColors.cloud} />
        </TouchableOpacity>
      </View>
    </View>
  );
}