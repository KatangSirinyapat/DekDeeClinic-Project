import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from "axios";




const URL_DOCTOR = `http://178.128.90.50:3333/users`

const URL_PATIENT = `http://178.128.90.50:3333/patients`




export default function PatientMeet({ navigation }) {
    // const navigation = useNavigation()


    //DOCTOR
    const [doctors, setDoctors] = useState([])
    const [doctor, setDoctor] = useState([])
    const [idDoctor, setIdDoctor] = useState()
    const [fnameDoctor, setFnameDoctor] = useState("")
    const [lnameDoctor, setLnameDoctor] = useState("")
    //PATIENT
    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState([])
    const [idPatient, setIdPatient] = useState()
    const [fnamePatient, setFnamePatient] = useState("")
    //MEET
    const [meets, setMeets] = useState([])
    const [details, setDetails] = useState("")
    const [topic, setTopic] = useState("")
    const [date_meet, setDate_meet] = useState("")
    const [time, setTime] = useState("")
    const [time_to, setTime_to] = useState("")

    useEffect(() => {
        getDoctors(),
            getPatient()
    }, [])

    const updateIdPatient = (input) => {
        setIdPatient(parseInt(input));
        findPatient()
        // console.log('---------------------');
        // console.log('ID: ' + idPatient);
        // console.log('PatientId: ' + patient.clinic_number);
    }


    const findDoctor = () => {
        doctors.map((item,index) => {
            if(item.doctor_id === meets.user_id)
            {
                setFnameDoctor(item.fname)
                setLnameDoctor(item.lname)
            }

        })
    }



    const findPatient = () => {
        patients.map((item, index) => {
            if (item.clinic_number == idPatient) {
                setPatient(item)
                console.log("------------");
                // console.log(patient.meets[0].topic);
                patient.meets.map((item, index) => {
                    setMeets(item)
                })

                console.log(meets.user_id);       
            }
            else if (item.doctor_id != idDoctor) {
                // alert('กรุณากรอกรหัสประจำตัวแพทย์ให้ถูกต้อง')

                console.log("ItemIDpatient: " + item.clinic_number);
            }
        })
        findDoctor()
    }

    const getDoctors = async () => {
        await axios.get(`${URL_DOCTOR}`)
            .then(function (response) {
                // alert(JSON.stringify(response.data));

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)


                setDoctors(objJson)
                // alert(doctors[0].doctor_id)
            })
            .catch(function (error) {
                // alert(error.message);
            });

        // doctors.map((item, index) => {
        //     console.log(item.doctor_id + 'index: ' + index);
        // })

    };

    const getPatient = async () => {
        await axios.get(`${URL_PATIENT}`)
            .then(function (response) {

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)


                setPatients(objJson)
            })
            .catch(function (error) {
                // alert(error.message);
            })

    }


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
                        onChangeText={text => updateIdPatient(text)}
                        placeholder="กรอกรหัสประจำตัวผู้ป่วย. . ."
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
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{patient.fname}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <View style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{patient.lname}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>วันที่นัดหมาย</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{meets.date_meet}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}></View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>เวลา ตั้งแต่</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{meets.time}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>ถึง</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{meets.time_to}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์</Text>
                                
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{patient.telephone}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อแพทย์</Text>
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{fnameDoctor} {lnameDoctor}</Text>
                                </View>
                               
                            </View>
                            {/* <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อครูฝึก</Text>
                                <TextInput style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md  pl-2`} />
                            </View> */}
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-full`}>
                                <Text style={tw`font-semibold text-base`}>หมายเหตุ</Text>
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{meets.details}</Text>
                                </View>
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