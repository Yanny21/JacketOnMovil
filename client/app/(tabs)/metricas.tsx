import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function Metricas() {
  const [employees, setEmployees] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Función para obtener empleados desde el servidor
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://192.168.0.15:3000/api/employees'); // Cambia la URL a la de tu API
        const text = await response.text(); // Obtener la respuesta como texto
        console.log('Respuesta del servidor:', text); // Imprimir la respuesta
        const data = JSON.parse(text); // Intentar convertir el texto a JSON
        setEmployees(data);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const handleEmployeePress = async (employee) => {
    try {
      // Obtener los datos del usuario almacenados en AsyncStorage
      const userDataString = await AsyncStorage.getItem('userData');
  
      let userData = {};
      if (userDataString) {
        userData = JSON.parse(userDataString);
      }
      
      // Actualizar el campo user_device
      userData.user_device = employee.device;
  
      // Guardar el objeto completo nuevamente en AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('Dispositivo de usuario actualizado:', employee.device);
      
      // Verificar el valor actualizado
      const updatedUserDataString = await AsyncStorage.getItem('userData');
      console.log('Valor actualizado en AsyncStorage:', updatedUserDataString);
  
      // Navegar a la pantalla específica con el nombre del empleado
      router.push({
        pathname: '/metricasGraf',
        params: { name: employee.name },
      });
    } catch (error) {
      console.error('Error al actualizar AsyncStorage:', error);
    }
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
          <TouchableOpacity key={index} onPress={() => handleEmployeePress(employee)}>
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
          onPress={() => handleNavigation('/ListadoIncidencias')}
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
