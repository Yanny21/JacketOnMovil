import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export default function GraficaReportes() {
  const [selectedTab, setSelectedTab] = useState('Incidencias');
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.headerV}>Incidencias</Text>
        <View style={styles.chart}>
          {/* Aquí puedes agregar tu componente de gráfica */}
        </View>
        <View style={styles.reportContainer}>
          <Text style={styles.reportText}>34.1</Text>
          <Text style={styles.reportSubtext}>Promedio mensual</Text>
          <Text style={styles.reportText}>10%</Text>
          <Text style={styles.reportSubtext}>Incremento respecto al mes anterior</Text>
        </View>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => handleNavigation('/reporte')}
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
          style={[styles.tabButton, selectedTab === 'Incidencias' && styles.activeTabButton]}
          onPress={() => setSelectedTab('Incidencias')}
        >
          <Text style={styles.tabText}>Incidencias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'CO2' && styles.activeTabButton]}
          onPress={() => setSelectedTab('CO2')}
        >
          <Text style={styles.tabText}>CO2</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderContent()}
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/asignaAct')}
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
          onPress={() => handleNavigation('/metricas')}
        >
          <Icon name="account-group" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/porfile')}
        >
          <Icon name="account" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/calidad')}
        >
          <Icon name="cloud" size={30} color="#71728a" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
