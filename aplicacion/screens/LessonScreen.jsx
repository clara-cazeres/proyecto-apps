import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, Linking } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Button from '../components/Button';

const LessonScreen = ({ route, navigation }) => {
  const { lesson, moduleNumber } = route.params;

  return (
    <View style={styles.container}>
      <TopNavbar
        title={`MÓDULO ${moduleNumber} - CLASE ${lesson.lessonNumber}`}
        navigation={navigation}
        showBackButton
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Button
            iconName="file-download" // Ícono de descarga
            onPress={() => Linking.openURL('https://example.com/download.pdf')}
            variant="outlined"
          />
          <Button
            title="FINALIZAR CLASE"
            onPress={() => alert('Clase finalizada!')}
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
    zIndex:99,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
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
});

export default LessonScreen;
