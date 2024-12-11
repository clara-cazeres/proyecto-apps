import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import ModuleCard from '../components/ModuleCard';
import globalStyles from '../styles/styles';
import API_BASE_URL from '../api/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModuleScreen = ({ route, navigation }) => {
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedClasses, setCompletedClasses] = useState([]);

  const moduleId = route.params?.moduleId;
  const moduleNumber = route.params?.moduleNumber;

  // Fetch module data
  const fetchModuleData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/modules/${moduleId}`);
      if (!response.ok) {
        throw new Error('Error al cargar el módulo desde el servidor');
      }
      const moduleData = await response.json();
      setModule(moduleData);
    } catch (error) {
      console.error('Error al cargar el módulo:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const authData = await AsyncStorage.getItem('auth');
      if (!authData) {
        throw new Error('No se encontraron datos de autenticación');
      }
      const { token, user } = JSON.parse(authData);
      
      const userId = user.id || user._id; // Ajusta según la estructura del usuario
      if (!userId) throw new Error('El usuario no tiene un ID válido');

      const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los datos del usuario');
      }

      const userData = await response.json();

      setCompletedClasses(userData.completedClasses || []);
      console.log('Datos del usuario:', userData);
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchModuleData(), fetchUserData()]);
      setLoading(false);
    };
  
    // Carga inicial de datos
    fetchData();
  
    // recargar datos al regresar a la pantalla
    const unsubscribe = navigation.addListener('focus', fetchData);
  
    return () => {
      unsubscribe();
    };
  }, [navigation, moduleId]);
  

  const isClassUnlocked = (lesson) =>
    lesson.requiredClasses.every((requiredId) => completedClasses.includes(requiredId));

  const handleClassPress = (lesson) => {
    if (!isClassUnlocked(lesson)) {
      const missingClasses = lesson.requiredClasses.filter(
        (requiredId) => !completedClasses.includes(requiredId)
      );
      Alert.alert(
        'Clase bloqueada',
        `Completa las siguientes clases para desbloquear esta clase: ${missingClasses.join(', ')}`
      );
    } else {
      navigation.navigate('Lesson', {
        lesson,
        moduleNumber,
      });
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.safeArea}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!module) {
    return (
      <View style={globalStyles.safeArea}>
        <TopNavbar title="MÓDULO" navigation={navigation} showBackButton />
        <Text style={styles.errorText}>No se pudo cargar el módulo.</Text>
        <BottomNavbar navigation={navigation} activeTab="Cursos" />
      </View>
    );

    
  }

  return (
    <View style={globalStyles.safeArea}>
      <TopNavbar title={`MÓDULO ${moduleNumber}`} navigation={navigation} showBackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{module.title?.toUpperCase() || 'Título no disponible'}</Text>
          <Text style={styles.heading3}>Nivel: {module.courseLevel}</Text>
          <Text style={styles.heading3}>Objetivo:</Text>
          <Text style={styles.text}>{module.goal}</Text>
        </View>

        <Text style={styles.heading2}>Clases</Text>
        {module.lessons.map((lesson) => (
          <ModuleCard
            key={lesson.id}
            module={lesson}
            isLocked={!isClassUnlocked(lesson)}
            onPress={() => handleClassPress(lesson)}
          />
        ))}
      </ScrollView>
      <BottomNavbar navigation={navigation} activeTab="Cursos" />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  textContent: {
    marginBottom: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    marginVertical: 10,
    color: '#000000',
  },
  heading3: {
    fontSize: 16,
    fontWeight: 'light',
    color: '#000000',
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default ModuleScreen;
