import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ChartComponentHum = ({ onAverageCalculated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [color, setColor] = useState('#ffa726'); // Color por defecto

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
            y: point.Humidity !== null ? point.Humidity : null // Reemplazar null si es necesario
          }));

          setData(validData);
          setLoading(false);

          // Calcular el promedio, ignorando valores nulos
          const validValues = validData.filter(point => point.y !== null);
          const average = validValues.reduce((acc, point) => acc + point.y, 0) / validValues.length;
          if (onAverageCalculated) {
            onAverageCalculated(average);
          }

          // Cambiar el color basado en la última lectura de humedad
          const lastReading = validValues[validValues.length - 1]?.y || 0;
          if (lastReading > 80) {
            setColor('#ff0000'); // Alto nivel de humedad, color rojo
          } else if (lastReading > 60) {
            setColor('#ffa500'); // Humedad moderada, color naranja
          } else {
            setColor('#00ff00'); // Humedad baja, color verde
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

  // Formatear las fechas para mostrar la fecha y la hora
  const formatLabel = (timestamp) => {
    return moment(timestamp).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss');
  };

  // Determinar el valor máximo para el eje Y (100% de humedad máxima)
  const maxY = Math.max(...data.map(point => point.y || 0), 0);
  const minY = 0;
  const yAxisInterval = 10; // Escala en porcentajes
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
                  data: data.map(point => point.y), // Manejar datos nulos
                },
              ],
            }}
            width={Math.max(width, data.length * 150)} // Ajuste dinámico del ancho
            height={Math.max(height * 0.4, 300)} // Incrementar la altura del gráfico
            yAxisLabel=""
            yAxisSuffix="%"
            yLabelsOffset={5}
            xLabelsOffset={5}
            chartConfig={{
                backgroundColor: '#0072bb', // azul medio
                backgroundGradientFrom: '#005f99', // azul oscuro
                backgroundGradientTo: '#66b2ff', // azul claro                               
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: color, // Cambia el color basado en la última lectura
              },
              propsForBackgroundLines: {
                stroke: "#ffffff",
                strokeDasharray: "", // Líneas de fondo sólidas
              },
              propsForLabels: {
                fontSize: 10, // Ajustar el tamaño de la fuente de las etiquetas
              },
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

export default ChartComponentHum;
