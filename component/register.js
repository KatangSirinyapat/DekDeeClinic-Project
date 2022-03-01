import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, ScrollView } from 'react-native';
import tw from "tailwind-react-native-classnames";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';




const URL = `http://178.128.90.50:3333/patients`

export default function Register({ navigation }) {


    const [date, setDate] = useState(new Date(2021, 12, 1, 0, 0, 0, 0));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [clinic_number, setClinic_number] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [gender, setgender] = useState("");
    const [bod, setbod] = useState("");
    const [age, setage] = useState("");
    const [telephone, settelephone] = useState("");
    const [drug_allergy, setdrug_allergy] = useState("");
    const [congenital_disease, setcongenital_disease] = useState("");
    const [home_no, sethome_no] = useState("");
    const [moo, setmoo] = useState("");
    const [soi, setsoi] = useState("");
    const [subdistrict, setsubdistrict] = useState("");
    const [district, setDistric] = useState("");
    const [province, setprovince] = useState("");
    const [fname_parent, setfname_parent] = useState("");
    const [lname_parent, setlname_parent] = useState("");
    const [relation, setrelation] = useState("");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);


        let curDate = new Date().toString()
        let tmpDate = currentDate.toString()
        let tmpAge = parseInt(curDate.substring(10, 15).trim()) - parseInt(tmpDate.substring(10, 15).trim())

        // console.log(tmpAge)   


        let data = currentDate.toJSON()
        let dataBoD = JSON.stringify(data);
        let tmp = dataBoD.substring(1, 11)
        // console.log(tmp);
        let tmp0 = tmp.substring(0,8)
        let tmp1 = tmp.substring(8,11)
        
        let int_tmp1 = parseInt(tmp1)+1 
        tmp = tmp0+int_tmp1
        console.log(tmp);

        setage(tmpAge.toString())
        setbod(tmp.toString())
        // console.log(dataBoD.substring(1,11)); 
        // console.log(bod); 
        // console.log(age);


    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };






    const postPatient = () => {
        axios
            .post(URL, {
                clinic_number: parseInt(clinic_number),
                fname: fname,
                lname: lname,
                gender: gender,
                bod: bod,
                age: age,
                telephone: telephone,
                drug_allergy: drug_allergy,
                congenital_disease: congenital_disease,
                home_no: home_no,
                moo: moo,
                soi: soi,
                subdistrict: subdistrict,
                district: district,
                province: province,
                fname_parent: fname_parent,
                lname_parent: lname_parent,
                relation: relation
            })
            .then(function (response) {
                // handle success
                // alert(JSON.stringify(response.data));
                alert("ลงทะเบียนผู้ป่วยเสร็จสิ้น")
            })
            .catch(function (error) {
                // handle error
                console.log(error.message);
                alert(error.message);
            });
    };



    return (

        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>

            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('Menu')} title="< ย้อนกลับ" />
            </View>

            <Text style={tw`font-semibold text-2xl mt-6`}>ลงทะเบียนผู้ป่วยใหม่</Text>
            <View style={tw`flex w-11/12 h-4/5`}>
                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-center items-center w-full h-full p-4 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setfname(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setlname(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>เลขประจำตัวผู้ป่วย</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setClinic_number(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>วันเกิด</Text>
                                {/* <TextInput 
                                    onChangeText={(text) => setbod(text)} /> */}
                                <View style={tw`h-10 mt-2 w-2/5 border-2 border-purple-500 bg-purple-100 rounded-md`}>
                                    <DateTimePicker themeVariant="light"
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                                </View>

                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>อายุ</Text>
                                {/* <TextInput 
                                    onChangeText={(text) => setage(text)} /> */}
                                <View style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}>
                                    <Text style={tw`mt-2`}>{age} ปี</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>เพศ</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                          onChangeText={(text) => setgender(text)}/> */}
                                <View style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 pt-2`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "เลือกเพศ", value: null }}
                                        onValueChange={(value) => setgender(value)}
                                        items={[
                                            { label: "ชาย", value: "ชาย" },
                                            { label: "หญิง", value: "หญิง" },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ประวัติการแพ้ยา</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setdrug_allergy(text)} />
                                {/* <View style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 py-2`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "ประวัติการแพ้ยา", value: null }}
                                        onValueChange={(value) => setdrug_allergy(value)}
                                        items={[
                                            { label: "ไม่มีประวัติการแพ้ยา", value: "ไม่มีประวัติการแพ้ยา" },
                                            { label: "แพ้ยากลุ่ม Penicillins", value: "แพ้ยากลุ่ม Penicillins" },
                                        ]}
                                    />
                                </View> */}
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ประวัติโรคประจำตัว</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setcongenital_disease(text)} />
                                {/* <View style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 py-2`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "โรคประจำตัว", value: null }}
                                        onValueChange={(value) => setcongenital_disease(value)}
                                        items={[
                                            { label: "ไม่มีโรคประจำตัว", value: "ไม่มีโรคประจำตัว" },
                                            { label: "หอบหืด", value: "หอบหืด" },
                                        ]}
                                    />
                                </View> */}
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => settelephone(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ที่อยู่ บ้านเลขที่</Text>
                                <TextInput style={tw`h-10 mt-2 w-2/5 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => sethome_no(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>หมู่ที่</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setmoo(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>ตรอก/ซอก/ซอย</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setsoi(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ตำบล</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setsubdistrict(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>อำเภอ</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setDistric(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>จังหวัด</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setprovince(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อผู้ปกครอง</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setfname_parent(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setlname_parent(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>ความสัมพันธ์กับผู้ป่วย</Text>
                                <View style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 pt-2`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "ความสัมพันธ์กับผู้ป่วย", value: null }}
                                        onValueChange={(value) => setrelation(value)}
                                        items={[
                                            { label: "บิดา", value: "บิดา" },
                                            { label: "มารดา", value: "มารดา" },
                                            { label: "ญาติ", value: "ญาติ" },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row mt-4 justify-end w-full`}>
                            <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                                onPress={postPatient}>
                                <Text style={tw`text-lg text-black font-bold`}>บันทึก</Text>
                            </TouchableOpacity>
                            {/* <Button title="บันทึก" onPress={postPatient}></Button> */}
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>


        </View>

    );
}




//------------date time picker

{/* <View>
<View>
    <Button onPress={showDatepicker} title="Show date picker!" />
</View>
<View>
    <Button onPress={showTimepicker} title="Show time picker!" />
</View>
{show && (
    <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'date'}
        is24Hour={true}
        display="default"
        onChange={onChange}
    />
)}
</View> */}