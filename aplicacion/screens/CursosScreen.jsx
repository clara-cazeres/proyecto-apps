import React, { useEffect, useState } from 'react';
import {View, TextInput, FlatList, StyleSheet } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import ModuleCard from '../components/ModuleCard';

const CursosScreen = ({ navigation }) => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('https://proyecto-apps.onrender.com/modules');
        const data = await response.json();
        setModules(data);
        setFilteredModules(data);
      } catch (error) {
        console.error('Error al cargar los módulos:', error);
      }
    };

    fetchModules();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredModules(modules);
    } else {
      const filtered = modules.filter((module) =>
        module.title.toLowerCase().includes(query.toLowerCase()) ||
        module.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredModules(filtered);
    }
  };

  return (
    <View style={styles.container}>
   
      <TopNavbar title="CURSO" navigation={navigation} />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredModules}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <ModuleCard
            module={item}
            moduleNumber={index + 1} // Calcula el número del módulo correctamente
            onPress={() =>
              navigation.navigate('Module', {
                moduleId: item._id,
                moduleNumber: index + 1, // También pásalo al navegar a ModuleScreen
              })
            }
            showExtraInfo={true}
          />
        )}
        contentContainerStyle={styles.list}
      />



      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 0,
    borderRadius: 40,
    paddingHorizontal: 10,
    backgroundColor: '#E4E4E4',
    fontWeight: 'light',
  },
  list: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});

export default CursosScreen;
