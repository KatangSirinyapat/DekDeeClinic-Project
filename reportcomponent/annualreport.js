import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from 'axios';


const URL_PATIENT = `http://178.128.90.50:3333/patients`
const URL_COSTS = `http://178.128.90.50:3333/costs`

export default function AnnualReport({ navigation }) {


    const [summary, setSummary] = useState({})


    useEffect(() => {
        getDatasummary()
    }, [])
    const getDatasummary = async () => {

        await axios.get(`${URL_COSTS}/sum_of_year/`)
            .then(function (response) {
                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)

                setSummary(objJson)
            })
            .catch(function (error) {
                // alert(error.message);
            })
    }

    // const navigation = useNavigation()
    return (
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('รายงาน')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>สรุปรายปี</Text>
            <View style={tw`flex w-3/4 h-4/5`}>
                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-between items-start w-full h-full p-10 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row w-full justify-start items-center`}>
                            <Text style={tw`font-semibold text-lg`}>ช่วงในการให้บริการ</Text>
                        </View>

                        <View style={tw`flex flex-row justify-start w-full`}>
                            <View style={tw`flex flex-col w-1/3 pt-2`}>
                                <Text style={tw`font-semibold text-base`}>วันที่</Text>
                                <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`} />
                            </View>
                            <View style={tw`flex flex-col w-1/3 ml-9 pt-2`}>
                                <Text style={tw`font-semibold text-base`}>ตั้งแต่</Text>
                                <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`} />
                            </View>

                        </View>


                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>จำนวนการให้บริการทั้งหมด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/4 bg-purple-300 rounded-md pl-2 pt-2`}>{summary.service}</Text>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>จำนวนผู้เข้ารับการรักษา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/4 bg-purple-300 rounded-md pl-2 pt-2`}>{summary.count_of_patient}</Text>
                            </View>
                        </View>

                        <Text style={tw`font-semibold text-lg mt-4`}>วันที่เริ่มต้นใช้งาน - ปัจจุบัน</Text>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>จำนวนการให้บริการทั้งหมด</Text>
                            </View>
                            <View style={tw`flex flex-row items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/4 bg-purple-300 rounded-md pl-2 pt-2`}>{summary.service}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>จำนวนผู้เข้ารับการรักษา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/4 bg-purple-300 rounded-md pl-2 pt-2`}>{summary.count_of_patient}</Text>
                            </View>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>

    );
}