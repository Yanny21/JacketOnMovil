import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Modal, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import { Platform } from 'react-native';
import { Buffer } from 'buffer';


export default function AsignaAct() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [userType, setUserType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const router = useRouter();

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { user_type } = JSON.parse(userData);
          setUserType(user_type);
          if (user_type !== 'supervisor') {
            router.push('/actEmp');
            return;
          }
        } else {
          router.push('/actEmp');
          return;
        }
        fetchEmpleados();
      } catch (error) {
        console.error('Error al obtener el tipo de usuario:', error);
        router.push('/actEmp');
      }
    };

    checkUserType();
  }, []);

  const fetchEmpleados = async () => {
    try {
      const response = await fetch('http://192.168.3.15:3000/empleados');
      if (!response.ok) {
        throw new Error('Error al obtener empleados');
      }
      const data = await response.json();
      setEmpleados(data.empleados);
      setFilteredEmpleados(data.empleados);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (screen) => {
    router.push(screen);
  };

  const handleEmployeePress = (employee) => {
    router.push({
      pathname: '/detallesAct',
      params: {
        name: `${employee.nom_usu} ${employee.app_usu}`,
        id_emp: employee.id_usu,
      },
    });
  };

  const handleSearch = (text) => {
    const lowerCaseQuery = text.toLowerCase();
    const filteredData = empleados.filter((empleado) =>
      empleado.nom_usu.toLowerCase().includes(lowerCaseQuery) || empleado.app_usu.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredEmpleados(filteredData);
  };

  const handleGenerateReport = () => {
    setModalVisible(true);
  };

 // Helper function to convert blob to Base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Extract base64 part from data URL
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const handleGenerate = async () => {
  try {
    // Fetch the PDF from the server
    const response = await fetch('http://192.168.3.15:3000/generate-report?startDate=' + startDate.toISOString().split('T')[0] + '&endDate=' + endDate.toISOString().split('T')[0]);
    const blob = await response.blob();
    const base64Data = await blobToBase64(blob);
    const fileUri = FileSystem.documentDirectory + 'report.pdf';

    // Write the file in Base64 encoding
    await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

    // Open the file
    await Print.printAsync({
      uri: fileUri,
    });

    setModalVisible(false);
  } catch (error) {
    console.error('Error generating or opening PDF:', error);
  }
};
  

  const handleDateChange = (event, selectedDate, setDate) => {
    const currentDate = selectedDate || new Date();
    setDate(currentDate);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (userType !== 'admin' && userType !== 'supervisor') {
    router.push('/actividad');
    return null;
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
      <TouchableOpacity style={styles.reportButton} onPress={handleGenerateReport}>
        <Text style={styles.reportButtonText}>Generar Reporte</Text>
      </TouchableOpacity>
      <Text style={styles.headerP}>Asignar Actividades</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#F2E527" />
      ) : (
        <ScrollView style={styles.employeeList}>
          {filteredEmpleados.map((employee, index) => (
            <TouchableOpacity key={index} onPress={() => handleEmployeePress(employee)}>
              <View style={styles.employeeCard}>
                <Text style={styles.employeeName}>{employee.nom_usu} {employee.app_usu}</Text>
                <Text style={styles.employeeId}>Empleado #{employee.id_usu}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navButton}>
          <Icon name="view-list" size={30} color="#F2E527" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => handleNavigation('/graficasyrep')}>
          <Icon name="alert-circle" size={30} color="#71728a" />
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

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Generar Reporte</Text>
            <Text style={styles.datePickerText}>Fecha de inicio:</Text>
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, date) => handleDateChange(event, date, setStartDate)}
            />
            <Text style={styles.datePickerText}>Fecha límite:</Text>
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, date) => handleDateChange(event, date, setEndDate)}
            />
            <Button title="Generar" onPress={handleGenerate} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}
