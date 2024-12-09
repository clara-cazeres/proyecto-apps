import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';

const LessonScreen = ({ route, navigation }) => {
  const { lesson, moduleNumber } = route.params;

  return (
    <View style={styles.container}>
      {/* Navbar con flecha */}
      <TopNavbar
        title={`MÓDULO ${moduleNumber} - CLASE ${lesson.lessonNumber}`}
        navigation={navigation}
        showBackButton={true} 
        />


      {/* Video */}
      <View style={styles.videoContainer}>
        <Image source={{ uri: lesson.img || 'https://via.placeholder.com/600x300' }} style={styles.video} />
        <Text style={styles.playButton}>▶</Text>
      </View>

      {/* Contenido */}
      <Text style={styles.title}>{lesson.title.toUpperCase()}</Text>
      <Text style={styles.subtitle}>Resumen de la clase</Text>
      <Text style={styles.summary}>{lesson.summary}</Text>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://example.com/download.pdf')}>
          <Text style={styles.buttonText}>DESCARGAR PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.finalizeButton]} onPress={() => alert('Clase finalizada!')}>
          <Text style={styles.buttonText}>FINALIZAR CLASE</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} activeTab="Cursos" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    fontSize: 30,
    color: '#fff',
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
  button: {
    flex: 1,
    backgroundColor: '#00214E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  finalizeButton: {
    backgroundColor: '#28A745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LessonScreen;
