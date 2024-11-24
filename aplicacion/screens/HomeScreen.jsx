import React from 'react';
import { View, Text } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import globalStyles from '../styles/styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.safeArea}>
      <TopNavbar navigation={navigation} title="Inicio" />
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>Bienvenido a Sail Academy</Text>
      </View>
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
