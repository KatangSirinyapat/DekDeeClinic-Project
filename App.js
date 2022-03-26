import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from './component/login';
import Menu from './component/menu';
import Register from './component/register';
import PatientProfile from './component/patientprofile';
import Meet from './component/meet';
import VisitRecord from './component/visitrecord';
import Report from './component/reportmenu'
import Setting from './component/setting'
import Meetingmenu from './reportcomponent/meetingmenu';
import Visitrecordmenu from './reportcomponent/visitrecordmenu';
import PatientDetails from './reportcomponent/patientdetails';
import AnnualReport from './reportcomponent/annualreport';
import DailyRecord from './visitrecordcomponent/dailyrecord';
import MonthlyRecord from './visitrecordcomponent/monthlyrecord';
import ManualRecord from './visitrecordcomponent/manualrecord';
import PatientMeet from './meetingcomponent/patientmeet';
import PsychologistMeet from './meetingcomponent/psychologistmeet'
import DocterMeet from './meetingcomponent/doctermeet'
import OccupationaltherapistMeet from './meetingcomponent/occupationaltherapistmeet'
import PractitionerMeet from './meetingcomponent/practitionermeet'
import TeacherMeet from './meetingcomponent/teachermeet'
import Register_users from './component/register_user';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './src/navigation/AppStack';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const HomeScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text category='h1'>HOME</Text> */}

    </Layout>
  );

  return (


    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer >
        <AppStack />
      </NavigationContainer>


    </ApplicationProvider>




  );
}



/*

<Drawer.Navigator screenOptions={{
  drawerStyle: {
    backgroundColor: '#c6cbef',
    width: 240,
    headerTintColor: 'red',
    headerStyle: { backgroundColor: 'tomato' },

  },
}} initialRouteName="Home" >


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
  <Drawer.Screen name="Login" component={Login} />



</Drawer.Navigator>

*/