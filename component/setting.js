import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";

export default function Setting({ navigation }) {
    // const navigation = useNavigation()
    return (   
       <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.goBack('Menu')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>ตั้งค่าระบบ</Text>

            <View style={tw`flex flex-col justify-center items-start w-1/2 mt-8 p-8 border-4 border-black rounded-xl`}>
                <Text style={tw`font-semibold text-lg`}>ชื่อคลินิก</Text>
                    <TextInput style={tw`w-full h-8 mt-2 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                <Text style={tw`mt-4 font-semibold text-lg`}>เวลาในการรับนัด</Text>
                    <TextInput style={tw`w-full h-8 mt-2 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                <View style={tw`flex items-end w-full mt-6`}>
                    <TouchableOpacity style={tw`h-10 w-32 bg-white rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}>
                        <Text style={tw`text-lg text-black font-bold text-center`}>บันทึก</Text>
                    </TouchableOpacity>
                </View>
               
            </View>
        </View>

  
    );
}