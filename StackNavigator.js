import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import ChatScreen from './Screens/ChatScreen'
import LoginScreen from './Screens/LoginScreen'
import ModalScreen from './Screens/ModalScreen'
import { Header } from 'react-native/Libraries/NewAppScreen'
import useAuth from './Hooks/useAuth'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator ScreenOptions={{ headershown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Profile" component={ModalScreen} options={{ presentation: 'modal' }} />
    
    </Stack.Navigator>
  )
}

export default StackNavigator;
