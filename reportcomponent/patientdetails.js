import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from "react-native-picker-select";
import tw from "tailwind-react-native-classnames";
import axios from 'axios';
import { set } from "react-native-reanimated";

import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';



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

    const [query_patient, setQuery_patient] = React.useState(null);
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
        <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
            <View style={tw`flex w-full justify-start items-start ml-16`}>
                <Button onPress={() => navigation.navigate('รายงาน')} title="< ย้อนกลับ" />
            </View>
            <Text style={tw`font-semibold text-2xl mt-6`}>รายละเอียดผู้ป่วย</Text>

            <View style={tw`flex w-3/4 h-4/5`}>
                <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                    <Text style={tw`font-semibold text-xl`}>ค้นหาชื่อผู้ป่วย</Text>
                    {/* <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`}
                        onChangeText={text => updateQuery(text)}
                        placeholder="กรอกรหัสประจำตัวผู้ป่วย. . .Ex.25640001"
                    /> */}
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

                    {/* <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}>
                        <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                    </TouchableOpacity> */}
                </View>

                <KeyboardAwareScrollView style={tw`flex mt-8`}>
                    <View style={tw`flex flex-col justify-center items-center w-full h-full p-10 rounded-xl border-4 border-black`}>
                        <View style={tw`flex flex-row w-full`}>
                            {/* <View style={tw`flex flex-col w-1/5`}>
                                <Text style={tw`font-semibold text-base`}>คำนำหน้า</Text>
                                <View style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2 pt-1`}>
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
                                <Text style={tw`font-semibold text-base`}>ชื่อ</Text>
                                {/* <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md`}
                                /> */}
                                <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{fname}</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col w-1/3 pl-7`}>
                                <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                {/* <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pr-20`}
                                /> */}
                                <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{lname}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-2`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={tw`font-semibold text-base`}>โรคประจำตัว</Text>
                                {/* <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                /> */}
                                <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{congenital_disease}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-2`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={tw`font-semibold text-base`}>แพ้ยา</Text>
                                {/* <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                /> */}
                                <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                    <Text>{drug_allergy}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-2`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>น้ำหนัก</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setWeight(text)}
                                    value={weight}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>ส่วนสูง</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setHigh(text)}
                                    value={high}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>BP</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setBp(text)}
                                    value={bp}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-2`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>BT</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setBt(text)}
                                    value={bt}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={tw`font-semibold text-base`}>PR</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setPr(text)}
                                    value={pr}
                                />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={tw`font-semibold text-base`}>RR</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setRr(text)}
                                    value={rr}

                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-2`}>
                            <View style={tw`flex flex-col justify-start w-full`}>
                                <Text style={tw`font-semibold text-base`}>อาการที่มาพบแพทย์</Text>
                                <TextInput style={tw`h-8 mt-2 w-full border-2 border-purple-500 bg-purple-100 rounded-md pl-2`}
                                    onChangeText={text => setSymptom(text)}
                                    value={symptom}
                                />
                            </View>
                        </View>

                        <View style={tw`flex flex-row mt-4 justify-end w-full`}>
                            {/* <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                            >
                                <Text style={tw`text-lg text-black font-bold`}>แก้ไข</Text>
                            </TouchableOpacity> */}

                            <View style={styles.button}>
                                <Button
                                    onPress={postDetail}
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