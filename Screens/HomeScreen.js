import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../Hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { useTailwind } from 'tailwind-rn'
// const tw = useTailwind()

const HomeScreen = () => {
    const navigation =useNavigation()
    const {logout} =useAuth
  return (
    <SafeAreaView >
      <Text>HomeScreen</Text>
      <Button title="Take me back" onPress={()=>navigation.navigate('Chat')}/>
      <Button title='logout' onPress={logout}/>
    </SafeAreaView>
  )
}

export default HomeScreen
