import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { styles } from './styles';

const AmbientalScreen = () => {
  const [iconColors, setIconColors] = useState({
    home: '#71728a',
    alertCircle: '#71728a',
    person: '#FFD700',
    chatbubbles: '#71728a',
    settings: '#71728a',
  });

  const router = useRouter();

  const handleNavigation = (screen, icon) => {
    router.push(screen); // Navegar a la pantalla específica
    setIconColors(prevState => ({
      ...prevState,
      [icon]: '#F2E527', // Cambiar al color deseado al ser presionado
    }));
  };

  return (
    <View style={styles.containerV}>
      <Text style={styles.employeeName}>John Doe</Text>

      <View style={styles.metricsButtons}>
        <TouchableOpacity style={styles.metricButtonActive}>
          <Text style={styles.metricButtonTextActive}>Métricas ambientales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.metricButtonInactive}>
          <Text style={styles.metricButtonTextInactive}>Métricas vitales</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricTitles}>
          <Text style={styles.metricTitle}>Temp</Text>
          <Text style={styles.metricTitle}>O2</Text>
          <Text style={styles.metricTitle}>Contaminación</Text>
          <Text style={styles.metricTitle}>Humedad</Text>
          <Text style={styles.metricTitle}>CO2</Text>
        </View>

        <View style={styles.chartContainer}>
          {/* Placeholder for the chart */}
          <View style={styles.chartPlaceholder} />
        </View>

        <View style={styles.metricsSummary}>
          <Text style={styles.metricSummaryText}>34.1</Text>
          <Text style={styles.metricSummaryText}>10%</Text>
        </View>
        <View style={styles.metricsSummaryLabels}>
          <Text style={styles.metricSummaryLabel}>Avg temp</Text>
          <Text style={styles.metricSummaryLabel}>Avg O2</Text>
        </View>
      </View>

      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/home', 'home')}
        >
          <Icon name="home" size={30} color={iconColors.home} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/alert', 'alertCircle')}
        >
          <Icon name="alert-circle" size={30} color={iconColors.alertCircle} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/profile', 'person')}
        >
          <Icon name="person" size={30} color={iconColors.person} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/chat', 'chatbubbles')}
        >
          <Icon name="chatbubbles" size={30} color={iconColors.chatbubbles} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/settings', 'settings')}
        >
          <Icon name="settings" size={30} color={iconColors.settings} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AmbientalScreen;
