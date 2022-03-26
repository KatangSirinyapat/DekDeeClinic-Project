import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, View, TextInput, CheckBox, TouchableOpacity, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from "react-native-picker-select";
import tw from 'tailwind-react-native-classnames';
// import { Layout, Text, Input, Button, Icon, Spinner } from '@ui-kitten/components';
import axios from "axios";

const URL_DOCTOR = `http://178.128.90.50:3333/users`

export default function Register_users({ navigation }) {

    const [doctor_id, setDoctor_id] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [position, setPosition] = useState('');

    const [value, setValue] = React.useState('');


    const postDoctor = async () => {
        await axios.post(URL_DOCTOR, {
            doctor_id: parseInt(doctor_id),
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
        <View style={tw`min-h-full flex flex-col justify-start items-center bg-purple-400 bg-opacity-75`}>
            <KeyboardAwareScrollView style={tw`flex w-1/2`}>
                <View style={tw`flex flex-col justify-center items-center w-full h-24 rounded-t-xl bg-purple-400 mt-8`}>
                    <Text style={tw`text-xl font-bold uppercase tracking-wider pb-1 text-center`}>Register Doctor</Text>
                    <Text style={tw`text-lg font-bold uppercase tracking-wide text-center pt-2`}>Dek Dee Clinic</Text>
                </View>

                <View style={tw`flex flex-col justify-start items-center w-full rounded-b-xl bg-purple-200`}>
                    <View style={tw`flex flex-col justify-center items-start w-4/5 mt-8`}>
                        <Text style={tw`font-semibold`}>Doctor ID*</Text>
                        <TextInput style={tw`w-full h-8 mt-2 border-2 border-gray-500 rounded-md pl-2`} placeholder="โปรดระบุเลขประจำตัวแพทย์"
                            value={doctor_id}
                            onChangeText={nextValue => setDoctor_id(nextValue)}
                        />
                        <Text style={tw`mt-4 font-semibold`}>ชื่อ*</Text>
                        <TextInput style={tw`w-full h-8 mt-2 border-2 border-gray-500 rounded-md pl-2`} placeholder="โปรดระบุชื่อ"
                            value={fname}
                            onChangeText={nextValue => setFname(nextValue)}
                        />
                        <Text style={tw`mt-4 font-semibold`}>สกุล*</Text>
                        <TextInput style={tw`w-full h-8 mt-2 border-2 border-gray-500 rounded-md pl-2`} placeholder="โปรดระบุนามสกุล"
                            value={lname}
                            onChangeText={nextValue => setLname(nextValue)}
                        />
                        <Text style={tw`mt-4 font-semibold`}>Email*</Text>
                        <TextInput style={tw`w-full h-8 mt-2 border-2 border-gray-500 rounded-md pl-2`} placeholder="โปรดระบุ Email"
                            value={email}
                            onChangeText={nextValue => setEmail(nextValue)}
                        />
                        <Text style={tw`mt-4 font-semibold`}>เบอร์โทรศัพท์*</Text>
                        <TextInput style={tw`w-full h-8 mt-2 border-2 border-gray-500 rounded-md pl-2`} placeholder="โปรดระบุเบอร์โทรศัพท์"
                            value={telephone}
                            onChangeText={nextValue => setTelephone(nextValue)}
                        />
                        <Text style={tw`mt-4 font-semibold`}>ตำแหน่ง*</Text>
                        <View style={tw`w-full h-8 mt-2 border-2 border-gray-500 rounded-md pl-2 pt-1`}>
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
                    <TouchableOpacity style={tw`h-8 mt-6 w-4/5 bg-white rounded-md items-center justify-center border-2 border-gray-500 `}
                        onPress={() => postDoctor()}
                        title="Menu">
                        <Text style={tw`text-lg text-black font-bold`}>ลงทะเบียน</Text>

                    </TouchableOpacity>
                    {/* <Button style={styles.button} status='success' >
                    ลงทะเบียน
                    </Button> */}

                    <View style={tw`flex flex-row w-full justify-center items-center mt-3 mb-3`}>
                        <TouchableOpacity style={tw` w-4/5 bg-white rounded-md items-center justify-center border-2 border-gray-500`}
                            onPress={() => navigation.navigate('Menu')}
                            title="Menu">
                            <Text style={tw`text-lg text-black font-bold`}>Menu</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAwareScrollView>
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
});

