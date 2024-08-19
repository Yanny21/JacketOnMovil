import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const ChartComponentTemp = ({ onAverageCalculated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lineColor, setLineColor] = useState('#000000'); // Color por defecto

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
            y: point.Temperature !== null ? point.Temperature : null // Reemplazar null si es necesario
          }));

          setData(validData);
          setLoading(false);

          // Calcular promedio, ignorando valores nulos
          const validValues = validData.filter(point => point.y !== null);
          const average = validValues.reduce((acc, point) => acc + point.y, 0) / validValues.length;
          if (onAverageCalculated) {
            onAverageCalculated(average);
          }

          // Cambiar el color de la línea según la última temperatura registrada
          const lastTemp = validValues[validValues.length - 1]?.y;
          if (lastTemp !== undefined) {
            if (lastTemp < 15) {
              setLineColor('#0000FF'); // Azul para temperaturas frías
            } else if (lastTemp >= 15 && lastTemp < 30) {
              setLineColor('#00FF00'); // Verde para temperaturas moderadas
            } else {
              setLineColor('#FF0000'); // Rojo para temperaturas altas
            }
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

  // Formatear fechas para incluir fecha y hora
  const formatLabel = (timestamp) => {
    return moment(timestamp).tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss');
  };

  // Determinar el valor máximo para el eje Y (temperaturas en grados Celsius)
  const maxY = Math.max(...data.map(point => point.y || 0), 0);
  const yAxisInterval = 5; // Intervalo adecuado para temperaturas en °C

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
            yAxisSuffix="°C"
            yLabelsOffset={5}
            xLabelsOffset={5}
            chartConfig={{
              backgroundColor: '#7d7d7d', // un tono gris medio
              backgroundGradientFrom: '#555555', // gris oscuro
              backgroundGradientTo: '#aaaaaa', // gris claro                
              decimalPlaces: 2,
              color: () => lineColor, // Cambiar el color según la última temperatura
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
              yAxisInterval: yAxisInterval, // Escala adecuada para °C
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            yAxisMin={0} // Establecer mínimo del eje Y a 0
            yAxisMax={maxY + yAxisInterval} // Agregar un margen adicional al máximo del eje Y
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ChartComponentTemp;
