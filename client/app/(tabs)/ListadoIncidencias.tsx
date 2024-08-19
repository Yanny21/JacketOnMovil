import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export default function IncidenciasList() {
  const [incidencias, setIncidencias] = useState([]);
  const [filteredIncidencias, setFilteredIncidencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const router = useRouter();

  useEffect(() => {
    fetchIncidencias();
  }, []);

  const fetchIncidencias = async () => {
    try {
      const response = await fetch('http://192.168.0.15:3000/incidencias'); // Adjust the URL as necessary
      if (!response.ok) {
        throw new Error('Error fetching incidents');
      }
      const data = await response.json();
      setIncidencias(data);
      setFilteredIncidencias(data);
    } catch (error) {
      console.error('Error fetching incidents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const handleSearch = (text) => {
    const lowerCaseQuery = text.toLowerCase();
    const filteredData = incidencias.filter((incidencia) =>
      incidencia.descripcion.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredIncidencias(filteredData);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.containerV}>
      <View style={styles.searchBarContainer}>
        <Icon name="magnify" size={30} color="#F2E527" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar..."
          placeholderTextColor="#71728a"
          onChangeText={handleSearch}
        />
      </View>
      <Text style={styles.headerP}>Listado de Incidencias</Text>
      <ScrollView style={styles.incidentList}>
        {filteredIncidencias.map((incidencia, index) => (
          <View key={index} style={styles.incidentCard}>
            <Text style={styles.incidentDate}>{new Date(incidencia.fech_inci).toLocaleDateString()}</Text>
            <Text style={styles.incidentDescription}>{incidencia.descripcion}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/asignaAct')}>
          <Icon name="view-list" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/ListadoIncidencias')}>
          <Icon name="alert-circle" size={30} color="#F2E527" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/metricas')}>
          <Icon name="account-group" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/porfile')}>
          <Icon name="account" size={30} color="#71728a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/calidad')}>
          <Icon name="cloud" size={30} color="#71728a" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
