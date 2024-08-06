import React, { useState, useEffect } from 'react';
import { View, Dimensions, Text, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const ChartComponent = ({ onAverageCalculated }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://192.168.3.15:3000/data')
      .then(response => {
        const fetchedData = response.data;

        // Validate and format data
        const validData = fetchedData.map(point => ({
          x: point.x,
          y: point.y !== 0 ? point.y : null // Replace 0 with null
        }));

        setData(validData);
        setLoading(false);

        // Calculate average, ignoring null values
        const validValues = validData.filter(point => point.y !== null);
        const average = validValues.reduce((acc, point) => acc + point.y, 0) / validValues.length;
        if (onAverageCalculated) {
          onAverageCalculated(average);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      });
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

  // Format dates to include both date and time
  const formatLabel = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Includes both date and time
  };

  // Determine maximum value for y-axis
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
                  data: data.map(point => point.y), // Use nulls for missing data
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

export default ChartComponent;
