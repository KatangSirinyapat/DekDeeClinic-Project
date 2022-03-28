import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image } from 'react-native';
import { alignItems, flex, grid, left, marginTop } from "styled-system";
import tw from "tailwind-react-native-classnames";


export default function Menu({ navigation }) {
    // const navigation = useNavigation()
    return (
 
    <View style={tw`flex h-full items-center`}>

        <View style={[tw`flex w-full justify-center items-center`,styles.containertop]}> 
          <View style={[tw`flex flex-col w-full`,styles.top]}>
            <Text style={[tw`mt-14 ml-24 font-normal`,styles.welcome]}>Welcome to</Text> 
            <Text style={[tw`mt-9 ml-24 font-bold`,styles.brand]}>Dek Dee Clinic</Text>
          </View>
        </View>

          <View style={[tw`flex flex-row flex-wrap w-3/4 justify-evenly items-center`,styles.menu]}>
            <TouchableOpacity style={[tw``, styles.btn]}
              onPress={() => navigation.navigate('ลงทะเบียนแพทย์')}
              title="ลงทะเบียนแพทย์">
              <Image source={require("../Icon/Home/icons8-doctor-male-80.png")} style={tw`ml-16`}/>
              <Text style={[tw`text-lg font-bold ml-4`,styles.fontmenu]}>ลงทะเบียนแพทย์</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.btn]}
              onPress={() => navigation.navigate('ลงทะเบียนผู้ป่วยใหม่')}
              title="ลงทะเบียนผู้ป่วยใหม่">
              <Image source={require("../Icon/Home/icons8-pharmacist-skin-type-3-80.png")} style={tw`ml-16`}/>
              <Text style={[tw`text-lg font-bold ml-4`,styles.fontmenu]}>ลงทะเบียนผู้ป่วยใหม่</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.btn]}
              onPress={() => navigation.navigate('ข้อมูลผู้ป่วย')}
              title="ข้อมูลผู้ป่วย">
              <Image source={require("../Icon/Home/icons8-find-user-male-80.png")} style={tw`ml-16`}/>
              <Text style={[tw`text-lg font-bold ml-4`,styles.fontmenu]}>ข้อมูลผู้ป่วย</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.btn]}
              onPress={() => navigation.navigate('ระบบนัดหมาย')}
              title="ระบบนัดหมาย">
              <Image source={require("../Icon/Home/icons8-calendar-80.png")} style={tw`ml-16`}/>
              <Text style={[tw`text-lg font-bold ml-4`,styles.fontmenu]}>ระบบนัดหมาย</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.btn]}
              onPress={() => navigation.navigate('บันทึกการให้บริการ')}
              title="บันทึกการให้บริการ">
              <Image source={require("../Icon/Home/icons8-tips-80.png")} style={tw`ml-16`}/>
              <Text style={[tw`text-lg font-bold ml-4`,styles.fontmenu]}>บันทึกการให้บริการ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.btn]}
              onPress={() => navigation.navigate('รายงาน')}
              title="รายงาน">
              <Image source={require("../Icon/Home/icons8-graph-report-80.png")} style={tw`ml-16`}/>
              <Text style={[tw`text-lg font-bold ml-4`,styles.fontmenu]}>รายงาน</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={[tw``, styles.btn]}
              onPress={() => navigation.navigate('ตั้งค่าระบบ')}
              title="ตั้งค่าระบบ">
              <Text style={tw`text-lg text-black font-bold`}>ตั้งค่าระบบ</Text>
            </TouchableOpacity> */}
          
            <TouchableOpacity style={[tw``, styles.btn]}
              onPress={() => navigation.navigate('Login')}>
              <Image source={require("../Icon/Home/icons8-logout-80.png")} style={tw`ml-16`}/>
              <Text style={[tw`text-lg font-bold ml-4`,styles.fontmenu]}>ออกจากระบบ</Text>
            </TouchableOpacity> 
      
          </View>

          <View style={styles.pic1}>
            <Image source={require("../Icon/Home/Docter.png")}/>
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
              <Image source={require("../Icon/Buttom-Nav/icons8-clinic-45-P.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontpress]}>หน้าหลัก</Text>
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
              <Image source={require("../Icon/Buttom-Nav/icons8-test-results-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>รายงาน</Text>
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
      height: 230,
      backgroundColor: '#D7BDE2',
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      shadowColor: "#000",
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.16,
      shadowRadius: 5.46,
    },

    welcome: {
      fontSize: 30,
      color: '#4A235A',
    },

    brand: {
      fontSize: 50,
      color: '#4A235A',
    },

    menu: {
      position: "absolute",
      // borderColor: 'black',
      // borderWidth: 2,
      marginTop: 244,
    },

    btn:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#EBDEF0',
      width: 351,
      height: 95, 
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
    },

    pic1:{
      position: "absolute",
      top: 1,
      right: 45,
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








//New UI

// export default function Menu() {
//   // const navigation = useNavigation()
//   return (
//     <View style={tw`flex h-full justify-center items-center bg-purple-200`}> 
//       <Text>asdasasd</Text>
       
     
     
//     </View>
  
   
//   );
// }