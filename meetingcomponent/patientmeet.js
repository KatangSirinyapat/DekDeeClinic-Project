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
    const [patient, setPatient] = useState([{
        "clinic_number": 25640007,
        "fname": "นนทิวัชร",
        "lname": "บุญวงศ์",
        "gender": "ชาย",
        "bod": "2004-01-06",
        "age": "18",
        "telephone": "0814000000",
        "drug_allergy": "ไม่มี",
        "congenital_disease": "ไม่มี",
        "home_no": "1350",
        "moo": "-",
        "soi": "-",
        "subdistrict": "หาดใหญ่",
        "district": "หาดใหญ่",
        "province": "สงขลา",
        "fname_parent": "กกก",
        "lname_parent": "กกก",
        "relation": "มารดา",
        "created_at": "2021-11-21T05:56:47.000+00:00",
        "updated_at": "2021-11-21T05:56:47.000+00:00",
        "meets": [
            {
                "id": 15,
                "details": "ไม่มี",
                "topic": "Topic3",
                "date_meet": "2021-11-21T00:00:00.000Z",
                "time": "00:00:18",
                "time_to": "00:00:19",
                "user_id": 1003,
                "patient_id": 25640007,
                "created_at": "2021-11-21T06:05:01.000+00:00",
                "updated_at": "2021-11-21T06:05:01.000+00:00"
            }
        ],
        "costs": [
            {
                "id": 19,
                "date": "2021-11-21T00:00:00.000Z",
                "cost_of_doctor": 1000,
                "cost_of_medicine": 500,
                "cost_of_psychologist": 0,
                "cost_of_practitioner": 0,
                "cost_of_occupational_therapist": 0,
                "cost_of_teacher": 0,
                "bank_transfer": 1000,
                "cash": 500,
                "total": 1500,
                "user_id": 1003,
                "patient_id": 25640007,
                "created_at": "2021-11-21T06:07:32.000+00:00",
                "updated_at": "2021-11-21T06:07:32.000+00:00"
            }
        ]
    }])
    const [idPatient, setIdPatient] = useState()
    const [fnamePatient, setFnamePatient] = useState("")
    const [lnamePatient, setLnamePatient] = useState("")
    const [telephone, setTelephone] = useState("")
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

        // console.log('---------------------');
        // console.log('ID: ' + idPatient);
        // console.log('PatientId: ' + patient.clinic_number);
    }

    let tmpFnameDoctor = " "
    let tmpLnameDoctor = " "
    
    


    const findDoctor = () => {
       
      
    }

    const findMeet = async () => {
        await patient.meets.map((item, index) => {
            setMeets(item)
        })
    }

    const handle = async () => {
       await findPatient()
    }

    const findPatient = () => {
        patients.map((item, index) => {
            if (item.clinic_number == idPatient) {
                setPatient(item)
                console.log("------------");
                // console.log(patient.meets[0].topic);

                findMeet()
                console.log(meets.user_id);
            }
            else if (item.doctor_id != idDoctor) {
                // alert('กรุณากรอกรหัสประจำตัวแพทย์ให้ถูกต้อง')

                console.log("ItemIDpatient: " + item.clinic_number);
            }
        })
        doctors.map((item, index) => {
            if (item.doctor_id === meets.user_id) {
                tmpFnameDoctor = item.fname
                tmpLnameDoctor = item.lname
            }

        })
       

        setFnamePatient(patient.fname)
        setLnamePatient(patient.lname)
        setTelephone(patient.telephone)
        setDate_meet(meets.date_meet)
        setTime(meets.time)
        setTime_to(meets.time_to)
        setDetails(meets.details)
        setFnameDoctor(tmpFnameDoctor)
        setLnameDoctor(tmpLnameDoctor)
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

                    <Button

                        onPress={handle}
                        title="ค้นหา"
                        color="#841584"

                    />
                </View>

                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-around items-start w-full h-full  p-4 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md pl-2`}>
                                    <Text>{fnamePatient}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <View style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{lnamePatient}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>วันที่นัดหมาย</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{date_meet}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}></View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>เวลา ตั้งแต่</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{time}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>ถึง</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{time_to}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์</Text>

                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`}>
                                    <Text>{telephone}</Text>
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
                                    <Text>{details}</Text>
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