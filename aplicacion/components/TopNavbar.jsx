import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Appbar } from 'react-native-paper';

const TopNavbar = ({ navigation, title }) => {
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
