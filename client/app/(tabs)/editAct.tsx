import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Text, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

const EditAct = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState('');
  const { id } = useLocalSearchParams(); // Obtener id_act y id_usu de los parámetros de la ruta
  const [actividad, setActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    fetchActivityDetails();
  }, []);

const fetchActivityDetails = async () => {
  try {
    const response = await axios.get(`http://10.13.0.115:3000/edit-act/${id}`);
    const activityData = response.data; // Suponiendo que response.data es un objeto con los datos de la actividad

    console.log('Datos de la actividad:', activityData);

    if (activityData) {
      setActividad(activityData.actividad || ''); // Manejar el caso donde actividad sea undefined o null
      setDescripcion(activityData.descripcion || ''); // Manejar el caso donde descripcion sea undefined o null
      setArea(activityData.area || ''); // Manejar el caso donde area sea undefined o null
      setSelectedDate(activityData.fech_asig || ''); // Manejar el caso donde fech_asig sea undefined o null
      setSelectedDate2(activityData.fech_lim || ''); // Manejar el caso donde fech_lim sea undefined o null
    } else {
      // Manejo del caso donde no se encuentran datos para la actividad
      console.error('No se encontraron datos para la actividad');
    }
  } catch (error) {
    console.error('Error al obtener los detalles de la actividad:', error);
    Alert.alert('Error', 'No se pudo cargar los detalles de la actividad');
  }
};

  const handleIconPress = () => {
    console.log('Icono presionado');
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);
    hideDatePicker();
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate2(formattedDate);
    hideDatePicker2();
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://10.13.0.115:3000/actividades/${id_act}`, {
        actividad: actividad,
        descripcion: descripcion,
        area: area,
        fech_asig: selectedDate,
        fech_lim: selectedDate2,
        id_usu_asignado: id_usu,
        id_usu_que_asigno: 4, // Ejemplo, ajusta según tu lógica de asignación
      });
      console.log('Respuesta del servidor:', response.data);

      if (response.status === 200) {
        Alert.alert(
          'Éxito',
          'Actividad editada correctamente',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Error',
          'Error al editar la actividad',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      Alert.alert(
        'Error',
        'Error al enviar la solicitud',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={handleIconPress}>
              <FontAwesome name="times" size={22} color="#F2E527" />
            </TouchableOpacity>
            <Text style={styles.title}>Editar actividad:</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre de la actividad"
                placeholderTextColor="#A9A9A9"
                value={actividad}
                onChangeText={setActividad}
              />
              <Feather name="edit" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.textArea]}
                multiline={true}
                numberOfLines={4}
                placeholder="Descripción"
                placeholderTextColor="#A9A9A9"
                value={descripcion}
                onChangeText={setDescripcion}
              />
              <MaterialIcons name="insert-drive-file" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Area"
                placeholderTextColor="#A9A9A9"
                value={area}
                onChangeText={setArea}
              />
              <MaterialIcons name="edit" size={24} color="#F2E527" style={styles.icon} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Fecha de asignación"
                placeholderTextColor="#FFFFFF"
                value={selectedDate}
                editable={false}
              />
              <TouchableOpacity onPress={showDatePicker}>
                <FontAwesome name="calendar" size={22} color="#F2E527" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Fecha límite"
                placeholderTextColor="#FFFFFF"
                value={selectedDate2}
                editable={false}
              />
              <TouchableOpacity onPress={showDatePicker2}>
                <FontAwesome name="calendar" size={22} color="#F2E527" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.Button} onPress={handleEdit}>
              <Text style={styles.ButtonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible2}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDatePicker2}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default EditAct;
