import React, { useState , useEffect} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import ChartComponent7 from './ChartComponent7'; // Ajusta el path según sea necesario
import ChartComponent135 from './ChartComponent135';
import ChartComponentHR from './ChartComponentHR';
import ChartComponentHum from './ChartComponentHum';
import ChartComponentTemp from './ChartComponentTemp';
import { styles } from './styles';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure this is imported


export default function GraficaReportesEmp() {
  const [userDevice, setUserDevice] = useState(null);
  const [selectedTab, setSelectedTab] = useState('Ambientales');
  const [selectedMetric, setSelectedMetric] = useState('MQ7_AO');
  const [average, setAverage] = useState(null);
  const [pdfUri, setPdfUri] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserDevice = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { user_device } = JSON.parse(userData);
          setUserDevice(user_device);
          console.log('Dispositivo de usuario recuperado:', user_device); // Mostrar el tipo de usuario en el log
        }
      } catch (error) {
        console.error('Error al recuperar user_device:', error);
      }
    };

    fetchUserDevice();
  }, []);

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const handleAverageCalculated = (avg) => {
    setAverage(avg);
  };

  const getEndpointUrl = () => {
    if (!userDevice) return null; // Asegúrate de que userDevice esté disponible antes de construir la URL
    return `http://192.168.0.15:3000/generate-report-chart?metric=${selectedMetric}&user_device=${userDevice}`;
  };

  const generatePdf = async () => {
    try {
      const endpointUrl = getEndpointUrl();
      if (!endpointUrl) {
        Alert.alert('Error', 'No se pudo obtener el dispositivo del usuario.');
        return;
      }

      const fetchWithTimeout = async (url, options, timeout = 50000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
      };

      console.log('Endpoint URL:', endpointUrl); // Debugging line
      const response = await fetchWithTimeout(endpointUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });

      console.log('Response Status:', response.status); // Debugging line
      if (response.ok) {
        const blob = await response.blob();
        const pdfBase64 = await blobToBase64(blob);

        const fileUri = FileSystem.documentDirectory + 'report-chart.pdf';
        await FileSystem.writeAsStringAsync(fileUri, pdfBase64, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Print.printAsync({ uri: fileUri });
        console.log('PDF generated successfully:', fileUri); // Debugging line
      } else {
        const errorText = await response.text();
        console.error('Error Response:', errorText); // Debugging line
        Alert.alert('Error', `No se pudo generar el reporte. ${errorText}`);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      Alert.alert('Error', `Ocurrió un error al generar el reporte: ${error.message}`);
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

    if (selectedTab === 'Ambientales') {
      return (
        <View style={localStyles.contentContainer}>
          <Text style={localStyles.headerV}>Ambientales (CO)</Text>
          <Picker
            selectedValue={selectedMetric}
            style={localStyles.picker}
            onValueChange={(itemValue) => setSelectedMetric(itemValue)}
          >
            <Picker.Item label="MQ7" value="MQ7_AO" />
            <Picker.Item label="MQ135" value="MQ135_AO" />
            <Picker.Item label="HUMEDAD" value="Humidity" />
            <Picker.Item label="TEMP" value="Temperature" />
          </Picker>
          <View style={localStyles.chartContainer}>
            {selectedMetric === 'MQ7_AO' && <ChartComponent7 onAverageCalculated={handleAverageCalculated} />}
            {selectedMetric === 'MQ135_AO' && <ChartComponent135 onAverageCalculated={handleAverageCalculated} />}
            {selectedMetric === 'Humidity' && <ChartComponentHum onAverageCalculated={handleAverageCalculated} />}
            {selectedMetric === 'Temperature' && <ChartComponentTemp onAverageCalculated={handleAverageCalculated} />}
          </View>
          <View style={localStyles.reportContainer}>
            <Text style={localStyles.reportText}>{average !== null ? average.toFixed(2) : 'Cargando...'}</Text>
            <Text style={localStyles.reportSubtext}>Promedio</Text>
            <Text style={localStyles.reportSubtext}>{interpretation}</Text>
          </View>
          <TouchableOpacity
            style={localStyles.reportButton}
            onPress={generatePdf}
          >
            <Text style={localStyles.reportButtonText}>Generar reporte</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (selectedTab === 'Vitales') {
            // Change selectedMetric to 'heartrate' when Vitales tab is selected
            if (selectedMetric !== 'HeartRate') {
              setSelectedMetric('HeartRate');
            }
      return (
        <View style={localStyles.contentContainer}>
          <Text style={localStyles.headerV}>Vitales (HR)</Text>
          <View style={localStyles.chartContainer}>
            <ChartComponentHR onAverageCalculated={handleAverageCalculated} />
          </View>
          <View style={localStyles.reportContainer}>
            <Text style={localStyles.reportText}>{average !== null ? average.toFixed(2) : 'Cargando...'}</Text>
            <Text style={localStyles.reportSubtext}>Promedio</Text>
            <Text style={localStyles.reportSubtext}>{interpretation}</Text>
          </View>
          <TouchableOpacity
            style={localStyles.reportButton}
            onPress={generatePdf}
          >
            <Text style={localStyles.reportButtonText}>Generar reporte</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
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
      <ScrollView contentContainerStyle={localStyles.scrollViewContent}>
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

const localStyles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    flexGrow: 1, // Asegura que el contenedor de contenido tome el espacio disponible
  },
  headerV: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 72, // Ajuste del margen para mejor espaciado
    zIndex: 0, // Asegura que el Picker esté por encima de otros elementos
    elevation: 1, // Añade elevación en Android para que el Picker esté visible
  },
  chartContainer: {
    marginBottom: 16,
  },
  reportContainer: {
    marginBottom: 32, // Margen aumentado para mejor desplazamiento
  },
  reportText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4, // Añade margen para separar del texto secundario
  },
  reportSubtext: {
    fontSize: 14,
    color: '#555',
  },
  reportButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 24, // Margen aumentado para mejor desplazamiento
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  scrollViewContent: {
    paddingBottom: 50, // Asegura que el contenido ajuste bien en el scroll view
  },
});