import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthFromStorage } from '../../redux/authSlice';

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarEstadoAuth = async () => {
      try {
        const authData = await AsyncStorage.getItem('auth');
        if (authData) {
          const parsedAuth = JSON.parse(authData);
          dispatch(setAuthFromStorage(parsedAuth));
        }
      } catch (error) {
        console.error('Error al cargar la sesión:', error.message);
      }
    };

    cargarEstadoAuth();
  }, [dispatch]);

  return <>{children}</>; // Renderiza los hijos después de la carga
};

export default AuthLoader;
