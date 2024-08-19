import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ChartComponent135 = ({ onAverageCalculated }) => {
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

          // Validar y formatear datos
          const validData = fetchedData.map(point => ({
            x: point.timestamp,
            y: point.MQ135_AO !== null ? point.MQ135_AO : null // Interpretar datos
          }));

          setData(validData);
          setLoading(false);

          // Calcular promedio
          const validValues = validData.filter(point => point.y !== null);
          const average = validValues.reduce((acc, point) => acc + point.y, 0) / validValues.length;
          if (onAverageCalculated) {
            onAverageCalculated(average);
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

  // Formatear etiquetas de tiempo
  const formatLabel = (timestamp) => {
    return moment(timestamp).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss');
  };

  // Definir valor máximo para el eje Y
  const maxY = Math.max(...data.map(point => point.y || 0), 0);
  const minY = 0;
  const yAxisInterval = 600; // Intervalo en la escala de calidad del aire
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
                  data: data.map(point => point.y), // Lecturas analógicas
                },
              ],
            }}
            width={Math.max(width, data.length * 150)} // Ajuste dinámico del ancho
            height={Math.max(height * 0.4, 300)} // Incrementar la altura del gráfico
            yAxisLabel=""
            yAxisSuffix=" PM" // Indicador de particulado
            yLabelsOffset={5}
            xLabelsOffset={5}
            chartConfig={{
              backgroundColor: '#4e5d6c', // un tono de gris azulado
              backgroundGradientFrom: '#3a4b59', // un gris azulado más oscuro
              backgroundGradientTo: '#6a7a8b', // un gris azulado más claro
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
                fontSize: 10, // Ajustar el tamaño de la fuente de las etiquetas
              },
              yAxisLabel: '',
              yAxisSuffix: ' PM', // Unidades en el eje y
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

export default ChartComponent135;
