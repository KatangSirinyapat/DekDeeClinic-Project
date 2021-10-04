import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';

export default function Meet({ navigation }) {
    // const navigation = useNavigation()
    return (   
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('Menu')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>นัดหมาย</Text>
            
            <View style={tw`flex w-11/12 h-4/5`}>
            <KeyboardAwareScrollView style={tw`flex mt-8`}>
            <View style={tw`flex flex-col justify-around items-start w-full h-full  p-4 rounded-xl border-4 border-black`}>
                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>บุคลากรที่ต้องการนัด</Text>
                        {/* <TextInput style={tw`h-10 mt-2 w-5/6 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/> */}
                        <DropDownPicker style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                            onChangeItem={item => console.log(item.label, item.value)}
                            items={[{label: 'item1', value: 'Item1'},
                                    {label: 'item2', value: 'Item2'},]}/> 
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>หัวข้อ</Text>
                        {/* <TextInput style={tw`h-10 mt-2 w-5/6 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/> */}
                        <DropDownPicker style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                            onChangeItem={item => console.log(item.label, item.value)}
                            items={[{label: 'item1', value: 'Item1'},
                                    {label: 'item2', value: 'Item2'},]}/> 
                    </View>        
                </View>     

                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                        <View style={tw`h-10 mt-2 w-11/12 bg-purple-100 rounded-md pl-2`}></View>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>สกุล</Text>
                        <View style={tw`h-10 mt-2 w-full bg-purple-100 rounded-md pl-2`}></View>
                    </View>        
                </View>    

                 <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>วันที่นัดหมาย</Text>
                        <TextInput style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}></View>        
                </View>  

                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>เวลา ตั้งแต่</Text>
                        <TextInput style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>ถึง</Text>
                        <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>        
                </View> 

                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>ข้อมูลผู้ป่วย ชื่อ</Text>
                        <TextInput style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>สกุล</Text>
                        <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>        
                </View> 
                
                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>Clinic number</Text>
                        <TextInput style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>  
                    <View style={tw`flex flex-col w-1/2`}>
                        <Text style={tw`font-semibold text-base`}>เบอร์ติดต่อ</Text>
                        <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>        
                </View> 

                <View style={tw`flex flex-row justify-between w-full`}>
                    <View style={tw`flex flex-col w-full`}>
                        <Text style={tw`font-semibold text-base`}>รายละเอียดเพิ่มเติม</Text>
                        <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/>
                    </View>    
                </View> 

                <View style={tw`flex flex-row justify-end w-full mt-2`}>
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