import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../Hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import {AntDesign,Entypo,Ionicons} from "@expo/vector-icons"
import Swiper from 'react-native-deck-swiper'
const DUMMY_DATA=[
  {
    firstName:"Asiimwe",
    lastName:"Ivan",
    photoURL:"https://media.licdn.com/dms/image/D4E03AQGpUc124DKMsA/profile-displayphoto-shrink_800_800/0/1666191863047?e=2147483647&v=beta&t=_H4jKgJcC4M-mfimcZAEfN1UbRAhxrfwETNjW_LmdDI",
    ocupation:"Software Engineer",
    Age:23,
    id:6
  },
  {
    firstName:"Asiimwe",
    lastName:"Ivan",
    photoURL:"https://f4.bcbits.com/img/0032004091_10.jpg",
    ocupation:"DJ",
    Age:24,
    id:1,
  },
  {
    firstName:"Asiimwe",
    lastName:"Ivan",
    photoURL:"https://i.redd.it/jdk17dwrcfn91.jpg",
    ocupation:"Software Engineer",
    Age:33,
    id:3,
  },
  {
    firstName:"Asiimwe",
    lastName:"Ivan",
    photoURL:"data:image/jpeg;base64,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",
    ocupation:"Software Engineer",
    Age:26,
    id:4,
  },
  
]

const HomeScreen = () => {
    const navigation =useNavigation()
    const {logout,user} =useAuth()
    const swipeRef =useRef(null)

  return (
    <SafeAreaView style={{flex:1}}>



      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>

        <TouchableOpacity >
          <Image style={{height:30,width:30,borderRadius:25,marginLeft:5}} source={{uri:"https://media.licdn.com/dms/image/D4E03AQGpUc124DKMsA/profile-displayphoto-shrink_800_800/0/1666191863047?e=2147483647&v=beta&t=_H4jKgJcC4M-mfimcZAEfN1UbRAhxrfwETNjW_LmdDI"}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <Image style={{height:20,width:20}} source={require("../assets/logo.jpg")}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("Chat")}>
        <Ionicons name='chatbubbles-sharp' size={30} color="green"/>
      </TouchableOpacity>
      </View>
      <View style={{flex:1,marginTop:-6}}>
<Swiper cards={DUMMY_DATA} 
ref={swipeRef}
stackSize={5}
cardIndex={0}
animateCardOpacity
verticalSwipe={false}
onSwipedLeft={()=>{console.log("SWIPE PASS")}}
onSwipedRight={()=>{console.log("SWIPE MATCH")}}
overlayLabels={{
  left:{
    title:"NOPE",
    style:{
      label:{
        textAlign: "right",
        color:"red"
      }
    }
  },
  right:{
    title:"MATCH",
    style:{
      label:{
        textAlign: "left",
        color:"green"
      }
    }
  }

}}
containerStyle={{backgroundColor:"transparent"}}
renderCard={(card)=>(<View key={card.id} style={{backgroundColor:"pink",borderRadius:15,flex:0.75,position:"relative"}}>
<Image style={{height:"100%",width:"100%", borderRadius:15}} source={{uri:card.photoURL}}/>
<View style={{backgroundColor:"white",height:80,width:"100%",position:"absolute",bottom:0,justifyContent:"space-between",alignItems:"center",flexDirection:"row",padding:2,borderRadius:15}} >
  <View>
    <Text style={{fontWeight:"bold"}}>{card.firstName}{card.lastName}</Text>
    <Text >{card.ocupation}</Text>
  </View>
  <Text style={{fontWeight:"bold", marginRight:10}}>{card.Age}</Text>
</View>
</View>)}/>
</View>
<View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
  <TouchableOpacity onPress={()=>swipeRef.current.swipeLeft()} style={{alignItems:"center",width:30,height:30,backgroundColor:"#ffb6c1",borderRadius:15,justifyContent:"center"}}>
    <Entypo name='cross' size={23} color="red"/>
  </TouchableOpacity>
  <TouchableOpacity onPress={()=>swipeRef.current.swipeRight()} style={{alignItems:"center",width:30,height:30,backgroundColor:"#90ee90",borderRadius:15,justifyContent:"center"}}>
    <AntDesign name='heart' size={23} color="green"/>
  </TouchableOpacity>
</View>
    </SafeAreaView>
    
  )
}

export default HomeScreen
const styles =StyleSheet.create({
  cardShadow:{
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:1,
    },
    shadowOpacity:0.2,
    shadowRadius:1.41,
    elevation:2,

  }
})
