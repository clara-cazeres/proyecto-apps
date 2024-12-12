import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import TopNavbar from '../components/TopNavbar'; 
import API_BASE_URL from '../api/apiConfig';

const EditarPerfilScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);

  //estados  campos editables
  const [city, setCity] = useState(user.city || '');
  const [country, setCountry] = useState(user.country || '');
  const [height, setHeight] = useState(user.height?.toString() || '');
  const [weight, setWeight] = useState(user.weight?.toString() || '');
  const [vo2max, setVo2max] = useState(user.vo2max?.toString() || '');
  const [boatType, setBoatType] = useState(user.boatType || '');
  const [boatName, setBoatName] = useState(user.boatName || '');
  const [aboutMe, setAboutMe] = useState(user.aboutMe || '');

  const handleGuardarCambios = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city,
          country,
          height: Number(height),
          weight: Number(weight),
          vo2max: Number(vo2max),
          boatType,
          boatName,
          aboutMe,
        }),
      });
  
      if (response.ok) {
        const updatedUser = await response.json(); 
        Alert.alert('Éxito', 'Cambios guardados correctamente.');
        navigation.navigate('Perfil', { updatedUser }); 
      } else {
        Alert.alert('Error', 'No se pudieron guardar los cambios. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
    }
  };
  

  return (
    <View style={styles.container}>
      <TopNavbar navigation={navigation} title="Editar Perfil" showBackButton /> 

      <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>Información personal</Text>

      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="País"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="VO2 Max"
        value={vo2max}
        onChangeText={setVo2max}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de barco"
        value={boatType}
        onChangeText={setBoatType}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del barco"
        value={boatName}
        onChangeText={setBoatName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobre mí"
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline
      />

      <Button title="Guardar Cambios" onPress={handleGuardarCambios} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding:20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'ligt',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default EditarPerfilScreen;
