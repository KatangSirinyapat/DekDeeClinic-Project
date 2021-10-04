import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, ScrollView } from 'react-native';
import tw from "tailwind-react-native-classnames";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';



export default function Register({ navigation }) {

    const [Clinicnumber, setClinicnumber] = useState("");
    const [Fname, setFname] = useState("");
    const [Lname, setLname] = useState("");
    const [Gender, setGender] = useState("");
    const [Bod, setBod] = useState("");
    const [Age, setAge] = useState("");
    const [Telephone, setTelephone] = useState("");
    const [Drugallergy, setDrugallergy] = useState("");
    const [Congenitaldisease, setCongenitaldisease] = useState("");
    const [Homeno, setHomeno] = useState("");
    const [Moo, setMoo] = useState("");
    const [Soi, setSoi] = useState("");
    const [Subdistrict, setSubdistrict] = useState("");
    const [District, setDistric] = useState("");
    const [Province, setProvince] = useState("");
    const [Fnameparent, setFnameparent] = useState("");
    const [Lnameparent, setLnameparent] = useState("");
    const [Relation, setRelation] = useState("");

    const postPatient = () => {
        axios
            .post('http://127.0.0.1:3333/patients', {
                Clinicnumber: Clinicnumber,
                Fname: Fname,
                Lname: Lname,
                Gender: Gender,
                Bod: Bod,
                Age: Age,
                Telephone: Telephone,
                Drugallergy: Drugallergy,
                Congenitaldisease: Congenitaldisease,
                Homeno: Homeno,
                Moo: Moo,
                Soi: Soi,
                Subdistrict: Subdistrict,
                District: District,
                Province: Province,
                Fnameparent: Fnameparent,
                Lnameparent: Lnameparent,
                Relation: Relation
            })
            .then(function (response) {
                // handle success
                alert(JSON.stringify(response.data));
            })
            .catch(function (error) {
                // handle error
                alert(error.message);
            });
    };

    //   const Print = () => {
    //       console.log("Fname:"+ Fname)
    //       console.log("Lname:"+ Lname)
    //       console.log("Gender:"+ Gender)
    //   }

    // const navigation = useNavigation()

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
                                    onChangeText={(text) => setFname(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setLname(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>เลขประจำตัวผู้ป่วย</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setClinicnumber(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>วันเกิด</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setBod(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>อายุ</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setAge(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>เพศ</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                          onChangeText={(text) => setGender(text)}/> */}
                                <View style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 pt-2`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "เลือกเพศ", value: null }}
                                        onValueChange={(value) => setGender(value)}
                                        items={[
                                            { label: "ชาย", value: "male" },
                                            { label: "หญิง", value: "female" },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ประวัติการแพ้ยา</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setDrugallergy(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ประวัติโรคประจำตัว</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setCongenitaldisease(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setTelephone(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ที่อยู่ บ้านเลขที่</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setHomeno(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>หมู่ที่</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setMoo(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>ตรอก/ซอก/ซอย</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setSoi(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ตำบล</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setSubdistrict(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>อำเภอ</Text>
                                <TextInput style={tw`h-10 mt-2 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setDistric(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>จังหวัด</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setProvince(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อผู้ปกครอง</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setFnameparent(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={(text) => setLnameparent(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>ความสัมพันธ์กับผู้ป่วย</Text>
                                <View style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 pt-2`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "ความสัมพันธ์กับผู้ป่วย", value: null }}
                                        onValueChange={(value) => setRelation(value)}
                                        items={[
                                            { label: "บิดา", value: "dad" },
                                            { label: "มารดา", value: "mom" },
                                            { label: "ญาติ", value: "relativen" },
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
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>

    );
}

