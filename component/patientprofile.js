import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Alert, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from 'axios';
import { set } from "react-native-reanimated";
import { SearchBar } from 'react-native-elements';
import AutoComplete from 'react-native-autocomplete-input'



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
    const [id, setId] = useState(0)
    const [text, setText] = useState("1")

    
    const [query, setQuery] = useState('');
   




 

 



    const updateQuery = (input) => {
        setQuery(input);
        console.log(query);
    }



    useEffect(() => {
        getPatient()
    }, [ID]);


    let ID = parseInt(query)

    const getPatient = async () => {
        await axios.get(`${URL}`)
            .then(function (response) {
                // handle success
                // alert(JSON.stringify(response.data));
                // let patientsData = JSON.stringify(response.data)
                // console.log(patientsData);
                setPatient(response.data)
                setPatients(response.data)
                // alert("Suscess")
            })
            .catch(function (error) {
                // handle error
                // alert(error.message);
            });

        // let tmp = JSON.stringify(PatientData)
        // setPatient(PatientData)


        PrintPatient()
    }

    const editPatient = async () => {
        let patient = await axios.put(`${URL}/${ID}`, {
            clinic_number,
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

        console.log(patient);



    }


    const PrintPatient = () => {

        // setId(parseInt(text))

        // console.log("Testtttttttttttttt--");
        console.log(Patient.clinic_number)

        // console.log(Patient);
        setage(Patient.age)
        setbod(Patient.bod)
        setclinic_number(Patient.clinic_number)
        setcongenital_disease(Patient.congenital_disease)
        setDistric(Patient.district)
        setdrug_allergy(Patient.drug_allergy)
        setfname(Patient.fname)
        setfname_parent(Patient.fname_parent)
        setgender(Patient.gender)
        sethome_no(Patient.home_no)
        setlname(Patient.lname)
        setlname_parent(Patient.lname_parent)
        setmoo(Patient.moo)
        setprovince(Patient.province)
        setrelation(Patient.relation)
        setsoi(Patient.soi)
        setsubdistrict(Patient.subdistrict)
        settelephone(Patient.telephone)
    }

    const findPatient = async () => {

        // let tmp = "asd";

        // let result = Object.keys(Patients).map((item, index) => {
        //     tmp = item.fname
        // })
        // console.log(tmp);


        await axios.get(`${URL}/${ID}`)
            .then(function (response) {
                // handle success
                // alert(JSON.stringify(response.data));
                // let patientsData = JSON.stringify(response.data)
                // console.log(patientsData);
                setPatient(response.data)
                setPatients(response.data)
                // alert("Suscess")
            })
            .catch(function (error) {
                // handle error
                // alert(error.message);
            });
    }

   




    return (

        // <View>

        // <SearchBar
        //     onChangeText={updateQuery}
        //     value={query}
        //     placeholder="Type Here..." />

        // <FlatList data={heroes} keyExtractor={(i) => i.id.toString()}
        //     extraData={query}
        //     renderItem={({ item }) =>
        //         <Text style={styles.flatList}>{filterNames(item)}
        //         </Text>}
        // />

        // </View>



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
                        {/* onChangeText={(text) => setParams(text)} */}
                        <TouchableOpacity style={tw`h-10 w-20 rounded-md items-center justify-center ml-2 border-4 border-purple-500 bg-purple-100`}
                        onPress={findPatient()}
                        >

                            <Text style={tw`text-lg text-black font-bold`}>ค้นหา</Text>
                        </TouchableOpacity>
                    </View>

                    <KeyboardAwareScrollView style={tw`flex mt-8`}>
                        <View style={tw`flex flex-col justify-center items-center w-full h-full p-4 rounded-xl border-4 border-black`}>
                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ชื่อ </Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{fname}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>สกุล </Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{lname}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>เพศ </Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{gender}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>วันเกิด </Text>
                                    <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                        <Text>{bod}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>อายุ </Text>
                                    <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                        <Text>{age}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>เบอร์โทรศัพท์ </Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{telephone}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ประวัติการแพ้ยา </Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{drug_allergy}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ประวัติโรคประจำตัว </Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{congenital_disease}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>จำนวนครั้งในการรักษา</Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>0</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ที่อยู่ บ้านเลขที่ </Text>
                                    <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`} >
                                        <Text>{home_no}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>หมู่ที่ </Text>
                                    <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`} >
                                        <Text>{moo}</Text>
                                    </View>
                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>ตรอก/ซอก/ซอย</Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{soi}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ตำบล</Text>
                                    <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                        <Text>{subdistrict}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>อำเภอ</Text>
                                    <View style={tw`h-8 mt-2 w-3/4 bg-purple-300 rounded-md pl-2`}>
                                        <Text>{district}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col justify-start w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>จังหวัด</Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{province}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`flex flex-row justify-between w-full`}>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>ชื่อผู้ปกครอง</Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{fname_parent}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/3`}>
                                    <Text style={tw`font-semibold text-base`}>สกุล</Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{lname_parent}</Text>
                                    </View>

                                </View>
                                <View style={tw`flex flex-col w-1/4`}>
                                    <Text style={tw`font-semibold text-base`}>ความสัมพันธ์กับผู้ป่วย</Text>
                                    <View style={tw`h-8 mt-2 w-full bg-purple-300 rounded-md pl-2`}>
                                        <Text>{relation}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={tw`flex flex-row mt-4 justify-end w-full`}>
                                <TouchableOpacity style={tw`h-12 w-1/5 rounded-md items-center justify-center border-4 border-red-500 bg-pink-200`}
                                    onPress={editPatient}
                                >
                                    <Text style={tw`text-lg text-black font-bold`}>แก้ไข</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        </View>





    );
}

const styles = StyleSheet.create({
    flatList: {
        paddingLeft: 15,
        marginTop: 15,
        paddingBottom: 15,
        fontSize: 20,
        borderBottomColor: '#26a69a',
        borderBottomWidth: 1
    }
});