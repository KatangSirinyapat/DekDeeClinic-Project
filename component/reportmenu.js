import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from "tailwind-react-native-classnames";


export default function Report({ navigation }) {
    
    // const navigation = useNavigation()
    return (   
        
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('Menu')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>รายงาน</Text>

            <View style={tw`flex h-3/4 w-full justify-evenly items-center`}>
                <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                  onPress={() => navigation.navigate('สรุปนัดหมาย')}
                  title="สรุปนัดหมาย">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปนัดหมาย</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                  onPress={() => navigation.navigate('สรุปการให้บริการ')}
                  title="สรุปการให้บริการ">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปการให้บริการ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                onPress={() => navigation.navigate('รายละเอียดคนไข้')}
                title="รายละเอียดคนไข้">
                    <Text style={tw`text-lg text-black font-bold`}>รายละเอียดคนไข้</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                onPress={() => navigation.navigate('สรุปรายปี')}
                title="สรุปรายปี">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปรายปี</Text>
                </TouchableOpacity>
            </View>
        </View>

  
    );
}
