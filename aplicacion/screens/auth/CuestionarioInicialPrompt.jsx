import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

const CuestionarioInicialPrompt = () => {
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainDrawer' }], // Redirige al flujo principal (Drawer.Navigator)
    });
  };

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
          onPress={handleSkip} // Usa la función para redirigir correctamente
          style={styles.secondaryButton}
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
  secondaryButton: { backgroundColor: '#ccc' },
});

export default CuestionarioInicialPrompt;
