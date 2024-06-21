import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const employees = [
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' },
  { id: '12312324', name: 'John Doe' }
];

export default function AsignaAct({ navigation }) {
  const [iconColors, setIconColors] = useState({
    viewList: '#71728a',
    alertCircle: '#71728a',
    accountGroup: '#71728a',
    account: '#71728a',
    cloud: '#71728a',
  });

  const handleNavigation = (screen, icon) => {
    // Navegar a la pantalla específica
    navigation.navigate(screen);
    // Cambiar el color del icono al ser presionado
    setIconColors(prevState => ({
      ...prevState,
      [icon]: '#F2E527', // Cambiar al color deseado al ser presionado
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
      />
      <Text style={styles.header}>Asignar Actividades</Text>
      <ScrollView>
        {employees.map((employee, index) => (
          <View key={index} style={styles.employeeCard}>
            <Text style={styles.employeeName}>{employee.name}</Text>
            <Text style={styles.employeeId}>Empleado #{employee.id}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('Screen1', 'viewList')}
        >
          <Icon name="view-list" size={30} color={iconColors.viewList} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('Screen2', 'alertCircle')}
        >
          <Icon name="alert-circle" size={30} color={iconColors.alertCircle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('Screen3', 'accountGroup')}
        >
          <Icon name="account-group" size={30} color={iconColors.accountGroup} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('Screen4', 'account')}
        >
          <Icon name="account" size={30} color={iconColors.account} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('Screen5', 'cloud')}
        >
          <Icon name="cloud" size={30} color={iconColors.cloud} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 20,
    marginTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    marginTop: 40,
    textAlign: 'center',
  },
  employeeCard: {
    marginBottom: 30,
  },
  employeeName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  employeeId: {
    fontSize: 16,
    color: '#888',
  },
  navigationBar: {
    backgroundColor: '#2B2C5E',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 300,
    paddingTop: 20,
    paddingBottom: 20, // Añade espacio abajo de la barra de navegación
    borderTopColor: '#2B2C5E', // Color de la línea superior
  },
  navButton: {
    alignItems: 'center',
  },
});

export default AsignaAct;
