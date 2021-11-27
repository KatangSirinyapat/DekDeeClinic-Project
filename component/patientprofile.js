import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, TouchableOpacity, Alert, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from 'axios';


const URL = `http://178.128.90.50:3333/patients`
export default function PatientProfile({ navigation }) {

    const [Patient, setPatient] = useState([])
    const [Patients, setPatients] = useState([])
    const [clinic_number, setclinic_number] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [gender, setgender] = useState("");
    const [bod, setbod] = useState("");
    const [age, setage] = useState("");
    const [telephone, settelephone] = useState("");
    const [drug_allergy, setdrug_allergy] = useState("");
    const [congenital_disease, setcongenital_disease] = useState("");
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
        getPatient()
    }, [id]);



    // let ID = parseInt(query)

    const getPatient = async () => {
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

                // alert("Suscess")
            })
            .catch(function (error) {
                // handle error
                // alert(error.message);
                // Alert.alert('ไม่สามารถค้นหาได้', 'กรุณากรอกรหัสประจำตัวผู้ป่วยให้ถูกต้อง', [
                //     // {
                //     //     test: 'Ok',
                //     //  onPress: () => console.warn('Ok Pressed!')
                //     // 
                // ]
                // )
            });

        // let tmp = JSON.stringify(PatientData)
        // setPatient(PatientData)
        // alert(Patient.fname)

        console.log(Patient);
    //    console.log(_fname);
        
        PrintPatient()



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


    const PrintPatient = () => {

        
     

        if (id == null || id == "") {
            Alert.alert('ไม่สามารถค้นหาได้', 'กรุณากรอกรหัสประจำตัวผู้ป่วยให้ถูกต้อง', [
                // {
                //     test: 'Ok',
                //  onPress: () => console.warn('Ok Pressed!')
                // 
            ]
            )
        }
        else if(id.toString().length ==  7) 
        {
            // setage(Patient[0].age)
            // setbod(Patient[0].bod)
            // setclinic_number(Patient[0].clinic_number)
            // setcongenital_disease(Patient[0].congenital_disease)
            // setDistric(Patient[0].district)
            // setdrug_allergy(Patient[0].drug_allergy)
            // setfname(Patient[0].fname)
            // setfname_parent(Patient[0].fname_parent)
            // setgender(Patient[0].gender)
            // sethome_no(Patient[0].home_no)
            // setlname(Patient[0].lname)
            // setlname_parent(Patient[0].lname_parent)
            // setmoo(Patient[0].moo)
            // setprovince(Patient[0].province)
            // setrelation(Patient[0].relation)
            // setsoi(Patient[0].soi)
            // setsubdistrict(Patient[0].subdistrict)
            // settelephone(Patient[0].telephone)
            // console.log(Patient[0]);
            console.log("Test1");
        }
        else {
            console.log("TestElse");
        }
           
        // Alert.alert('Mesasge','Data test test',[
        //     {test: 'Ok',
        // onPress: () => console.warn('Ok Pressed!')}
        // ])

    }

    // const findPatient = async () => {



    //     await axios.get(`${URL}/${id}`)
    //         .then(function (response) {
    //             // handle success
    //             // alert(JSON.stringify(response.data));
    //             // let patientsData = JSON.stringify(response.data)
    //             // console.log(patientsData);
    //             setPatient(response.data)
    //             setPatients(response.data)
    //             // alert("Suscess")
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             // alert(error.message);
    //         });
    // }






    return (

        <View>
            <View style={tw`flex h-full justify-start items-center bg-purple-200`}>
                <View style={tw`flex w-full justify-start items-start ml-16`}>

                    <Button onPress={() => navigation.navigate('Menu')} title="< ย้อนกลับ" />
                </View>

                <Text style={tw`font-semibold text-2xl mt-6`}>ข้อมูลผู้ป่วย</Text>
                <View style={tw`flex w-11/12 h-4/5`}>
                    <View style={tw`flex flex-row w-full justify-center items-center mt-8`}>
                        <Text style={tw`font-semibold text-xl`}>Clinic number</Text>
                        <TextInput style={tw`h-10 w-1/2 ml-2 pl-2 bg-purple-100 rounded-md`}
                            onChangeText={text => updateQuery(text)}
                            placeholder="กรอกรหัสประจำตัวผู้ป่วย. . ."
                        />

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

                    <KeyboardAwareScrollView style={tw`flex mt-8`}>
                        <View style={tw`flex flex-col justify-center items-center w-full h-full p-4 rounded-xl border-4 border-black`}>
                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ชื่อ </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{fname}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>สกุล </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{lname}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>เพศ </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{gender}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>วันเกิด </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                        <Text>{bod}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>อายุ </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                        <Text>{age}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์ </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{telephone}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ประวัติการแพ้ยา </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{drug_allergy}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ประวัติโรคประจำตัว </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{congenital_disease}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>จำนวนครั้งในการรักษา</Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>0</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ที่อยู่ บ้านเลขที่ </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`} >
                                        <Text>{home_no}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>หมู่ที่ </Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`} >
                                        <Text>{moo}</Text>
                                    </View>
                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>ตรอก/ซอก/ซอย</Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{soi}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ตำบล</Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                        <Text>{subdistrict}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>อำเภอ</Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                        <Text>{district}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>จังหวัด</Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{province}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ชื่อผู้ปกครอง</Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{fname_parent}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{lname_parent}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>ความสัมพันธ์กับผู้ป่วย</Text>
                                    <View style={tw`flex justify-center h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{relation}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row mt-4 justify-end w-full`}>
                                <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                                // onPress={editPatient}
                                >
                                    <Text style={tw`flex justify-center text-lg text-black font-bold`}>แก้ไข</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </View>

    );
}

