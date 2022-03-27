import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";


export default function Menu({ navigation }) {
    // const navigation = useNavigation()
    return (

     
      <View style={tw`flex h-full justify-center items-center bg-white`}> 

        <View style={[tw`flex flex-row items-start`,styles.top]} >
          <Text style={tw`font-normal text-2xl  mt-20 w-40 h-7 ml-20`}>Welcome to</Text> 
          <Text style={tw`font-bold text-4xl mt-36  w-96 h-12`}>Dek Dee Clinic</Text>
        </View>

        <View style={tw`flex  h-3/4 w-full justify-evenly items-center`}>
          <TouchableOpacity style={[tw``, styles.btn]}
           onPress={() => navigation.navigate('ลงทะเบียนผู้ป่วยใหม่')}
           title="ลงทะเบียนผู้ป่วยใหม่">
            <Text style={tw`text-lg text-black font-bold`}>ลงทะเบียนผู้ป่วยใหม่</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[tw``, styles.btn]}
           onPress={() => navigation.navigate('ข้อมูลผู้ป่วย')}
           title="ข้อมูลผู้ป่วย">
            <Text style={tw`text-lg text-black font-bold`}>ข้อมูลผู้ป่วย</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[tw``, styles.btn]}
           onPress={() => navigation.navigate('ระบบนัดหมาย')}
           title="ระบบนัดหมาย">
            <Text style={tw`text-lg text-black font-bold`}>ระบบนัดหมาย</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[tw``, styles.btn]}
           onPress={() => navigation.navigate('บันทึกการให้บริการ')}
           title="บันทึกการให้บริการ">
            <Text style={tw`text-lg text-black font-bold`}>บันทึกการให้บริการ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[tw``, styles.btn]}
           onPress={() => navigation.navigate('รายงาน')}
           title="รายงาน">
            <Text style={tw`text-lg text-black font-bold`}>รายงาน</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={[tw``, styles.btn]}
           onPress={() => navigation.navigate('ตั้งค่าระบบ')}
           title="ตั้งค่าระบบ">
            <Text style={tw`text-lg text-black font-bold`}>ตั้งค่าระบบ</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity style={[tw``, styles.btn]}
           onPress={() => navigation.navigate('Login')}>
            <Text style={tw`text-lg text-black font-bold`}>ออกจากระบบ</Text>
          </TouchableOpacity>
        </View>
         
       
       
      </View>
    
     
    );
  }
  


  const styles = StyleSheet.create({

    top: {
      height: 248,
      width: 834,
      backgroundColor: '#D7BDE2',
      borderRadius: 50,
      marginBottom: 70,
    },
    btn:{
      backgroundColor: '#EBDEF0',
      width: 351,
      height: 124,
      borderRadius: 12,
      // padding: 22 24 22 24
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",



    },
  });








//New UI

// export default function Menu() {
//   // const navigation = useNavigation()
//   return (
//     <View style={tw`flex h-full justify-center items-center bg-purple-200`}> 
//       <Text>asdasasd</Text>
       
     
     
//     </View>
  
   
//   );
// }