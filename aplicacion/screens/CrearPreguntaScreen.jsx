import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import Button from '../components/Button';
import authStyles from '../styles/auth-styles';
import API_BASE_URL from '../api/apiConfig';
import { useSelector } from 'react-redux';


const CrearPreguntaScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useSelector((state) => state.auth);

  console.log('Estado de usuario:', user); // Revisa si contiene username


  const handleCrearPregunta = async () => {
    if (!title || !description || !courseLevel || !category) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
  
    // Verifica que el usuario tenga un username válido
    if (!user || !user.username) {
      console.log('Error', 'El usuario no está correctamente autenticado.');
      return;
    }
  
    try {
      const response = await fetch(`${API_BASE_URL}/preguntas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          user: user.username, // Verifica que este campo se envíe correctamente
          courseLevel,
          category,
          img: [], // Manejar imágenes en el futuro
        }),
      });
  
      if (response.ok) {
        Alert.alert('Éxito', 'Pregunta creada con éxito.');
        navigation.navigate('Comunidad'); 
      } else {
        const errorData = await response.json();
        console.error('Error al crear la pregunta:', errorData);
        Alert.alert('Error', 'No se pudo crear la pregunta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al crear la pregunta:', error);
      Alert.alert('Error', 'Hubo un problema al conectarse al servidor.');
    }
  };
  
  

  return (
    <ScrollView style={authStyles.container}>
      <TouchableOpacity style={authStyles.backButton} onPress={() => navigation.goBack()}>
        <Text style={authStyles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={authStyles.title}>Crear pregunta</Text>

      <TextInput
        style={authStyles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[authStyles.input, { height: 100 }]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={authStyles.pickerContainer}>
        <Text style={{ marginBottom: 5, color: '#00214E', fontWeight: 'bold' }}>
          Nivel del curso
        </Text>
        <Picker
          selectedValue={courseLevel}
          onValueChange={(itemValue) => setCourseLevel(itemValue)}
        >
          <Picker.Item label="Selecciona el nivel del curso" value="" />
          <Picker.Item label="Básico" value="Básico" />
          <Picker.Item label="Intermedio" value="Intermedio" />
          <Picker.Item label="Avanzado" value="Avanzado" />
        </Picker>
      </View>

      <View style={authStyles.pickerContainer}>
        <Text style={{ marginBottom: 5, color: '#00214E', fontWeight: 'bold' }}>
          Categoría
        </Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Selecciona la categoría" value="" />
          <Picker.Item label="Teórico" value="teórico" />
          <Picker.Item label="Maniobras" value="maniobras" />
          <Picker.Item label="Navegar" value="navegar" />
          <Picker.Item label="Barco" value="barco" />
          <Picker.Item label="Regatas" value="regatas" />
          <Picker.Item label="Otros" value="otros" />
        </Picker>
      </View>

      <Button
        title="Crear Pregunta"
        onPress={handleCrearPregunta}
        variant="filled"
      />
    </ScrollView>
  );
};

export default CrearPreguntaScreen;
