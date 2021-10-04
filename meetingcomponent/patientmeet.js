import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';

export default function PatientMeet({ navigation }) {
    // const navigation = useNavigation()
    return (   
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('สรุปนัดหมาย')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>สรุปนัดหมายคนไข้</Text>
            
            <View style={tw`flex w-11/12 h-4/5`}>
                <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                    <Text style={tw`font-semibold text-xl`}>Clinic number</Text>
                    <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`} 
                     /> 
                      {/* onChangeText={(text) => setParams(text)} */}
                    <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}
                     > 
                     {/* onPress={getPatienprofile}  */}
                        <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                    </TouchableOpacity>
                </View>

            <KeyboardAwareScrollView style={tw`flex mt-8`}>
            <View style={tw`flex flex-col justify-around items-start w-full h-full  p-4 rounded-xl border-4 border-black`}>
                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                        <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md pl-2`}></View>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>สกุล</Text>
                        <View style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md pl-2`}></View>
                    </View>        
                </View>    

                 <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>วันที่นัดหมาย</Text>
                        <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}></View>        
                </View>  

                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>เวลา ตั้งแต่</Text>
                        <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>ถึง</Text>
                        <TextInput style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md pl-2`}/>
                    </View>        
                </View> 

                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์</Text>
                        <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                       
                    </View>        
                </View> 
                
                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อแพทย์</Text>
                        <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อครูฝึก</Text>
                        <TextInput style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md  pl-2`}/>
                    </View>        
                </View> 

                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-full`}>
                        <Text style={tw`font-semibold text-base`}>หมายเหตุ</Text>
                        <TextInput style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md  pl-2`}/>
                    </View>    
                </View> 

                <View style={tw`flex flex-row justify-end w-full mt-2`}>
                    <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}>
                        <Text style={tw`text-lg text-black font-bold`}>Print</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAwareScrollView>
            </View>
        </View>
        
        

  
    );
}