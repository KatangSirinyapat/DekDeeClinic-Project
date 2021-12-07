import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Picker } from 'react-native';
import tw from "tailwind-react-native-classnames";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from '@react-native-community/datetimepicker';

const URL_MEET = `http://178.128.90.50:3333/meets`

const URL_DOCTOR = `http://178.128.90.50:3333/users`

const URL_PATIENT = `http://178.128.90.50:3333/patients`



export default function Meet({ navigation }) {
    // const navigation = useNavigation()

    //DOCTOR
    const [doctors, setDoctors] = useState([])
    const [doctor, setDoctor] = useState([])
    const [idDoctor, setIdDoctor] = useState()
    const [fnameDoctor, setFnameDoctor] = useState("")
    //PATIENT
    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState([])
    const [idPatient, setIdPatient] = useState()
    //MEET
    const [details, setDetails] = useState("")
    const [topic, setTopic] = useState("")
    const [date_meet, setDate_meet] = useState("")
    const [time, setTime] = useState("")
    const [time_to, setTime_to] = useState("")

    //Date time
    const [date, setDate] = useState(new Date(2020, 12, 1, 0, 0, 0, 0));
    const [date2, setDate2] = useState(new Date(2020, 12, 1, 0, 0, 0, 0));
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
        let tmp0 = tmp.substring(0,8)
        let tmp1 = tmp.substring(8,11)
        
        // let int_tmp1 = parseInt(tmp1)+1
        // tmp = tmp0+int_tmp1
        // // // console.log(tmp);
        

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
            else if (item.doctor_id != idDoctor) {
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

    const printDoctors = () => {
        return doctors.map((item, index) => {
            return (
                <View>
                    <Text style={tw`font-semibold text-2xl mt-6`} >
                        {item.doctor_id}
                    </Text>
                </View>
            );
        });
    };

    return (
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>

            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('Menu')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>นัดหมาย</Text>


            <View style={tw`flex w-11/12 h-4/5`}>
                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-around items-start w-full h-full  p-4 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>บุคลากรที่ต้องการนัด</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-5/6 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/> */}
                                {/* <DropDownPicker style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeItem={item => console.log(item.label, item.value)}
                                    items={[
                                        { label: "Test1", value: "Test1" },
                                        { label: "'item2'", value: "'Item2'" },
                                    ]} /> */}

                                <TextInput style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => updateQuery(text)}
                                    placeholder="กรอกรหัสประจำตัวแพทย์. . ."
                                />

                                {/* <RNPickerSelect
                                        placeholder={{ label: "เลือกเพศ", value: null }}
                                        onValueChange={(value) => setSelectedValue(value)}
                                        items={[
                                            { label: "ชาย", value: "ชาย" },
                                            { label: "หญิง", value: "หญิง" },
                                        ]}
                                    /> */}
                                {/* {<Picker
                                        selectedValue={selectedValue}
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)} >
                                        {pickerValue.map((item, key) =>
                                            <Picker.Item label={item} value={item} key={key} />
                                        )}
                                    </Picker>} */}



                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base`}>หัวข้อในการนัดหมาย</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-5/6 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}/> */}
                                {/* <DropDownPicker style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeItem={item => console.log(item.label, item.value)}
                                    items={[{ label: 'item1', value: 'Item1' },
                                    { label: 'item2', value: 'Item2' },]} /> */}

                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => updateTopic(text)}
                                    placeholder="กรอกหัวข้อนัดหมาย. . ."
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อแพทย์</Text>
                                <View style={tw`flex justify-center h-10 mt-2 w-11/12 bg-purple-100 rounded-md pl-2`}>
                                    <Text style={tw`text-base`}>
                                        {doctor.fname}
                                    </Text>

                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2 mt-2 `}>
                                <Text style={tw`font-semibold text-base`}>สกุลแพทย์</Text>
                                <View style={tw`flex justify-center h-10 mt-2 w-full bg-purple-100 rounded-md pl-2`}>
                                    <Text style={tw`text-base`}>
                                        {doctor.lname}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>วันที่นัดหมาย</Text>
                                {/* <TextInput style={tw`flex justify-center h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setDate_meet(text)}
                                    placeholder="YYYY-MM-DD"
                                /> */}
                               
                                    <DateTimePicker themeVariant="light" style={tw`h-10 mt-2 w-2/4`}
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={'date'}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                    />
                              
                            </View>
                            <View style={tw`flex flex-col w-1/2`}></View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>เวลา ตั้งแต่</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setTime(text)}
                                    placeholder="กรอกเวลา. . ."
                                /> */}

                                <DateTimePicker style={tw`h-10 mt-2 w-4/12  rounded-md pl-2`}
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeTime}
                                />
                            </View>
                            <View style={tw`flex flex-col w-1/2 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>ถึง</Text>
                                {/* <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setTime_to(text)}
                                    placeholder="กรอกเวลา. . ."
                                /> */}
                                <DateTimePicker style={tw`h-10 mt-2 w-4/12  rounded-md pl-2`}
                                    testID="dateTimePicker"
                                    value={date2}
                                    mode={'time'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChangeTime_to}
                                />
                            </View>
                        </View>
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>Clinic number</Text>
                                <TextInput style={tw`h-10 mt-2 w-11/12 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => updateIdPatient(text)}
                                    placeholder="กรอกรหัสประจำตัวผู้ป่วย. . ."
                                />
                            </View>
                            <View style={tw`flex flex-col w-1/2 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>เบอร์ติดต่อ</Text>
                                <View style={tw`flex justify-center h-10 mt-2 w-full bg-purple-100 rounded-md pl-2`} >
                                    <Text style={tw`text-base`}>
                                        {patient.telephone}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`mt-2 font-semibold text-base`}>ชื่อผู้ป่วย</Text>
                                <View style={tw`flex justify-center h-10 mt-2 w-11/12 bg-purple-100 rounded-md pl-2`} >
                                    <Text style={tw`text-base`}>
                                        {patient.fname}
                                    </Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/2`}>
                                <Text style={tw`font-semibold text-base mt-2`}>สกุลผู้ป่วย</Text>
                                <View style={tw`flex justify-center h-10 mt-2 w-full bg-purple-100 rounded-md pl-2`} >
                                    <Text style={tw`text-base`}>
                                        {patient.lname}
                                    </Text>
                                </View>
                            </View>
                        </View>



                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-full mt-2`}>
                                <Text style={tw`font-semibold text-base`}>รายละเอียดเพิ่มเติม</Text>
                                <TextInput style={tw`h-10 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setDetails(text)}
                                    placeholder="กรอกรายละเอียดเพิ่มเติม. . ."
                                />
                            </View>
                        </View>

                        {/* <View style={tw`flex flex-row justify-end w-full mt-2`}>
                            <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                                onPress={postmeet}
                            >
                                <Text style={tw`text-lg text-black font-bold`}>บันทึก</Text>
                            </TouchableOpacity>
                        </View> */}

                        <View style={tw`flex flex-row justify-end w-full mt-4`}>
                            <View style={styles.button}>
                                <Button
                                    onPress={postmeet}
                                    color="black"
                                    title="บันทึก"
                                    
                                />
                            </View>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        </View>




    );




}

const styles = StyleSheet.create({

    button: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#FBCFE8',
        borderWidth: 4,
        borderColor: "#EF4444",
        marginLeft: 12,

    },
});