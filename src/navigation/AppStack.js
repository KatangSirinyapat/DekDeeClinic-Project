import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from '../../component/menu';
import Register from '../../component/register';
import Register_users from '../../component/register_user';
import PatientProfile from '../../component/patientprofile';
import Meet from '../../component/meet';
import VisitRecord from '../../component/visitrecord';
import Report from '../../component/reportmenu';
import Meetingmenu from '../../reportcomponent/meetingmenu';
import PatientMeet from '../../meetingcomponent/patientmeet';
import DocterMeet from '../../meetingcomponent/doctermeet';
import Visitrecordmenu from '../../reportcomponent/visitrecordmenu';
import DailyRecord from '../../visitrecordcomponent/dailyrecord';
import MonthlyRecord from '../../visitrecordcomponent/monthlyrecord';
import ManualRecord from '../../visitrecordcomponent/manualrecord';
import PatientDetails from '../../reportcomponent/patientdetails';
import AnnualReport from '../../reportcomponent/annualreport';
import Login from '../../component/login';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
            <Drawer.Screen name="Menu" component={Menu} />
            <Drawer.Screen name="ลงทะเบียนแพทย์" component={Register_users} />
            <Drawer.Screen name="ลงทะเบียนผู้ป่วยใหม่" component={Register} />
            <Drawer.Screen name="ข้อมูลผู้ป่วย" component={PatientProfile} />
            <Drawer.Screen name="ระบบนัดหมาย" component={Meet} />
            <Drawer.Screen name="บันทึกการให้บริการ" component={VisitRecord} />
            <Drawer.Screen name="รายงาน" component={Report} />
            <Drawer.Screen name="สรุปนัดหมาย" component={Meetingmenu} />
            <Drawer.Screen name="สรุปนัดหมายผู้ป่วย" component={PatientMeet} />
            <Drawer.Screen name="สรุปนัดหมายแพทย์" component={DocterMeet} />
            <Drawer.Screen name="สรุปการให้บริการ" component={Visitrecordmenu} />
            <Drawer.Screen name="การให้บริการรายวัน" component={DailyRecord} />
            <Drawer.Screen name="การให้บริการรายเดือน" component={MonthlyRecord} />
            <Drawer.Screen name="การให้บริการกำหนดเอง" component={ManualRecord} />
            <Drawer.Screen name="รายละเอียดผู้ป่วย" component={PatientDetails} />
            <Drawer.Screen name="สรุปรายปี" component={AnnualReport} />
            {/* <Drawer.Screen name="Login" component={Login} /> */}
        </Drawer.Navigator>
    );
}


export default AppStack;