import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ChartComponentHR = ({ onAverageCalculated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el valor de 'user_device' desde AsyncStorage
        const userData = await AsyncStorage.getItem('userData');

        if (userData) {
          const { user_device } = JSON.parse(userData);
          console.log('Dispositivo de usuario recuperado:', user_device); // Mostrar el tipo de usuario en el log

          // Hacer la solicitud con el parámetro 'collection'
          const response = await axios.get(`http://192.168.0.15:3000/data?collection=${user_device}`);
          const fetchedData = response.data;

          console.log('Fetched Data:', fetchedData);

          // Validar y formatear los datos
          const validData = fetchedData.map(point => ({
            x: point.timestamp,
            yHeartRate: point.HeartRate !== null ? point.HeartRate : null,
            ySpO2: point.SpO2 !== null ? point.SpO2 : null
          }));

          setData(validData);
          setLoading(false);

          // Calcular promedio de frecuencia cardíaca ignorando valores nulos
          const validHeartRateValues = validData.filter(point => point.yHeartRate !== null);
          const averageHeartRate = validHeartRateValues.reduce((acc, point) => acc + point.yHeartRate, 0) / validHeartRateValues.length;
          if (onAverageCalculated) {
            onAverageCalculated(averageHeartRate);
          }
        } else {
          setError('No user device found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  // Formatear las etiquetas de los tiempos
  const formatLabel = (timestamp) => {
    return moment(timestamp).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss');
  };

  // Determinar los valores máximo y mínimo del eje Y
  const allYValues = data.flatMap(point => [point.yHeartRate, point.ySpO2]);
  const maxY = Math.max(...allYValues.filter(val => val !== null), 0);
  const minY = Math.min(...allYValues.filter(val => val !== null), 0);
  const yAxisInterval = 10; // Ajustar según el rango de datos
  const yAxisLabels = Array.from({ length: Math.ceil((maxY - minY) / yAxisInterval) + 1 }, (_, i) => i * yAxisInterval);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal contentContainerStyle={{ paddingVertical: 10 }}>
        <View style={{ paddingRight: 20 }}>
          <LineChart
            data={{
              labels: data.map(point => formatLabel(point.x)),
              datasets: [
                {
                  data: data.map(point => point.yHeartRate), // Datos de frecuencia cardíaca
                  color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Color rojo para Heart Rate
                },
                {
                  data: data.map(point => point.ySpO2), // Datos de SpO2
                  color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Color azul para SpO2
                }
              ],
            }}
            width={Math.max(width, data.length * 150)} // Ancho dinámico
            height={Math.max(height * 0.4, 300)} // Altura dinámica
            yAxisLabel=""
            yAxisSuffix=""
            yLabelsOffset={5}
            xLabelsOffset={5}
            chartConfig={{
              backgroundColor: '#7d7d7d', // un tono gris medio
              backgroundGradientFrom: '#555555', // gris oscuro
              backgroundGradientTo: '#aaaaaa', // gris claro              
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
              propsForBackgroundLines: {
                stroke: "#ffffff",
                strokeDasharray: "", // Líneas de fondo sólidas
              },
              propsForLabels: {
                fontSize: 10, // Ajustar tamaño de fuente de etiquetas
              },
              yAxisLabel: '',
              yAxisSuffix: '',
              yAxisInterval: yAxisInterval,
              yAxisLabelCount: yAxisLabels.length
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChartComponentHR;
