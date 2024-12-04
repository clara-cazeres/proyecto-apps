import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper';

const CuestionarioInicialScreen = ({ navigation }) => {
  const [cuestionario, setCuestionario] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchCuestionario = async () => {
      try {
        const response = await fetch('http://192.168.1.10:3001/cuestionarios'); // Cambia esta URL según corresponda
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
    const currentQuestionTitle = cuestionario.questions[currentStep].title;
    if (!answers[currentQuestionTitle]) {
      Alert.alert('Error', 'Por favor, selecciona una opción antes de continuar.');
      return;
    }
    if (currentStep < cuestionario.questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Respuestas:', answers);
      navigation.navigate('Home'); // Cambiar según el siguiente paso
    }
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      navigation.goBack(); // Vuelve a la pantalla anterior al cuestionario
    } else {
      setCurrentStep(currentStep - 1);
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
  const isAnswerSelected = Boolean(answers[currentQuestion.title]);

  return (
    <View style={styles.container}>
      {/* Pregunta actual */}
      <View style={styles.questionContainer}>
        <Text style={styles.title}>{currentQuestion.title}</Text>
        <Text style={styles.description}>{currentQuestion.description}</Text>

        {/* Opciones como botones */}
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
              <Text
                style={[
                  styles.optionText,
                  answers[currentQuestion.title] === item.id && styles.selectedOptionText,
                ]}
              >
                {item.text}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Navegación entre preguntas */}
      <View style={styles.navigationContainer}>
        <Text style={styles.questionProgress}>
          Pregunta {currentStep + 1} de {cuestionario.questions.length}
        </Text>
        <View style={styles.navigationButtons}>
          <Button
            mode="outlined"
            onPress={handlePrevious}
            style={[styles.navButton, styles.previousButton]}
            labelStyle={styles.buttonText}
          >
            Anterior
          </Button>
          <Button
            mode="contained"
            onPress={handleNext}
            style={[styles.navButton, !isAnswerSelected && styles.disabledButton]}
            labelStyle={styles.buttonText}
            disabled={!isAnswerSelected}
          >
            {currentStep < cuestionario.questions.length - 1 ? 'Siguiente' : 'Finalizar'}
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  questionContainer: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  option: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  selectedOption: { backgroundColor: '#00214E', borderColor: '#00214E' },
  optionText: { fontSize: 16, color: '#333' },
  selectedOptionText: { color: '#fff' },
  navigationContainer: { alignItems: 'center', marginTop: 20 },
  questionProgress: { fontSize: 14, color: '#666', marginBottom: 10 },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  navButton: {
    borderRadius: 30,
    paddingVertical: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: '#2A6295',
  },
  previousButton: {
    backgroundColor: '#2A6295',
  },
  buttonText: { fontSize: 16, textTransform: 'uppercase', color: '#ffffff' },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default CuestionarioInicialScreen;
