import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {Foundation} from "@expo/vector-icons"
import {Ionicons} from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Header = ({title,callEnabled}) => {
    const navigation=useNavigation()
  return (
    <SafeAreaView style={{flexDirection:"row",alignItems:"center",padding:2, justifyContent:"center"}}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} style=
        {{padding:2,marginLeft:280,backgroundColor:"pink",borderRadius:15}}>
            {callEnabled &&(
                <TouchableOpacity>
                    <Foundation name='telephone' size={30} color="green"/>
                </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Header