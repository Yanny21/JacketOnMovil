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
  const [iconColors, setIconColors] = useState({
    viewList: '#71728a',
    alertCircle: '#71728a',
    accountGroup: '#71728a',
    account: '#71728a',
    cloud: '#71728a',
  });
  const [userType, setUserType] = useState(null); // Estado para almacenar el tipo de usuario

  const router = useRouter();

  useEffect(() => {
    const checkUserType = async () => {
      try {
        // Obtener los datos del usuario desde AsyncStorage
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { user_type } = JSON.parse(userData);
          setUserType(user_type);
          if (user_type !== 'supervisor') {
            // Redirigir a /actividad si el tipo de usuario no es admin o supervisor
            router.push('/actividad');
            return;
          }
        } else {
          // Redirigir a /actividad si no hay datos de usuario en AsyncStorage
          router.push('/actividad');
          return;
        }
        // Si el tipo de usuario es válido, entonces obtener los empleados
        fetchEmpleados();
      } catch (error) {
        console.error('Error al obtener el tipo de usuario:', error);
        // En caso de error, redirigir a /actividad
        router.push('/actividad');
      }
    };

    checkUserType();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await fetch('http://192.168.3.30:3000/empleados');
      if (!response.ok) {
        throw new Error('Error al obtener empleados');
      }
      const data = await response.json();
      setEmpleados(data.empleados);
      setFilteredEmpleados(data.empleados); // Inicialmente, muestra todos los empleados
    } catch (error) {
      console.error('Error al obtener empleados:', error);
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
    // Redirigir a /actividad si el tipo de usuario no es admin o supervisor
    router.push('/actividad');
    return null; // Asegurarse de no renderizar nada si no es admin o supervisor
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
      <Text style={styles.headerV}>Asignar Actividades</Text>
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
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/asignaAct', 'viewList')}
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