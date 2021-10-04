import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from "react-native-picker-select";
import tw from "tailwind-react-native-classnames";
import axios from 'axios';


export default function PatientDetails({ navigation }) {
    const [Nametitle, setNametitle] = useState("");
    return (
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('รายงาน')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>รายละเอียดคนไข้</Text>

            <View style={tw`flex w-3/4 h-4/5`}>
                <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                    <Text style={tw`font-semibold text-xl`}>Clinic number</Text>
                    <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`} 
                     /> 
                    <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}
                     > 
                    <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                    </TouchableOpacity>
                </View>

                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-center items-center w-full h-full p-10 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/5`}>
                                <Text style={tw`font-semibold text-base`}>คำนำหน้า</Text>
                                <View style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 pt-1`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "คำนำหน้า", value: null }}
                                        onValueChange={(value) => setNametitle(value)}
                                        items={[
                                            { label: "เด็กหญิง", value: "male" },
                                            { label: "เด็กชาย", value: "male" },
                                            { label: "นาย", value: "male" },
                                            { label: "นาง", value: "male" },
                                            { label: "นางสาว", value: "female" },
                                        ]}
                                    />
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md`}
                                />
                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                            <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md`}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={tw`font-semibold text-base`}>โรคประจำตัว</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={tw`font-semibold text-base`}>แพ้ยา</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>น้ำหนัก</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ส่วนสูง</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                 />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>BP</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                 />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>BT</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>PR</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                 />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>RR</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={tw`font-semibold text-base`}>อาการที่มาพบแพทย์</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row mt-4 justify-end w-full`}>
                            <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                            >
                                <Text style={tw`text-lg text-black font-bold`}>แก้ไข</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>




    );
}