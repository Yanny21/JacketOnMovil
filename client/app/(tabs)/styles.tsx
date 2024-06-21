// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Estilos generales para la aplicación
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco fuera del rectángulo
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Estilos específicos para MiCuenta
  container: {
    width: '90%',
    backgroundColor: '#333557', // Color de fondo del rectángulo
    borderRadius: 25, // Bordes redondeados
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: '#2F2F2F',
    borderRadius: 45, // Valor suficientemente alto para un círculo visible
    width: 45, // Ancho igual a la altura para formar un círculo
    height: 45, // Altura igual al ancho para formar un círculo
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#F2E527',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 45,
    marginBottom: 20, // Más espacio debajo del título
  },
  subtitle: {
    fontSize: 22, // Ajustar según sea necesario
    color: '#FFFFFF', // Color similar al título
    marginBottom: 20, // Espacio inferior para separación visual
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#2F2F2F', // Fondo del input container
    borderRadius: 10,
    padding: 15,
    marginBottom: 20, // Más espacio entre los campos de entrada
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
  },
  icon: {
    marginLeft: 10,
  },
  Button: {
    width: '100%',
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 25, // Forma de píldora
    alignItems: 'center',
    marginBottom: 20,
  },
  ButtonText: {
    color: '#24224B',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
