import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { obtenerPerfilPorId } from '../api/apiServices';

const PerfilScreen = () => {
  const navigation = useNavigation();
  const { user, token } = useSelector((state) => state.auth);
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      if (user && token) {
        try {
          console.log('Cargando perfil con ID:', user.id); // Debugging
          const perfilData = await obtenerPerfilPorId(user.id, token);
          console.log('Datos del perfil recibidos:', perfilData); // Debugging
          setPerfil(perfilData);
        } catch (error) {
          console.error('Error al cargar el perfil:', error.message);
        }
      }
    };

    cargarPerfil();
  }, [user, token]);

  if (!perfil) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.info}>Nombre de usuario: {perfil.username || 'No disponible'}</Text>
      <Text style={styles.info}>Email: {perfil.email || 'No disponible'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PerfilScreen;
