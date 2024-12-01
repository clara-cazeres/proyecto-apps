import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CuestionarioInicialPrompt = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuestionario inicial</Text>
      <Text style={styles.description}>
        Podés realizar un formulario para determinar el nivel de comienzo de los cursos y definir tus objetivos personales.
      </Text>
      <View style={styles.buttonsContainer}>
        <Button
          title="Realizar cuestionario"
          onPress={() => navigation.navigate('Cuestionario')}
        />
        <Button
          title="Comenzar desde cero"
          onPress={() => navigation.navigate('Home')}
          color="#888"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  buttonsContainer: { flexDirection: 'column', gap: 10 },
});

export default CuestionarioInicialPrompt;
