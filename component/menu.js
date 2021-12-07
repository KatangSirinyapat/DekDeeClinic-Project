import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";


export default function Menu({ navigation }) {
    // const navigation = useNavigation()
    return (
      <View style={tw`flex h-full justify-center items-center bg-purple-200`}> 
        <View style={tw`flex items-center`}>
          <Text style={tw`font-semibold text-2xl`}>Dek Dee Clinic</Text>
        </View>

        <View style={tw`flex h-3/4 w-full justify-evenly items-center`}>
          <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
           onPress={() => navigation.navigate('ลงทะเบียนผู้ป่วยใหม่')}
           title="ลงทะเบียนผู้ป่วยใหม่">
            <Text style={tw`text-lg text-black font-bold`}>ลงทะเบียนผู้ป่วยใหม่</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
           onPress={() => navigation.navigate('ข้อมูลผู้ป่วย')}
           title="ข้อมูลผู้ป่วย">
            <Text style={tw`text-lg text-black font-bold`}>ข้อมูลผู้ป่วย</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
           onPress={() => navigation.navigate('ระบบนัดหมาย')}
           title="ระบบนัดหมาย">
            <Text style={tw`text-lg text-black font-bold`}>ระบบนัดหมาย</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
           onPress={() => navigation.navigate('บันทึกการให้บริการ')}
           title="บันทึกการให้บริการ">
            <Text style={tw`text-lg text-black font-bold`}>บันทึกการให้บริการ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
           onPress={() => navigation.navigate('รายงาน')}
           title="รายงาน">
            <Text style={tw`text-lg text-black font-bold`}>รายงาน</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
           onPress={() => navigation.navigate('ตั้งค่าระบบ')}
           title="ตั้งค่าระบบ">
            <Text style={tw`text-lg text-black font-bold`}>ตั้งค่าระบบ</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity style={tw`h-12 w-1/3 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
           onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-lg text-black font-bold`}>ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>
         
       
       
      </View>
    
     
    );
  }
  