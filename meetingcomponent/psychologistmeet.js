import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable } from 'react-native-paper';
import axios from "axios";
import moment from "moment";

const URL_DOCTOR = `http://178.128.90.50:3333/users`
const URL_PATIENT = `http://178.128.90.50:3333/patients`

export default function DocterMeet({ navigation }) {
    // const navigation = useNavigation()

    //DOCTOR
    const [doctors, setDoctors] = useState([])
    const [doctor, setDoctor] = useState([])
    const [idDoctor, setIdDoctor] = useState()
    const [fnameDoctor, setFnameDoctor] = useState("")
    const [lnameDoctor, setLnameDoctor] = useState("")

    //PATIENT
    const [patients, setPatients] = useState([])
    const [fnamePatient, setFnamePatient] = useState("")
    const [lnamePatient, setLnamePatient] = useState("")
    const [telephone, setTelephone] = useState("")
    const [idPatient, setIdPatient] = useState()

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
    }, [idDoctor])



    const updateIdDoctor = (input) => {
        setIdDoctor(parseInt(input));

        // console.log('---------------------');
        console.log('ID: ' + idDoctor);
        // console.log('PatientId: ' + patient.clinic_number);
    }

    const getDoctors = async () => {
        await axios.get(`${URL_DOCTOR}/${idDoctor}`)
            .then(function (response) {
                // alert(JSON.stringify(response.data));

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)


                setDoctors(objJson)
                setFnameDoctor(objJson[0].fname)
                setLnameDoctor(objJson[0].lname)
                setMeets(objJson[0].meets)
                // console.log(objJson[0].meets);
                // alert(doctors[0].doctor_id)
                // console.log(doctors[0].doctor_id);
            })
            .catch(function (error) {
                // alert(error.message);
            });

        // doctors.map((item, index) => {
        //     console.log(item.doctor_id + 'index: ' + index);
        // })

    };


    const printMeets = () => {
        // return (meets.map((item, index) => {

        //         <DataTable.Row>
        //             <DataTable.Cell>{item.date_meet}</DataTable.Cell>
        //             <DataTable.Cell>{item.time} ถึง {item.time_to}</DataTable.Cell>
        //             <DataTable.Cell >{item.topic}</DataTable.Cell>
        //             <DataTable.Cell >{item.details}</DataTable.Cell>
        //         </DataTable.Row>

        // }))

        return (meets.map((item, index) => (
           
            <DataTable key={index}>
              
                <DataTable.Row >
                    <DataTable.Cell>{item.date_meet}</DataTable.Cell>
                    <DataTable.Cell>{item.time} ถึง {item.time_to}</DataTable.Cell>
                    <DataTable.Cell >{item.topic}</DataTable.Cell>
                    <DataTable.Cell >{item.details}</DataTable.Cell>
                </DataTable.Row>
            </DataTable>
            
        )))





    }

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
            <Text style={tw`font-semibold text-2xl mt-6`}>สรุปนัดหมายนักจิตวิทยา</Text>
            <Text style={tw`font-semibold text-2xl mt-6`}>ชื่อนักจิตวิทยา:{fnameDoctor} {lnameDoctor}  </Text>

            <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                <Text style={tw`font-semibold text-xl`}>ค้นหานักจิตวิทยา</Text>
                <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`}
                    onChangeText={text => updateIdDoctor(text)}
                    placeholder="กรอกรหัสนักจิตวิทยา. . ."
                />
                {/* onChangeText={(text) => setParams(text)} */}
                <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}
                >
                    {/* onPress={getPatienprofile}  */}
                    <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                </TouchableOpacity>
            </View>


            <Text style={tw`font-semibold text-xl mt-6`}>ตารางนัด  </Text>



            <DataTable >
           
           <DataTable.Header>
               <DataTable.Title>วันที่</DataTable.Title>
               <DataTable.Title>เวลา</DataTable.Title>
               <DataTable.Title >หัวข้อ</DataTable.Title>
               <DataTable.Title>รายละเอียด</DataTable.Title>
           </DataTable.Header>

         
           {printMeets()}
           
       </DataTable>

            
               

            

        </View>




    );
}