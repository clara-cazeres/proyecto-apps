import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

const BottomNavbar = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'home', title: 'Inicio', icon: 'home' },
    { key: 'cursos', title: 'Cursos', icon: 'book' },
    { key: 'comunidad', title: 'Comunidad', icon: 'account-group' },
    { key: 'perfil', title: 'Mi Perfil', icon: 'account' },
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    const routeName = routes[newIndex].key;
    navigation.navigate(routeName);
  };

  const renderScene = BottomNavigation.SceneMap({
    home: () => null,
    cursos: () => null,
    comunidad: () => null,
    perfil: () => null,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#FFFFFF' }}
    />
  );
};

export default BottomNavbar;
