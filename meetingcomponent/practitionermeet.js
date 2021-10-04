import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';

export default function PractitionerMeet({ navigation }) {
    // const navigation = useNavigation()
    return (   
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('สรุปนัดหมาย')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>สรุปนัดหมายนักฝึกพูด</Text>

            <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                    <Text style={tw`font-semibold text-xl`}>ค้นหาแพทย์</Text>
                    <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`} 
                     /> 
                      {/* onChangeText={(text) => setParams(text)} */}
                    <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}
                     > 
                     {/* onPress={getPatienprofile}  */}
                        <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                    </TouchableOpacity>
                </View>

        </View>
        
        

  
    );
}