import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, CheckBox, TouchableOpacity, Text, Image, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from "react-native-picker-select";
import tw from 'tailwind-react-native-classnames';
// import { Layout, Text, Input, Button, Icon, Spinner } from '@ui-kitten/components';
import axios from "axios";

const URL_DOCTOR = `http://178.128.90.50:3333/users`


export default function Register_users({ navigation }) {

    const [doctor_id, setDoctor_id] = useState(0);
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [position, setPosition] = useState('');

    const [doctors, setDoctors] = useState([])

    const [value, setValue] = React.useState('');


    const postDoctor = async () => {
        await axios.post(URL_DOCTOR, {
            doctor_id: 0, //BackEnd Init this id init 1001 from Back End
            fname: fname,
            lname: lname,
            email: email,
            telephone: telephone,
            position: position
        })
            .then(function (response) {
                alert("บันทึกข้อมูลเสร็จสิ้น")

            })

            .catch(function (error) {
                alert(error.message)
            })
    }







    return (
        <View style={tw`flex h-full items-center`}>

            <View style={[tw`flex w-full justify-center items-center`, styles.containertop]}>
                <View style={[tw`w-full`, styles.top]}>
                    <Text style={[tw`font-bold`, styles.title]}>ลงทะเบียนแพทย์</Text>
                </View>
            </View>

            <View style={[tw`flex flex-row w-full`, styles.menu]}>
                <KeyboardAwareScrollView style={tw`flex w-1/2`}>
                    <View style={tw`flex flex-col justify-start items-start`}>
                        <View style={[tw`flex flex-col justify-center items-start w-1/3 ml-48`, styles.content]}>
                            <Text style={[tw`font-semibold`, styles.font]}>Doctor ID *</Text>
                            <TextInput style={[tw`h-9 mt-2 w-full rounded-md pl-2`, styles.textbox]} placeholder="โปรดระบุเลขประจำตัวแพทย์"
                                value={doctor_id}
                                onChangeText={nextValue => setDoctor_id(nextValue)}
                            />
                            <Text style={[tw`mt-3 font-semibold`, styles.font]}>ชื่อ *</Text>
                            <TextInput style={[tw`h-9 mt-2 w-full rounded-md pl-2`, styles.textbox]} placeholder="โปรดระบุชื่อ"
                                value={fname}
                                onChangeText={nextValue => setFname(nextValue)}
                            />
                            <Text style={[tw`mt-3 font-semibold`, styles.font]}>สกุล *</Text>
                            <TextInput style={[tw`h-9 mt-2 w-full rounded-md pl-2`, styles.textbox]} placeholder="โปรดระบุนามสกุล"
                                value={lname}
                                onChangeText={nextValue => setLname(nextValue)}
                            />
                            <Text style={[tw`mt-3 font-semibold`, styles.font]}>Email *</Text>
                            <TextInput style={[tw`h-9 mt-2 w-full rounded-md pl-2`, styles.textbox]} placeholder="โปรดระบุ Email"
                                value={email}
                                onChangeText={nextValue => setEmail(nextValue)}
                            />
                            <Text style={[tw`mt-3 font-semibold`, styles.font]}>เบอร์โทรศัพท์ *</Text>
                            <TextInput style={[tw`h-9 mt-2 w-full rounded-md pl-2`, styles.textbox]} placeholder="โปรดระบุเบอร์โทรศัพท์"
                                value={telephone}
                                onChangeText={nextValue => setTelephone(nextValue)}
                            />
                            <Text style={[tw`mt-3 font-semibold`, styles.font]}>ตำแหน่ง *</Text>
                            <View style={[tw`h-9 mt-2 w-full rounded-md pl-2 pt-2`, styles.textbox]}>
                                <RNPickerSelect
                                    placeholder={{ label: "เลือกตำแหน่ง", value: null }}
                                    onValueChange={(value) => setPosition(value)}
                                    items={[
                                        { label: "แพทย์", value: "แพทย์" },
                                        { label: "นักจิตวิทยา", value: "นักจิตวิทยา" },
                                        { label: "นักฝึกพูด", value: "นักฝึกพูด" },
                                        { label: "นักกิจกรรมบำบัด", value: "นักกิจกรรมบำบัด" },
                                        { label: "ครูการศึกษาพิเศษ", value: "ครูการศึกษาพิเศษ" },
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={tw`flex flex-row mt-4 justify-end w-1/3 ml-48`}>
                            <View style={styles.button}>
                                <Button
                                    onPress={postDoctor}
                                    color="#4A235A"
                                    title="บันทึก"
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>

            <View style={styles.pic1}>
                <Image source={require("../Icon/Regis-Doc/Doc01.png")} />
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

        // <Layout style={styles.container}>

        //     <Layout style={styles.layout} level='4'>
        //         <Text>4</Text>
        //     </Layout>

        //     <Layout style={styles.layout} level='3'>
        //         <Text>3</Text>
        //         <Input
        //             placeholder='โปรดกรอกรหัสประจำตัวแพทย์'
        //             value={doctor_id}
        //             onChangeText={nextValue => setDoctor_id(nextValue)}
        //         />

        //     </Layout>

        //     <Layout style={styles.layout} level='3'>
        //         <Text>2</Text>
        //     </Layout>

        //     <Layout style={styles.layout} level='1'>
        //         <Text>1</Text>
        //     </Layout>

        // </Layout>


    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        margin: 2,
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },

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
    },

    menu: {
        position: "absolute",
        // borderColor: 'black',
        // borderWidth: 2,
        marginTop: 188,
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
        bottom: 15,
        right: 80,
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
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#EBDEF0',
        borderWidth: 2,
        borderColor: "#4A235A",
    }
});

