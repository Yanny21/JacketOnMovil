import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import ChartComponent from './ChartComponent'; // Ajusta la ruta según sea necesario
import { styles } from './styles';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';

export default function GraficaReportesEmp() {
  const [selectedTab, setSelectedTab] = useState('Ambientales');
  const [average, setAverage] = useState(null);
  const [pdfUri, setPdfUri] = useState(null);
  const router = useRouter();

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const handleAverageCalculated = (avg) => {
    setAverage(avg);
  };

  const generatePdf = async () => {
    try {
      const fetchWithTimeout = async (url, options, timeout = 10000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
  
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
      };
  
      const response = await fetchWithTimeout('http://192.168.3.15:3000/generate-report-chart', {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const pdfBase64 = await blobToBase64(blob);
  
        // Save the PDF to the file system
        const fileUri = FileSystem.documentDirectory + 'report-chart.pdf';
        await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        // Open the PDF file
        await Print.printAsync({ uri: fileUri });
  
      } else {
        Alert.alert('Error', 'No se pudo generar el reporte. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert('Error', 'Ocurrió un error al generar el reporte.');
    }
  };
  

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]); // Get the base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const interpretAverage = (avg) => {
    if (avg < 1000) {
      return 'Nivel normal';
    } else if (avg >= 1000 && avg <= 1800) {
      return 'Nivel moderado';
    } else if (avg > 1801 && avg <= 2000) {
      return 'Nivel alto';
    } else if (avg > 2000) {
      return 'Nivel muy alto';
    } else {
      return 'Datos no disponibles';
    }
  };

  const renderContent = () => {
    const interpretation = average !== null ? interpretAverage(average) : 'Cargando...';
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.headerV}>Ambientales (CO)</Text>
        <View style={styles.chartContainer}>
          <ChartComponent onAverageCalculated={handleAverageCalculated} />
        </View>
        <View style={styles.reportContainer}>
          <Text style={styles.reportText}>{average !== null ? average.toFixed(2) : 'Cargando...'}</Text>
          <Text style={styles.reportSubtext}>Promedio</Text>
          <Text style={styles.reportSubtext}>{interpretation}</Text>
        </View>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={generatePdf}
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
