import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import ChatScreen from './Screens/ChatScreen'
import LoginScreen from './Screens/LoginScreen'
import useAuth from './Hooks/useAuth'
import { Header } from 'react-native/Libraries/NewAppScreen'
import ModalScreen from './Screens/ModalScreen'
const Stack = createNativeStackNavigator()

const StackNavigator = () => {
 const {user} =useAuth();
  return (
    <Stack.Navigator ScreenOptions={{headershown:false}}>
        {user ? (
            <>
            <Stack.Group><Stack.Screen name= "Home" component={HomeScreen}/>
        <Stack.Screen name= "Chat"component={ChatScreen}/></Stack.Group>
        <Stack.Group  screenOptions={{presentation:"modal"}}>
        <Stack.Screen name= "Profile"component={ModalScreen}/>
        </Stack.Group>
        </>):(
        <Stack.Screen name="Login" component={LoginScreen}/>)}
    </Stack.Navigator>
  )
}

export default StackNavigator;