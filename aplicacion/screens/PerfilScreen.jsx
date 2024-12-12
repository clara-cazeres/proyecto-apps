import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Button from '../components/Button';
import API_BASE_URL from '../api/apiConfig';

const PerfilScreen = ({ navigation }) => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      if (!user || !user.id || !token) {
        setError('Usuario no autenticado. Por favor, inicia sesión.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el perfil.');
        }

        const data = await response.json();
        setPerfil(data);
      } catch (err) {
        console.error('Error al obtener el perfil:', err.message);
        setError('Error al cargar el perfil. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchPerfil();
    } else {
      setLoading(false);
      setError('Usuario no autenticado. Por favor, inicia sesión.');
    }
  }, [isAuthenticated, user, token]);

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <TopNavbar navigation={navigation} title="Mi Perfil" />
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>
            Usuario no pudo ser autenticado. Por favor, inicia sesión.
          </Text>
          <Button
            title="Ir al inicio de sesión"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    );
  }

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
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Volver a intentar" onPress={() => navigation.navigate('Login')} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TopNavbar navigation={navigation} title="Mi Perfil" />
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{perfil?.name || 'Usuario'}</Text>
        </View>
        <View style={styles.infoContainer}>
          {perfil?.city || perfil?.country ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                {perfil.city}, {perfil.country}
              </Text>
            </View>
          ) : null}
          {perfil?.birthDate ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>
                Fecha de nacimiento: {new Date(perfil.birthDate).toLocaleDateString()}
              </Text>
            </View>
          ) : null}
          {perfil?.boatType ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Navego en: {perfil.boatType}</Text>
            </View>
          ) : null}
          {perfil?.aboutMe ? (
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>Sobre mí: {perfil.aboutMe}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.dataContainer}>
          <Text style={styles.sectionTitle}>Mis datos</Text>
          <View style={styles.dataBoxesContainer}>
            <View style={styles.dataBox}>
              <Text style={styles.dataBoxText}>Peso</Text>
              <Text style={styles.dataBoxValue}>
                {perfil.weight ? `${perfil.weight} Kg` : 'N/A'}
              </Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.dataBoxText}>Altura</Text>
              <Text style={styles.dataBoxValue}>
                {perfil.height ? `${(perfil.height / 100).toFixed(2)} m` : 'N/A'}
              </Text>
            </View>
            <View style={styles.dataBox}>
              <Text style={styles.dataBoxText}>VO2Max</Text>
              <Text style={styles.dataBoxValue}>
                {perfil.vo2max ? `${perfil.vo2max} ml/kg/min` : 'N/A'}
              </Text>
            </View>
          </View>
        </View>
        <Button
          title="EDITAR PERFIL"
          onPress={() => navigation.navigate('EditarPerfil')}
        />
      </ScrollView>
      <BottomNavbar navigation={navigation} activeTab="Mi perfil" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 70,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#2A6295',
    alignItems: 'center',
    paddingVertical: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'light',
    textTransform: 'uppercase',
    color: '#fff',
    marginTop: 10,
  },
  infoContainer: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  dataContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dataBoxText: {
    fontSize: 14,
    color: '#333',
  },
  dataBoxValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    margin: 20,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default PerfilScreen;
