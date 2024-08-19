import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ChartComponent7 = ({ onAverageCalculated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDevice, setUserDevice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el valor de 'user_device' desde AsyncStorage
        const userData = await AsyncStorage.getItem('userData');

        if (userData) {
          const {user_device } = JSON.parse(userData);
          console.log('Dispositivo de usuario recuperado:', user_device); // Mostrar el tipo de usuario en el log
          setUserDevice(user_device);
          const response = await axios.get(`http://192.168.0.15:3000/data?collection=${user_device}`);
          const fetchedData = response.data;

          console.log('Fetched Data:', fetchedData);

          // Validar y formatear los datos
          const validData = fetchedData.map(point => ({
            x: point.timestamp,
            y: point.MQ7_AO !== null ? point.MQ7_AO : null // Reemplazar null si es necesario
          }));

          setData(validData);
          setLoading(false);

          // Calcular promedio, ignorando valores nulos
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
        if (error.response && error.response.status === 404) {
          setError('No existe un dispositivo vinculado');
        } else {
          setError('Error fetching data');
        }
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

  // Formatear fechas para incluir fecha y hora
  const formatLabel = (timestamp) => {
    return moment(timestamp).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss');
  };

  // Determinar el valor máximo para el eje Y
  const maxY = Math.max(...data.map(point => point.y || 0), 0);
  const minY = 0;
  const yAxisInterval = 600;
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
                  data: data.map(point => point.y), // Usar null para datos faltantes
                },
              ],
            }}
            width={Math.max(width, data.length * 150)} // Ajuste dinámico del ancho
            height={Math.max(height * 0.4, 300)} // Incrementar la altura del gráfico
            yAxisLabel=""
            yAxisSuffix=" PM"
            yLabelsOffset={5}
            xLabelsOffset={5}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
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
              yAxisSuffix: ' PM',
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

export default ChartComponent7;
