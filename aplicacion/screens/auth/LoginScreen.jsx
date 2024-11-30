import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import authStyles from '../../styles/auth-styles';
import { ScrollView } from 'react-native-gesture-handler';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView style={authStyles.container}>
      {/* Botón para volver */}
      <TouchableOpacity style={authStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={authStyles.backText}>←</Text>
      </TouchableOpacity>

      {/* Logo */}
      <Image source={require('../../assets/imagotipo-azul.png')} style={authStyles.logo} />

      {/* Título */}
      <Text style={authStyles.title}>Iniciar sesión</Text>

      {/* Inputs */}
      <Input
        placeholder="Mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botón de iniciar sesión */}
      <Button title="INICIAR SESIÓN" onPress={() => {}} />

      {/* Texto de registro */}
      <Text style={authStyles.footerText}>
        ¿No estás registrado?{' '}
        <Text style={authStyles.linkText} onPress={() => navigation.navigate('Registro')}>
          Registrarme
        </Text>
      </Text>
    </ScrollView>
  );
};

export default LoginScreen;
