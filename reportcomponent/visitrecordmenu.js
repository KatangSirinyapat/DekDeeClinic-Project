import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image } from 'react-native';
import tw from "tailwind-react-native-classnames";

export default function Visitrecordmenu({ navigation }) {
    // const navigation = useNavigation()
    return (   
        
        <View style={tw`flex h-full items-center`}>

        <View style={[tw`flex w-full justify-center items-center`,styles.containertop]}> 
          <View style={[tw`w-full`,styles.top]}>
            <Text style={[tw`font-bold`,styles.title]}>สรุปการให้บริการ</Text> 
          </View>
        </View>

            <View style={[tw`flex flex-row flex-wrap w-full justify-evenly items-center`,styles.menu]}>
                <TouchableOpacity style={[tw``, styles.btn]}
                  onPress={() => navigation.navigate('การให้บริการรายวัน')}
                  title="การให้บริการรายวัน">
                    <Image source={require("../Icon/Record/icons8-calendar-1-100.png")}/>
                    <Text style={[tw`text-xl font-bold`,styles.fontmenu]}>รายวัน</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.btn]}
                  onPress={() => navigation.navigate('การให้บริการรายเดือน')}
                  title="การให้บริการรายเดือน">
                    <Image source={require("../Icon/Record/icons8-january-100.png")}/>
                    <Text style={[tw`text-xl font-bold`,styles.fontmenu]}>รายเดือน</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.btn]}
                  onPress={() => navigation.navigate('การให้บริการกำหนดเอง')}
                  title="การให้บริการกำหนดเอง">
                    <Image source={require("../Icon/Record/icons8-plus-1-day-100.png")}/>
                    <Text style={[tw`text-xl font-bold`,styles.fontmenu]}>กำหนดช่วงเอง</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.pic1}>
                <Image source={require("../Icon/Record/Docter-record-s.png")}/>
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
      marginTop: 190,
    },

    btn:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EBDEF0',
      width: 320,
      height: 225, 
      borderRadius: 12,  
      marginTop: 20,
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

    pic1:{
        position: "absolute",
        bottom: 0,
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



