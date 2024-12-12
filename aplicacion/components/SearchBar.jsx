import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText, placeholder = 'Buscar...' }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 0,
    borderRadius: 40,
    paddingHorizontal: 10,
    backgroundColor: '#E4E4E4',
    fontWeight: '300', 
  },
});

export default SearchBar;
