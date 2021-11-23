import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from "axios";




const URL_COST = `http://178.128.90.50:3333/costs`

export default function DailyRecord({ navigation }) {
    // const navigation = useNavigation()

  

    //COSTS API
    const [costs, setCosts] = useState([])
    const [cost, setCost] = useState([])
    const [date, setDate] = useState("")
 

    useEffect(() => {
        getCost()
    }, [])


    const inputDate = (input) => {
        setDate(input)
        findCost()
    }

    const findCost = () => {
        let tmp = "";
        costs.map((item, index) => {
            if (item.date === date.concat("T00:00:00.000Z")) {
                setCost(item)
                // tmp = item.date
                // console.log(tmp.substring(0,7));

            }
        })
        // console.log(cost.id);
    }

    const getCost = async () => {
        await axios.get(`${URL_COST}`)
            .then(function (response) {

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)


                setCosts(objJson)
            })
            .catch(function (error) {
                // alert(error.message);
            })

    }


    return (
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('สรุปการให้บริการ')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>สรุปการให้บริการรายวัน</Text>
            <View style={tw`flex w-3/4 h-4/5`}>
                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-between items-start w-full h-full p-8 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row w-full justify-start items-center`}>
                            <View style={tw`flex flex-row w-2/5 justify-start items-center`}>
                                <Text style={tw`font-semibold text-base`}>รายวัน</Text>
                                <TextInput style={tw`h-8 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2 ml-2`}
                                    onChangeText={text => inputDate(text)}
                                    placeholder="YYY-MM-DD"
                                />
                            </View>
                            <View style={tw`flex flex-row w-1/2 justify-start items-center`}>
                                <Text style={tw`font-semibold text-base pl-4`}>จำนวนคนไข้</Text>
                                <TextInput style={tw`h-8 w-1/2 bg-purple-300 rounded-md pl-2 ml-2`} />
                                <Text style={tw`font-semibold text-base pl-2`}>คน</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของแพทย์</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.cost_of_doctor}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่ายา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.cost_of_medicine}</Text>
                            </View>
                        </View>

                        <Text style={tw`font-semibold text-lg mt-4`}>ค่าบริการของนักจิตวิทยา</Text>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 1</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.cost_of_psychologist}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 2</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 3</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของนักฝึกพูด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.cost_of_practitioner}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของนักกิจกรรมบำบัด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.cost_of_occupational_therapist}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของครูการศึกษาพิเศษ</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                            <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.cost_of_teacher}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>เงินโอน</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                            <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.bank_transfer}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>เงินสด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                            <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.cash}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>คิดเป็นเงินทั้งสิ้น</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                            <Text style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>{cost.total}</Text>
                                <Text style={tw`font-semibold text-base ml-2`}>บาท</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row mt-4 justify-end w-full mt-4`}>
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