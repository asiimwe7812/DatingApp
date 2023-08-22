// import { View, Text } from 'react-native'
// import React, { useState } from 'react'
// import useAuth from '../Hooks/useAuth'
// import * as ImagePicker from 'expo-image-picker';
// import { Image } from 'react-native';
// import { Button } from 'react-native';
// import { TextInput } from 'react-native';
// import { TouchableOpacity } from 'react-native';
// import {db} from "../firebase"
// import {doc,setDoc,serverTimestamp} from "@firebase/firestore";


// const ModalScreen = () => {
//     const [image, setImage] = useState(null);
//     const [occupation,setOccupation]=useState(null);
//     const [age,setAge]=useState(null);

//     const incompleteForm= !image||!occupation||!age;
//     const updateUserProfile=()=>{
//         setDoc((db,'users',user.uid),{
//             id:user.id,
//             displayName:user.displayName,
//             image:image,
//             occupation:occupation,
//             age:age,
//             timestamp:serverTimestamp()

//         }).then(()=>{
//             navigation.navigate("Home")
//         }).catch(()=>{
//             alert(error.message)
//         })

//     }

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };
//     const {user} =useAuth()
//   return (
//     <View style={{flex:1,alignItems:"center",padding:1}}
//     >
//       <Text style={{fontSize:20,color:"green",fontWeight:"bold"}}>TONIGHT</Text>
//       <Text style={{color:"gray"}}>Welcome {user.displayName}</Text>

//       <Button title="Choose Profile Pic" onPress={pickImage}  />
//       {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

//       <Text style={{color:"red",padding:4}}>Enter your occupation</Text>
//       <TextInput style={{textAlign:"center",padding:2,fontWeight:"bold"}}placeholder='Enter occupation' value={occupation} onChangeText={text =>setOccupation(text)}/>
//       <Text style={{color:"red",padding:10}}>Enter your Age</Text>
//       <TextInput style={{textAlign:"center",padding:2,fontWeight:"bold"}}placeholder='Age' value={age} onChangeText={text=>setAge(text)} keyboardType='numeric'/>
//       <TouchableOpacity onPress={updateUserProfile} style={{width:100,padding:3,borderRadius:15,bottom:10,position:'absolute',backgroundColor:incompleteForm? '#848884':'#FF69B4'}} disabled={incompleteForm}>
//         <Text style={{textAlign:'center',color:'white',fontSize:15}}>Create Profile</Text>
//       </TouchableOpacity>

//     </View>
//   )
// }

// export default ModalScreen
import React, { useState } from 'react';
import { View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import useAuth from '../Hooks/useAuth';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from '@firebase/firestore';

const ModalScreen = () => {
  const [image, setImage] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !occupation || !age;
  const updateUserProfile = () => {
    setDoc(db, 'users', user.uid, {
      id: user.id,
      displayName: user.displayName,
      image: image,
      occupation: occupation,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(() => {
        alert(error.message);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const { user } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4F4', borderRadius: 20, padding: 20 }}>
      <Text style={{ fontSize: 20, color: 'green', fontWeight: 'bold', marginBottom: 10 }}>TONIGHT</Text>
      <Text style={{ color: 'gray', marginBottom: 20 }}>Welcome</Text>

      <Button title="Choose Profile Pic" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginVertical: 20 }} />}

      <Text style={{ color: 'red', marginBottom: 10 }}>Enter your occupation</Text>
      <TextInput
        style={{ textAlign: 'center', paddingVertical: 10, fontWeight: 'bold', borderWidth: 1, borderColor: 'red', borderRadius: 8, marginBottom: 20 }}
        placeholder="Enter occupation"
        value={occupation}
        onChangeText={(text) => setOccupation(text)}
      />

      <Text style={{ color: 'red', marginBottom: 10 }}>Enter your Age</Text>
      <TextInput
        style={{
          textAlign: 'center',
          paddingVertical: 10,
          fontWeight: 'bold',
          borderWidth: 1,
          borderColor: 'red',
          borderRadius: 8,
          marginBottom: 20,
        }}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity
        onPress={updateUserProfile}
        style={{
          width: 120,
          paddingVertical: 10,
          borderRadius: 15,
          backgroundColor: incompleteForm ? '#848884' : '#FF69B4',
        }}
        disabled={incompleteForm}
      >
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Create Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
