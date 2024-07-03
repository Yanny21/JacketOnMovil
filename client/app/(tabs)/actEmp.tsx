import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { styles } from './styles';

const activities = [
  {
    id: 1,
    description: 'Limpiar área',
    startDate: '14/14/2222',
    endDate: '14/14/2222',
    dueDate: '14/14/2222',
    status: 'Completada',
  },
  {
    id: 2,
    description: 'Limpiar área',
    startDate: '14/14/2222',
    endDate: '14/14/2222',
    dueDate: '14/14/2222',
    status: 'Completada',
  },
  {
    id: 3,
    description: 'Limpiar área',
    startDate: '14/14/2222',
    endDate: '14/14/2222',
    dueDate: '14/14/2222',
    status: 'Completada',
  },
];

export default function detEmpAct() {
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen); // Navegar a la pantalla específica
  };

  return (
    <View style={styles.containerV}>
      <Text style={styles.headerV}>Tus actividades</Text>
      <ScrollView style={styles.activityList}>
        {activities.map(activity => (
          <View key={activity.id} style={styles.activityCard}>
            <View style={styles.activityContent}>
              <View>
                <Text style={styles.activityTitle}>Actividad {activity.id}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityDetail}>Fecha de inicio: {activity.startDate}</Text>
                <Text style={styles.activityDetail}>Fecha límite: {activity.dueDate}</Text>
                <Text style={styles.activityDetail}>Estado: {activity.status}</Text>
                <Text style={styles.activityDetail}>Fecha de finalización: {activity.endDate}</Text>
              </View>
              <View style={styles.activityIcons}>
                <TouchableOpacity onPress={() => console.log(activity.id)} style={styles.completedContainer}>
                  <Icon name="arrow-right-circle" size={30} color="#F2E527" />
                  <Text style={styles.completedText}>Comenzar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log(activity.id)} style={styles.completedContainer}>
                  <Icon name="check-bold" size={30} color="#F2E527" />
                  <Text style={styles.completedText}>Realizado</Text>
                </TouchableOpacity>
              </View>
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
          onPress={() => handleNavigation('/porfile')}
        >
          <Icon name="account" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen5')}
        >
          <Icon name="cloud" size={30} color="#71728a" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
