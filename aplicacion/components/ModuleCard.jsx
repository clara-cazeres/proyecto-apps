import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ModuleCard = ({ module }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: module.img }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.moduleNumber}>MÓDULO {module.lessons[0]?.module || 'N/A'}</Text>
        <Text style={styles.title}>{module.title}</Text>
        <Text style={styles.description}>{module.description}</Text>
        <Text style={styles.lessonsCount}>{module.lessons.length} clases</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  moduleNumber: {
    fontSize: 12,
    color: '#777',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
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
