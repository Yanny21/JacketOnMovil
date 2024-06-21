// MiCuenta.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MiCuenta({ navigation }) {
  const [iconColors, setIconColors] = useState({
    viewList: '#2B2C5E',
    alertCircle: '#2B2C5E',
    accountGroup: '#2B2C5E',
    account: '#2B2C5E',
    cloud: '#2B2C5E',
  });

  const handleEditPress = () => {
    // Lógica para manejar el evento de editar información
    console.log('Editar información presionada');
  };

  const handleNavigation = (screenName, iconName) => {
    // Actualiza el color del ícono correspondiente al presionar el botón
    const updatedColors = {
      ...iconColors,
      [iconName]: '#F2E527', // Cambia el color al nuevo color deseado
    };
    setIconColors(updatedColors);

    // Aquí puedes manejar la navegación según los botones presionados
    console.log('Navigating to screen:', screenName);
    // Ejemplo de navegación utilizando React Navigation
    // navigation.navigate(screenName);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MI CUENTA</Text>
      <View style={styles.profileIconContainer}>
        <Icon name="account-circle" size={100} color="#2B2C5E" />
      </View>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.area}>Área</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.label}>Fecha de registro: 14/14/2222</Text>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.label}>Apellidos:</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleEditPress}>
        <Text style={styles.buttonText}>Editar información</Text>
      </TouchableOpacity>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Alinea el contenido hacia arriba
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 40, // Aumenta el espacio en la parte superior e inferior
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24, // Aumenta el tamaño del título
    color: '#2B2C5E',
    marginTop: 10, // Menos espacio arriba del título
    marginBottom: 20, // Más espacio debajo del título
  },
  profileIconContainer: {
    marginVertical: 20,
  },
  name: {
    fontSize: 20, // Ajusta el tamaño del nombre
    fontWeight: 'bold',
    color: '#2B2C5E',
  },
  area: {
    fontSize: 18, // Ajusta el tamaño del área
    color: '#2B2C5E',
    marginVertical: 10,
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#7E7E7E',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 300,
    paddingBottom: 20, // Añade espacio abajo de la barra de navegación

    borderTopColor: '#2B2C5E', // Color de la línea superior
  },
  navButton: {
    alignItems: 'center',
  },
});
