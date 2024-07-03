import React, { useState } from 'react';
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

export default function detallesAct() {
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen); // Navegar a la pantalla específica
  };

  const handleAssignActivity = () => {
    router.push('/actividad');
  };

  const handleEditActivity = (id) => {
    // Navegar a la pantalla de edición con el ID de la actividad
    router.push(`/editAct?id=${id}`);
  };

  const handleDeleteActivity = (id) => {
    // Lógica para eliminar la actividad
    console.log(`Eliminar actividad con ID: ${id}`);
  };

  return (
    <View style={styles.containerV}>
      <Text style={styles.headerV}>Actividades de: John Doe</Text>
      <TouchableOpacity style={styles.assignButton} onPress={handleAssignActivity}>
        <Text style={styles.assignButtonText}>Asignar actividad</Text>
      </TouchableOpacity>
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
                <TouchableOpacity onPress={() => handleEditActivity(activity.id)}>
                  <Icon name="pencil" size={30} color="#2B2C5E" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteActivity(activity.id)}>
                  <Icon name="delete" size={30} color="#2B2C5E" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
           onPress={() => handleNavigation('/asignaAct')}
        >
          <Icon name="view-list" size={30} color="#F2E527" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/graficasyrep')}
        >
          <Icon name="alert-circle" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen3')}
        >
          <Icon name="account-group" size={30} color="#71728a" />
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
