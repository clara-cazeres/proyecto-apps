import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import authStyles from '../../styles/auth-styles';
import { iniciarSesion } from '../../api/apiServices';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';

const LoginScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Usa el hook useDispatch para obtener el dispatch
  const dispatch = useDispatch();

  const handleLogin = async () => {
    console.log('Intentando iniciar sesión con:', credentials);
  
    try {
      const data = await iniciarSesion(credentials);
      console.log('Respuesta del backend:', data);
  
      const { token, user } = data;
      if (token) {
        console.log('Token recibido:', token);
        console.log('infousuario after login:', user);

  
        // Despacha la acción de login
        dispatch(login({ token, user }));
  
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        navigation.navigate('Home'); 
      } else {
        Alert.alert('Error', 'No se recibió un token');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      Alert.alert('Error', error.message || 'Credenciales incorrectas');
    }
  };
  
  return (
    <ScrollView style={authStyles.container}>
      <TouchableOpacity style={authStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={authStyles.backText}>←</Text>
      </TouchableOpacity>

      <Image source={require('../../assets/imagotipo-azul.png')} style={authStyles.logo} />

      <Text style={authStyles.title}>Inicio de sesión</Text>

      <Input
        placeholder="Mail"
        value={credentials.email}
        onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        keyboardType="email-address"
      />
      <Input
        placeholder="Contraseña"
        value={credentials.password}
        onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        secureTextEntry
      />

      <Button title="INICIAR SESIÓN" onPress={handleLogin} />

      <Text style={authStyles.footerText}>
        ¿No tienes cuenta?{' '}
        <Text style={authStyles.linkText} onPress={() => navigation.navigate('Registro')}>
          Regístrate
        </Text>
      </Text>
    </ScrollView>
  );
};

export default LoginScreen;
