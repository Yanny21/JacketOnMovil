import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import ChartComponent from './ChartComponent'; // Ajusta la ruta según sea necesario
import { styles } from './styles';

export default function GraficaReportesEmp() {
  const [selectedTab, setSelectedTab] = useState('Ambientales');
  const [average, setAverage] = useState(null);
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const handleAverageCalculated = (avg) => {
    setAverage(avg);
  };

  const handleGenerateReport = async () => {
    try {
      const response = await fetch('http://192.168.3.15:3000/generate-report-chart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'No se pudo generar el reporte. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert('Error', 'Ocurrió un error al generar el reporte.');
    }
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.headerV}>Ambientales (CO)</Text>
        <View style={styles.chartContainer}>
          <ChartComponent onAverageCalculated={handleAverageCalculated} />
        </View>
        <View style={styles.reportContainer}>
          <Text style={styles.reportText}>{average !== null ? average.toFixed(2) : 'Cargando...'}</Text>
          <Text style={styles.reportSubtext}>Promedio</Text>
        </View>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={handleGenerateReport}
        >
          <Text style={styles.reportButtonText}>Generar reporte</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.containerV}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Ambientales' && styles.activeTabButton]}
          onPress={() => setSelectedTab('Ambientales')}
        >
          <Text style={styles.tabText}>Ambientales</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'Vitales' && styles.activeTabButton]}
          onPress={() => setSelectedTab('Vitales')}
        >
          <Text style={styles.tabText}>Vitales</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderContent()}
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/actEmp')}
        >
          <Icon name="view-list" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
        >
          <Icon name="alert-circle" size={30} color="#F2E527" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/profile')}
        >
          <Icon name="account" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/calidadEmp')}
        >
          <Icon name="cloud" size={30} color="#71728a" />
        </TouchableOpacity>
      </View>
    </View>
  );
}