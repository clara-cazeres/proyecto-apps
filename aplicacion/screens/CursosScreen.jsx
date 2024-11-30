import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
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
        const response = await fetch('http://192.168.1.10:3001/modules');
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
      {/* Asegúrate de pasar `navigation` a TopNavbar */}
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
        renderItem={({ item }) => <ModuleCard module={item} />}
        contentContainerStyle={styles.list}
      />

      {/* Pasa el objeto navigation */}
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
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default CursosScreen;
