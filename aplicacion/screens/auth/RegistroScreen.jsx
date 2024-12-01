import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Input from '../../components/Input';
import Button from '../../components/Button';
import authStyles from '../../styles/auth-styles';
import { registrarUsuario } from '../../api/apiServices';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';

const RegistroScreen = ({ navigation }) => {
  const dispatch = useDispatch(); // Inicializa el dispatch aquí

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
  });

  const validarFecha = (fecha) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(fecha);
  };

  const handleRegister = async () => {
    if (!validarFecha(formData.birthDate)) {
      Alert.alert('Error', 'Por favor, ingresa una fecha válida (YYYY-MM-DD)');
      return;
    }
  
    console.log('Datos enviados al backend:', formData);
  
    try {
      const data = await registrarUsuario(formData); // Llama al servicio de registro
      console.log('Respuesta recibida del backend:', data);
  
      const { token, user } = data;
      if (token) {
        console.log('Token recibido:', token);
  
        // Despacha la acción de login
        dispatch(login({ token, user }));
  
        Alert.alert('Éxito', 'Registro exitoso. Redirigiendo al inicio...');
        navigation.navigate('CuestionarioPrompt'); // redirige al cuestionario
      } else {
        Alert.alert('Error', 'No se recibió un token');
      }
    } catch (error) {
      console.error('Error durante el registro:', error.message);
      Alert.alert('Error', error.message || 'No se pudo completar el registro');
    }
  };
  

  return (
    <ScrollView style={authStyles.container}>
      <TouchableOpacity style={authStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={authStyles.backText}>←</Text>
      </TouchableOpacity>

      <Image source={require('../../assets/imagotipo-azul.png')} style={authStyles.logo} />

      <Text style={authStyles.title}>Registro</Text>

      <Input
        placeholder="Nombre completo"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <Input
        placeholder="Nombre de usuario"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
      />
      <Input
        placeholder="Mail"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
      />
      <Input
        placeholder="Contraseña"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />
      <Input
        placeholder="Fecha de nacimiento (YYYY-MM-DD)"
        value={formData.birthDate}
        onChangeText={(text) => setFormData({ ...formData, birthDate: text })}
      />

      <View style={authStyles.pickerContainer}>
        <Picker
          selectedValue={formData.gender}
          onValueChange={(value) => setFormData({ ...formData, gender: value })}
          style={authStyles.picker}
        >
          <Picker.Item label="Seleccionar género" value="" />
          <Picker.Item label="Hombre" value="Male" />
          <Picker.Item label="Mujer" value="Female" />
        </Picker>
      </View>

      <Button title="REGISTRARME" onPress={handleRegister} />

      <Text style={authStyles.footerText}>
        ¿Ya tienes cuenta?{' '}
        <Text style={authStyles.linkText} onPress={() => navigation.navigate('Login')}>
          Iniciar sesión
        </Text>
      </Text>
    </ScrollView>
  );
};

export default RegistroScreen;
