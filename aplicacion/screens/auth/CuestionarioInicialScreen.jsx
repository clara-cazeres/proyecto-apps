import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const CuestionarioInicialScreen = ({ navigation }) => {
  const [cuestionario, setCuestionario] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchCuestionario = async () => {
      try {
        const response = await fetch('http://localhost:3001/cuestionarios'); // Cambia esta URL según corresponda
        const data = await response.json();
        const inicialCuestionario = data.find((q) => q.title === 'Cuestionario inicial'); // Encuentra el cuestionario inicial
        setCuestionario(inicialCuestionario);
      } catch (error) {
        console.error('Error al cargar el cuestionario:', error);
      }
    };

    fetchCuestionario();
  }, []);

  const handleAnswerSelect = (questionTitle, optionId) => {
    setAnswers({ ...answers, [questionTitle]: optionId });
  };

  const handleNext = () => {
    if (currentStep < cuestionario.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Respuestas:', answers);
      navigation.navigate('Home'); // Cambiar según el siguiente paso
    }
  };

  if (!cuestionario) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando cuestionario...</Text>
      </View>
    );
  }

  const currentQuestion = cuestionario.questions[currentStep];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentQuestion.title}</Text>
      <Text style={styles.description}>{currentQuestion.description}</Text>

      <FlatList
        data={currentQuestion.options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.option,
              answers[currentQuestion.title] === item.id && styles.selectedOption,
            ]}
            onPress={() => handleAnswerSelect(currentQuestion.title, item.id)}
          >
            <Text style={styles.optionText}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />

      <Button
        title={currentStep < cuestionario.questions.length - 1 ? 'Siguiente' : 'Finalizar'}
        onPress={handleNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  option: { padding: 15, marginVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: '#ccc' },
  selectedOption: { backgroundColor: '#00214E', borderColor: '#00214E' },
  optionText: { fontSize: 16, color: '#333' },
});

export default CuestionarioInicialScreen;
