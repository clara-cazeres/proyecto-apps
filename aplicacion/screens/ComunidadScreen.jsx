import React from 'react';
import { View, Text } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import globalStyles from '../styles/styles';

const ComunidadScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.safeArea}>
      <TopNavbar navigation={navigation} title="Comunidad" />
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>Conéctate con otros navegantes</Text>
      </View>
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

export default ComunidadScreen;
