import { View, Text, Button } from 'react-native';
import React, { createContext, useContext } from 'react';
import * as AuthSession from 'expo-auth-session';

const AuthContext = createContext({});

const config = {
  expoClientId: '7c33a65c-3a07-4e19-b2df-c0e5110586bc', // Replace with your Expo Client ID
  androidClientID: 'AIzaSyBBVKg2r-O1ECB6yKFfBw00QItu3TOYKLk',
  scopes: ['profile', 'email'],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
      const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${config.androidClientID}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&response_type=token&scope=${encodeURIComponent(config.scopes.join(' '))}`;

      const result = await AuthSession.startAsync({ authUrl });

      if (result.type === 'success') {
        // Authentication succeeded, you can handle the result here
        // result.params will contain the returned data from Google
        console.log('Authentication successful:', result.params);
        // Handle the received tokens or authorization code as needed
      } else if (result.type === 'error') {
        // Authentication failed
        console.log('Authentication error:', result.errorCode, result.errorMessage);
      }
    } catch (error) {
      console.log('Error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

// import React, { createContext, useContext, useState } from 'react';
// import * as Google from 'expo-auth-session/providers/google';
// import { initializeApp } from 'firebase/app';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// // Android AIzaSyBBVKg2r-O1ECB6yKFfBw00QItu3TOYKLk
// // web client 769882301169-m10ebdtfcl9p4k68n6oejoncpe42hivm.apps.googleusercontent.com

// const AuthContext = createContext({});

// const config = {
//   expoClientId: '7c33a65c-3a07-4e19-b2df-c0e5110586bc', // Replace with your Expo Client ID
//   webClientId: '769882301169-m10ebdtfcl9p4k68n6oejoncpe42hivm.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
// };

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyD5_9wOwmmITAyS9GFXO21rgcgObbpVwrM",
//   authDomain: "tonight-3-0.firebaseapp.com",
//   projectId: "tonight-3-0",
//   storageBucket: "tonight-3-0.appspot.com",
//   messagingSenderId: "769882301169",
//   appId: "1:769882301169:web:8f1a3843b210c39e30bf50",
//   measurementId: "G-293TH9CEX5"
// };

// initializeApp(firebaseConfig);

// export const AuthProvider = ({ children }) => {
//   const [firebaseUser, setFirebaseUser] = useState(null);
//   const [firebaseError, setFirebaseError] = useState(null);

//   const signInWithGoogle = async () => {
//     try {
//       const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${config.webClientId}&redirect_uri=${encodeURIComponent(
//         Google.makeRedirectUri({ useProxy: true })
//       )}&response_type=token&scope=${encodeURIComponent(config.scopes.join(' '))}`;

//       const result = await Google.startAsync({ authUrl });

//       if (result.type === 'success') {
//         // Use the FirebaseAuthentication package to sign in with Google
//         const provider = new GoogleAuthProvider();
//         const auth = getAuth();

//         const firebaseResult = await signInWithPopup(auth, provider);

//         // Update the Firebase user state with the authenticated user
//         setFirebaseUser(firebaseResult.user);
//         setFirebaseError(null);

//         console.log('Firebase Authentication successful:', firebaseResult.user);
//         // Handle the received tokens or authorization code as needed
//       } else if (result.type === 'error') {
//         // Expo Google sign-in failed
//         console.log('Expo Google Authentication error:', result.errorCode, result.errorMessage);
//       }
//     } catch (error) {
//       // Handle errors
//       setFirebaseUser(null);
//       setFirebaseError(error.message);

//       console.log('Error:', error.message);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user: firebaseUser,
//         error: firebaseError,
//         signInWithGoogle,
//         // ... other methods
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default function useAuth() {
//   return useContext(AuthContext);
// }


// // Android AIzaSyBBVKg2r-O1ECB6yKFfBw00QItu3TOYKLk
// // web client 769882301169-m10ebdtfcl9p4k68n6oejoncpe42hivm.apps.googleusercontent.com
// import * as  React from "react"
// import  * as WebBrowser from "expo-web-browser"
// import * as Google from "expo-auth-session/providers/google"
// import {StyleSheet,Text,TouchableOpacity,View } from 'react-native'
// WebBrowser.maybeCompleteAuthSession()

// const useAuth =()=>{
//   const [accessToken,setAccessToken] =React.useState(null)
//   const [user,setUser]=React.useState(null)
//   const [request,response,promptAsync]=Google.useIdTokenAuthRequest({
//     clientId:"769882301169-m10ebdtfcl9p4k68n6oejoncpe42hivm.apps.googleusercontent.com",
//     androidClientId:"AIzaSyBBVKg2r-O1ECB6yKFfBw00QItu3TOYKLk"
//   })
//   React.useEffect(()=>{
//     if(response==="success"){
//       setAccessToken(response.authentication.accessToken)
//       accessToken && fetchUserInfo()


//     }

//   },[response,accessToken])
//   async function fetchUserInfo(){
//     let response = await fetch(" https://www.googleapis.com/userinfo/v2/me",{
//       headers:{
//         Authorization :`Bearer ${accessToken}`
//       }
//     })
//     const useInfo =await response.json()
//     setUser(useInfo)
//   }
// const ShowUserInfo =()=>{
//   if(user){
//     <View style={{flex:1,alignItems:'center',justifyContent:"center"}}>
//       <Text style={{fontSize:35,marginBottom:20,fontWeight:"bold"}}>Welcome</Text>
//       <Image source={{uri:user.picture}} style={{width:100,height:100}}/>
//       <Text style={{fontSize:35,marginBottom:20,fontWeight:"bold"}}>{user.name}</Text>
//     </View>

//   }
// }

//   return (
//     <View style={styles.container}>
//        {user && <ShowUserInfo/>}
//        { user ===null &&
//        <>
//           <Text style={{fontSize:35,marginBottom:20,fontWeight:"bold"}}>Welcome</Text>
//       <Text style={{fontSize:35,marginBottom:20,fontWeight:"bold"}}>{user.name}</Text>

//       <TouchableOpacity
//           style={{
//             position: 'absolute',
//             bottom: 40,
//             width: 52,
//             marginHorizontal: '25%',
//             backgroundColor: 'white',
//             borderRadius: 15,
//           }}
//           disabled={!request}
//           onPress={()=>{promptAsync()}}
//         >
//           <Text style={{ textAlign: 'center', fontWeight: 'bold', alignItems: 'center', marginTop: 5 }}>
//             Sign in See Matches
//           </Text>
//         </TouchableOpacity>
//        </>   
//      }
   
      
//     </View>
//   )
// }
// export default useAuth;
// const styles =StyleSheet.create({
//   container:{
//     flex:1,
//     alignItems:"center",
//     justifyContent:"center",
//   }
// })
