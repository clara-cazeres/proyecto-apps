import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import store from './redux/store';
import MainNavigator from './navigation/MainNavigator';
import AuthLoader from './components/auth/AuthLoader'; 

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthLoader>
          <MainNavigator />
        </AuthLoader>
      </NavigationContainer>
    </Provider>
  );
}
