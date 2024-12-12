import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import TopNavbar from '../components/TopNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import QuestionCard from '../components/QuestionCard';
import globalStyles from '../styles/styles';
import API_BASE_URL from '../api/apiConfig';


const ComunidadScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);


  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/preguntas`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <View style={globalStyles.safeArea}>
      <TopNavbar navigation={navigation} title="Comunidad" />
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar preguntas..."
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#00214E" />
      ) : (
        <FlatList
          data={questions.filter((q) =>
            q.title.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <QuestionCard
              question={item}
              onPress={() => navigation.navigate('QuestionDetail', { questionId: item._id })}
            />
          )}
          contentContainerStyle={styles.questionsList}
        />
      )}
      <View style={styles.buttonContainer}>
      <Button
  title="+"
  onPress={() => {
    if (!isAuthenticated) {
      Alert.alert(
        'Iniciar sesión',
        'Debes iniciar sesión para crear una pregunta.',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Iniciar sesión', onPress: () => navigation.navigate('Login') },
        ]
      );
    } else {
      navigation.navigate('CrearPregunta');
    }
  }}
  variant="filled"
  style={styles.createButton}
/>

      </View>
      <BottomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  questionsList: {
    padding: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80, 
    right: 20,
  },
});

export default ComunidadScreen;
