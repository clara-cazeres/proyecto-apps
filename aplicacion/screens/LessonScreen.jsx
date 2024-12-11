import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking, Alert } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../api/apiConfig';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Button from '../components/Button';
import globalStyles from '../styles/styles';

const LessonScreen = ({ route, navigation }) => {
  const { lesson, moduleNumber } = route.params;

  const handleCompleteClass = async () => {
    try {
      const authData = await AsyncStorage.getItem('auth');
      if (!authData) throw new Error('No se encontraron datos de autenticación');
  
      const parsedAuthData = JSON.parse(authData);
      console.log('Datos de autenticación:', parsedAuthData);
  
      const { token, user } = parsedAuthData;
      const userId = user.id || user._id; // Ajustar según la estructura del usuario
      if (!userId) throw new Error('El usuario no tiene un ID válido');
  
      console.log('Datos que se enviarán al backend:', {
        userId,
        completedClassId: lesson.id,
      });
  
      const response = await fetch(`${API_BASE_URL}/usuarios/update-completed-classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          completedClassId: lesson.id,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        throw new Error(errorData.mensaje || 'Error al actualizar la clase');
      }
  
      const responseData = await response.json();
      console.log('Respuesta del backend:', responseData);
  
      const updatedAuth = {
        ...parsedAuthData,
        user: {
          ...user,
          completedClasses: responseData.completedClasses,
        },
      };
  
      await AsyncStorage.setItem('auth', JSON.stringify(updatedAuth));
  
      Alert.alert('Éxito', 'Clase finalizada. Ahora puedes acceder a la siguiente clase.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al finalizar la clase:', error.message);
      Alert.alert('Error', error.message || 'No se pudo finalizar la clase.');
    }
  };
  

  return (
    <View style={globalStyles.safeArea}>
      <TopNavbar
        title={`MÓDULO ${moduleNumber} - CLASE ${lesson.lessonNumber}`}
        navigation={navigation}
        showBackButton
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Video */}
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: lesson.video }}
            style={styles.video}
            controls={true}
          />
        </View>

        {/* Contenido */}
        <Text style={styles.title}>{lesson.title.toUpperCase()}</Text>
        <Text style={styles.subtitle}>Resumen de la clase</Text>
        <Text style={styles.summary}>{lesson.summary}</Text>

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <Button
            iconName="file-download"
            onPress={() => Linking.openURL('https://example.com/download.pdf')}
            variant="outlined"
          />
          <Button
            title="FINALIZAR CLASE"
            onPress={handleCompleteClass}
            variant="filled"
          />
        </View>
      </ScrollView>
      <BottomNavbar navigation={navigation} activeTab="Cursos" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 99,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  videoContainer: {
    position: 'relative',
    height: 200,
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00214E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default LessonScreen;
