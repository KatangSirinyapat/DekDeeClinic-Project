import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image } from 'react-native';
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

    const findData = () => {

        let tmp = 0;
        doctors.map((item, index) => {
            if (item.user_id == idDoctor && tmp == 0) {
                setFnameDoctor(item.fname)
                setLnameDoctor(item.lname)

                tmp = 1
            }
        })
    }

    const findMeet = () => {

        let flag = 0

        meets.map((item, index) => {
            if (item.patient_id == idPatient && flag == 0) {
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
        data_patient[index].meets.map((item, index) => {
            setDate_meet(item.date_meet)
            setTime(item.time)
            setTime_to(item.time_to)
            setDetails(item.details)
        })

        let tmp = 0;
        doctors.map((item, index) => {
            if (item.user_id == idDoctor && tmp == 0) {
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
        <View style={tw`flex h-full items-center`}>

            <View style={[tw`flex w-full justify-center items-center`, styles.containertop]}>
                <View style={[tw`w-full`, styles.top]}>
                    <Text style={[tw`font-bold`, styles.title]}>สรุปนัดหมายผู้ป่วย</Text>
                </View>
            </View>

            <View style={[tw`flex flex-col`, styles.menu]}>
                <View style={tw`flex flex-row w-full justify-center items-center`}>
                    <Text style={[tw`font-semibold text-xl`, styles.font]}>ค้นหาชื่อผู้ป่วย</Text>
                    {/* <TextInput style={tw`h-8 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`}
                        onChangeText={text => updateIdPatient(text)}
                        placeholder="กรอกรหัสประจำตัวผู้ป่วย. . ."
                    />

                    <Button
                        onPress={handle}
                        title="ค้นหา"
                        color="#841584"

                    /> */}

                    <View style={tw`h-8 w-1/2 pl-2`}>
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

                <KeyboardAwareScrollView style={tw`mt-2`}>
                    <View style={[tw`flex flex-col justify-center items-center p-4 rounded-xl`, styles.content]}>
                        <View style={tw`flex flex-row justify-between w-4/5`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ชื่อ</Text>
                                <View style={[tw`h-8 mt-1 w-11/12 pl-2 pt-2`, styles.textshow]}>
                                    <Text>{fnamePatient}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>สกุล</Text>
                                <View style={[tw`h-8 mt-1 w-full pl-2 pt-2`, styles.textshow]}>
                                    <Text>{lnamePatient}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-4/5 mt-1`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>วันที่นัดหมาย</Text>
                                {/* <TextInput style={tw`h-8 mt-2 w-11/12  pl-2`} /> */}
                                <View style={[tw`h-8 mt-2 w-11/12 pl-2 pt-3`,styles.textshow]}>
                                    <Text>{date_meet}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}></View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-4/5 mt-1`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>เวลา ตั้งแต่</Text>
                                {/* <TextInput style={tw`h-8 mt-2 w-11/12  pl-2`} /> */}
                                <View style={[tw`h-8 mt-2 w-11/12  pl-2 pt-3`,styles.textshow]}>
                                    <Text>{time}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ถึง</Text>
                                {/* <TextInput style={tw`h-8 mt-2 w-full pl-2`} /> */}
                                <View style={[tw`h-8 mt-2 w-full  pl-2 pt-3`,styles.textshow]}>
                                    <Text>{time_to}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-4/5 mt-1`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>เบอร์โทรศัพท์</Text>

                                <View style={[tw`h-8 mt-2 w-11/12  pl-2 pt-3`,styles.textshow]}>
                                    <Text>{telephone}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-4/5 mt-1`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ชื่อแพทย์</Text>
                                <View style={[tw`h-8 mt-2 w-11/12  pl-2 pt-3`,styles.textshow]}>
                                    <Text>{fnameDoctor}</Text>
                                </View>

                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>สกุลแพทย์</Text>
                                <View style={[tw`h-8 mt-2 w-full  pl-2 pt-3`,styles.textshow]}>
                                    <Text>{lnameDoctor}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-4/5 mt-1`}>
                            <View style={tw`flex flex-col w-full`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>หมายเหตุ</Text>
                                <View style={[tw`h-8 mt-2 w-full  pl-2 pt-3`,styles.textshow]}>
                                    <Text>{details}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-end w-11/12 mt-4`}>
                            <View style={[tw`mr-14`,styles.button]}>
                                <Button
                                    // onPress={}
                                    color="#4A235A"
                                    title="Print"
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
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