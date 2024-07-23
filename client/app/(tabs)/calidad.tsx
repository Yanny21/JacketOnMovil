import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Asegúrate de tener instalada esta librería
import { useRouter } from 'expo-router';

// Asegúrate de definir tu API Key y la URL base de tu servidor backend
const API_KEY = '57f703f3-d073-4840-9b44-f4542d5ed860';
const BACKEND_URL = 'http://10.13.6.149:3000/';  // URL del backend
const LATITUDE = '19.4326';  // Coordenadas de México City
const LONGITUDE = '-99.1332';

export default function Calidad() {
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen);
  };

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
      <View style={styles.containerV}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.containerIQ}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerIQ}>
     <Text style={styles.headerP}>Calidad de aire en tu zona</Text>
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

      {/* Barra de navegación */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/asignaAct')}>
          <Icon name="view-list" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/graficasyrep')}>
          <Icon name="alert-circle" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/metricas')}>
          <Icon name="account-group" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/porfile')}>
          <Icon name="account" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="cloud" size={30} color="#F2E527" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
