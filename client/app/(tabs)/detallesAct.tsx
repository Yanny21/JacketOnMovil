import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { styles } from './styles';
import axios from 'axios';

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

  const router = useRouter();
  const { id_usu, name } = useLocalSearchParams();

  useEffect(() => {
    console.log(`Received parameters: id_usu=${id_usu}, name=${name}`);

    if (id_usu) {
      console.log(`Fetching activities for user ID: ${id_usu}`);
      axios.get(`http://192.168.100.11:3000/actividades/${id_usu}`)
        .then(response => {
          console.log('Response data:', response.data);
          if (Array.isArray(response.data)) {
            setActivities(response.data);
          } else {
            console.error("The response is not an array:", response.data);
            setActivities([]);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error("There was an error fetching the activities!", error);
          setLoading(false);
        });
    } else {
      console.error('No user ID provided');
      setLoading(false);
    }
  }, [id_usu]);

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
        id_usu: id_usu,
      },
    });
  };

  const handleEditActivity = (id) => {
    router.push({
      pathname: '/editAct',
      params: {
        id: id,
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
            axios.delete(`http://192.168.100.11:3000/actividades/${id}`)
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
