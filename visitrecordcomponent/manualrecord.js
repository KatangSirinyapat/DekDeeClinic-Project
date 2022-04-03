import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ManualRecord({ navigation }) {
    // const navigation = useNavigation()
    //Date time
    const [date1, setDate1] = useState(new Date(2021, 12, 1, 0, 0, 0, 0));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate1(currentDate);

        let curDate = new Date().toString()
        let tmpDate = currentDate.toString()

        let data = currentDate.toJSON()
        let dataBoD = JSON.stringify(data);
        let tmp = dataBoD.substring(1, 11)
        let tmp0 = tmp.substring(0, 8)
        let tmp1 = tmp.substring(8, 11)

        let int_tmp1 = parseInt(tmp1) + 1
        // console.log(int_tmp1);
        if (int_tmp1 >= 0 && int_tmp1 <= 9) {
            tmp = tmp0 + 0 + int_tmp1

        }
        else {
            tmp = tmp0 + int_tmp1
        }

        console.log(tmp);
        setDate(tmp.toString())
        // tmpDate = tmp.toString()

        // costs.map((item, index) => {
        //     if (item.date === date.concat("T00:00:00.000Z")) {
        //         setCost(item)
        //         costOBJ.push(item)
        //         // tmp = item.date
        //         // console.log(tmp.substring(0,7));

        //     }
        // })

        // console.log(dataBoD.substring(1,11)); 
    };

    return (
        <View style={tw`flex h-full items-center`}>

            <View style={[tw`flex w-full justify-center items-center`, styles.containertop]}>
                <View style={[tw`w-full`, styles.top]}>
                    <Text style={[tw`font-bold`, styles.title]}>สรุปการให้บริการแบบกำหนดเอง</Text>
                </View>
            </View>
            <View style={[tw`flex flex-row w-4/5`, styles.menu]}>
                <KeyboardAwareScrollView style={tw``}>
                    <View style={[tw`flex flex-col p-4 rounded-xl`, styles.content]}>
                        <View style={tw`flex flex-row w-full justify-start items-center`}>
                            <View style={tw`flex flex-row w-2/5 justify-start items-center ml-16`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>วันที่</Text>
                                <DateTimePicker themeVariant="light" style={tw`h-10 w-1/2 rounded-md`}
                                    testID="dateTimePicker"
                                    value={date1}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />

                                {/* <TextInput style={tw`h-8 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2 ml-2`} /> */}
                            </View>
                            <View style={tw`flex flex-row w-2/5 justify-start items-center`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ถึง</Text>
                                <DateTimePicker themeVariant="light" style={tw`h-10 w-1/2 rounded-md`}
                                    testID="dateTimePicker"
                                    value={date1}
                                    mode={'date'}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                                {/* <TextInput style={tw`h-8 w-3/4 border-2 border-purple-500 bg-purple-100 rounded-md pl-2 ml-2`} /> */}
                            </View>
                            <View style={styles.button}>
                                <Button
                                    color="#4A235A"
                                    title="ค้นหา"
                                // onPress={findCost}
                                />
                            </View>
                        </View>

                        {/* <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>จำนวนคนไข้</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-2/5 border-2 border-purple-500 bg-purple-100 rounded-md pl-2`} />
                                <Text style={tw`font-semibold text-base pl-2`}>คน</Text>
                            </View>
                        </View> */}

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของแพทย์</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ค่ายา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View>
                            </View>
                        </View>

                        {/* <Text style={tw`font-semibold text-lg mt-4`}>ค่าบริการของนักจิตวิทยา</Text> */}

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักจิตวิทยา</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View>
                            </View>
                        </View>

                        {/* <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>ชื่อนักจิตวิทยา 2</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`} />
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`,styles.font]}>ชื่อนักจิตวิทยา 3</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <TextInput style={tw`h-8 w-2/5 bg-purple-300 rounded-md pl-2`} />
                            </View>
                        </View> */}

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักฝึกพูด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักกิจกรรมบำบัด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของครูการศึกษาพิเศษ</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>เงินโอน</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={[tw`font-semibold text-base`, styles.font]}>เงินสด</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-between w-full mt-4 ml-36`}>
                            <View style={tw`flex flex-row justify-start items-center w-2/5`}>
                                <Text style={tw`font-semibold text-base text-red-600`}>คิดเป็นเงินทั้งสิ้น</Text>
                            </View>
                            <View style={tw`flex flex-row  items-center w-3/5`}>
                                <View style={[tw`flex justify-center h-8 w-2/5 pl-2`, styles.textshow]}>
                                    {/* <Text>{cost_of_medicine}</Text> */}
                                </View><Text style={tw`font-semibold text-base pl-2 text-red-600`}>บาท</Text>
                            </View>
                        </View>

                        <View style={tw`flex flex-row justify-end w-full mt-4`}>
                            <View style={styles.printButton}>
                                <Button
                                    color="#4A235A"
                                    title="Print"
                                    accessibilityLabel="Learn more about this purple button"
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
        marginTop: 155,
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

    button: {
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#EBDEF0',
        borderWidth: 2,
        borderColor: "#4A235A",
    },

    printButton: {
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 10,
        backgroundColor: '#EBDEF0',
        borderWidth: 2,
        borderColor: "#4A235A",
    },
});