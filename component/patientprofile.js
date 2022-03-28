import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Alert, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from 'axios';
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const URL_PATIENT = `http://178.128.90.50:3333/patients`

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);



const URL = `http://178.128.90.50:3333/patients`
export default function PatientProfile({ navigation }) {

    const [Patient, setPatient] = useState([])
    const [patients, setPatients] = useState([])
    const [clinic_number, setclinic_number] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [gender, setgender] = useState("");
    const [bod, setbod] = useState("");
    const [age, setage] = useState("");
    const [telephone, settelephone] = useState("");
    const [drug_allergy, setdrug_allergy] = useState("");
    const [congenital_disease, setcongenital_disease] = useState("");
    const [num_of_treatments, setnum_of_treatments] = useState("");
    const [home_no, sethome_no] = useState("");
    const [moo, setmoo] = useState("");
    const [soi, setsoi] = useState("");
    const [subdistrict, setsubdistrict] = useState("");
    const [district, setDistric] = useState("");
    const [province, setprovince] = useState("");
    const [fname_parent, setfname_parent] = useState("");
    const [lname_parent, setlname_parent] = useState("");
    const [relation, setrelation] = useState("");
    const [id, setId] = useState()

    const [find, setFind] = useState(false);

    // const _fname =" "

    const onPressHandler = () => {
        setFind(!find)
    }



    const updateQuery = (input) => {
        setId(parseInt(input));
        console.log(id);
    }


    useEffect(() => {
        getPatientID()
    }, [id]);



    // let ID = parseInt(query)

    const getPatientID = async () => {
        await axios.get(`${URL}/${id}`)
            .then(function (response) {
                // handle success
                // alert(JSON.stringify(response.data));
                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)
                // alert(objJson[0].fname)
                // _fname = objJson[0].fname

                setPatient(objJson[0].fname)
                setage(objJson[0].age)
                setbod(objJson[0].bod)
                setclinic_number(objJson[0].clinic_number)
                setcongenital_disease(objJson[0].congenital_disease)
                setDistric(objJson[0].district)
                setdrug_allergy(objJson[0].drug_allergy)
                setfname(objJson[0].fname)
                setfname_parent(objJson[0].fname_parent)
                setgender(objJson[0].gender)
                sethome_no(objJson[0].home_no)
                setlname(objJson[0].lname)
                setlname_parent(objJson[0].lname_parent)
                setmoo(objJson[0].moo)
                setprovince(objJson[0].province)
                setrelation(objJson[0].relation)
                setsoi(objJson[0].soi)
                setsubdistrict(objJson[0].subdistrict)
                settelephone(objJson[0].telephone)
                setnum_of_treatments(objJson[0].num_of_treatments)
                
                // alert("Suscess")
            })
            .catch(function (error) {

            });


        console.log(Patient);

    }

    const editPatient = async () => {
        let patient = await axios.put(`${URL}/${id}`, {
            fname,
            lname,
            gender,
            bod,
            age,
            telephone,
            drug_allergy,
            congenital_disease,
            home_no,
            moo,
            soi,
            subdistrict,
            district,
            province,
            fname_parent,
            lname_parent,
            relation
        })

    }


    

    //PATIENT


    const [idPatient, setIdPatient] = useState()
    const [fname_patient, setFname_patient] = useState("")
    const [lname_patient, setLname_patient] = useState("")
    const [age_patient, setAge_patient] = useState("")


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
        setIdPatient(data_patient[index].clinic_number)
    
        setPatient(data_patient[index].fname)
        setage(data_patient[index].age)
        setbod(data_patient[index].bod)
        setclinic_number(data_patient[index].clinic_number)
        setcongenital_disease(data_patient[index].congenital_disease)
        setDistric(data_patient[index].district)
        setdrug_allergy(data_patient[index].drug_allergy)
        setfname(data_patient[index].fname)
        setfname_parent(data_patient[index].fname_parent)
        setgender(data_patient[index].gender)
        sethome_no(data_patient[index].home_no)
        setlname(data_patient[index].lname)
        setlname_parent(data_patient[index].lname_parent)
        setmoo(data_patient[index].moo)
        setprovince(data_patient[index].province)
        setrelation(data_patient[index].relation)
        setsoi(data_patient[index].soi)
        setsubdistrict(data_patient[index].subdistrict)
        settelephone(data_patient[index].telephone)
        setnum_of_treatments(data_patient[index].num_of_treatments)

    };

    const onChangeText_patient = (nextQuery) => {
        setQuery_patient(nextQuery);
    };

    const applyFilter_patient = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query_patient.toLowerCase()));
    };

    const clearInput_patient = () => {
        setQuery_patient('');
        setPatient()
        setage('')
        setbod('')
        setclinic_number('')
        setcongenital_disease('')
        setDistric('')
        setdrug_allergy('')
        setfname('')
        setfname_parent('')
        setgender('')
        sethome_no('')
        setlname('')
        setlname_parent('')
        setmoo('')
        setprovince('')
        setrelation('')
        setsoi('')
        setsubdistrict('')
        settelephone('')
        setnum_of_treatments('')
        setData_patient(patients);
    };

    const renderCloseIcon_patient = (props) => (
        <TouchableWithoutFeedback onPress={clearInput_patient}>
            <Icon {...props} name='close'/>
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

        <View style={[tw`flex w-full justify-center items-center`,styles.containertop]}> 
          <View style={[tw`w-full`,styles.top]}>
            <Text style={[tw`font-bold`,styles.title]}>ข้อมูลผู้ป่วย</Text> 
          </View>
        </View>
            
                <View style={[tw`w-4/5`,styles.menu]}>
                    <View style={tw`flex flex-row w-full justify-center items-center`}>
                        <Text style={[tw`font-semibold text-xl`,styles.font]}>ค้นหาชื่อผู้ป่วย</Text>
                        {/* <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`}
                            onChangeText={text => updateQuery(text)}
                            placeholder="กรอกรหัสประจำตัวผู้ป่วย. . ."
                        /> */}
                        <View style={tw`h-10 w-1/2 ml-2`}>
                            <Autocomplete
                                placeholder='โปรดระบุชื่อผู้ป่วย'
                                value={query_patient}
                                onChangeText={onChangeText_patient}
                                accessoryRight={renderCloseIcon_patient}
                                onSelect={onSelect_patient}>
                                {data_patient.map(renderOption_patient)}
                            </Autocomplete>
                        </View>


                        {/* <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}
                        // onPress={PrintPatient()}
                        >

                            <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>

                        </TouchableOpacity> */}

                        {/* <Button title={find ? 'ล้าง' : 'ค้นหา'} onPress={onPressHandler}></Button>
                        {find ?
                            // <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                            PrintPatient()

                            :
                            null
                        } */}
                    </View>

                    <KeyboardAwareScrollView style={tw`mt-2`}>
                        <View style={[tw`flex flex-col justify-center items-center p-4 rounded-xl`,styles.content]}>
                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>ชื่อ </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{fname}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>สกุล </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{lname}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>เพศ </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{gender}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>วันเกิด </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-3/4 rounded-md pl-2`,styles.textbox]}>
                                        <Text>{bod}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>อายุ </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-3/4 rounded-md pl-2`,styles.textbox]}>
                                        <Text>{age}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>เบอร์โทรศัพท์ </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{telephone}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>ประวัติการแพ้ยา </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{drug_allergy}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>ประวัติโรคประจำตัว </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{congenital_disease}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>จำนวนครั้งในการรักษา </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{num_of_treatments}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>ที่อยู่ บ้านเลขที่ </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-3/4 rounded-md pl-2`,styles.textbox]} >
                                        <Text>{home_no}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>หมู่ที่ </Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-3/4 rounded-md pl-2`,styles.textbox]} >
                                        <Text>{moo}</Text>
                                    </View>
                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>ตรอก/ซอก/ซอย</Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{soi}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>ตำบล</Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-3/4 rounded-md pl-2`,styles.textbox]}>
                                        <Text>{subdistrict}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>อำเภอ</Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-3/4 rounded-md pl-2`,styles.textbox]}>
                                        <Text>{district}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>จังหวัด</Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{province}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full mt-2`}>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>ชื่อผู้ปกครอง</Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{fname_parent}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>สกุล</Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{lname_parent}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`,styles.font]}>ความสัมพันธ์กับผู้ป่วย</Text>
                                    <View style={[tw`flex justify-center h-8 mt-2 w-full rounded-md pl-2`,styles.textbox]}>
                                        <Text>{relation}</Text>
                                    </View>

                                </View>
                            </View>

                            {/* <View style={tw`flex flex-row mt-4 justify-end w-full`}>
                                <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                                // onPress={editPatient}
                                >
                                    <Text style={tw`flex justify-center text-lg text-black font-bold`}>แก้ไข</Text>
                                </TouchableOpacity>
                            </View> */}

                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={[tw`flex flex-row w-full justify-evenly items-center`,styles.footer]} >
            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('ข้อมูลผู้ป่วย')}
              title="ข้อมูลผู้ป่วย">
              <Image source={require("../Icon/Buttom-Nav/icons8-find-user-male-45-P.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontpress]}>ข้อมูลผู้ป่วย</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('ระบบนัดหมาย')}
              title="ระบบนัดหมาย">
              <Image source={require("../Icon/Buttom-Nav/icons8-calendar-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>นัดหมาย</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('Menu')}
              title="Menu">
              <Image source={require("../Icon/Buttom-Nav/icons8-clinic-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>หน้าหลัก</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('บันทึกการให้บริการ')}
              title="บันทึกการให้บริการ">
              <Image source={require("../Icon/Buttom-Nav/icons8-cost-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>บันทึกการให้บริการ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[tw``, styles.navbtm]}
              onPress={() => navigation.navigate('รายงาน')}
              title="รายงาน">
              <Image source={require("../Icon/Buttom-Nav/icons8-test-results-45-W.png")}/>
              <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`,styles.fontnormal]}>รายงาน</Text>
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
      position: "absolute",
    //   borderColor: 'black',
    //   borderWidth: 2,
      marginTop: 180,
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
    },

    font:{
      color : '#633974',
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
  });

