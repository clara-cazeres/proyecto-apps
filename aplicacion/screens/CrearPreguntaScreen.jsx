import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Button from '../components/Button';
import authStyles from '../styles/auth-styles';
import API_BASE_URL from '../api/apiConfig';
import { useSelector } from 'react-redux';


const CrearPreguntaScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useSelector((state) => state.auth);

  // Estados para DropdownPicker
  const [courseLevel, setCourseLevel] = useState('');
  const [category, setCategory] = useState('');

  const [openCourseLevel, setOpenCourseLevel] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const courseLevelItems = [
    { label: 'Básico', value: 'Básico' },
    { label: 'Intermedio', value: 'Intermedio' },
    { label: 'Avanzado', value: 'Avanzado' },
  ];

  const categoryItems = [
    { label: 'Teórico', value: 'teórico' },
    { label: 'Maniobras', value: 'maniobras' },
    { label: 'Navegar', value: 'navegar' },
    { label: 'Barco', value: 'barco' },
    { label: 'Regatas', value: 'regatas' },
    { label: 'Otros', value: 'otros' },
  ];

  const handleCrearPregunta = async () => {
    if (!title || !description || !courseLevel || !category) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
  
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
          user: user.username, 
          courseLevel,
          category,
          img: [], // Manejar imagenes despues
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
    <View style={authStyles.container}>
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
      <Text style={{ marginBottom: 5, color: '#00214E', fontWeight: 'bold' }}>
        Nivel del curso
      </Text>
      <DropDownPicker
        open={openCourseLevel}
        setOpen={setOpenCourseLevel}
        value={courseLevel}
        setValue={setCourseLevel}
        items={courseLevelItems}
        placeholder="Selecciona el nivel del curso"
        style={authStyles.pickerContainer}
      />

      <Text style={{ marginTop: 15, marginBottom: 5, color: '#00214E', fontWeight: 'bold' }}>
        Categoría
      </Text>
      <DropDownPicker
        open={openCategory}
        setOpen={setOpenCategory}
        value={category}
        setValue={setCategory}
        items={categoryItems}
        placeholder="Selecciona la categoría"
        style={authStyles.pickerContainer}
      />

      <Button
        title="Crear Pregunta"
        onPress={handleCrearPregunta}
        variant="filled"
      />
    </View>
  );
};

export default CrearPreguntaScreen;
