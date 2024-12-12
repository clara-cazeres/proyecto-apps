import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';

const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(logout());
   
    navigation.navigate('Home');
  }, [dispatch, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Saliendo...</Text>
    </View>
  );
};

export default LogoutScreen;
