import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

const BottomNavbar = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'Home', title: 'Inicio', icon: 'home' },
    { key: 'Cursos', title: 'Cursos', icon: 'book' },
    { key: 'Comunidad', title: 'Comunidad', icon: 'account-group' },
    { key: 'Perfil', title: 'Perfil', icon: 'account' },
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    navigation.navigate(routes[newIndex].key);
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={() => null}
      barStyle={styles.barStyle}
    />
  );
};

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
});

export default BottomNavbar;
