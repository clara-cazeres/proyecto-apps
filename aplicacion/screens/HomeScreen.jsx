import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import globalStyles from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  const [module, setModule] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch('http://192.168.1.10:3001/modules');
        const data = await response.json();
        if (data.length > 0) {
          setModule(data[0]); // Muestra el primer módulo.
        }
      } catch (error) {
        console.error('Error al cargar el módulo:', error);
      }
    };

    fetchModule();
  }, []);

  return (
    <View style={globalStyles.safeArea}>
      {/* AppBar */}
      <TopNavbar title="SAIL ACADEMY" />

      {/* Contenido central */}
      <View style={styles.content}>
        <Text style={[globalStyles.title, styles.welcomeTitle]}>
          ¡BIENVENIDO!
        </Text>
        <Text style={styles.subtitle}>COMENZÁ TU CURSO</Text>

        {/* Tarjeta del módulo destacado */}
        {module ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{module.title.toUpperCase()}</Text>
            <Text style={styles.cardDescription}>{module.description}</Text>
            <Text style={styles.cardInfo}>
              {module.lessons.length} clase
              {module.lessons.length > 1 ? 's' : ''} -{' '}
              {module.lessons.reduce((total, lesson) => total + lesson.time, 0)}{' '}
              minutos
            </Text>
          </View>
        ) : (
          <Text style={styles.noModule}>No hay módulos disponibles</Text>
        )}
      </View>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    ...globalStyles.content,
    alignItems: 'flex-start', // Ajuste específico para esta pantalla
    justifyContent: 'flex-start', // Ajuste específico para esta pantalla
  },
  welcomeTitle: {
    color: '#000', // Personalización adicional
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00214E',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444',
  },
  noModule: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
