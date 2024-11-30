import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Asegúrate de usar este paquete
import Input from '../../components/Input';
import Button from '../../components/Button';
import authStyles from '../../styles/auth-styles';

const RegistroScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
  });

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

      {/* Picker para género */}
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

      <Button title="REGISTRARME" onPress={() => {}} />

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
