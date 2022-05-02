import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, CheckBox, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import tw from "tailwind-react-native-classnames";
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import { Datepicker, Icon, Layout } from '@ui-kitten/components';

const URL_COST = `http://178.128.90.50:3333/costs`

export default function DailyRecord({ navigation }) {
    // const navigation = useNavigation()

    let tmpDate = " "

    let costOBJ = []

    //COSTS API
    const [costs, setCosts] = useState([])
    const [cost, setCost] = useState([])
    const [date, setDate] = useState("")
    const [cost_of_doctor, setCost_of_doctor] = useState(0)
    const [cost_of_medicine, setCost_of_medicine] = useState(0)
    const [cost_of_psychologist, setCost_of_psychologist] = useState(0)
    const [cost_of_practitioner, setCost_of_practitioner] = useState(0)
    const [cost_of_occupational_therapist, setCost_of_occupational_therapist] = useState(0)
    const [cost_of_teacher, setCost_of_teacher] = useState(0)
    const [bank_transfer, setBank_transfer] = useState(0)
    const [cash, setCash] = useState(0)
    const [total, setTotal] = useState(0)




    useEffect(() => {
        getCost()
    }, [])


    const findCost = async () => {

        let tmp = 0

        await costs.map((item, index) => {

            console.log("Test:" + date);
            let input_date = moment(date).format('YYYY/MM/DD');
            let database_date = moment(item.date).format('YYYY/MM/DD');
            if (database_date === input_date) {

                setCost(item)
                console.log("T" + index);
                costOBJ.push(item)

                // tmp = item.date
                // console.log(tmp.substring(0,7));

            }
            else {

                console.log("F" + index);
                console.log("F: " + item.date);
                console.log(date);
            }

        })
        // console.log(cost.id);
        calculate_cost()

    }

    const calculate_cost = () => {
        // console.log(costOBJ);
        let tmp_cost_of_doctor = 0
        let tmp_cost_of_medicine = 0
        let tmp_cost_of_psychologist = 0
        let tmp_cost_of_practitioner = 0
        let tmp_cost_of_occupational_therapist = 0
        let tmp_cost_of_teacher = 0
        let tmp_bank_transfer = 0
        let tmp_cash = 0
        let tmp_total = 0
        costOBJ.map((item, index) => {

            tmp_cost_of_doctor += item.cost_of_doctor
            tmp_cost_of_medicine += item.cost_of_medicine
            tmp_cost_of_psychologist += item.cost_of_psychologist
            tmp_cost_of_practitioner += item.cost_of_practitioner
            tmp_cost_of_occupational_therapist += item.cost_of_occupational_therapist
            tmp_cost_of_teacher += item.cost_of_teacher
            tmp_bank_transfer += item.bank_transfer
            tmp_cash += item.cash
            tmp_total += item.total

            // console.log(tmp_cost_of_doctor);



        })
        setCost_of_doctor(tmp_cost_of_doctor)
        setCost_of_medicine(tmp_cost_of_medicine)
        setCost_of_psychologist(tmp_cost_of_psychologist)
        setCost_of_practitioner(tmp_cost_of_practitioner)
        setCost_of_occupational_therapist(tmp_cost_of_occupational_therapist)
        setCost_of_teacher(tmp_cost_of_teacher)
        setBank_transfer(tmp_bank_transfer)
        setCash(tmp_cash)
        setTotal(tmp_total)
        console.log(tmp_total);
    }

    const getCost = async () => {
        await axios.get(`${URL_COST}`)
            .then(function (response) {

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)


                setCosts(objJson)
            })
            .catch(function (error) {
                // alert(error.message);
            })

    }

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar' />
    );

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




    return (
        <View style={tw`flex h-full items-center`}>

            <View style={[tw`flex w-full justify-center items-center`, styles.containertop]}>
                <View style={[tw`w-full`, styles.top]}>
                    <Text style={[tw`font-bold`, styles.title]}>สรุปการให้บริการรายวัน</Text>
                </View>
            </View>

            <View style={[tw`flex flex-row flex-wrap w-4/5`, styles.menu]}>
                <KeyboardAwareScrollView style={tw``}>
                    <View style={[tw`flex flex-col items-center p-4`, styles.content]}>
                        <View style={tw`flex flex-row w-4/5 items-center justify-center mt-10 pr-10`}>
                            <View style={tw`flex flex-row items-center w-3/5 pr-20`}>
                                <Text style={[tw`font-semibold text-lg`, styles.font]}>วันที่ที่ต้องการทราบค่าบริการ</Text>


                                <Datepicker
                                    
                                    min={getMinStartDate()}
                                    max={getMaxEndDate()}
                                    placeholder={moment(Date()).format('DD/MM/YYYY')}
                                    date={date}
                                    onSelect={nextDate => setDate(nextDate)}
                                    accessoryRight={CalendarIcon}
                                    style={styles.textboxDate}

                                />
                            </View>
                            <View style={styles.button}>
                                <Button
                                    color="#4A235A"
                                    title="ค้นหา"
                                    onPress={findCost}
                                />
                            </View>
                        </View>
                        <View style={[tw`flex justify-center w-full mt-8 p-4 mr-6`, styles.bordercost]}>
                            <View style={tw`flex flex-row`}>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของแพทย์</Text>
                                </View>
                                <View style={tw`flex flex-row items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{cost_of_doctor}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่ายา</Text>
                                </View>
                                <View style={tw`flex flex-row  items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{cost_of_medicine}</Text>
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
                                        <Text style={tw`h-8 pt-2`}>{cost_of_psychologist}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของนักฝึกพูด</Text>
                                </View>
                                <View style={tw`flex flex-row  items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{cost_of_practitioner}</Text>
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
                                        <Text style={tw`h-8 pt-2`}>{cost_of_occupational_therapist}</Text>
                                    </View>
                                    <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                </View>
                                <View style={tw`flex flex-row justify-start items-center w-1/4`}>
                                    <Text style={[tw`font-semibold text-base`, styles.font]}>ค่าบริการของครูการศึกษาพิเศษ</Text>
                                </View>
                                <View style={tw`flex flex-row  items-center w-1/3`}>
                                    <View style={[tw`flex items-center w-1/3`, styles.textshow]}>
                                        <Text style={tw`h-8 pt-2`}>{cost_of_teacher}</Text>
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
                                            {total}
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
                                            <Text style={tw`h-8 pt-2`}>{bank_transfer}</Text>
                                        </View>
                                        <Text style={[tw`font-semibold text-base pl-2`, styles.font]}>บาท</Text>
                                    </View>
                                </View>

                                <View style={[tw`flex flex-row justify-center items-center w-2/5 pr-10`, styles.bordercost]}>
                                    <Image source={require("../Icon/Record/icons8-money-30.png")} />
                                    <Text style={[tw`font-semibold text-base pl-1`, styles.font]}>เงินสด</Text>
                                    <View style={tw`flex flex-row items-center w-1/3 ml-4`}>
                                        <View style={[tw`flex items-center w-full`, styles.textshow]}>
                                            <Text style={tw`h-8 pt-2`}>{cash}</Text>
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

    textboxDate: {
        paddingLeft: 10,
        width: 170,
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

    Container_bordercost: {
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