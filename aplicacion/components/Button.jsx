import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Cambia el paquete de íconos según el diseño de tu app

const Button = ({ title, onPress, variant = 'filled', disabled = false, iconName }) => {
  const buttonStyle = [
    styles.button,
    variant === 'outlined' && styles.outlined,
    variant === 'disabled' && styles.disabled,
    disabled && styles.disabled,
  ];

  const textStyle = [
    styles.buttonText,
    variant === 'outlined' && styles.outlinedText,
    variant === 'disabled' && styles.disabledText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={!disabled ? onPress : null}
      activeOpacity={disabled ? 1 : 0.7}
    >
      {iconName ? (
        <MaterialIcons name={iconName} size={24} color={variant === 'outlined' ? '#2A6295' : '#FFFFFF'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2A6295',
    borderRadius: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2A6295',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  outlinedText: {
    color: '#2A6295',
  },
  disabledText: {
    color: '#888',
  },
});

export default Button;
