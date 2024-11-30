import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

const BottomNavbar = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const routes = [
    { key: 'Home', title: 'Inicio', icon: 'home' },
    { key: 'Cursos', title: 'Cursos', icon: 'book' },
    { key: 'Comunidad', title: 'Comunidad', icon: 'account-group' },
    { key: 'Perfil', title: 'Mi Perfil', icon: 'account' },
  ];

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    const routeName = routes[newIndex].key;
    if (navigation && navigation.navigate) {
      navigation.navigate(routeName);
    } else {
      console.error('El objeto navigation no está definido.');
    }
  };

  const renderScene = BottomNavigation.SceneMap({
    Home: () => null,
    Cursos: () => null,
    Comunidad: () => null,
    Perfil: () => null,
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
