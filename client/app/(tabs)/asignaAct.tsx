import React, { useState } from 'react';
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

export default function AsignaAct() {
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

  const handleEmployeePress = (employeeName) => {
    router.push({
      pathname: '/detallesAct',
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
      <Text style={styles.headerV}>Asignar Actividades</Text>
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
          onPress={() => handleNavigation('/asignaAct', 'viewList')} // Aquí se navega a la misma página
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
          onPress={() => handleNavigation('/porfile', 'viewList')}
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
};
