import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Button from '../components/Button';

const PerfilScreen = ({ navigation }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user || !user.id) {
      setError('Usuario no autenticado');
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://proyecto-apps.onrender.com/usuarios/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el usuario');
        }

        const data = await response.json();
        setPerfil(data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setError('Error al cargar la información del perfil');
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, user]);

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <TopNavbar navigation={navigation} title="Mi Perfil" />
        <Text style={styles.message}>Cargando perfil...</Text>
        <BottomNavbar navigation={navigation} activeTab="Mi perfil" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <TopNavbar navigation={navigation} title="Mi Perfil" />
        <Text style={styles.message}>{error}</Text>
        <BottomNavbar navigation={navigation} activeTab="Mi perfil" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbar navigation={navigation} title="Mi Perfil" />
      <ScrollView>
        {/* Header Azul */}
        <View style={styles.headerContainer}>
          <View style={styles.profileImageContainer}>
            {perfil.userImg ? (
              <Image source={{ uri: perfil.userImg }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>IMG</Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{perfil.name}</Text>
        </View>

        {/* Información del usuario */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>📍 {perfil.city}, {perfil.country}</Text>
          <Text style={styles.infoText}>👤 {calculateAge(perfil.birthDate)} años</Text>
          <Text style={styles.infoText}>⛵ Navego en: {perfil.boatType || 'No especificado'}</Text>
          <Text style={styles.infoText}>📘 Nivel de curso: {perfil.courseLevel || 'No especificado'}</Text>
        </View>

        {/* Mis Datos */}
        <View style={styles.dataContainer}>
          <Text style={styles.sectionTitle}>Mis datos</Text>
          <View style={styles.dataBoxesContainer}>
            <View style={styles.dataBox}><Text style={styles.dataBoxText}>Peso</Text></View>
            <View style={styles.dataBox}><Text style={styles.dataBoxText}>Estatura</Text></View>
            <View style={styles.dataBox}><Text style={styles.dataBoxText}>VO2 Max</Text></View>
          </View>
          <Button title="Registrar Nuevos Datos" onPress={() => alert('Registrar nuevos datos')} />
        </View>
      </ScrollView>
      <BottomNavbar navigation={navigation} activeTab="Mi perfil" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#00214E',
    alignItems: 'center',
    paddingVertical: 40,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  placeholderText: {
    fontSize: 18,
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  infoContainer: {
    padding: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  dataContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dataBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dataBox: {
    width: '30%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataBoxText: {
    fontSize: 14,
    color: '#333',
  },
});

export default PerfilScreen;
