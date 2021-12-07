import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';


const URL_COST = `http://178.128.90.50:3333/costs`

export default function MonthlyRecord({ navigation }) {
    // const navigation = useNavigation()
    //COSTS API
    const [costs, setCosts] = useState([])
    const [cost, setCost] = useState([])
    const [date, setDate] = useState("")
    const [cost_of_doctor, setCost_of_doctor] = useState(0)
    const [cost_of_medicine, setCost_of_medicine] = useState(0)
    const [cost_of_psychologist, setCost_of_psychologist] = useState(0)
    const [cost_of_practitioner, setCost_of_practitioner] = useState(0)
    const [cost_of_occupational_therapist, setCost_of_occupational_therapist] = useState(0)
    const [cost_of_teacher, setCost_of_teacher] = useState(0)
    const [bank_transfer, setBank_transfer] = useState(0)
    const [cash, setCash] = useState(0)
    const [total, setTotal] = useState(0)

    //Date time
    const [date1, setDate1] = useState(new Date(2020, 12, 1, 0, 0, 0, 0));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate1(currentDate);

        let curDate = new Date().toString()
        let tmpDate = currentDate.toString()

        let data = currentDate.toJSON()
        let dataBoD = JSON.stringify(data);
        let tmp1 = dataBoD.substring(1, 11)
        setDate(tmp1.toString())


        let tmp = "";
        let cost_of_doctor = 0
        let cost_of_medicine = 0
        let cost_of_psychologist = 0
        let cost_of_practitioner = 0
        let cost_of_occupational_therapist = 0
        let cost_of_teacher = 0
        let bank_transfer = 0
        let cash = 0
        let total = 0


        costs.map((item, index) => {
            tmp = item.date
            tmp = tmp.substring(0, 7)
            // console.log("------------");
            // console.log(tmp);
            if (tmp == date) {

                cost_of_doctor += item.cost_of_doctor
                cost_of_medicine += item.cost_of_medicine
                cost_of_psychologist += item.cost_of_psychologist
                cost_of_practitioner += item.cost_of_practitioner
                cost_of_occupational_therapist += item.cost_of_occupational_therapist
                cost_of_teacher += item.cost_of_teacher
                bank_transfer += item.bank_transfer
                cash += item.cash
                total += item.total

                console.log(cost_of_doctor);
            }
            // console.log("-----------------------");
        })

        setCost_of_doctor(cost_of_doctor)
        setCost_of_medicine(cost_of_medicine)
        setCost_of_psychologist(cost_of_psychologist)
        setCost_of_practitioner(cost_of_practitioner)
        setCost_of_occupational_therapist(cost_of_occupational_therapist)
        setCost_of_teacher(cost_of_teacher)
        setBank_transfer(bank_transfer)
        setCash(cash)
        setTotal(total)

        // console.log(total);

        // console.log(dataBoD.substring(1,11)); 
    };





    useEffect(() => {
        getCost()
    }, [])


    const inputDate = (input) => {
        setDate(input)
        findCost()
    }

    const findCost = () => {

        let tmp = "";
        let cost_of_doctor = 0
        let cost_of_medicine = 0
        let cost_of_psychologist = 0
        let cost_of_practitioner = 0
        let cost_of_occupational_therapist = 0
        let cost_of_teacher = 0
        let bank_transfer = 0
        let cash = 0
        let total = 0


        costs.map((item, index) => {
            tmp = item.date
            tmp = tmp.substring(0, 7)
            // console.log("------------");
            // console.log(tmp);
            if (tmp == date) {

                cost_of_doctor += item.cost_of_doctor
                cost_of_medicine += item.cost_of_medicine
                cost_of_psychologist += item.cost_of_psychologist
                cost_of_practitioner += item.cost_of_practitioner
                cost_of_occupational_therapist += item.cost_of_occupational_therapist
                cost_of_teacher += item.cost_of_teacher
                bank_transfer += item.bank_transfer
                cash += item.cash
                total += item.total

                console.log(cost_of_doctor);
            }
            // console.log("-----------------------");
        })

        setCost_of_doctor(cost_of_doctor)
        setCost_of_medicine(cost_of_medicine)
        setCost_of_psychologist(cost_of_psychologist)
        setCost_of_practitioner(cost_of_practitioner)
        setCost_of_occupational_therapist(cost_of_occupational_therapist)
        setCost_of_teacher(cost_of_teacher)
        setBank_transfer(bank_transfer)
        setCash(cash)
        setTotal(total)

        // console.log(total);
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
            <Text style={tw`font-semibold text-2xl mt-6`}>สรุปการให้บริการรายเดือน</Text>
            <View style={tw`flex w-3/4 h-4/5`}>
                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-between items-start w-full h-full p-8 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row w-full justify-start items-center`}>
                            <View style={tw`flex flex-row w-2/5 justify-start items-center`}>
                                <Text style={tw`font-semibold text-base`}>รายเดือน</Text>
                                {/* <TextInput style={tw`h-8 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2 ml-2`}
                                    onChangeText={text => inputDate(text)}
                                    placeholder="YYY-MM"
                                /> */}
                                <DateTimePicker themeVariant="light" style={tw`h-8 w-1/2 rounded-md pl-2 ml-2`}
                                    testID="dateTimePicker"
                                    value={date1}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            </View>
                            <View style={tw`flex flex-row w-1/2 justify-start items-center`}>
                                <Text style={tw`font-semibold text-base`}>จำนวนคนไข้</Text>
                                <View style={tw`flex flex-row w-2/5`}>
                                    <View style={tw`flex justify-center items-center h-8 w-full bg-purple-300 rounded-md ml-2`}>
                                        <Text></Text>
                                    </View>
                                    <Text style={tw`font-semibold text-base pl-2`}>คน</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของแพทย์</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{cost_of_doctor}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่ายา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{cost_of_medicine}</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={tw`font-semibold text-lg mt-4`}>ค่าบริการของนักจิตวิทยา</Text>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 1</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{cost_of_psychologist}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 2</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 3</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของนักฝึกพูด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{cost_of_practitioner}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของนักกิจกรรมบำบัด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{cost_of_occupational_therapist}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของครูการศึกษาพิเศษ</Text>
                            </View>
                            <View style={tw`flex flex-row items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{cost_of_teacher}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>เงินโอน</Text>
                            </View>
                            <View style={tw`flex flex-row items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{bank_transfer}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>เงินสด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{cash}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base text-red-600`}>คิดเป็นเงินทั้งสิ้น</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-2/5 bg-purple-300 rounded-md pl-2`}>
                                    <Text style={tw`font-semibold text-base`}>{total}</Text>
                                </View>
                                <Text style={tw`font-semibold text-base ml-2 text-red-600`}>บาท</Text>
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