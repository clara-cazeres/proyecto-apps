import React from 'react';
import { View, Text } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import globalStyles from '../styles/styles';

const CursosScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.safeArea}>
      <TopNavbar navigation={navigation} title="Cursos" />
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>Explora los cursos disponibles</Text>
      </View>
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

export default CursosScreen;
