import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import TopNavbar from '../components/TopNavbar';
import Button from '../components/Button';
import API_BASE_URL from '../api/apiConfig';
import { useSelector } from 'react-redux';

const PreguntaScreen = ({ route, navigation }) => {
  const { questionId } = route.params; // ID de la pregunta
  const [question, setQuestion] = useState(null);
  const [responseText, setResponseText] = useState('');
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/preguntas/${questionId}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        setQuestion(data);
      } catch (error) {
        console.error('Error fetching question:', error.message);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const handleAddResponse = async () => {
    if (!responseText) {
      Alert.alert('Error', 'Por favor escribe una respuesta.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/preguntas/${questionId}/respuestas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: user.username || user.email,
          description: responseText,
          img: '', // Puedes agregar funcionalidad para imágenes
        }),
      });

      if (response.ok) {
        const updatedQuestion = await response.json();
        setQuestion(updatedQuestion);
        setResponseText(''); // Limpia el campo de respuesta
        Alert.alert('Éxito', 'Respuesta añadida con éxito.');
      } else {
        Alert.alert('Error', 'No se pudo añadir la respuesta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al añadir respuesta:', error);
      Alert.alert('Error', 'Hubo un problema al conectarse al servidor.');
    }
  };

  if (!question) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando pregunta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     <TopNavbar navigation={navigation} title="Detalle de Pregunta" showBackButton={true} />

      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>{question.title}</Text>
        <Text style={styles.questionDescription}>{question.description}</Text>
        <Text style={styles.questionUser}>Por: {question.user}</Text>
      </View>
      <FlatList
        data={question.respuestas}
        keyExtractor={(item, index) => `${item.user}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.responseCard}>
            <Text style={styles.responseUser}>{item.user}</Text>
            <Text style={styles.responseText}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.responseList}
        ListEmptyComponent={<Text style={styles.noResponses}>Aún no hay respuestas.</Text>}
      />
      <TextInput
        style={styles.responseInput}
        placeholder="Escribe tu respuesta..."
        value={responseText}
        onChangeText={setResponseText}
      />
      <Button title="Responder" onPress={handleAddResponse} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  questionContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  questionUser: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
  responseList: {
    padding: 10,
  },
  responseCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  responseUser: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responseText: {
    fontSize: 14,
    color: '#555',
  },
  noResponses: {
    textAlign: 'center',
    color: '#888',
    marginTop: 10,
  },
  responseInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PreguntaScreen;
