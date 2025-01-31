import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Autocomplete, AutocompleteItem, Icon, Datepicker } from '@ui-kitten/components';
import { Keyboard, Platform } from 'react-native';
import { concat, set } from "react-native-reanimated";
import { TouchableWithoutFeedback } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import Autocomplete_doctor from "./Autocomplete/autocomplete_doctor";
import Autocomplete_patient from "./Autocomplete/autocomplete_patient";
import moment from "moment";


const URL_PATIENT = `http://178.128.90.50:3333/patients`

const URL_COST = `http://178.128.90.50:3333/costs`

const URL_DOCTOR = `http://178.128.90.50:3333/users`

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);






export default function VisitRecord({ navigation }) {
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

    const [fname_patient, setFname_patient] = useState("")
    const [lname_patient, setLname_patient] = useState("")
    const [age_patient, setAge_patient] = useState("")



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



    let tmp_total = 0;

    useEffect(() => {
        getPatient(),
            getDoctors()
    }, [])

    const calculate_cost_of_psychologist = () => {
        let result = cost_of_psychologist1 + cost_of_psychologist2 + cost_of_psychologist3

        return result;
    }


    const calculate_total_cost = () => {

        let result = cost_of_doctor +
            cost_of_medicine +
            calculate_cost_of_psychologist() +
            cost_of_practitioner +
            cost_of_occupational_therapist +
            cost_of_teacher

        tmp_total = result

        return result
    }

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

    const getPatient = async () => {
        await axios.get(`${URL_PATIENT}`)
            .then(function (response) {

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)



                setPatients(objJson)

                // alert(patients[0].clinic_number)
            })
            .catch(function (error) {
                // alert(error.message);
            })

    }

    const check_bank_transfer = (data) => {

        if (+data > +tmp_total) {
            alert("กรุณากรอกยอดเงินให้ถูกต้อง")
        }
        else if (data < tmp_total) {
            setBank_transfer(data)
            let cash = tmp_total - data
            setCash(cash.toString())
        }
        else if (data == tmp_total) {
            setCash(0)
        }
        else if (data == 0) {
            setCash(tmp_total.toString())
        }
    }

    const check_cash = (data) => {

        if (+data > +tmp_total) {
            alert("กรุณากรอกยอดเงินให้ถูกต้อง")
        }
        else if (+data < +tmp_total) {
            setCash(data)
            let bank_transfer = tmp_total - data
            setBank_transfer(bank_transfer.toString())
        }
        else if (data == tmp_total) {
            setBank_transfer(0)
        }
        else if (data == 0) {
            setBank_transfer(tmp_total.toString())
        }
    }

    const postCost = async () => {


        if (parseInt(cash) + parseInt(bank_transfer) === tmp_total) {
            await axios.post(URL_COST, {
                date: moment(date).format('YYYY-MM-DD'),
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
                    alert(error.message)
                })
        }
        else {
            alert("กรุณากรอกข้อมูลให้ถูกต้อง")
        }
    }


    //Doctors Autocomplete

    const requestData = () => fetch(URL_DOCTOR);
    const requestDataWithDebounce = AwesomeDebouncePromise(requestData, 400);

    const [query, setQuery] = React.useState("");
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

    //Patient Autocomplete

    const requestData_patient = () => fetch(URL_PATIENT);
    const requestDataWithDebounce_patient = AwesomeDebouncePromise(requestData_patient, 400);

    const [query_patient, setQuery_patient] = React.useState("");
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
        setAge_patient(data_patient[index].age)

    };

    const onChangeText_patient = (nextQuery) => {
        setQuery_patient(nextQuery);
    };

    const applyFilter_patient = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query_patient.toLowerCase()));
    };

    const clearInput_patient = () => {
        setQuery_patient('');
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

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar' />
    );

    const getMinStartDate = () => {
        const minStartDate = new Date("01/01/2010");
        minStartDate.setHours(0, 0, 0, 0);
        return minStartDate;
    };

    const getMaxEndDate = () => {
        const minStartDate = getMinStartDate();
        const maxEndDate = new Date(minStartDate);
        maxEndDate.setFullYear(maxEndDate.getFullYear() + 30);
        return maxEndDate;
    };


    return (

        <View style={tw`flex h-full items-center`}>

            <View style={[tw`flex w-full justify-center items-center`, styles.containertop]}>
                <View style={[tw`w-full`, styles.top]}>
                    <Text style={[tw`font-bold`, styles.title]}>บันทึกการให้บริการ</Text>
                </View>

                <View style={[tw`flex flex-row flex-wrap w-4/5`, styles.menu]}>
                    <KeyboardAwareScrollView style={tw``}>
                        <View style={[tw`flex flex-col justify-evenly items-center p-4 rounded-xl`, styles.content]}>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col w-1/3 mt-2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>วันที่</Text>
                                    <View style={tw`flex h-10 mt-1 w-11/12 justify-center`}>
                                        <Datepicker
                                            min={getMinStartDate()}
                                            max={getMaxEndDate()}
                                            placeholder={moment(Date()).format('DD/MM/YYYY')}
                                            date={date}
                                            onSelect={nextDate => setDate(nextDate)}
                                            accessoryRight={CalendarIcon}
                                        />
                                    </View>
                                </View>
                                <View style={tw`flex flex-col w-1/3 mt-2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>รายชื่อแพทย์</Text>
                                    <Autocomplete style={[tw`h-10 mt-1 w-11/12`, styles.textbox]}
                                        placeholder='โปรดระบุชื่อแพทย์'
                                        value={query}
                                        onChangeText={onChangeText}
                                        accessoryRight={renderCloseIcon}
                                        onSelect={onSelect}>
                                        {data.map(renderOption)}
                                    </Autocomplete>
                                </View>

                                <View style={tw`flex flex-col w-1/3 mt-2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>รายชื่อผู้ป่วย</Text>
                                    <Autocomplete style={[tw`h-10 mt-1 w-11/12`, styles.textbox]}
                                        placeholder='โปรดระบุชื่อผู้ป่วย'
                                        value={query_patient}
                                        onChangeText={onChangeText_patient}
                                        accessoryRight={renderCloseIcon_patient}
                                        onSelect={onSelect_patient}>
                                        {data_patient.map(renderOption_patient)}
                                    </Autocomplete>
                                </View>

                                <View style={tw`flex flex-col w-1/3`}></View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col w-1/3 mt-2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ชื่อผู้ป่วย</Text>
                                    <View style={[tw`flex justify-center h-10 mt-2 w-11/12 pl-2`, styles.textshow]}>
                                        <Text style={tw`text-base`}>
                                            {fname_patient}
                                        </Text>

                                    </View>
                                </View>
                                <View style={tw`flex flex-col w-1/3 mt-2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>สกุลผู้ป่วย</Text>
                                    <View style={[tw`flex justify-center h-10 mt-2 w-11/12 pl-2`, styles.textshow]}>
                                        <Text style={tw`text-base`}>
                                            {lname_patient}
                                        </Text>

                                    </View>
                                </View>

                                <View style={tw`flex flex-col w-1/3 mt-2`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>อายุ</Text>
                                    <View style={[tw`flex justify-center h-10 mt-2 w-11/12 pl-2`, styles.textshow]}>
                                        <Text style={tw`text-base`}>
                                            {age_patient}
                                        </Text>

                                    </View>

                                </View>

                                <View style={tw`flex flex-col w-1/3`}></View>
                            </View>
                            <View style={[tw`flex justify-center w-full mt-3 p-2 mr-6`, styles.bordercost]}>
                                <View style={tw`flex flex-row`}>
                                    <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                        <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของแพทย์</Text>
                                    </View>
                                    <View style={tw`flex flex-row  items-center w-1/3`}>
                                        <TextInput style={[tw`h-8 w-1/3 pl-2`, styles.textbox]}
                                            onChangeText={text => setCost_of_doctor(parseInt(text))}
                                            placeholder="จำนวนเงิน"
                                        />
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                    <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                        <Text style={[tw`font-semibold text-base`, styles.font]}>ค่ายา</Text>
                                    </View>
                                    <View style={tw`flex flex-row  items-center w-1/3`}>
                                        <TextInput style={[tw`h-8 w-1/3 pl-2`, styles.textbox]}
                                            onChangeText={text => setCost_of_medicine(parseInt(text))}
                                            placeholder="จำนวนเงิน"
                                        />
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>

                                {/* <Text style={tw`font-semibold text-lg mt-4`}>ค่าบริการของนักจิตวิทยา</Text> */}

                                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                                    <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                        <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักจิตวิทยา</Text>
                                    </View>
                                    <View style={tw`flex flex-row  items-center w-1/3`}>
                                        <TextInput style={[tw`h-8 w-1/3 pl-2`, styles.textbox]}
                                            onChangeText={text => setCost_of_psychologist1(parseInt(text))}
                                            placeholder="จำนวนเงิน"
                                        />
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                    <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                        <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักฝึกพูด</Text>
                                    </View>
                                    <View style={tw`flex flex-row  items-center w-1/3`}>
                                        <TextInput style={[tw`h-8 w-1/3 pl-2`, styles.textbox]}
                                            onChangeText={text => setCost_of_practitioner(parseInt(text))}
                                            placeholder="จำนวนเงิน"
                                        />
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>



                                <View style={tw`flex flex-row justify-between w-full mt-4`}>
                                    <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                        <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักกิจกรรมบำบัด</Text>
                                    </View>
                                    <View style={tw`flex flex-row  items-center w-1/3`}>
                                        <TextInput style={[tw`h-8 w-1/3 pl-2`, styles.textbox]}
                                            onChangeText={text => setCost_of_occupational_therapist(parseInt(text))}
                                            placeholder="จำนวนเงิน"
                                        />
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                    <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                        <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของครูการศึกษาพิเศษ</Text>
                                    </View>
                                    <View style={tw`flex flex-row  items-center w-1/3`}>
                                        <TextInput style={[tw`h-8 w-1/3 pl-2`, styles.textbox]}
                                            onChangeText={text => setCost_of_teacher(parseInt(text))}
                                            placeholder="จำนวนเงิน"
                                        />
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>


                                <View style={tw`flex flex-row justify-center w-full mt-4 pr-16`}>
                                    <View style={tw`flex flex-row items-center`}>
                                        <Text style={[tw`font-semibold text-lg`, styles.font]}>รวมทั้งหมด</Text>
                                    </View>
                                    <View style={tw`flex flex-row items-center w-32 ml-2`}>
                                        <View style={[tw`flex justify-center items-center h-9 w-full`, styles.textshowsum]}>
                                            <Text style={[tw`font-semibold text-lg`, styles.font]}>
                                                {calculate_total_cost()}
                                            </Text>
                                        </View>
                                        <Text style={[tw`font-semibold text-lg pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-start w-full mt-2`}>
                                <View style={tw`flex flex-row justify-start items-center`}>
                                    <Text style={[tw`font-semibold text-lg`, styles.font]}>ช่องทางชำระเงิน</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-row justify-evenly w-full mt-2 mr-6`}>
                                <View style={[tw`flex flex-row justify-center items-center w-2/5 pr-10`, styles.bordercost]}>
                                    <Image source={require("../Icon/Record/icons8-mobile-payment-30.png")} />
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>เงินโอน</Text>
                                    <View style={tw`flex flex-row items-center w-1/3 ml-4`}>
                                        <TextInput style={[tw`h-8 w-full pl-2`, styles.textbox]}
                                            onChangeText={text => check_bank_transfer(parseInt(text))}
                                            value={bank_transfer}
                                            placeholder="จำนวนเงิน"
                                        />
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>

                                <View style={[tw`flex flex-row justify-center items-center w-2/5 pr-10`, styles.bordercost]}>
                                    <Image source={require("../Icon/Record/icons8-money-30.png")} />
                                    <Text style={[tw`font-semibold text-base pl-1`, styles.font]}>เงินสด</Text>
                                    <View style={tw`flex flex-row items-center w-1/3 ml-4`}>
                                        <TextInput style={[tw`h-8 w-full pl-2`, styles.textbox]}
                                            onChangeText={text => check_cash(parseInt(text))}
                                            value={cash}
                                            placeholder="จำนวนเงิน"
                                        />
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>


                            </View>

                            <View style={tw`flex flex-row justify-end w-full mt-4 mr-8`}>
                                <View style={styles.button}>
                                    <Button
                                        onPress={postCost}
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
                    <Image source={require("../Icon/Buttom-Nav/icons8-cost-45-P.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontpress]}>บันทึกการให้บริการ</Text>
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


    textshowsum: {
        backgroundColor: '#EBDEF0',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
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

    bordercost: {
        backgroundColor: '#FFFAFA',
        borderColor: '#633974',
        borderWidth: 2,
        borderRadius: 18,
        padding: 8
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
    }
});