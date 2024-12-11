import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para mostrar el candado

const ModuleCard = ({ module, moduleNumber, onPress, isLocked = false }) => (
  <TouchableOpacity 
    onPress={isLocked ? null : onPress} 
    style={[styles.card, isLocked && styles.cardLocked]}
  >
    <Image source={{ uri: module.img }} style={styles.image} />
    {isLocked && (
      <View style={styles.overlay}>
        <Icon name="lock" size={30} color="#FFF" />
      </View>
    )}
    <View style={styles.textContainer}>
      {moduleNumber && <Text style={styles.moduleNumber}>MÓDULO {moduleNumber}</Text>}
      <Text style={styles.title}>{module.title}</Text>
      <Text style={styles.description}>{module.description}</Text>
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
    alignItems: 'flex-start',
    position: 'relative',
  },
  cardLocked: {
    opacity: 0.7,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  moduleNumber: {
    fontSize: 11,
    color: '#777',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    marginVertical: 5,
  },
  description: {
    fontSize: 12,
    color: '#555',
  },
});
export default ModuleCard;
