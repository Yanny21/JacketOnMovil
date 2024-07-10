import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Text, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useLocalSearchParams } from 'expo-router';

const Actividades = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState('');
  const { id_usu, name, id_act } = useLocalSearchParams();
  const [actividad, setActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [area, setArea] = useState('');

  // Nuevo estado para almacenar los detalles de la actividad
  const [activityDetails, setActivityDetails] = useState(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Obtener detalles de la actividad cuando el componente se monte
    fetchActivityDetails();

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const fetchActivityDetails = async () => {
    try {
      const response = await fetch(`http://192.168.100.11:3000/actividades/${id_act}`);
      const data = await response.json();
      if (response.ok) {
        setActivityDetails(data);
        // Llenar los campos con los detalles obtenidos
        setActividad(data.actividad);
        setDescripcion(data.descripcion);
        setArea(data.area);
        setSelectedDate(data.fech_ini);
        setSelectedDate2(data.fech_fin);
      } else {
        Alert.alert('Error', 'No se pudo obtener los detalles de la actividad');
      }
    } catch (error) {
      console.error('Error al obtener los detalles de la actividad:', error);
      Alert.alert('Error', 'Error al obtener los detalles de la actividad');
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

  const handleAssign = async () => {
    try {
      const response = await fetch('http://192.168.100.11:3000/insertar-actividad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actividad: actividad,
          descripcion: descripcion,
          area: area,
          fech_ini: selectedDate,
          fech_fin: selectedDate2,
          id_usu_asignado: id_usu,
          id_usu_que_asigno: 4,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        Alert.alert(
          'Éxito',
          'Actividad asignada correctamente',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Error',
          'Error al asignar la actividad',
          [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      Alert.alert(
        'Error',
        'Error al enviar la solicitud',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
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
            <Text style={styles.title}>Asignar actividad para:</Text>
            <Text style={styles.subtitle}>{name}</Text>
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
                placeholder="Fecha de inicio"
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
                placeholder="Fecha de finalización"
                placeholderTextColor="#FFFFFF"
                value={selectedDate2}
                editable={false}
              />
              <TouchableOpacity onPress={showDatePicker2}>
                <FontAwesome name="calendar" size={22} color="#F2E527" style={styles.icon} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.Button} onPress={handleAssign}>
              <Text style={styles.ButtonText}>Asignar</Text>
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
};

export default Actividades;
