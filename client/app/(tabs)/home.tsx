// Importamos los módulos necesarios desde React y React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Definimos nuestro componente Home
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a mi aplicación!</Text>
      <Text style={styles.subtitle}>Aquí puedes empezar a construir tu aplicación móvil.</Text>
    </View>
  );
};

// Estilos para nuestros elementos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cambia el color de fondo según tu preferencia
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 40,
  },
});

export default Home;
