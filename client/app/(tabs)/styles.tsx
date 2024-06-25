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
    backgroundColor: '#333557',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    backgroundColor: '#2F2F2F',
    borderRadius: 45,
    width: 45,
    height: 45,
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
  newUserText: {
    fontSize: 14,
  },
  createAccountText: {

    color: '#27A4F2',
    textDecorationLine: 'underline',

  },
  orText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',

  },
  socialButton: {
    backgroundColor: '#2F2F2F',
    padding: 10,
    borderRadius: 55,
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
