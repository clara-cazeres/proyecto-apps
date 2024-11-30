import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import CursosScreen from './screens/CursosScreen';
import ComunidadScreen from './screens/ComunidadScreen';
import PerfilScreen from './screens/PerfilScreen';
import LoginScreen from './screens/auth/LoginScreen';
import RegistroScreen from './screens/auth/RegistroScreen';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Cursos" component={CursosScreen} />
        <Drawer.Screen name="Comunidad" component={ComunidadScreen} />
        <Drawer.Screen name="Perfil" component={PerfilScreen} />

        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Registro" component={RegistroScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
