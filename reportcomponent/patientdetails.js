import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Alert, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from "react-native-picker-select";
import tw from "tailwind-react-native-classnames";
import axios from 'axios';
import { set } from "react-native-reanimated";

import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { borderStyle, paddingTop } from "styled-system";



const StarIcon = (props) => (
    <Icon {...props} name='star' />
);

const URL_PATIENT = `http://178.128.90.50:3333/patients`
const URL_DETAILS = `http://178.128.90.50:3333/details`

export default function PatientDetails({ navigation }) {

    //PATIENT

    const [patient, setPatient] = useState([])
    const [patients, setPatients] = useState([])
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [congenital_disease, setcongenital_disease] = useState("");
    const [drug_allergy, setdrug_allergy] = useState("");
    const [clinic_number, setclinic_number] = useState("");
    const [id, setId] = useState()


    //DETAILS
    const [weight, setWeight] = useState("")
    const [high, setHigh] = useState("")
    const [bp, setBp] = useState("")
    const [bt, setBt] = useState("")
    const [pr, setPr] = useState("")
    const [rr, setRr] = useState("")
    const [symptom, setSymptom] = useState("")


    const updateQuery = (input) => {
        setId(parseInt(input));
        console.log(id);
    }

    useEffect(() => {

        getDetail()

    }, [id]);



    const getPatientID = async () => {
        await axios.get(`${URL_PATIENT}/${id}`)
            .then(function (response) {

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)

                setPatient(objJson[0].fname)
                setclinic_number(objJson[0].clinic_number)
                setcongenital_disease(objJson[0].congenital_disease)
                setdrug_allergy(objJson[0].drug_allergy)
                setfname(objJson[0].fname)
                setlname(objJson[0].lname)

                // alert("Suscess")

            })
            .catch(function (error) {

            });


        console.log(patient)
        // PrintPatient()
    }



    const getDetail = async () => {
        await axios.get(`${URL_DETAILS}`)
            .then(function (response) {

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)
                let flag = 0;
                objJson.map((item) => {

                    if (item.patient_id === id && flag == 0) {
                        flag = 1;
                        setWeight(item.weight)
                        setHigh(item.high)
                        setBp(item.bp)
                        setBt(item.bt)
                        setPr(item.pr)
                        setRr(item.rr)
                        setSymptom(item.symptom)
                        console.log(item.rr);
                    }
                })


            })
            .catch(function (error) {

            });

    }

    const count_treatments = async () => {
        await axios.get(`${URL_PATIENT}/data/${id}`)
            .then(function (response) {



                console.log("count_Susses:" + response.data.num_of_treatments);


            })
            .catch(function (error) {

            });


        console.log(patient)
        // PrintPatient()
    }



    const postDetail = async () => {
        await axios.post(URL_DETAILS, {

            weight: weight,
            high: high,
            bp: bp,
            bt: bt,
            pr: pr,
            rr: rr,
            symptom: symptom,
            patient_id: parseInt(id)

        })
            .then(function (response) {
                alert("บันทึกข้อมูลเสร็จสิ้น")
                count_treatments()



            })
            .catch(function (error) {
                // alert(error.message)
            })
    }

    //Patient Autocomplete

    const requestData_patient = () => fetch(URL_PATIENT);
    const requestDataWithDebounce_patient = AwesomeDebouncePromise(requestData_patient, 400);

    const [query_patient, setQuery_patient] = React.useState("");
    const [data_patient, setData_patient] = React.useState([]);


    useEffect(() => {
        getPatient()
    }, [])



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
        setId(data_patient[index].clinic_number)
        setfname(data_patient[index].fname)
        setlname(data_patient[index].lname)
        setdrug_allergy(data_patient[index].drug_allergy)
        setcongenital_disease(data_patient[index].congenital_disease)

    };

    const onChangeText_patient = (nextQuery) => {
        setQuery_patient(nextQuery);
    };

    const applyFilter_patient = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query_patient.toLowerCase()));
    };

    const clearInput_patient = () => {
        setQuery_patient('');
        setId('')
        setfname('')
        setlname('')
        setdrug_allergy('')
        setcongenital_disease('')
        setWeight('')
        setHigh('')
        setBp('')
        setBt('')
        setPr('')
        setRr('')
        setSymptom('')
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
                    <Text style={[tw`font-bold`, styles.title]}>รายละเอียดผู้ป่วย</Text>
                </View>
            </View>

            <View style={[tw`w-4/5`, styles.menu]}>
                <View style={tw`flex flex-row w-full justify-center items-center`}>
                    <Text style={[tw`font-semibold text-xl`, styles.font]}>ค้นหาชื่อผู้ป่วย</Text>
                    <View style={tw`h-10 w-1/2 pl-2`}>
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

                <KeyboardAwareScrollView style={tw``}>
                    <View style={[tw`flex flex-col justify-evenly items-center p-4 rounded-xl`, styles.content]}>
                        <View style={tw`flex flex-row w-full`}>
                            {/* <View style={tw`flex flex-col w-1/5`}>
                                <Text style={tw`font-semibold text-base`}>คำนำหน้า</Text>
                                <View style={[tw`h-8 mt-1 w-full rounded-md pl-2 ,styles.textbox]pt-1`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "คำนำหน้า", value: null }}
                                        onValueChange={(value) => setNametitle(value)}
                                        items={[
                                            { label: "เด็กหญิง", value: "male" },
                                            { label: "เด็กชาย", value: "male" },
                                            { label: "นาย", value: "male" },
                                            { label: "นาง", value: "male" },
                                            { label: "นางสาว", value: "female" },
                                        ]}
                                    />
                                </View>
                            </View> */}
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>ชื่อ</Text>

                                <View style={[tw`flex justify-center h-8 mt-1 w-full rounded-md pl-2`,styles.textshow]}>
                                    <Text>{fname}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/3 pl-7`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>สกุล</Text>

                                <View style={[tw`flex justify-center h-8 mt-1 w-full rounded-md pl-2`,styles.textshow]}>
                                    <Text>{lname}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-1`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>โรคประจำตัว</Text>

                                <View style={[tw`flex justify-center h-8 mt-1 w-full rounded-md pl-2`,styles.textshow]}>
                                    <Text>{congenital_disease}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-1`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>แพ้ยา</Text>

                                <View style={[tw`flex justify-center h-8 mt-1 w-full rounded-md pl-2`,styles.textshow]}>
                                    <Text>{drug_allergy}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-1`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>น้ำหนัก</Text>
                                <TextInput style={[tw`h-8 mt-1 w-full rounded-md pl-2`,styles.textbox]}
                                    onChangeText={text => setWeight(text)}
                                    value={weight}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>ส่วนสูง</Text>
                                <TextInput style={[tw`h-8 mt-1 w-full rounded-md pl-2`,styles.textbox]}
                                    onChangeText={text => setHigh(text)}
                                    value={high}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>BP</Text>
                                <TextInput style={[tw`h-8 mt-1 w-full rounded-md pl-2`,styles.textbox]}
                                    onChangeText={text => setBp(text)}
                                    value={bp}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-1`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>BT</Text>
                                <TextInput style={[tw`h-8 mt-1 w-full rounded-md pl-2`,styles.textbox]}
                                    onChangeText={text => setBt(text)}
                                    value={bt}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>PR</Text>
                                <TextInput style={[tw`h-8 mt-1 w-full rounded-md pl-2`,styles.textbox]}
                                    onChangeText={text => setPr(text)}
                                    value={pr}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>RR</Text>
                                <TextInput style={[tw`h-8 mt-1 w-full rounded-md pl-2`,styles.textbox]}
                                    onChangeText={text => setRr(text)}
                                    value={rr}

                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-1`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>อาการที่มาพบแพทย์</Text>
                                <TextInput style={[tw`h-8 mt-1 w-full rounded-md pl-2`,styles.textbox]}
                                    onChangeText={text => setSymptom(text)}
                                    value={symptom}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row mt-4 justify-end w-full`}>


                            <View style={styles.button}>
                                <Button
                                    onPress={postDetail}
                                    color="#4A235A"
                                    title="บันทึก"
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
        position: 'absolute',
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
        height: 500,
        marginBottom: 0
    },

    menu: {
        position: "absolute",
        //   borderColor: 'black',
        //   borderWidth: 2,
        marginTop: 180,
        height: 630
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
        

    },
});