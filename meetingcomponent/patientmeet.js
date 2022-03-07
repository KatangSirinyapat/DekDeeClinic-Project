import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from "axios";
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { set } from "react-native-reanimated";

const URL_PATIENT = `http://178.128.90.50:3333/patients`
const URL_DOCTOR = `http://178.128.90.50:3333/users`
const URL_MEET = `http://178.128.90.50:3333/meets`

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);



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
            getPatient(),
            getMeets()
    }, [])

    const updateIdPatient = (input) => {
        setIdPatient(parseInt(input));

        // console.log('---------------------');
        // console.log('ID: ' + idPatient);
        // console.log('PatientId: ' + patient.clinic_number);
    }

    let tmpFnameDoctor = " "
    let tmpLnameDoctor = " "






  
    const getMeets = async () => {
        await axios.get(`${URL_MEET}`)
            .then(function (response) {
                // alert(JSON.stringify(response.data));

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)


                setMeets(objJson)
                
            })
            .catch(function (error) {
                // alert(error.message);
            });



    };

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



    //Patient Autocomplete

    const requestData_patient = () => fetch(URL_PATIENT);
    const requestDataWithDebounce_patient = AwesomeDebouncePromise(requestData_patient, 400);

    const [query_patient, setQuery_patient] = React.useState(null);
    const [data_patient, setData_patient] = React.useState([]);




    const updateData_patient = () => {
        requestDataWithDebounce_patient()
            .then(response => response.json())
            .then(json => json)
            .then(applyFilter_patient)
            .then(setData_patient);
    };

    React.useEffect(updateData_patient, [query_patient]);

    const findData =  () => {
      
        let tmp =0;
        doctors.map((item,index) => {
            if(item.user_id == idDoctor && tmp == 0)
            {
                setFnameDoctor(item.fname)
                setLnameDoctor(item.lname)
                
                tmp = 1
            }
        })
    }

    const findMeet = () => {

        let flag = 0

        meets.map((item,index) => {
            if(item.patient_id == idPatient && flag == 0)
            {
                setIdDoctor(item.user_id)
                setDate_meet(item.date_meet)
                setTime(item.time)
                setTime_to(item.time_to)
                setDetails(item.details)
                console.log("Suscess! Meet");
                findData()
            }
        })

    }

    const onSelect_patient = (index) => {
        setQuery_patient(data_patient[index].fname + " " + data_patient[index].lname);
        setIdPatient(data_patient[index].clinic_number)
        setFnamePatient(data_patient[index].fname)
        setLnamePatient(data_patient[index].lname)
        setTelephone(data_patient[index].telephone)
        // setDate_meet(data_patient[index].meets[1].date_meet)
        // console.log("Test");
       
        // findMeet()
        data_patient[index].meets.map((item,index) => {
            setDate_meet(item.date_meet)
            setTime(item.time)
            setTime_to(item.time_to)
            setDetails(item.details)
        })

        let tmp =0;
        doctors.map((item,index) => {
            if(item.user_id == idDoctor && tmp == 0)
            {
                setFnameDoctor(item.fname)
                setLnameDoctor(item.lname)
                
                tmp = 1
            }
        })


    };

    const onChangeText_patient = (nextQuery) => {
        setQuery_patient(nextQuery);
    };

    const applyFilter_patient = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query_patient.toLowerCase()));
    };

    const clearInput_patient = () => {
        setQuery_patient('');
        setFnamePatient('')
        setLnamePatient('')
        setDate_meet('')
        setTelephone('')
        setTime('')
        setTime_to('')
        setFnameDoctor('')
        setLnameDoctor('')
        setDetails('')
        setData_patient(patients);
    };

    const renderCloseIcon_patient = (props) => (
        <TouchableWithoutFeedback onPress={clearInput_patient}>
            <Icon {...props} name='close' />
        </TouchableWithoutFeedback>
    );

    const renderOption_patient = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.clinic_number + " " + item.fname + " " + item.lname}
            accessoryLeft={StarIcon}
        />
    );


    return (
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('สรุปนัดหมาย')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>สรุปนัดหมายคนไข้</Text>

            <View style={tw`flex w-11/12 h-4/5`}>
                <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                    <Text style={tw`font-semibold text-xl`}>Clinic number</Text>
                    {/* <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`}
                        onChangeText={text => updateIdPatient(text)}
                        placeholder="กรอกรหัสประจำตัวผู้ป่วย. . ."
                    />

                    <Button
                        onPress={handle}
                        title="ค้นหา"
                        color="#841584"

                    /> */}

                    <View style={tw`h-10 w-1/2 ml-2 pl-2  rounded-md`}>
                        <Autocomplete
                            placeholder='โปรดระบุชื่อผู้ป่วย'
                            value={query_patient}
                            onChangeText={onChangeText_patient}
                            accessoryRight={renderCloseIcon_patient}
                            onSelect={onSelect_patient}>
                            {data_patient.map(renderOption_patient)}
                        </Autocomplete>
                    </View>



                </View>

                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-around items-start w-full h-full  p-4 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md pl-2 pt-2`}>
                                    <Text>{fnamePatient}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <View style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md pl-2 pt-2`}>
                                    <Text>{lnamePatient}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>วันที่นัดหมาย</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2 pt-2`}>
                                    <Text>{date_meet}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}></View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>เวลา ตั้งแต่</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2 pt-2`}>
                                    <Text>{time}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>ถึง</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md pl-2`} /> */}
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2 pt-2`}>
                                    <Text>{time_to}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์</Text>

                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2 pt-2`}>
                                    <Text>{telephone}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อแพทย์</Text>
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2 pt-2`}>
                                    <Text>{fnameDoctor}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>สกุลแพทย์</Text>
                                <View style={tw`h-10 mt-2 w-full bg-purple-300 rounded-md  pl-2 pt-2`}>
                                    <Text>{lnameDoctor}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-full`}>
                                <Text style={tw`font-semibold text-base`}>หมายเหตุ</Text>
                                <View style={tw`h-10 mt-2 w-11/12 bg-purple-300 rounded-md  pl-2 pt-2`}>
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

