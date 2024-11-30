import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import CursosScreen from '../screens/CursosScreen';
import ComunidadScreen from '../screens/ComunidadScreen';
import PerfilScreen from '../screens/PerfilScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegistroScreen from '../screens/auth/RegistroScreen';
import LogoutScreen from '../screens/auth/LogoutScreen';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Cursos" component={CursosScreen} />
      <Drawer.Screen name="Comunidad" component={ComunidadScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />

      {!isAuthenticated ? (
        <>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Registro" component={RegistroScreen} />
        </>
      ) : (
        <Drawer.Screen
          name="Cerrar Sesión"
          component={LogoutScreen} // Usar el nuevo componente aquí
          options={{ drawerLabel: 'Cerrar Sesión' }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default MainNavigator;
