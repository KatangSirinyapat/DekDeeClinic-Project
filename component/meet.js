import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Picker, Image } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from '@react-native-community/datetimepicker';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';

const URL_PATIENT = `http://178.128.90.50:3333/patients`

const URL_COST = `http://178.128.90.50:3333/costs`

const URL_DOCTOR = `http://178.128.90.50:3333/users`

const URL_MEET = `http://178.128.90.50:3333/meets`

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);




export default function Meet({ navigation }) {
    // const navigation = useNavigation()

    //DOCTOR
    const [doctors, setDoctors] = useState([])
    const [doctor, setDoctor] = useState([])
    const [idDoctor, setIdDoctor] = useState()
    const [fname_doctor, setFname_doctor] = useState("")
    const [lname_doctor, setLname_doctor] = useState("")

    //PATIENT
    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState([])
    const [idPatient, setIdPatient] = useState()
    const [fname_patient, setFname_patient] = useState("")
    const [lname_patient, setLname_patient] = useState("")
    const [telephone_patient, setTelephone_patient] = useState("")
    //MEET
    const [details, setDetails] = useState("")
    const [topic, setTopic] = useState("")
    const [date_meet, setDate_meet] = useState("")
    const [time, setTime] = useState("")
    const [time_to, setTime_to] = useState("")

    //Date time
    const [date, setDate] = useState(new Date(2021, 12, 1, 0, 0, 0, 0));
    const [date2, setDate2] = useState(new Date(2021, 12, 1, 0, 0, 0, 0));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let curDate = new Date().toString()
        let tmpDate = currentDate.toString()

        let data = currentDate.toJSON()
        let dataBoD = JSON.stringify(data);
        let tmp = dataBoD.substring(1, 11)
        let tmp0 = tmp.substring(0, 8)
        let tmp1 = tmp.substring(8, 11)
        console.log(tmp);
        // let int_tmp1 = parseInt(tmp1)+1 
        // tmp = tmp0+int_tmp1



        setDate_meet(tmp.toString())
        // console.log(date_meet);
        // console.log(dataBoD.substring(1,11)); 



    };

    const onChangeTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let data = currentDate.toJSON()
        let dataBoD = JSON.stringify(data);
        let tmp = dataBoD.substring(12, 17)
        let tmp1 = tmp.substring(0, 2)
        let tmp2 = tmp.substring(2, 5)
        let tmp1Int = parseInt(tmp1) + 7

        switch (tmp1Int) {
            case 30:
                tmp1Int = tmp1Int - 24
                break;
            case 29:
                tmp1Int = tmp1Int - 24
                break;
            case 28:
                tmp1Int = tmp1Int - 24
                break;
            case 27:
                tmp1Int = tmp1Int - 24
                break;
            case 26:
                tmp1Int = tmp1Int - 24
                break;
            case 25:
                tmp1Int = tmp1Int - 24
                break;
            case 24:
                tmp1Int = tmp1Int - 24
                break;
        }
        let tmpString = tmp1Int.toString() + tmp2

        setTime(tmpString)
        // console.log(tmp1Int);

    };

    const onChangeTime_to = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate2(currentDate);

        let data = currentDate.toJSON()
        let dataBoD = JSON.stringify(data);
        let tmp = dataBoD.substring(12, 17)
        let tmp1 = tmp.substring(0, 2)
        let tmp2 = tmp.substring(2, 5)
        let tmp1Int = parseInt(tmp1) + 7
        // if(tmp1Int >= 17 && tmp1Int <=23)
        // {
        //     tmp1Int = tmp1Int 
        // }
        switch (tmp1Int) {
            case 30:
                tmp1Int = tmp1Int - 24
                break;
            case 29:
                tmp1Int = tmp1Int - 24
                break;
            case 28:
                tmp1Int = tmp1Int - 24
                break;
            case 27:
                tmp1Int = tmp1Int - 24
                break;
            case 26:
                tmp1Int = tmp1Int - 24
                break;
            case 25:
                tmp1Int = tmp1Int - 24
                break;
            case 24:
                tmp1Int = tmp1Int - 24
                break;
        }
        let tmpString = tmp1Int.toString() + tmp2

        setTime_to(tmpString)
        // console.log(tmp1Int);
        // console.log(tmpString);

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





    useEffect(() => {
        getDoctors(),
            getPatient()
    }, [])

    const updateTopic = (input) => {
        setTopic(input)

    }

    const updateQuery = (input) => {
        setIdDoctor(parseInt(input));
        findDoctor()
        console.log('---------------------');
        // console.log('ID: ' + idDoctor);
        // console.log('DoctorId: ' + doctor.doctor_id);
    }

    const updateIdPatient = (input) => {
        setIdPatient(parseInt(input));
        findPatient()
        console.log('---------------------');
        // console.log('ID: ' + idPatient);
        // console.log('PatientId: ' + patient.clinic_number);
    }

    const findPatient = () => {
        patients.map((item, index) => {
            if (item.clinic_number == idPatient) {
                setPatient(item)
            }
            else if (item.doctor_id != idPatient) {
                // alert('กรุณากรอกรหัสประจำตัวแพทย์ให้ถูกต้อง')

                console.log("ItemIDpatient: " + item.clinic_number);
            }
        })
    }


    const findDoctor = () => {
        doctors.map((item, index) => {
            if (item.doctor_id == idDoctor) {
                setDoctor(item)
            }
            else if (item.doctor_id != idDoctor) {
                // alert('กรุณากรอกรหัสประจำตัวแพทย์ให้ถูกต้อง')

                console.log("ItemID: " + item.doctor_id);
            }

        })
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

    const postmeet = () => {
        axios.post(URL_MEET, {
            details: details,
            topic: topic,
            date_meet: date_meet,
            time: time,
            time_to: time_to,
            user_id: idDoctor,
            patient_id: idPatient

        })
            .then(function (response) {

                alert("ลงทะเบียนการนัดหมายเสร็จสิ้น")

            })
            .catch(function (error) {

                alert(error.message);
            })
    }


    //Doctors Autocomplete

    const requestData = () => fetch(URL_DOCTOR);
    const requestDataWithDebounce = AwesomeDebouncePromise(requestData, 400);

    const [query, setQuery] = React.useState(null);
    const [data, setData] = React.useState([]);

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
        setFname_doctor(data[index].fname)
        setLname_doctor(data[index].lname)


    };

    const onChangeText = (nextQuery) => {
        setQuery(nextQuery);
    };

    const applyFilter = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query.toLowerCase()));
    };

    const clearInput = () => {
        setQuery('');
        setFname_doctor('')
        setLname_doctor('')
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

    const onSelect_patient = (index) => {
        setQuery_patient(data_patient[index].fname + " " + data_patient[index].lname);
        setIdPatient(data_patient[index].clinic_number)
        setFname_patient(data_patient[index].fname)
        setLname_patient(data_patient[index].lname)
        setTelephone_patient(data_patient[index].telephone)


    };

    const onChangeText_patient = (nextQuery) => {
        setQuery_patient(nextQuery);
    };

    const applyFilter_patient = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query_patient.toLowerCase()));
    };

    const clearInput_patient = () => {
        setQuery_patient('');
        setFname_patient('')
        setLname_patient('')
        setTelephone_patient('')
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
                    <Text style={[tw`font-bold`, styles.title]}>นัดหมายผู้ป่วย</Text>
                </View>


                <View style={[tw`flex flex-row flex-wrap w-4/5`, styles.menu]}>
                    <KeyboardAwareScrollView style={tw``}>
                        <View style={[tw`flex flex-col justify-evenly items-center p-4 rounded-xl`, styles.content]}>
                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>แพทย์ที่นัดหมาย</Text>
                                    <View style={tw`h-10 mt-1 w-11/12`}>
                                        <Autocomplete
                                            style={styles.textbox}
                                            placeholder='โปรดระบุชื่อแพทย์'
                                            value={query}
                                            onChangeText={onChangeText}
                                            accessoryRight={renderCloseIcon}
                                            onSelect={onSelect}>
                                            {data.map(renderOption)}
                                        </Autocomplete>
                                    </View>
                                </View>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>หัวข้อในการนัดหมาย</Text>
                                    <TextInput style={[tw`h-10 mt-1 w-full pl-2`, styles.textbox]}
                                        onChangeText={text => updateTopic(text)}
                                        placeholder="กรอกหัวข้อนัดหมาย"
                                    />
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ชื่อแพทย์</Text>
                                    <View style={[tw`flex justify-center h-10 mt-1 w-11/12 pl-2`, styles.textshow]}>
                                        <Text style={tw`text-base`}>
                                            {fname_doctor}
                                        </Text>

                                    </View>
                                </View>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>สกุลแพทย์</Text>
                                    <View style={[tw`flex justify-center h-10 mt-1 w-full pl-2`, styles.textshow]}>
                                        <Text style={tw`text-base`}>
                                            {lname_doctor}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>วันที่นัดหมาย</Text>
                                    <View style={[tw`h-10 mt-1 w-1/4`, styles.textbox]}>
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
                                <View style={tw`flex flex-col`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>เวลา ตั้งแต่</Text>
                                    <View style={[tw`h-10 mt-1 w-20`, styles.textbox]}>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={'time'}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChangeTime}
                                        />
                                    </View>
                                </View>
                                <View style={tw`flex flex-col w-1/2 ml-8`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ถึง</Text>
                                    <View style={[tw`h-10 mt-1 w-20`, styles.textbox]}>
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date2}
                                            mode={'time'}
                                            is24Hour={true}
                                            display="default"
                                            onChange={onChangeTime_to}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค้นหาชื่อผู้ป่วย</Text>
                                    <View style={tw`h-10 mt-1 w-11/12`}>
                                        <Autocomplete
                                            style={styles.textbox}
                                            placeholder='โปรดระบุชื่อผู้ป่วย'
                                            value={query_patient}
                                            onChangeText={onChangeText_patient}
                                            accessoryRight={renderCloseIcon_patient}
                                            onSelect={onSelect_patient}>
                                            {data_patient.map(renderOption_patient)}
                                        </Autocomplete>
                                    </View>
                                </View>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>เบอร์ติดต่อ</Text>
                                    <View style={[tw`flex justify-center h-10 mt-1 w-full pl-2`, styles.textshow]} >
                                        <Text style={tw`text-base`}>
                                            {telephone_patient}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ชื่อผู้ป่วย</Text>
                                    <View style={[tw`flex justify-center h-10 mt-1 w-11/12 pl-2`, styles.textshow]} >
                                        <Text style={tw`text-base`}>
                                            {fname_patient}
                                        </Text>
                                    </View>
                                </View>
                                <View style={tw`flex flex-col w-1/2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>สกุลผู้ป่วย</Text>
                                    <View style={[tw`flex justify-center h-10 mt-1 w-full pl-2`, styles.textshow]} >
                                        <Text style={tw`text-base`}>
                                            {lname_patient}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full my-2`}>
                                <View style={tw`flex flex-col w-full`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>รายละเอียดเพิ่มเติม</Text>
                                    <TextInput style={[tw`h-10 mt-1 w-full pl-2`, styles.textbox]}
                                        onChangeText={text => setDetails(text)}
                                        placeholder="กรอกรายละเอียดเพิ่มเติม"
                                    />
                                </View>
                            </View>
                            <View style={tw`flex flex-row justify-end w-full mt-2`}>
                                <View style={styles.button}>
                                    <Button
                                        onPress={postmeet}
                                        color="#4A235A"
                                        title="บันทึก"
                                    />
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
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
                    <Image source={require("../Icon/Buttom-Nav/icons8-calendar-45-P.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontpress]}>นัดหมาย</Text>
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
                    <Image source={require("../Icon/Buttom-Nav/icons8-test-results-45-W.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontnormal]}>รายงาน</Text>
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

    content: {
        // borderColor: 'black',
        // borderWidth: 2,
    },

    menu: {
        // borderColor: 'black',
        // borderWidth: 2,

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