import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import globalStyles from '../styles/styles';
import API_BASE_URL from '../api/apiConfig';

const HomeScreen = ({ navigation }) => {
  const [module, setModule] = useState(null);
  const [moduleNumber, setModuleNumber] = useState(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/modules`);
        const data = await response.json();
        if (data.length > 0) {
          setModule(data[0]); 
          setModuleNumber(1);
        }
      } catch (error) {
        console.error('Error al cargar el módulo:', error);
      }
    };

    fetchModule();
  }, []);

  const handleCardPress = () => {
    if (module) {
      navigation.navigate('Module', {
        moduleId: module._id,
        moduleNumber: moduleNumber,
      });
    }
  };

  return (
    <View style={globalStyles.safeArea}>
     
      <TopNavbar title="SAIL ACADEMY" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[globalStyles.title, styles.welcomeTitle]}>
          ¡BIENVENIDO!
        </Text>
        <Text style={styles.subtitle}>COMENZÁ TU CURSO</Text>

        {module ? (
          <TouchableOpacity onPress={handleCardPress} style={styles.card}>
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
          </TouchableOpacity>
        ) : (
          <Text style={styles.noModule}>No hay módulos disponibles</Text>
        )}
      </ScrollView>

      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    marginBottom: 70, 
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
