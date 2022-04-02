import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from 'axios';


const URL_PATIENT = `http://178.128.90.50:3333/patients`
const URL_COSTS = `http://178.128.90.50:3333/costs`

export default function AnnualReport({ navigation }) {


    const [summary, setSummary] = useState({})


    useEffect(() => {
        getDatasummary()
    }, [])
    const getDatasummary = async () => {

        await axios.get(`${URL_COSTS}/sum_of_year/`)
            .then(function (response) {
                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)

                setSummary(objJson)
            })
            .catch(function (error) {
                // alert(error.message);
            })
    }

    // const navigation = useNavigation()
    return (
         <View style={tw`flex h-full items-center`}>

        <View style={[tw`flex w-full justify-center items-center`,styles.containertop]}> 
          <View style={[tw`w-full`,styles.top]}>
            <Text style={[tw`font-bold`,styles.title]}>สรุปรายปี</Text> 
          </View>
        </View>

            <View style={[tw`w-4/5 ml-20`, styles.menu]}>
                <KeyboardAwareScrollView style={tw``}>
                    <View style={[tw`flex flex-col justify-between items-start p-10 rounded-xl`, styles.content]}>
                        <View style={tw`flex flex-row w-full justify-start items-center`}>
                            <Image source={require("../Icon/Annual/icons8-calendar-plus-30.png")}/>
                            <Text style={[tw`font-semibold text-lg ml-2`,styles.font]}>ช่วงในการให้บริการ</Text>
                        </View>

                        <View style={tw`flex flex-row justify-start w-full ml-10`}>
                            <View style={tw`flex flex-col w-1/3 pt-2`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>วันที่</Text>
                                <TextInput style={[tw`h-8 w-full rounded-md pl-2 mt-1`,styles.textbox]}/>
                            </View>
                            <View style={tw`flex flex-col w-1/3 ml-9 pt-2`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>ถึง</Text>
                                <TextInput style={[tw`h-8 w-full rounded-md pl-2 mt-1`,styles.textbox]}/>
                            </View>

                        </View>


                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-10`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>จำนวนการให้บริการทั้งหมด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={[tw`h-8 w-2/4 rounded-md pl-2 pt-2`,styles.textshow]}>{summary.service}</Text>

                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-10`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>จำนวนผู้เข้ารับการรักษา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={[tw`h-8 w-2/4 rounded-md pl-2 pt-2`,styles.textshow]}>{summary.count_of_patient}</Text>
                            </View>
                        </View>
                        
                        <View style={tw`flex flex-row w-full justify-start items-center mt-4`}>
                            <Image source={require("../Icon/Annual/icons8-calendar-30.png")}/>
                            <Text style={[tw`font-semibold text-lg ml-2`,styles.font]}>วันที่เริ่มต้นใช้งาน - ปัจจุบัน</Text>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-10`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>จำนวนการให้บริการทั้งหมด</Text>
                            </View>
                            <View style={tw`flex flex-row items-center w-3/5`}>
                                <Text style={[tw`h-8 w-2/4 rounded-md pl-2 pt-2`,styles.textshow]}>{summary.service}</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-10`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>จำนวนผู้เข้ารับการรักษา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <Text style={[tw`h-8 w-2/4 rounded-md pl-2 pt-2`,styles.textshow]}>{summary.count_of_patient}</Text>
                            </View>
                        </View>

                    </View>
                </KeyboardAwareScrollView>
            </View>

            <View style={styles.pic1}>
                <Image source={require("../Icon/Annual/Doc-Report.png")}/>
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

    pic1:{
        position: "absolute",
        bottom: 50,
        right: 0,
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