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
  containerV: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchBarContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#',
     borderRadius: 13,
     paddingHorizontal: 5,
     marginBottom: 20,
     borderColor: '#C2C0C0', // Color del borde
     borderWidth: 2, // Ancho del borde
   },
  searchIcon: {
    marginRight: 10,
    marginLeft: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
  },
  headerV: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    paddingTop: 20, // Reducir el padding superior
    borderTopColor: '#2B2C5E',
    borderTopWidth: 1,
    paddingBottom: 20, // Reducir el padding inferior
  },
  navButton: {
    alignItems: 'center',
  },
   assignButton: {
      backgroundColor: '#F2E527',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    assignButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    activityList: {
        flex: 1,
      },
      activityCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
      },
      activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      activityDescription: {
        fontSize: 16,
        marginBottom: 5,
      },
      activityDetail: {
        fontSize: 14,
        color: '#555',
      },
      activityContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
     activityIcons: {
       flexDirection: 'column',
       justifyContent: 'space-between',
       height: 80, // Ajusta esta altura según sea necesario
     },


});
