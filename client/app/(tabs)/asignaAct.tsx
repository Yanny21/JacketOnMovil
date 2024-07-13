import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

export default function AsignaAct() {

  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [userType, setUserType] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { user_type } = JSON.parse(userData);
          setUserType(user_type);
          if (user_type !== 'supervisor') {
            router.push('/actEmp');
            return;
          }
        } else {
          router.push('/actEmp');
          return;
        }
        fetchEmpleados();
      } catch (error) {
        console.error('Error al obtener el tipo de usuario:', error);
        router.push('/actEmp');
      }
    };

    checkUserType();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await fetch('http://192.168.1.71:3000/empleados');
      if (!response.ok) {
        throw new Error('Error al obtener empleados');
      }
      const data = await response.json();
      setEmpleados(data.empleados);
      setFilteredEmpleados(data.empleados);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const handleEmployeePress = (employee) => {
    router.push({
      pathname: '/detallesAct',
      params: {
        name: `${employee.nom_usu} ${employee.app_usu}`,
        id_emp: employee.id_usu,
      },
    });
  };

  const handleSearch = (text) => {
    const lowerCaseQuery = text.toLowerCase();
    const filteredData = empleados.filter((empleado) =>
      empleado.nom_usu.toLowerCase().includes(lowerCaseQuery) || empleado.app_usu.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredEmpleados(filteredData);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (userType !== 'admin' && userType !== 'supervisor') {
    router.push('/actividad');
    return null;
  }

  return (
    <View style={styles.containerV}>
      <View style={styles.searchBarContainer}>
        <Icon name="magnify" size={30} color="#F2E527" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar..."
          placeholderTextColor="#71728a"
          onChangeText={handleSearch}
        />
      </View>
      <Text style={styles.headerP}>Asignar Actividades</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#F2E527" />
      ) : (
        <ScrollView style={styles.employeeList}>
          {filteredEmpleados.map((employee, index) => (
            <TouchableOpacity key={index} onPress={() => handleEmployeePress(employee)}>
              <View style={styles.employeeCard}>
                <Text style={styles.employeeName}>{employee.nom_usu} {employee.app_usu}</Text>
                <Text style={styles.employeeId}>Empleado #{employee.id_usu}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="view-list" size={30} color="#F2E527" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/graficasyrep')}>
          <Icon name="alert-circle" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/metricas')}>
          <Icon name="account-group" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/porfile')}>
          <Icon name="account" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/calidad')}>
          <Icon name="cloud" size={30} color="#71728a" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
