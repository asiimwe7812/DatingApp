import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import useAuth from '../Hooks/useAuth'
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import {useTailwind} from "tailwind-rn";
import { TouchableOpacity } from 'react-native';


const LoginScreen = () => {
  const tw =useTailwind()
  const {signInWithGoogle}=useAuth();
  const navigation = useNavigation()
 useLayoutEffect(()=>{
  navigation.setOptions({
    headerShown : false,
  })
 },[])
  return (
    <View style={{flex:1}} >
    <ImageBackground resizeMode="cover"
    style={{flex:1}}
     source={{uri :"https://i1.sndcdn.com/artworks-O8rY5qIyjmoW-0-t500x500.jpg"}}>
      <TouchableOpacity style={{position:"absolute",bottom:40,width:52,marginHorizontal:"25%",
      backgroundColor:"white",borderRadius:15}}><Text style={{textAlign:"center",fontWeight:"bold",alignItems:"center",marginTop:5}} 
      onPress={signInWithGoogle}> Sign in See Matches</Text></TouchableOpacity>
    
    </ImageBackground></View>
  )
}

export default LoginScreen
