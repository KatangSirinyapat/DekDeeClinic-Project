import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from 'axios';
import { set } from "react-native-reanimated";

const URL = `http://178.128.90.50:3333/patients`
export default function PatientProfile({ navigation }) {

    const [Patient, setPatient] = useState({})
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
    const [id, setId] = useState(0)
    const [text, setText] = useState("1")
    

    useEffect(() => {
        getPatient()
    }, [ID]);


    let ID = parseInt(text)

    const getPatient = async () => {
        await axios.get(`${URL}/${ID}`)
            .then(function (response) {
                // handle success
                // alert(JSON.stringify(response.data));
                // let patientsData = JSON.stringify(response.data)
                // console.log(patientsData);
                setPatient(response.data)
                // alert("Suscess")
            })
            .catch(function (error) {
                // handle error
                // alert(error.message);
            });

        // let tmp = JSON.stringify(PatientData)
        // setPatient(PatientData)


        // PrintPatient()
    }

    const editPatient = async () => {
        let patient = await axios.put(`${URL}/${ID}`, {
            Clinicnumber,
            Fname,
            Lname,
            Gender,
            Bod,
            Age,
            Telephone,
            Drugallergy,
            Congenitaldisease,
            Homeno,
            Moo,
            Soi,
            Subdistrict,
            District,
            Province,
            Fnameparent,
            Lnameparent,
            Relation
        })

        console.log(patient);


    }

    const PrintPatient = () => {

        // setId(parseInt(text))

        console.log("Testtttttttttttttt--");
        console.log(Patient.Clinicnumber)
        // console.log(Patient);
        setAge(Patient.Age)
        setBod(Patient.Bod)
        setClinicnumber(Patient.Clinicnumber)
        setCongenitaldisease(Patient.Congenitaldisease)
        setDistric(Patient.District)
        setDrugallergy(Patient.Drugallergy)
        setFname(Patient.Fname)
        setFnameparent(Patient.Fnameparent)
        setGender(Patient.Gender)
        setHomeno(Patient.Homeno)
        setLname(Patient.Lname)
        setLnameparent(Patient.Lnameparent)
        setMoo(Patient.Moo)
        setProvince(Patient.Province)
        setRelation(Patient.Relation)
        setSoi(Patient.Soi)
        setSubdistrict(Patient.Subdistrict)
        setTelephone(Patient.Telephone)
    }



    return (
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('Menu')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>ข้อมูลผู้ป่วย</Text>

            <View style={tw`flex w-11/12 h-4/5`}>
                <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                    <Text style={tw`font-semibold text-xl`}>Clinic number</Text>
                    <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`}
                        onChangeText={text => setText(text)}
                    />
                    {/* onChangeText={(text) => setParams(text)} */}
                    <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}
                        onPress={PrintPatient}
                    >

                        <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                    </TouchableOpacity>
                </View>

                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-center items-center w-full h-full p-4 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อ </Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Fname}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>สกุล </Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Lname}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>เพศ </Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Gender}</Text>
                                </View>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>วันเกิด </Text>
                                <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Bod}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>อายุ </Text>
                                <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Age}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์ </Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Telephone}</Text>
                                </View>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ประวัติการแพ้ยา </Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Drugallergy}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ประวัติโรคประจำตัว </Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Congenitaldisease}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>จำนวนครั้งในการรักษา</Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>0</Text>
                                </View>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ที่อยู่ บ้านเลขที่ </Text>
                                <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`} >
                                    <Text>{Homeno}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>หมู่ที่ </Text>
                                <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`} >
                                    <Text>{Moo}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>ตรอก/ซอก/ซอย</Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Soi}</Text>
                                </View>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ตำบล</Text>
                                <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Subdistrict}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>อำเภอ</Text>
                                <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{District}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>จังหวัด</Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Province}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อผู้ปกครอง</Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Fnameparent}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Lnameparent}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>ความสัมพันธ์กับผู้ป่วย</Text>
                                <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{Relation}</Text>
                                </View>

                            </View>
                        </View>

                        <View style={tw`flex flex-row mt-4 justify-end w-full`}>
                            <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                                onPress={editPatient}
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