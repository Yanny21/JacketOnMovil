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
     marginTop: 40,
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
    marginTop: 70,
    textAlign: 'center',
  },
  headerP: {
             fontSize: 24,
             fontWeight: 'bold',
             marginBottom: 30,
             marginTop: 10,
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
        marginTop: 40,
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
       marginBottom: 40,
     },
      scrollViewContent: {
         paddingVertical: 40,
         paddingHorizontal: 20,
         alignItems: 'center',
       },
       profileIconContainer: {
           marginVertical: 20,
       },
name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2C5E',
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

      gridContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%',
          marginTop: 20,
        },

         gridItem: {
            width: '40%',
            alignItems: 'center',
            margin: '5%',
            padding: 20,
            backgroundColor: '#FFD700',
            borderRadius: 20,
          },
          deleteButton: {
              backgroundColor: '#FF4500', // Rojo para el botón de eliminar cuenta
            },
            completedContainer: {
                alignItems: 'center',
                justifyContent: 'center',
              },
              completedText: {
                color: '#2B2C5E',
                fontSize: 18,
                marginTop: 5, // Espacio entre el icono y el texto
                marginBottom: 10,
              },
               tabContainer: {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 20,
                },
                tabButton: {
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                  backgroundColor: '#E0E0E0',
                  marginHorizontal: 5,
                  marginTop: 40,
                },
                activeTabButton: {
                  backgroundColor: '#F2E527',
                },
                tabText: {
                  fontSize: 16,
                  fontWeight: 'bold',

                },
                contentContainer: {
                  alignItems: 'center',
                },
                chart: {
                  width: '100%',
                  height: 200,
                  backgroundColor: '#f0f0f0',
                  borderRadius: 10,
                  marginBottom: 20,
                },
                reportContainer: {
                  alignItems: 'center',
                  marginBottom: 20,
                },
                reportText: {
                  fontSize: 34,
                  fontWeight: 'bold',
                  color: '#2B2C5E',
                },
                reportSubtext: {
                  fontSize: 16,
                  color: '#888',
                },
                reportButton: {
                  backgroundColor: '#F2E527',
                  padding: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginBottom: 20,
                },
                reportButtonText: {
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold',
                },
                scrollViewContent: {
                  paddingVertical: 40,
                  paddingHorizontal: 20,
                },
                containerIQ: {
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingBottom: 150, // Ajusta según sea necesario
                  paddingTop: 10,
                },
                 todayText: {
                      fontSize: 16,
                      color: '#9E9E9E',
                      marginBottom: 10,
                      marginTop: 10,
                    },
                    cityText: {
                      fontSize: 28,
                      color: '#333',
                      fontWeight: 'bold',
                      marginBottom: 10,
                      marginTop: 10,
                    },
                    dateText: {
                      fontSize: 14,
                      color: '#9E9E9E',
                      marginBottom: 20,
                    },
                    weatherContainer: {
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 30,
                    },
                    weatherIcon: {
                      width: 50,
                      height: 50,
                      marginRight: 15,
                    },
                    temperatureText: {
                      fontSize: 48,
                      color: '#333',
                      fontWeight: 'bold',
                    },
                    weatherText: {
                      fontSize: 16,
                      color: '#9E9E9E',
                      marginBottom: 10,
                    },
                    weatherDetailsContainer: {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      marginBottom: 20,
                    },
                    weatherDetail: {
                      alignItems: 'center',
                    },
                    detailIcon: {
                      width: 30,
                      height: 30,
                      marginBottom: 5,
                    },
                    weatherDetailsText: {
                      fontSize: 14,
                      color: '#9E9E9E',
                    },
                    airQualityTitle: {
                      fontSize: 24,
                      color: '#333',
                      fontWeight: 'bold',
                      marginBottom: 10,
                      marginTop: 10,
                    },
                    airQualityContainer: {
                      alignItems: 'center',
                      marginBottom: 20,
                    },
                    airQualityText: {
                      fontSize: 18,
                      color: '#333',
                      marginBottom: 10,
                      marginTop: 10,
                    },
                    aqiText: {
                      fontSize: 18,
                      color: '#1E90FF',
                      marginBottom: 5,
                    },
                    mainPollutantText: {
                      fontSize: 16,
                      color: '#9E9E9E',
                      marginBottom: 10,
                    },
                    warningIcon: {
                      width: 50,
                      height: 50,
                    },
                  footer: {
                    position: 'absolute',
                    bottom: 90, // Ajusta este valor según sea necesario para bajar el footer
                    width: '120%', // Ajusta el ancho al 100%
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: '#1E90FF',
                  },
                    logo: {
                      width: 100, // Aumenta el ancho del logo
                      height: 40, // Aumenta la altura del logo
                      resizeMode: 'contain', // Asegúrate de que el logo se ajuste al tamaño del contenedor
                    },
                    errorText: {
                      color: 'red',
                      fontSize: 16,
                    },
                    modalContainer: {
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    modalContent: {
                      width: 300,
                      padding: 20,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      alignItems: 'center',
                    },
                    modalTitle: {
                      fontSize: 18,
                      marginBottom: 10,
                    },
                    datePickerText: {
                      fontSize: 16,
                      marginVertical: 10,
                    },
                    mapContainer: {
                      borderRadius: 10,
                      overflow: 'hidden',
                      marginTop: 20,
                      height: 200,
                    },
                    map: {
                      width: '100%',
                      height: '100%',
                    },
                    syncButton: {
                      backgroundColor: '#2B2C5E',
                      borderRadius: 10,
                      padding: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 20,
                    },
                    syncButtonText: {
                      color: '#fff',
                      marginLeft: 10,
                    },
                    closeScannerButton: {
                      position: 'absolute',
                      bottom: 50,
                      left: '50%',
                      transform: [{ translateX: -50 }],
                      backgroundColor: '#2B2C5E',
                      padding: 15,
                      borderRadius: 10,
                    },
                    closeScannerButtonText: {
                      color: '#fff',
                      textAlign: 'center',
                    },
});
