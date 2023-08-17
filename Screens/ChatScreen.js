import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';
import ChatList from '../Components/ChatList';


const ChatScreen = () => {
  return (
    <View>
      <Header title="Chat" callEnabled/>
      <ChatList />

      
    </View>
  )
}

export default ChatScreen;