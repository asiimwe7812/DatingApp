// import { View, Text ,Alert} from 'react-native'
// import React, { useLayoutEffect,useState,useEffect } from 'react'
// import useAuth from '../Hooks/useAuth'
// import { Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { ImageBackground } from 'react-native';
// import {useTailwind} from "tailwind-rn";
// import { TouchableOpacity } from 'react-native';
// import * as LocalAuthentication from 'expo-local-authentication'


// const LoginScreen = () => {
//   const tw =useTailwind()
//   const {signInWithGoogle}=useAuth();
//   const navigation = useNavigation()
//  useLayoutEffect(()=>{
//   navigation.setOptions({
//     headerShown : false,
//   })
//  },[])
//  const [isBiometricSupported, setIsBiometricSupported]=useState(false);

//  //for face detection or fingerprint scan
//  useEffect(()=>{
//    (async ()=>{
//      const compatible=await LocalAuthentication.hasHardwareAsync();
//      setIsBiometricSupported(compatible);
//    })();
//  })
//  const fallBackToDefaultAuth=()=>{
//    console.log('fall back to password authentication');
//  };
//  const alertComponent = (title,mess,btnTxt,btnFunc)=>{
//    return Alert.alert(title,mess,[
//      {
//        text:btnTxt,
//        onPress:btnFunc,
//      }
//    ]);
//  };
//  const TwoButtonAlert=()=>
//  Alert.alert('Welcome to Biometric App',[
//    {
//      text:'Back',
//      onPress:()=>console.log('Cancel Pressed'),
//      style:'cancel'
//    },
//    {
//      text:'OK',onPress:()=>console.log('Ok Pressed')
//    },
//  ]);
//  const handleBiometricAuth=async()=>{
//    //check if hardware supports biometric
//    const isBiometricAvailable=await LocalAuthentication.hasHardwareAsync();

//    //fall back to default authentication method (password )if biometric is not available
//    if (!isBiometricAvailable)
//    return alertComponent(
//      'Please Enter Your Password',
//       'Biometric auth not Supported',
//       'Ok',
//       ()=>fallBackToDefaultAuth()
//    );
//    //check biometric types available(fingerprint,facial recognition,iris recognition)
//     let supportedBiometrics;
//     if (isBiometricAvailable)
//        supportedBiometrics=await LocalAuthentication.supportedAuthenticationTypesAsync();

//        //check biometrics are saved locally in user's device
//        const savedBiometrics=await LocalAuthentication.isEnrolledAsync();
//        if (!savedBiometrics)
//           return alertComponent(
//            'Biometric record not found',
//            'Please Login with Password',
//            'Ok',
//            ()=> fallBackToDefaultAuth()
//           );
//           //authenticate with biometric
//           const biometricAuth= await LocalAuthentication.authenticateAsync({
//            promptMessage:'Login with Biometric',
//            cancelLabel:'cancel',
//            disableDeviceFallback:true,
//           });

//           //Log the user in on success
//           if (biometricAuth) {navigation.navigate("Home")};
//           console.log({isBiometricAvailable});
//           console.log({supportedBiometrics});
//           console.log({savedBiometrics});
//           console.log({biometricAuth});
//  };
//   return (
//     <View style={{flex:1}} >
//     <ImageBackground resizeMode="cover"
//     style={{flex:1}}
//      source={{uri :"https://i1.sndcdn.com/artworks-O8rY5qIyjmoW-0-t500x500.jpg"}}>
//       <TouchableOpacity style={{position:"absolute",bottom:40,width:52,marginHorizontal:"25%",
//       backgroundColor:"white",borderRadius:15}}><Text style={{textAlign:"center",fontWeight:"bold",alignItems:"center",marginTop:5}} 
//       onPress={handleBiometricAuth}> Sign in See Matches</Text></TouchableOpacity>
    
//     </ImageBackground></View>
//   )
// }

// export default LoginScreen
import { View, Text, Alert } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LoginScreen = () => {
  const tw = useTailwind();
  const { signInWithGoogle } = useAuth();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const fallBackToDefaultAuth = () => {
    console.log('fall back to password authentication');
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };
  const handlePress =()=>{
    navigation.navigate("Home")
  }

  const TwoButtonAlert = () => {
    Alert.alert(
      'Press OK to Proceed ',
      '',
      [
        {
          text: 'Back',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress:()=>navigation.navigate("Home")
           
        },
      ],
      { cancelable: false }
    );
  }
  const handleBiometricAuth = async () => {
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAvailable) {
      return alertComponent(
        'Please Enter Your Password',
        'Biometric auth not Supported',
        'Ok',
        () => fallBackToDefaultAuth()
      );
    }

    let supportedBiometrics;
    if (isBiometricAvailable) supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return alertComponent('Biometric record not found', 'Please Login with Password', 'Ok', () => fallBackToDefaultAuth());
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometric',
      cancelLabel: 'cancel',
      disableDeviceFallback: true,
    });

    if (biometricAuth.success) {
      TwoButtonAlert();
      ; // Navigates to the "Home" screen on successful authentication
    }

    console.log({ isBiometricAvailable });
    console.log({ supportedBiometrics });
    console.log({ savedBiometrics });
    console.log({ biometricAuth });
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1 }}
        source={{ uri: 'https://i.pinimg.com/474x/16/40/b7/1640b7d3abcff711b3807a5aa8f0a49d.jpg' }}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 40,
            width: 52,
            marginHorizontal: '25%',
            backgroundColor: 'white',
            borderRadius: 15,
          }}
          onPress={handleBiometricAuth}
        >
          <Text style={{ textAlign: 'center', fontWeight: 'bold', alignItems: 'center', marginTop: 5 }}>
            Sign in See Matches
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

