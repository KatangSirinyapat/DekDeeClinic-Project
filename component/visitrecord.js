import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';



const URL_PATIENT = `http://178.128.90.50:3333/patients`

const URL_COST = `http://178.128.90.50:3333/costs`

export default function VisitRecord({ navigation }) {
    // const navigation = useNavigation()

    //DOCTOR
    const [idDoctor, setIdDoctor] = useState()


    //PATIENT
    const [patients, setPatients] = useState([])
    const [patient, setPatient] = useState([])
    const [idPatient, setIdPatient] = useState()

    //COSTS API
    const [date, setDate] = useState("")
    const [cost_of_doctor, setCost_of_doctor] = useState(0)
    const [cost_of_medicine, setCost_of_medicine] = useState(0)
    const [cost_of_psychologist, setCost_of_psychologist] = useState(0)
    const [cost_of_practitioner, setCost_of_practitioner] = useState(0)
    const [cost_of_occupational_therapist, setCost_of_occupational_therapist] = useState(0)
    const [cost_of_teacher, setCost_of_teacher] = useState(0)
    const [bank_transfer, setBank_transfer] = useState(0)
    const [cash, setCash] = useState(0)
    const [total, setTotal] = useState(0)
    //Psychologist 1 2 3
    const [cost_of_psychologist1, setCost_of_psychologist1] = useState(0)
    const [cost_of_psychologist2, setCost_of_psychologist2] = useState(0)
    const [cost_of_psychologist3, setCost_of_psychologist3] = useState(0)

    //Date time
    const [date1, setDate1] = useState(new Date(2021, 10, 27, 12, 0, 0, 0));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate1(currentDate);

        let curDate = new Date().toString()
        let tmpDate = currentDate.toString()

        let data = currentDate.toJSON()
        let dataBoD = JSON.stringify(data);
        let tmp = dataBoD.substring(1, 11)

        setDate(tmp.toString())
        
        // console.log(dataBoD.substring(1,11)); 
    };

    const updateIdPatient = (input) => {
        setIdPatient(parseInt(input));
        findPatient()
        // console.log('---------------------');
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



    useEffect(() => {
        getPatient()
    }, [])

    const calculate_cost_of_psychologist = () => {
        let result = cost_of_psychologist1 + cost_of_psychologist2 + cost_of_psychologist3

        return result;
    }

    const calculate_money = () => {
        let result;

        if (bank_transfer > 0) {
            result = total - bank_transfer
            setCash(result)
        }
        else if (cash > 0) {
            result = total - cash
            setBank_transfer(result)
        }

    }

    const calculate_total_cost = () => {

        let result = cost_of_doctor +
            cost_of_medicine +
            calculate_cost_of_psychologist() +
            cost_of_practitioner +
            cost_of_occupational_therapist +
            cost_of_teacher



        return result
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

    const postCost = async () => {
        await axios.post(URL_COST, {
            date: date,
            cost_of_doctor: cost_of_doctor,
            cost_of_medicine: cost_of_medicine,
            cost_of_psychologist: calculate_cost_of_psychologist(),
            cost_of_practitioner: cost_of_practitioner,
            cost_of_occupational_therapist: cost_of_occupational_therapist,
            cost_of_teacher: cost_of_teacher,
            bank_transfer: bank_transfer,
            cash: cash,
            total: calculate_total_cost(),
            user_id: idDoctor,
            patient_id: idPatient,


        })
            .then(function (response) {
                alert("บันทึกข้อมูลเสร็จสิ้น")

            })
            .catch(function (error) {
                // alert(error.message)
            })
    }

    return (
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('Menu')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>บันทึกการให้บริการ</Text>
            <View style={tw`flex w-3/4 h-4/5`}>
                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-between items-start w-full h-full p-4 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row w-full justify-end items-center`}>
                            <Text style={tw`font-semibold text-base`}>วันที่</Text>
                            {/* <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2 ml-2`}
                                onChangeText={text => setDate(text)}
                                placeholder="ปปป-ดดด-ววว"
                            /> */}
                            <DateTimePicker themeVariant="light" style={tw`h-8 w-1/3  rounded-md pl-2 ml-2`}
                                testID="dateTimePicker"
                                value={date1}
                                mode={'date'}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                            />
                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/4 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>เลขประจำตัวแพทย์</Text>
                                <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 mt-2`}
                                    onChangeText={text => setIdDoctor(parseInt(text))}
                                    placeholder="โปรดกรอกเลขประจำตัวแพทย์"
                                />
                            </View>
                            <View style={tw`flex flex-col w-1/4 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>เลขประจำตัวผู้ป่วย</Text>
                                <TextInput style={tw`h-8 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 mt-2`}
                                    onChangeText={text => updateIdPatient(text)}
                                    placeholder="โปรดกรอกเลขประจำตัวผู้ป่วย"
                                />
                            </View>

                        </View>

                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/3 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                                <View style={tw`flex justify-center h-10 mt-2 w-11/12 bg-purple-100 rounded-md pl-2`}>
                                    <Text style={tw`text-base`}>
                                        {patient.fname}
                                    </Text>

                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/3 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                <View style={tw`flex justify-center h-10 mt-2 w-11/12 bg-purple-100 rounded-md pl-2`}>
                                    <Text style={tw`text-base`}>
                                        {patient.lname}
                                    </Text>

                                </View>
                            </View>

                            <View style={tw`flex flex-col w-1/3 mt-2`}>
                                <Text style={tw`font-semibold text-base`}>อายุ</Text>
                                <View style={tw`flex justify-center h-10 mt-2 w-11/12 bg-purple-100 rounded-md pl-2`}>
                                    <Text style={tw`text-base`}>
                                        {patient.age}
                                    </Text>

                                </View>

                            </View>

                            <View style={tw`flex flex-col w-1/3`}></View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของแพทย์</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCost_of_doctor(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่ายา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCost_of_medicine(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        <Text style={tw`font-semibold text-lg mt-4`}>ค่าบริการของนักจิตวิทยา</Text>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 1</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCost_of_psychologist1(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 2</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCost_of_psychologist2(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ชื่อนักจิตวิทยา 3</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCost_of_psychologist3(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของนักฝึกพูด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCost_of_practitioner(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของนักกิจกรรมบำบัด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCost_of_occupational_therapist(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>ค่าบริการของครูการศึกษาพิเศษ</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCost_of_teacher(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>
                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base text-red-600`}>รวมทั้งหมด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={tw`flex justify-center h-8 w-1/3 bg-purple-100 rounded-md pl-2`}>
                                    <Text style={tw`font-semibold text-base`}>
                                        {calculate_total_cost()}
                                    </Text>
                                </View>
                                <Text style={tw`font-semibold text-base ml-2 text-red-600`}>บาท</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-lg`}>ช่องทางชำระเงิน</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                {/* <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`} /> */}
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>เงินโอน</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setBank_transfer(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base`}>เงินสด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-1/3 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setCash(parseInt(text))}
                                    placeholder="จำนวนเงิน"
                                />
                            </View>
                        </View>

                        {/* <View style={tw`flex flex-row mt-4 justify-end w-full mt-4`}>
                            <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                                onPress={postCost()}
                            >
                                <Text style={tw`text-lg text-black font-bold`}>บันทึก</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={tw`flex flex-row justify-end w-full mt-4`}>
                            <View style={styles.button}>
                                <Button
                                    onPress={postCost}
                                    color="black"
                                    title="บันทึก"
                                    accessibilityLabel="Learn more about this purple button"
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