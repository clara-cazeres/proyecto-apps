import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import ModuleCard from '../components/ModuleCard';

const ModuleScreen = ({ route, navigation }) => {
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const moduleId = route.params?.moduleId;
    const moduleNumber = route.params?.moduleNumber; // Obtén el número del módulo directamente de los parámetros
  
    useEffect(() => {
      const fetchModule = async () => {
        try {
          const response = await fetch(`http://localhost:3001/modules/${moduleId}`);
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
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  
    if (!module) {
      return (
        <View style={styles.container}>
          <TopNavbar title="MÓDULO" navigation={navigation} showBackButton />
          <Text style={styles.errorText}>No se pudo cargar el módulo.</Text>
          <BottomNavbar navigation={navigation} activeTab="Cursos" />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        {/* Usa el número del módulo de los parámetros */}
        <TopNavbar
            title={`MÓDULO ${moduleNumber}`}
            navigation={navigation}
            showBackButton={true} // Activa la flecha de regreso
            />

        <FlatList
          data={module.lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ModuleCard
              module={item}
              onPress={() =>
                navigation.navigate('Lesson', {
                  lesson: item,
                  moduleNumber: moduleNumber, // Pasa el número del módulo aquí
                })
              }
              showExtraInfo={false}
            />
          )}
          contentContainerStyle={styles.list}
        />
        <BottomNavbar navigation={navigation} activeTab="Cursos" />
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  list: {
    padding: 15,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default ModuleScreen;
