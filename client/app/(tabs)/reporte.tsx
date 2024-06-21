import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';

const ReportScreen = ({ navigation }) => {
const [keyboardVisible, setKeyboardVisible] = useState(false);
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
const [selectedDate, setSelectedDate] = useState('');
const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
const [selectedDate2, setSelectedDate2] = useState('');

useEffect(() => {
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


}, []);

const handleIconPress = () => {
// Lógica para manejar el evento del icono
console.log('Icono presionado');
};

const showDatePicker = () => {
setDatePickerVisibility(true);
};

const hideDatePicker = () => {
setDatePickerVisibility(false);
};

const handleConfirm = (date) => {
setSelectedDate(date.toLocaleDateString());
hideDatePicker();
};

const showDatePicker2 = () => {
setDatePickerVisibility2(true);
};

const hideDatePicker2 = () => {
setDatePickerVisibility2(false);
};

const handleConfirm2 = (date) => {
setSelectedDate2(date.toLocaleDateString());
hideDatePicker2();
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
<Text style={styles.title}>Generar reporte</Text>
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
             placeholder="Fecha límite"
             placeholderTextColor="#FFFFFF"
             value={selectedDate2}
             editable={false}
           />
<TouchableOpacity onPress={showDatePicker2}>
<FontAwesome name="calendar" size={22} color="#F2E527" style={styles.icon} />
</TouchableOpacity>
</View>
<TouchableOpacity style={styles.Button}>
<Text style={styles.ButtonText}>Generar reporte</Text>
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

export default ReportScreen;