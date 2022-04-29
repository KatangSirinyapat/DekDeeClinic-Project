import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, ScrollView, Image } from 'react-native';
import tw from "tailwind-react-native-classnames";
import RNPickerSelect from "react-native-picker-select";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';




const URL = `http://178.128.90.50:3333/patients`

export default function Register({ navigation }) {


    const [date, setDate] = useState(new Date(2021, 12, 1, 0, 0, 0, 0));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [clinic_number, setClinic_number] = useState(0);
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [gender, setgender] = useState("");
    const [bod, setbod] = useState("");
    const [age, setage] = useState("");
    const [telephone, settelephone] = useState("");
    const [drug_allergy, setdrug_allergy] = useState("");
    const [congenital_disease, setcongenital_disease] = useState("");
    const [home_no, sethome_no] = useState("-");
    const [moo, setmoo] = useState("-");
    const [soi, setsoi] = useState("-");
    const [subdistrict, setsubdistrict] = useState("");
    const [district, setDistric] = useState("");
    const [province, setprovince] = useState("สงขลา");
    const [fname_parent, setfname_parent] = useState("");
    const [lname_parent, setlname_parent] = useState("");
    const [relation, setrelation] = useState("");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);


        let curDate = new Date().toString()
        let tmpDate = currentDate.toString()
        let tmpAge = parseInt(curDate.substring(10, 15).trim()) - parseInt(tmpDate.substring(10, 15).trim())

        // console.log(tmpAge)   


        let data = currentDate.toJSON()
        let dataBoD = JSON.stringify(data);
        let tmp = dataBoD.substring(1, 11)
        // console.log(tmp);
        let tmp0 = tmp.substring(0, 8)
        let tmp1 = tmp.substring(8, 11)

        let int_tmp1 = parseInt(tmp1) + 1
        tmp = tmp0 + int_tmp1
        console.log(tmp);

        setage(tmpAge.toString())
        setbod(tmp.toString())
        // console.log(dataBoD.substring(1,11)); 
        // console.log(bod); 
        // console.log(age);


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






    const postPatient = () => {
        axios
            .post(URL, {
                clinic_number: 0, //init ID from Back End Start at 2001
                fname: fname,
                lname: lname,
                gender: gender,
                bod: bod,
                age: age,
                telephone: telephone,
                drug_allergy: drug_allergy,
                congenital_disease: congenital_disease,
                home_no: home_no,
                moo: moo,
                soi: soi,
                subdistrict: subdistrict,
                district: district,
                province: province,
                fname_parent: fname_parent,
                lname_parent: lname_parent,
                relation: relation,
                num_of_treatments: 0
            })
            .then(function (response) {
                // handle success
                // alert(JSON.stringify(response.data));
                alert("ลงทะเบียนผู้ป่วยเสร็จสิ้น")
            })
            .catch(function (error) {
                // handle error
                console.log(error.message);
                alert(error.message);
            });
    };



    return (

        <View style={tw`flex h-full items-center`}>

            <View style={[tw`flex w-full justify-center items-center`, styles.containertop]}>
                <View style={[tw`w-full`, styles.top]}>
                    <Text style={[tw`font-bold`, styles.title]}>ลงทะเบียนผู้ป่วยใหม่</Text>
                </View>
            </View>

            <View style={[tw`flex flex-row flex-wrap w-4/5 justify-evenly items-center`, styles.menu]}>
                <KeyboardAwareScrollView style={tw``}>
                    <View style={[tw`flex flex-col justify-evenly items-center p-4 rounded-xl`, styles.content]}>
                        <View style={tw`flex flex-row justify-between w-full`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ชื่อ</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setfname(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>สกุล</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setlname(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/4`}>
                                {/* <Text style={[tw`font-semibold text-base`, styles.font]}>เลขประจำตัวผู้ป่วย</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setClinic_number(text)} /> */}
                                <Text style={[tw`font-semibold text-base`, styles.font]}>เบอร์โทรศัพท์</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => settelephone(text)} />
                            </View>

                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-6`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>วันเกิด</Text>
                                {/* <TextInput 
                                    onChangeText={(text) => setbod(text)} /> */}
                                <View style={[tw`h-9 mt-1 w-2/4 rounded-md`, styles.textbox]}>
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
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>อายุ</Text>
                                {/* <TextInput 
                                    onChangeText={(text) => setage(text)} /> */}
                                <View style={[tw`h-9 mt-1 w-3/4 rounded-md pl-2`, styles.textbox]}>
                                    <Text style={tw`mt-2`}>{age} ปี</Text>
                                </View>
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>เพศ</Text>
                                {/* <TextInput sty[le={tw`h-9 mt-1 w-full rounded-md pl-2`,styles.textbox]}
                          onChangeText={(text) => setgender(text)}/> */}
                                <View style={[tw`h-9 mt-1 w-full rounded-md pl-2 pt-2`, styles.textbox]}>
                                    <RNPickerSelect
                                        placeholder={{ label: "เลือกเพศ", value: null }}
                                        onValueChange={(value) => setgender(value)}
                                        items={[
                                            { label: "ชาย", value: "ชาย" },
                                            { label: "หญิง", value: "หญิง" },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-6`}>
                            <View style={tw`flex flex-col justify-start w-1/2`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ประวัติการแพ้ยา</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setdrug_allergy(text)} />
                                {/* <View style={tw`h-9 mt-1 w-full rounded-md pl-2 py-2`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "ประวัติการแพ้ยา", value: null }}
                                        onValueChange={(value) => setdrug_allergy(value)}
                                        items={[
                                            { label: "ไม่มีประวัติการแพ้ยา", value: "ไม่มีประวัติการแพ้ยา" },
                                            { label: "แพ้ยากลุ่ม Penicillins", value: "แพ้ยากลุ่ม Penicillins" },
                                        ]}
                                    />
                                </View> */}
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/2 pl-10`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ประวัติโรคประจำตัว</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setcongenital_disease(text)} />
                                {/* <View style={tw`h-9 mt-1 w-full rounded-md pl-2 py-2`}>
                                    <RNPickerSelect
                                        placeholder={{ label: "โรคประจำตัว", value: null }}
                                        onValueChange={(value) => setcongenital_disease(value)}
                                        items={[
                                            { label: "ไม่มีโรคประจำตัว", value: "ไม่มีโรคประจำตัว" },
                                            { label: "หอบหืด", value: "หอบหืด" },
                                        ]}
                                    />
                                </View> */}
                            </View>
                            {/* <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>เบอร์โทรศัพท์</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => settelephone(text)} />
                            </View> */}
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-6`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ที่อยู่ บ้านเลขที่</Text>
                                <TextInput style={[tw`h-9 mt-1 w-2/5 rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => sethome_no(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>หมู่ที่</Text>
                                <TextInput style={[tw`h-9 mt-1 w-3/4 rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setmoo(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ตรอก/ซอก/ซอย</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setsoi(text)} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-6`}>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ตำบล</Text>
                                <TextInput style={[tw`h-9 mt-1 w-3/4 rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setsubdistrict(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>อำเภอ</Text>
                                <TextInput style={[tw`h-9 mt-1 w-3/4 rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setDistric(text)} />
                            </View>
                            <View style={tw`flex flex-col justify-start w-1/4`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>จังหวัด</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setprovince(text)}
                                    value={province}
                                />

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-6`}>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ชื่อผู้ปกครอง</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setfname_parent(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/3`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>สกุล</Text>
                                <TextInput style={[tw`h-9 mt-1 w-full rounded-md pl-2`, styles.textbox]}
                                    onChangeText={(text) => setlname_parent(text)} />
                            </View>
                            <View style={tw`flex flex-col w-1/4`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ความสัมพันธ์กับผู้ป่วย</Text>
                                <View style={[tw`h-9 mt-1 w-full rounded-md pl-2 pt-2`, styles.textbox]}>
                                    <RNPickerSelect
                                        placeholder={{ label: "ความสัมพันธ์กับผู้ป่วย", value: null }}
                                        onValueChange={(value) => setrelation(value)}
                                        items={[
                                            { label: "บิดา", value: "บิดา" },
                                            { label: "มารดา", value: "มารดา" },
                                            { label: "ญาติ", value: "ญาติ" },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={tw`flex flex-row mt-8 justify-end w-full`}>
                            <View style={styles.button}>
                                <Button
                                    onPress={postPatient}
                                    color="#4A235A"
                                    title="บันทึก"
                                />
                            </View>
                        </View>


                        {/* <View style={tw`flex flex-row mt-8 justify-end w-full`}>
                            <TouchableOpacity style={[tw`h-12 rounded-md items-center justify-center`, styles.button]}
                                onPress={postPatient}>
                                <Text style={tw`text-lg text-black font-bold`}>บันทึก</Text>
                            </TouchableOpacity>
                            <Button title="บันทึก" onPress={postPatient}></Button>
                        </View> */}

                    </View>
                </KeyboardAwareScrollView>
            </View>

            {/* <View style={styles.pic1}>
                <Image source={require("../Icon/Home/Docter-Regis.png")} />
            </View> */}

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
                    <Image source={require("../Icon/Buttom-Nav/icons8-clinic-45-P.png")} />
                    <Text style={[tw`flex items-center text-sm text-black font-bold mt-1`, styles.fontpress]}>หน้าหลัก</Text>
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
        // borderColor: 'black',
        // borderWidth: 2,
        marginTop: 185,
        // height: 630
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

    pic1: {
        position: "absolute",
        bottom: 505,
        right: 95,
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






//------------date time picker

{/* <View>
<View>
    <Button onPress={showDatepicker} title="Show date picker!" />
</View>
<View>
    <Button onPress={showTimepicker} title="Show time picker!" />
</View>
{show && (
    <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'date'}
        is24Hour={true}
        display="default"
        onChange={onChange}
    />
)}
</View> */}