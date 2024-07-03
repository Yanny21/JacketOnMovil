import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export default function MetricasAmbVitales() {
  const [selectedTab, setSelectedTab] = useState('Ambientales');
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
      <Text style={styles.headerV}>Metricas de: </Text>
        <Text style={styles.headerV}>Métricas Ambientales</Text>
        <View style={styles.chart}>
          {/* Aquí puedes agregar tu componente de gráfica */}
        </View>
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
          onPress={() => handleNavigation('/asignaAct')}
        >
          <Icon name="view-list" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/graficasyrep')}
        >
          <Icon name="alert-circle" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/metricas')}
        >
          <Icon name="account-group" size={30} color="#F2E527" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/porfile')}
        >
          <Icon name="account" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('/screen5')}
        >
          <Icon name="cloud" size={30} color="#71728a" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
