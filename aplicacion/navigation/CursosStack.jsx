import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CursosScreen from '../screens/CursosScreen';
import ModuleScreen from '../screens/ModuleScreen';
import LessonScreen from '../screens/LessonScreen'; 
const Stack = createStackNavigator();

const CursosStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CursosMain" component={CursosScreen} />
      <Stack.Screen name="Module" component={ModuleScreen} />
      <Stack.Screen name="Lesson" component={LessonScreen} /> 
    </Stack.Navigator>
  );
};

export default CursosStack;
