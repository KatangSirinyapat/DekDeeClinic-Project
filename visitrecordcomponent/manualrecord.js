import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Layout, RangeDatepicker, Datepicker, Icon } from '@ui-kitten/components';
import moment from "moment";
import axios from "axios";
import { flex } from "styled-system";

const URL_COST = `http://178.128.90.50:3333/costs`

export default function ManualRecord({ navigation }) {

    const [range, setRange] = React.useState({});
    // const [date, setDate] = React.useState(new Date());
    // const navigation = useNavigation()
    //Date time
    // const [date1, setDate1] = useState(new Date(2021, 12, 1, 0, 0, 0, 0));

    const [costs, setCosts] = useState([])
    let dateStart;
    let dateEnd;


    // useEffect(() => {
    //     getCost()
    // }, [])



    const getCost = async () => {
        await axios.get(`${URL_COST}/find_range/${dateStart}/${dateEnd}`)
            .then(function (response) {

                // let obj = JSON.stringify(response.data)
                // let objJson = JSON.parse(obj)

                console.log(response.data);
                setCosts(response.data)

            })
            .catch(function (error) {
                // alert(error.message);
            })

    }

    const onRange = (nextRange) => {

        // console.log();
        let tmp = nextRange.startDate

        dateStart = moment(tmp.toLocaleDateString('en-US')).format()


        // console.log(tmp.toLocaleDateString('en-US'));

        let tmp2 = nextRange.endDate
        if (tmp2 != null) {
            // console.log();
            dateEnd = moment(tmp2.toLocaleDateString('en-US')).format()
            //   console.log(moment(test).format());
            console.log("dateStart: " + dateStart);
            console.log("dateEnd: " + dateEnd);
            getCost()
        }
        setRange(nextRange)
        // setRange2(nextRange)
    }

    const getMinStartDate = () => {
        const minStartDate = new Date("01/01/2010");
        minStartDate.setHours(0, 0, 0, 0);
        return minStartDate;
    };

    const getMaxEndDate = () => {
        const minStartDate = getMinStartDate();
        const maxEndDate = new Date(minStartDate);
        maxEndDate.setFullYear(maxEndDate.getFullYear() + 30);
        return maxEndDate;
    };

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar'/>
      );

    return (
        <View style={tw`flex h-full items-center`}>

            <View style={[tw`flex w-full justify-center items-center`, styles.containertop]}>
                <View style={[tw`w-full`, styles.top]}>
                    <Text style={[tw`font-bold`, styles.title]}>สรุปการให้บริการแบบกำหนดเอง</Text>
                </View>
            </View>
            <View style={[tw`flex flex-row w-4/5`, styles.menu]}>
                <KeyboardAwareScrollView style={tw``}>
                    <View style={[tw`flex flex-col items-center p-4`, styles.content]}>
                        <View style={tw`flex flex-row w-full items-center justify-center mt-10`}>
                            <View style={tw`flex flex-row items-center justify-center w-full`}>
                                <Text style={[tw`font-semibold text-lg ml-8`, styles.font]}>ช่วงวันที่ที่ต้องการทราบค่าบริการ</Text>
                                <View style={tw`flex flex-row justify-start items-center ml-4`}>
                                    <RangeDatepicker
                                        placeholder={"DD/MM/YYYY - DD/MM/YYYY"}
                                        min={getMinStartDate()}
                                        max={getMaxEndDate()}
                                        style={styles.textbox}
                                        range={range}
                                        onSelect={nextRange => onRange(nextRange)}
                                        accessoryRight={CalendarIcon}

                                    />
                                </View>
                            </View>

                            {/* <View style={styles.button}>
                                <Button
                                    color="#4A235A"
                                    title="ค้นหา"
                                    onPress={getCost}
                                />
                            </View> */}
                        </View>



                        <View style={[tw`flex justify-center w-full mt-8 p-4 mr-6`, styles.bordercost]}>
                            <View style={tw`flex flex-row`}>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของแพทย์</Text>
                                </View>
                                <View style={tw`flex flex-row items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{costs.cost_of_doctor}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่ายา</Text>
                                </View>
                                <View style={tw`flex flex-row  items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{costs.cost_of_medicine}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                            </View>

                            {/* <Text style={tw`font-semibold text-lg mt-4`}>ค่าบริการของนักจิตวิทยา</Text> */}

                            <View style={tw`flex flex-row justify-between w-full mt-4`}>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักจิตวิทยา</Text>
                                </View>
                                <View style={tw`flex flex-row  items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{costs.cost_of_psychologist}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักฝึกพูด</Text>
                                </View>
                                <View style={tw`flex flex-row  items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{costs.cost_of_practitioner}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                            </View>


                            <View style={tw`flex flex-row justify-between w-full mt-4`}>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักกิจกรรมบำบัด</Text>
                                </View>
                                <View style={tw`flex flex-row  items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{costs.cost_of_occupational_therapist}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของครูการศึกษาพิเศษ</Text>
                                </View>
                                <View style={tw`flex flex-row  items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{costs.cost_of_teacher}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                            </View>


                            <View style={tw`flex flex-row justify-center w-full mt-6 pr-16`}>
                                <View style={tw`flex flex-row items-center`}>
                                    <Text style={[tw`font-semibold text-lg`, styles.font]}>คิดเป็นเงินทั้งสิ้น</Text>
                                </View>
                                <View style={tw`flex flex-row items-center w-32 ml-2`}>
                                    <View style={[tw`flex justify-center items-center h-9 w-full`, styles.textshowsum]}>
                                        <Text style={[tw`font-semibold text-lg`, styles.font]}>
                                            {costs.total}
                                        </Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-lg pl-2`, styles.font]}>บาท</Text>
                                </View>
                            </View>



                            <View style={tw`flex flex-row justify-evenly w-full mt-8 mr-6`}>
                                <View style={[tw`flex flex-row justify-center items-center w-2/5 pr-10`, styles.bordercost]}>
                                    <Image source={require("../Icon/Record/icons8-mobile-payment-30.png")} />
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>เงินโอน</Text>
                                    <View style={tw`flex flex-row items-center w-1/3 ml-4`}>
                                        <View style={[tw`flex items-center w-full`, styles.textshow]}>
                                            <Text style={tw`h-8 pt-2`}>{costs.bank_transfer}</Text>
                                        </View>
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>

                                <View style={[tw`flex flex-row justify-center items-center w-2/5 pr-10`, styles.bordercost]}>
                                    <Image source={require("../Icon/Record/icons8-money-30.png")} />
                                    <Text style={[tw`font-semibold text-base pl-1`, styles.font]}>เงินสด</Text>
                                    <View style={tw`flex flex-row items-center w-1/3 ml-4`}>
                                        <View style={[tw`flex items-center w-full`, styles.textshow]}>
                                            <Text style={tw`h-8 pt-2`}>{costs.cash}</Text>
                                        </View>
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* <View style={tw`flex flex-row justify-end w-full mt-4 mr-8`}>
                            <View style={styles.button}>
                                <Button
                                    color="#4A235A"
                                    title="Print"
                                />
                            </View>
                        </View> */}
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

    textshowsum: {
        backgroundColor: '#EBDEF0',
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderRadius: 6,
    },

    textbox: {
        width: 272,
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

    bordercost: {
        backgroundColor: '#FFFAFA',
        borderColor: '#633974',
        borderWidth: 2,
        borderRadius: 18,
        padding: 8
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