import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import ModuleCard from '../components/ModuleCard';
import SearchBar from '../components/SearchBar';
import API_BASE_URL from '../api/apiConfig';

const CursosScreen = ({ navigation }) => {
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/modules`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setModules(data);
          setFilteredModules(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
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
      const filtered = modules.filter(
        (module) =>
          module.title?.toLowerCase().includes(query.toLowerCase()) ||
          module.description?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredModules(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <TopNavbar title="CURSO" navigation={navigation} />
      <SearchBar value={searchQuery} onChangeText={handleSearch} placeholder="Buscar módulos..." />
      <FlatList
        data={filteredModules}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <ModuleCard
            module={item}
            moduleNumber={index + 1}
            onPress={() =>
              navigation.navigate('Module', {
                moduleId: item._id,
                moduleNumber: index + 1,
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
  list: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});

export default CursosScreen;
