import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigationState, useNavigation } from '@react-navigation/native';

const BottomNavbar = () => {
  const navigation = useNavigation();

  const currentRouteName = useNavigationState((state) => state.routes[state.index]?.name);

  const tabs = [
    { key: 'Home', title: 'Inicio', icon: 'home-filled' },
    { key: 'Cursos', title: 'Cursos', icon: 'bookmark' },
    { key: 'Comunidad', title: 'Comunidad', icon: 'group' },
    { key: 'Perfil', title: 'Mi Perfil', icon: 'person' },
  ];

  const handlePress = (tab) => {
    if (navigation && navigation.navigate) {
      navigation.navigate(tab.key); //a ruta seleccionada
    }
  };

  return (
    <View style={styles.navbar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => handlePress(tab)}
        >
          <MaterialIcons
            name={tab.icon}
            size={24}
            color={currentRouteName === tab.key ? '#00214E' : '#888'}
          />
          <Text
            style={[
              styles.tabText,
              currentRouteName === tab.key && styles.activeTabText,
            ]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#888',
  },
  activeTabText: {
    color: '#00214E',
  },
});

export default BottomNavbar;
