import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Text, Alert, ActivityIndicator } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditAct = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [selectedDate2, setSelectedDate2] = useState('');
  const { id_act } = useLocalSearchParams(); // Obtener id de la actividad
  const [actividad, setActividad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [area, setArea] = useState('');
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const router = useRouter();

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { user_type, user_id } = JSON.parse(userData);
          setUserType(user_type);
          setUserId(user_id);
          if (user_type !== 'supervisor') {
            router.push('/profile');
            return;
          }
        } else {
          router.push('/profile');
          return;
        }

        // Cargar datos de la actividad
        const response = await fetch(`http://10.13.6.149:3000/cargar-actividad/${id_act}`);
        const data = await response.json();
        if (data.length > 0) {
          const actividadData = data[0]; // Acceder al primer elemento del array
          setActividad(actividadData.actividad);
          setDescripcion(actividadData.descripcion);
          setArea(actividadData.area);
          setSelectedDate(actividadData.fech_ini.split('T')[0]); // Formatear fecha
          setSelectedDate2(actividadData.fech_fin.split('T')[0]); // Formatear fecha
        }
        setIsLoading(false); // Datos cargados, detener la carga
      } catch (error) {
        console.error('Error al obtener el tipo de usuario o datos de la actividad:', error);
        router.push('/profile');
      }
    };

    checkUserType();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [router, id_act]);


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
    if (userType !== 'supervisor' && userType !== 'admin') {
      Alert.alert('Error', 'No tienes permisos para editar actividades');
      router.push('/profile');
      return;
    }

    try {
      const response = await fetch(`http://10.13.6.149:3000/editar-actividad/${id_act}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          actividad: actividad,
          descripcion: descripcion,
          area: area,
          fech_ini: selectedDate,
          fech_fin: selectedDate2,
          id_usu_asignado: userId,
          id_usu_que_asigno: userId,
          user_type: userType,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        Alert.alert(
          'Éxito',
          'Actividad editada correctamente',
          [{ text: 'OK', onPress: () => router.push('/asignaAct') }],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          'Error',
          data.error || 'Error al editar la actividad',
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F2E527" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.push('asignaAct')}>
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
                placeholder="Área"
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
};

export default EditAct;