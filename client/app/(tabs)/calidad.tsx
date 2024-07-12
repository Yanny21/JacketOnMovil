  import React, { useState, useEffect } from 'react';
  import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';

  // Asegúrate de definir tu API Key y la URL base de tu servidor backend
  const API_KEY = '57f703f3-d073-4840-9b44-f4542d5ed860';
  const BACKEND_URL = 'http://192.168.3.30:3000/';  // URL del backend
  const LATITUDE = '19.4326';  // Coordenadas de México City
  const LONGITUDE = '-99.1332';

  export default function Calidad() {
    const [airQuality, setAirQuality] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Llamada al endpoint del backend que a su vez llama a la API de AirVisual
          const response = await fetch(`${BACKEND_URL}getAir/${LATITUDE}/${LONGITUDE}`);
          const data = await response.json();

          if (response.ok) {
            setAirQuality(data.Result.pollution);
            setWeather(data.Result.weather);  // Obtén datos del clima
            setLoading(false);
          } else {
            throw new Error(data.message || 'Error al obtener los datos de calidad del aire');
          }
        } catch (err) {
          console.error(err);
          setError('Error al obtener los datos de calidad del aire');
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1E90FF" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.todayText}>Hoy</Text>
        <Text style={styles.cityText}>Mexico City</Text>
        <Text style={styles.dateText}>19-02-2021</Text>
        {weather && (
          <View style={styles.weatherContainer}>
            <Image
              source={{ uri: `http://www.airvisual.com/images/${weather.ic}.png` }}  // Reemplaza con la URL del ícono del clima adecuado
              style={styles.weatherIcon}
            />
            <Text style={styles.temperatureText}>{weather.tp}°</Text>
            <Text style={styles.weatherText}>{weather.ic}</Text>
          </View>
        )}
        <View style={styles.weatherDetailsContainer}>
          <View style={styles.weatherDetail}>
            <Image source={require('./assets/images/wind-icon.png')} style={styles.detailIcon} />
            <Text style={styles.weatherDetailsText}>{weather.ws} km/h</Text>
          </View>
          <View style={styles.weatherDetail}>
            <Image source={require('./assets/images/humidity-icon.png')} style={styles.detailIcon} />
            <Text style={styles.weatherDetailsText}>{weather.hu} %</Text>
          </View>
          <View style={styles.weatherDetail}>
            <Image source={require('./assets/images/pressure-icon.png')} style={styles.detailIcon} />
            <Text style={styles.weatherDetailsText}>{weather.pr} hPa</Text>
          </View>
        </View>
        <Text style={styles.airQualityTitle}>Calidad del aire:</Text>
        {airQuality && (
          <View style={styles.airQualityContainer}>
            <Text style={styles.airQualityText}>
              {airQuality.aqius <= 50
                ? 'Buena'
                : airQuality.aqius <= 100
                ? 'Moderada'
                : airQuality.aqius <= 150
                ? 'Perjudicial para grupos sensibles'
                : airQuality.aqius <= 200
                ? 'Perjudicial'
                : airQuality.aqius <= 300
                ? 'Muy perjudicial'
                : 'Peligroso'}
            </Text>
            <Text style={styles.aqiText}>{airQuality.aqius} ICA EE.UU.</Text>
            <Text style={styles.mainPollutantText}>Contaminante principal: {airQuality.mainus}</Text>
            <Image
              source={require('./assets/images/warning-icon.png')}  // Reemplaza con la URL del ícono de advertencia adecuado
              style={styles.warningIcon}
            />
          </View>
        )}
        <View style={styles.footer}>
          <Image source={require('./assets/images/iqair-logo.png')} style={styles.logo} />
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    todayText: {
      fontSize: 16,
      color: '#9E9E9E',
      marginBottom: 5,
    },
    cityText: {
      fontSize: 28,
      color: '#333',
      fontWeight: 'bold',
      marginBottom: 5,
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
    },
    airQualityContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    airQualityText: {
      fontSize: 18,
      color: '#333',
      marginBottom: 5,
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
      bottom: 0,
      width: '100%',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#1E90FF',
    },
    logo: {
      width: 100,
      height: 30,
    },
    errorText: {
      color: 'red',
      fontSize: 16,
    },
  });
