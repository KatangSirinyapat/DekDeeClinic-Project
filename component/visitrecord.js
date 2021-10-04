import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";

export default function VisitRecord({ navigation }) {
    // const navigation = useNavigation()
    return (   
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('Menu')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>บันทึกการให้บริการ</Text>
            <View style={tw`flex w-3/4 h-4/5`}>
            <KeyboardAwareScrollView style={tw`flex mt-8`}>
            <View style={tw`flex flex-col justify-between items-start w-full h-full p-4 rounded-xl border-4 border-black`}>
                <View style={tw`flex flex-row w-full justify-end items-center`}>
                    <Text style={tw`font-semibold text-base`}>วันที่</Text>
                    <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2 ml-2`} />
                </View>
              
                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/4`}>
                        <Text style={tw`font-semibold text-base`}>เลขประจำตัว</Text>
                        <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/3`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                        <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>       
                    <View style={tw`flex flex-col w-1/3`}>
                        <Text style={tw`font-semibold text-base`}>สกุล</Text>
                        <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>     
                </View>

                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/4`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อเล่น</Text>
                        <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/3`}>
                        <Text style={tw`font-semibold text-base`}>อายุ</Text>
                        <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>       
                    <View style={tw`flex flex-col w-1/3`}></View>     
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ค่าบริการของแพทย์</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>
                
                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ค่ายา</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <Text style={tw`font-semibold text-lg mt-4`}>ค่าบริการของนักจิตวิทยา</Text>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 1</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 2</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 3</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ค่าบริการของนักฝึกพูด</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ค่าบริการของนักกิจกรรมบำบัด</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ค่าบริการของครูการศึกษาพิเศษ</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>ช่องทางชำระเงิน</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>เงินโอน</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>เงินสด</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>
                </View>

                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                    <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                        <Text style={tw`font-semibold text-base`}>รวมทั้งหมด</Text>
                    </View> 
                    <View style={tw`flex flex-row  items-center w-3/5`}>
                        <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                        <Text style={tw`font-semibold text-base ml-2`}>บาท</Text>
                    </View>
                </View>
 
                <View style={tw`flex flex-row mt-4 justify-end w-full mt-4`}>
                    <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}>
                        <Text style={tw`text-lg text-black font-bold`}>บันทึก</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </KeyboardAwareScrollView>
            </View>
        </View>
  
    );
}