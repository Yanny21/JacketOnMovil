import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { styles } from './styles';

const employees = [
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
];

export default function metricas() {
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen); // Navegar a la pantalla específica
  };

  const handleEmployeePress = (employeeName) => {
    router.push({
      pathname: '/metricasGraf',
      params: { name: employeeName },
    });
  };

  return (
    <View style={styles.containerV}>
      <View style={styles.searchBarContainer}>
        <Icon name="magnify" size={30} color="#F2E527" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar..."
          placeholderTextColor="#71728a"
        />
      </View>
      <Text style={styles.headerP}>Metricas de empleados</Text>
      <ScrollView>
        {employees.map((employee, index) => (
          <TouchableOpacity key={index} onPress={() => handleEmployeePress(employee.name)}>
            <View style={styles.employeeCard}>
              <Text style={styles.employeeName}>{employee.name}</Text>
              <Text style={styles.employeeId}>Empleado #{employee.id}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/asignaAct')}
        >
          <Icon name="view-list" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/graficasyrep')}
        >
          <Icon name="alert-circle" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
        >
          <Icon name="account-group" size={30} color="#F2E527" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/porfile')}
        >
          <Icon name="account" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/calidad')}
        >
          <Icon name="cloud" size={30} color="#71728a" />
        </TouchableOpacity>
      </View>
    </View>
  );
}