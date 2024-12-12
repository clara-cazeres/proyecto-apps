import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';


const QuestionCard = ({ question, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
      <FontAwesome5 name="user-alt" size={18} color="#e7e7e7" />
        <Text style={styles.userName}>{question.user}</Text>
      </View>
      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.description}>{question.description}</Text>
      <TouchableOpacity style={styles.chatIconContainer}>
      <Ionicons name="chatbubbles-outline" size={24} color="black" />       
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontWeight: 'light',
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  chatIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
});

export default QuestionCard;
