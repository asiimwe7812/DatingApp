import { View, Text, Button } from 'react-native';
import React, { createContext, useContext } from 'react';
import * as AuthSession from 'expo-auth-session';

const AuthContext = createContext({});

const config = {
  expoClientId: '7c33a65c-3a07-4e19-b2df-c0e5110586bc', // Replace with your Expo Client ID
  webClientId: '939626958917-38fhl1ken0nh90l2vbatvcjn2blm29tr.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({ useProxy: true });
      const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${config.webClientId}&redirect_uri=${encodeURIComponent(
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
    <AuthContext.Provider value={{ user: null, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
