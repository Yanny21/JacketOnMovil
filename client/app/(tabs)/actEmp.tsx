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

export default function detEmpAct() {
  const [iconColors, setIconColors] = useState({
    viewList: '#71728a',
    alertCircle: '#71728a',
    accountGroup: '#71728a',
    account: '#71728a',
    cloud: '#71728a',
  });

  const router = useRouter();

  const handleNavigation = (screen, icon) => {
    router.push(screen); // Navegar a la pantalla específica
    setIconColors(prevState => ({
      ...prevState,
      [icon]: '#F2E527', // Cambiar al color deseado al ser presionado
    }));
  };

  return (
    <View style={styles.containerV}>
      <Text style={styles.headerV}>Actividades de: John Doe</Text>
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
             <TouchableOpacity onPress={() =>(activity.id)} style={styles.completedContainer}>
               <Icon name="check-bold" size={40} color="#F2E527" />
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
          onPress={() => handleNavigation('/asignaAct', 'viewList')}
        >
          <Icon name="view-list" size={30} color={iconColors.viewList} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen3', 'accountGroup')}
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
