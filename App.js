import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigator';
import { AuthProvider } from './Hooks/useAuth';
import { useContext } from 'react';
// import t from 'tailwind-rn'


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
      <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}


