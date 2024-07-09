import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Registerpg1 from './screens/registerScreen1';
import Registerpg2 from './screens/registerScreen2';
import RegisterScreen3 from './screens/registerScreen3';
import Login from './screens/Login'
import firebase from 'firebase';
import './firebase'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Register" component={Registerpg1} />
        <Stack.Screen name="NextScreen" component={Registerpg2} />
        <Stack.Screen name="FinalScreen" component={RegisterScreen3} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
});


