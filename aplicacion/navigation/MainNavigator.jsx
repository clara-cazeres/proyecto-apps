import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import CursosScreen from '../screens/CursosScreen';
import CursosStack from './CursosStack';
import ComunidadScreen from '../screens/ComunidadScreen';
import PerfilScreen from '../screens/PerfilScreen';

import LoginScreen from '../screens/auth/LoginScreen';
import RegistroScreen from '../screens/auth/RegistroScreen';
import LogoutScreen from '../screens/auth/LogoutScreen';

import CuestionarioInicialPrompt from '../screens/auth/CuestionarioInicialPrompt';
import CuestionarioInicialScreen from '../screens/auth/CuestionarioInicialScreen';

import CrearPreguntaScreen from '../screens/CrearPreguntaScreen';
import PreguntaScreen from '../screens/PreguntaScreen';
import EditarPerfilScreen from '../screens/EditarPerfilScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const CuestionarioStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CuestionarioPrompt" component={CuestionarioInicialPrompt} />
    <Stack.Screen name="Cuestionario" component={CuestionarioInicialScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Cursos" component={CursosStack} />
      <Drawer.Screen name="Comunidad" component={ComunidadScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />

      
      <Drawer.Screen name="CrearPregunta" component={CrearPreguntaScreen} options={{ drawerLabel: () => null, title: undefined, drawerItemStyle: { height: 0 } }} />
      <Drawer.Screen name="QuestionDetail" component={PreguntaScreen}options={{ drawerLabel: () => null, title: undefined, drawerItemStyle: { height: 0 } }}  />

      <Drawer.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ drawerLabel: () => null, title: undefined, drawerItemStyle: { height: 0 } }} />



      {!isAuthenticated ? (
        <>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Registro" component={RegistroScreen} />
        </>
      ) : (
        <Drawer.Screen
          name="Cerrar Sesión"
          component={LogoutScreen}
          options={{ drawerLabel: 'Cerrar Sesión' }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Drawer menu */}
      <Stack.Screen name="MainDrawer" component={MainNavigator} />
      {/* Cuestionario stack */}
      <Stack.Screen name="CuestionarioFlow" component={CuestionarioStack} />
    </Stack.Navigator>
  );
}
