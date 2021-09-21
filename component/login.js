import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
 
export default function Login({ navigation }) {
 
  return (
      <View style={tw`min-h-full flex flex-col justify-center items-center bg-purple-400 bg-opacity-75`}>
        <View style={tw`flex flex-col justify-center items-center w-2/5 h-24 rounded-t-xl bg-purple-400 shadow-xl`}>
          <Text style={tw`text-xl font-bold uppercase tracking-wider pb-1 text-center`}>Log in</Text>
          <Text style={tw`text-lg font-bold uppercase tracking-wide text-center pt-2`}>Dek Dee Clinic</Text>
        </View>

        <View style={tw`flex flex-col justify-start items-center w-2/5 rounded-b-xl bg-purple-200 shadow-xl`}>
          <View style={tw`flex flex-col justify-center items-start w-4/5 mt-8 `}>
            <Text style={tw`font-semibold`}>Username</Text>
              <TextInput style={tw`w-full h-8 mt-2 border-2 border-gray-500 rounded-md pl-2`} placeholder="Foo" />
            <Text style={tw`mt-4 font-semibold`}>Password</Text>
              <TextInput style={tw`w-full h-8 mt-2 border-2 border-gray-500 rounded-md pl-2`} placeholder="****"/>
            {/* <View style={tw`flex-row mt-6 text-sm `}>
              <CheckBox style={tw`w-4 h-4 border-2 border-purple-400`}/>
              <Text style={tw`ml-2`}>Remember Me</Text>
            </View> */}
          </View>
          <TouchableOpacity style={tw`h-8 mt-6 w-4/5 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
          onPress={() => navigation.navigate('Menu')}
          title="Menu">
            <Text style={tw`text-lg text-black font-bold`}>Log in</Text>
          </TouchableOpacity>
          <View style={tw`flex flex-row w-full justify-center items-center mt-6 mb-6`}>
            <Text>Don't have an account?</Text>
            <Text style={tw`font-semibold ml-2`}>Register</Text>
          </View>
        </View>
      </View>
     
   
  );
}

