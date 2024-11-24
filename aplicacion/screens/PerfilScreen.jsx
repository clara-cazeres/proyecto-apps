import React from 'react';
import { View, Text } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import globalStyles from '../styles/styles';

const PerfilScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.safeArea}>
      <TopNavbar navigation={navigation} title="Mi Perfil" />
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>Administra tu perfil</Text>
      </View>
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

export default PerfilScreen;
