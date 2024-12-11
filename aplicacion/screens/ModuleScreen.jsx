import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import ModuleCard from '../components/ModuleCard';
import globalStyles from '../styles/styles';
import API_BASE_URL from '../api/apiConfig';

const ModuleScreen = ({ route, navigation }) => {
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);

  const moduleId = route.params?.moduleId;
  const moduleNumber = route.params?.moduleNumber;

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/modules/${moduleId}`);
        const data = await response.json();
        setModule(data);
      } catch (error) {
        console.error('Error al cargar el módulo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [moduleId]);

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
        {/* Información del módulo */}
        <View style={styles.textContent}>
          <Text style={styles.title}>{module.title.toUpperCase()}</Text>
          <Text style={styles.heading3}>Nivel: {module.courseLevel}</Text>
          <Text style={styles.heading3}>Objetivo:</Text>
          <Text style={styles.text}>{module.goal}</Text>
        </View>



        <Text style={styles.heading2}>Clases</Text>
        {module.lessons.map((lesson, index) => (
          <ModuleCard
            key={lesson.id}
            module={lesson}
            onPress={() =>
              navigation.navigate('Lesson', {
                lesson,
                moduleNumber,
              })
            }
            showExtraInfo={false}
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
