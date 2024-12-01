import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación

const TopNavbar = ({ title }) => {
  const navigation = useNavigation(); // Usar el hook para obtener el objeto de navegación

  return (
    <Appbar.Header style={styles.appbar}>
      <Appbar.Action icon="menu" color="#FFFFFF" onPress={() => navigation.openDrawer()} />
      {title === 'Inicio' ? (
        <Image source={require('../assets/logotipo-sa.png')} style={styles.logo} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: { backgroundColor: '#00214E' },
  logo: { height: 30, width: 120, resizeMode: 'contain' },
  title: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});

export default TopNavbar;
