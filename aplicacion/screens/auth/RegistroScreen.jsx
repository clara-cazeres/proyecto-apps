import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../../components/Input';
import Button from '../../components/Button';
import authStyles from '../../styles/auth-styles';
import { registrarUsuario } from '../../api/apiServices';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';

const RegistroScreen = ({ navigation }) => {
  const dispatch = useDispatch(); 

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(formData.gender || '');
  const [items, setItems] = useState([
   { label: 'Hombre', value: 'Male' },
   { label: 'Mujer', value: 'Female' },
  ]); 

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
      const data = await registrarUsuario(formData);
      console.log('Respuesta recibida del backend:', data);
  
      const { token, usuario } = data;
      if (!usuario) {
        throw new Error('Usuario no recibido en la respuesta del backend');
      }
  
      console.log('Usuario recibido en RegistroScreen:', usuario);
  
      if (token) {
        console.log('Token recibido:', token);
  
        dispatch(login({ token, user: usuario }));
  
        Alert.alert('Éxito', 'Registro exitoso.');
        // Navega al prompt del cuestionario inicial
        navigation.navigate('CuestionarioFlow', { screen: 'CuestionarioPrompt' });
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

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(val) => {
          setValue(val);
          setFormData({ ...formData, gender: val });
        }}
        setItems={setItems}
        style={authStyles.pickerContainer}
        textStyle={{ color: '#333', fontSize: 16 }}
        placeholder="Seleccionar género"
      />

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
