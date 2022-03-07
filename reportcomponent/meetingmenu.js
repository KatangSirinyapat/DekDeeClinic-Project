import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";

export default function Meetingmenu({ navigation }) {
    // const navigation = useNavigation()
    return (   
        
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('รายงาน')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>สรุปนัดหมาย</Text>

            <View style={tw`flex h-3/4 w-full justify-start items-center`}>
                <TouchableOpacity style={tw`h-12 mt-16 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                 onPress={() => navigation.navigate('สรุปนัดหมายผู้ป่วย')}
                 title="สรุปนัดหมายผู้ป่วย">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปนัดหมายผู้ป่วย</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`h-12 mt-16 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                 onPress={() => navigation.navigate('สรุปนัดหมายแพทย์')}
                 title="สรุปนัดหมายแพทย์">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปนัดหมายแพทย์</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                 onPress={() => navigation.navigate('สรุปนัดหมายนักจิตวิทยา')}
                 title="สรุปนัดหมายนักจิตวิทยา">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปนัดหมายนักจิตวิทยา</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                 onPress={() => navigation.navigate('สรุปนัดหมายนักฝึกพูด')}
                 title="สรุปนัดหมายนักฝึกพูด">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปนัดหมายนักฝึกพูด</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                 onPress={() => navigation.navigate('สรุปนัดหมายนักกิจกรรมบำบัด')}
                 title="สรุปนัดหมายนักกิจกรรมบำบัด">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปนัดหมายนักกิจกรรมบำบัด</Text>
                </TouchableOpacity>

                <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                 onPress={() => navigation.navigate('สรุปนัดหมายครูการศึกษาพิเศษ')}
                 title="สรุปนัดหมายครูการศึกษาพิเศษ">
                    <Text style={tw`text-lg text-black font-bold`}>สรุปนัดหมายครูการศึกษาพิเศษ</Text>
                </TouchableOpacity> */}

            </View>
        </View>

  
    );
}


