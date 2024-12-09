import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import globalStyles from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  const [module, setModule] = useState(null);
  const [moduleNumber, setModuleNumber] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch('http://localhost:3001/modules');
        const data = await response.json();
        if (data.length > 0) {
          setModule(data[0]); // Muestra el primer módulo.
          setModuleNumber(1);
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
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[globalStyles.title, styles.welcomeTitle]}>
          ¡BIENVENIDO!
        </Text>
        <Text style={styles.subtitle}>COMENZÁ TU CURSO</Text>

        {/* Tarjeta del módulo destacado */}
        {module ? (
          <View style={styles.card}>
            <Image
              source={{ uri: module.img }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{module.title.toUpperCase()}</Text>
              <Text style={styles.cardInfo}>
                MODULO {moduleNumber} - {module.lessons.length} clase
                {module.lessons.length > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noModule}>No hay módulos disponibles</Text>
        )}
      </ScrollView>

      {/* Bottom Navbar */}
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20, // Agregado para separar los elementos dentro del ScrollView
  },
  welcomeTitle: {
    color: '#000',
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
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: 350,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 14,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00214E',
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 15,
    fontWeight: '300',
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
