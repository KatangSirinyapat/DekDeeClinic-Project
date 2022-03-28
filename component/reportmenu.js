import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from "tailwind-react-native-classnames";
import { flex } from "styled-system";


export default function Report({ navigation }) {
    // const navigation = useNavigation()
    return (   
        
        <View style={tw`flex h-full items-center`}>

        <View style={[tw`flex w-full justify-center items-center`,styles.containertop]}> 
          <View style={[tw`w-full`,styles.top]}>
            <Text style={[tw`font-bold`,styles.title]}>รายงาน</Text> 
          </View>
        </View>

            <View style={[tw`flex flex-row flex-wrap w-4/5 justify-evenly items-center`,styles.menu]}>
                <TouchableOpacity style={[tw``, styles.btn]}
                  onPress={() => navigation.navigate('สรุปนัดหมาย')}
                  title="สรุปนัดหมาย">
                    <Image source={require("../Icon/Report/icons8-tear-off-calendar-100.png")}/>
                    <Text style={[tw`text-xl font-bold`,styles.fontmenu]}>สรุปนัดหมาย</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.btn]}
                  onPress={() => navigation.navigate('สรุปการให้บริการ')}
                  title="สรุปการให้บริการ">
                    <Image source={require("../Icon/Report/icons8-accounting-100.png")}/>
                    <Text style={[tw`text-xl font-bold`,styles.fontmenu]}>สรุปการให้บริการ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.btn]}
                onPress={() => navigation.navigate('รายละเอียดผู้ป่วย')}
                title="รายละเอียดผู้ป่วย">
                    <Image source={require("../Icon/Report/icons8-treatment-100.png")}/>
                    <Text style={[tw`text-xl font-bold`,styles.fontmenu]}>รายละเอียดผู้ป่วย</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.btn]}
                onPress={() => navigation.navigate('สรุปรายปี')}
                title="สรุปรายปี">
                    <Image source={require("../Icon/Report/icons8-ratings-100.png")}/>
                    <Text style={[tw`text-xl font-bold`,styles.fontmenu]}>สรุปรายปี</Text>
                </TouchableOpacity>
            </View>
    
        
            <View style={[tw`flex flex-row w-full justify-evenly items-center`,styles.footer]} >
            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('ข้อมูลผู้ป่วย')}
              title="ข้อมูลผู้ป่วย">
              <Image source={require("../Icon/Buttom-Nav/icons8-find-user-male-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>ข้อมูลผู้ป่วย</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('ระบบนัดหมาย')}
              title="ระบบนัดหมาย">
              <Image source={require("../Icon/Buttom-Nav/icons8-calendar-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>นัดหมาย</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('Menu')}
              title="Menu">
              <Image source={require("../Icon/Buttom-Nav/icons8-clinic-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>หน้าหลัก</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('บันทึกการให้บริการ')}
              title="บันทึกการให้บริการ">
              <Image source={require("../Icon/Buttom-Nav/icons8-cost-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>บันทึกการให้บริการ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('รายงาน')}
              title="รายงาน">
              <Image source={require("../Icon/Buttom-Nav/icons8-test-results-45-P.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontpress]}>รายงาน</Text>
            </TouchableOpacity>
        </View>

        </View>

  
    );
}

const styles = StyleSheet.create({

    containertop: {
      position: "absolute",
      top: 0,
    },

    top: { 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 155,
      backgroundColor: '#D7BDE2',
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.16,
      shadowRadius: 5.46,
    },

    title: {
      fontSize: 30,
      color: '#4A235A',
    },

    menu: {
      position: "absolute",
    //   borderColor: 'black',
    //   borderWidth: 2,
      marginTop: 230,
    },

    btn:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EBDEF0',
      width: 320,
      height: 180, 
      borderRadius: 12,  
      marginTop: 20,
      marginRight: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },

    fontmenu:{
      color : '#633974',
      marginTop : 20,
    },

    footer: {
      position: "absolute",
      bottom: 0,
      height: 109,
      backgroundColor: '#D7BDE2',
    },

    navbtm: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'center',
      width: 130,
    },

    fontnormal: {
      color: '#FFFFFF',
    },

    fontpress: {
      color: '#4A235A'
    },
  });