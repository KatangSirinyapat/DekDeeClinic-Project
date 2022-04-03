import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
import { DataTable } from 'react-native-paper';
import axios from "axios";
import moment from "moment";
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const URL_PATIENT = `http://178.128.90.50:3333/patients`
const URL_DOCTOR = `http://178.128.90.50:3333/users`

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);




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
        getDoctorsID(),
            getPatient()
    }, [idDoctor])



    const updateIdDoctor = (input) => {
        setIdDoctor(parseInt(input));

        // console.log('---------------------');
        console.log('ID: ' + idDoctor);
        // console.log('PatientId: ' + patient.clinic_number);
    }

    const getDoctorsID = async () => {
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
                    <DataTable.Cell style={tw`flex justify-center`}>{item.date_meet}</DataTable.Cell>
                    <DataTable.Cell style={tw`flex justify-center`}>{item.time} ถึง {item.time_to}</DataTable.Cell>
                    <DataTable.Cell style={tw`flex justify-center`}>{item.topic}</DataTable.Cell>
                    <DataTable.Cell style={tw`flex justify-center`}>{item.details}</DataTable.Cell>
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



    //Doctors Autocomplete

    const requestData = () => fetch(URL_DOCTOR);
    const requestDataWithDebounce = AwesomeDebouncePromise(requestData, 400);

    const [query, setQuery] = React.useState(null);
    const [data, setData] = React.useState([]);

    const getDoctors = async () => {
        await axios.get(`${URL_DOCTOR}`)
            .then(function (response) {
                // alert(JSON.stringify(response.data));

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)


                setDoctors(objJson)

            })
            .catch(function (error) {
                // alert(error.message);
            });

    };

    useEffect(() => {
        getDoctors()
    }, [])

    const updateData = () => {
        requestDataWithDebounce()
            .then(response => response.json())
            .then(json => json)
            .then(applyFilter)
            .then(setData);
    };

    React.useEffect(updateData, [query]);

    const onSelect = (index) => {
        setQuery(data[index].fname + " " + data[index].lname);
        setIdDoctor(data[index].doctor_id)
    };

    const onChangeText = (nextQuery) => {
        setQuery(nextQuery);
    };

    const applyFilter = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query.toLowerCase()));
    };

    const clearInput = () => {
        setQuery('');
        setData(doctors);
    };

    const renderCloseIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearInput}>
            <Icon {...props} name='close' />
        </TouchableWithoutFeedback>
    );

    const renderOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.doctor_id + " " + item.fname + " " + item.lname}
            accessoryLeft={StarIcon}
        />
    );


    return (

        <View style={tw`flex h-full items-center`}>

            <View style={[tw`flex w-full justify-center items-center`, styles.containertop]}>
                <View style={[tw`w-full`, styles.top]}>
                    <Text style={[tw`font-bold`, styles.title]}>สรุปนัดหมายแพทย์</Text>
                </View>
            </View>

            <View style={[tw`flex flex-col`, styles.menu]}>
                <View style={tw`flex flex-col justify-start items-center p-4 rounded-xl`}>
                    <Text style={[tw`font-semibold text-2xl`, styles.font]}>ชื่อหมอ : {fnameDoctor} {lnameDoctor}  </Text>

                    <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                        <Text style={[tw`font-semibold text-xl`, styles.font]}>ค้นหาแพทย์</Text>
                        {/* <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`}
                    onChangeText={text => updateIdDoctor(text)}
                    placeholder="กรอกรหัสประแพทย์. . ."
                /> */}

                        <View style={tw`w-1/2 pl-2`}>
                            <Autocomplete
                                placeholder='โปรดระบุชื่อแพทย์'
                                value={query}
                                onChangeText={onChangeText}
                                accessoryRight={renderCloseIcon}
                                onSelect={onSelect}>
                                {data.map(renderOption)}
                            </Autocomplete>
                        </View>

                        {/* onChangeText={(text) => setParams(text)} */}
                        {/* <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}
                >
                    onPress={getPatienprofile} 
                    <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                </TouchableOpacity> */}
                    </View>


                    <Text style={[tw`font-semibold text-xl mt-6 mb-4`, styles.font]}>ตารางนัดหมาย</Text>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title style={tw`flex justify-center`}>
                                <Text style={styles.fonttable}>วันที่</Text>
                            </DataTable.Title>
                            <DataTable.Title style={tw`flex justify-center`}>
                                <Text style={styles.fonttable}>เวลา</Text>
                            </DataTable.Title>
                            <DataTable.Title style={tw`flex justify-center`}>
                                <Text style={styles.fonttable}>หัวข้อ</Text>
                            </DataTable.Title>
                            <DataTable.Title style={tw`flex justify-center`}>
                                <Text style={styles.fonttable}>รายละเอียด</Text>
                            </DataTable.Title>
                        </DataTable.Header>
                        <KeyboardAwareScrollView style={tw`h-2/5`}>
                            {printMeets()}
                        </KeyboardAwareScrollView>
                    </DataTable>
                </View>
                <View style={tw`flex flex-row justify-end mt-2 mr-4`}>
                    <View style={styles.button}>
                        <Button
                            // onPress={}
                            color="#4A235A"
                            title="Print"
                        />
                    </View>
                </View>
            </View>


            <View style={[tw`flex flex-row w-full justify-evenly items-center`, styles.footer]} >
                <TouchableOpacity style={[tw``, styles.navbtm]}
                    onPress={() => navigation.navigate('ข้อมูลผู้ป่วย')}
                    title="ข้อมูลผู้ป่วย">
                    <Image source={require("../Icon/Buttom-Nav/icons8-find-user-male-45-W.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontnormal]}>ข้อมูลผู้ป่วย</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.navbtm]}
                    onPress={() => navigation.navigate('ระบบนัดหมาย')}
                    title="ระบบนัดหมาย">
                    <Image source={require("../Icon/Buttom-Nav/icons8-calendar-45-W.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontnormal]}>นัดหมาย</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.navbtm]}
                    onPress={() => navigation.navigate('Menu')}
                    title="Menu">
                    <Image source={require("../Icon/Buttom-Nav/icons8-clinic-45-W.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontnormal]}>หน้าหลัก</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.navbtm]}
                    onPress={() => navigation.navigate('บันทึกการให้บริการ')}
                    title="บันทึกการให้บริการ">
                    <Image source={require("../Icon/Buttom-Nav/icons8-cost-45-W.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontnormal]}>บันทึกการให้บริการ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[tw``, styles.navbtm]}
                    onPress={() => navigation.navigate('รายงาน')}
                    title="รายงาน">
                    <Image source={require("../Icon/Buttom-Nav/icons8-test-results-45-P.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontpress]}>รายงาน</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

    containertop: {
        position: "absolute",
        top: 0,
    },

    top: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 155,
        backgroundColor: '#D7BDE2',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.16,
        shadowRadius: 5.46,
    },

    title: {
        fontSize: 30,
        color: '#4A235A',
    },

    menu: {
        // borderColor: 'black',
        // borderWidth: 2,
        marginTop: 180,
    },

    textshow: {
        backgroundColor: '#EBDEF0',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.02,
        shadowRadius: 5,
        borderRadius: 6,
    },

    textbox: {
        backgroundColor: '#EBDEF0',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.02,
        shadowRadius: 5,
        borderColor: '#633974',
        borderWidth: 1,
        borderRadius: 6,
    },

    font: {
        color: '#633974',
    },

    fonttable: {
        color: '#633974',
        fontSize: 16,
    },

    footer: {
        position: "absolute",
        bottom: 0,
        height: 109,
        backgroundColor: '#D7BDE2',
    },

    navbtm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 130,
    },

    fontnormal: {
        color: '#FFFFFF',
    },

    fontpress: {
        color: '#4A235A'
    },

    button: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#EBDEF0',
        borderWidth: 2,
        borderColor: "#4A235A",
        marginLeft: 12,
    }
});