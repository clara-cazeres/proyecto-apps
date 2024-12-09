import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';


const ModuleCard = ({ module, moduleNumber, onPress, showExtraInfo = true }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={{ uri: module.img }} style={styles.image} />
    <View style={styles.textContainer}>
      {/* Muestra el número del módulo correctamente */}
      {showExtraInfo && (
        <Text style={styles.moduleNumber}>
          MÓDULO {moduleNumber || 'N/A'}
        </Text>
      )}
      <Text style={styles.title}>{module.title}</Text>
      <Text style={styles.description}>{module.description}</Text>
      {showExtraInfo && (
        <Text style={styles.lessonsCount}>
          {module.lessons?.length || 0} clases
        </Text>
      )}
    </View>
  </TouchableOpacity>
);



const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: '100%',
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  moduleNumber: {
    fontSize: 12,
    color: '#777',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  lessonsCount: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});

export default ModuleCard;

