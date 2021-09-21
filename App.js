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
import Report from './component/report'
import Setting from './component/setting'


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
        
        <Drawer.Screen name="Menu" component={Menu} />
        <Drawer.Screen name="ลงทะเบียนผู้ป่วยใหม่" component={Register} />
        <Drawer.Screen name="ข้อมูลผู้ป่วย" component={PatientProfile} />
        <Drawer.Screen name="ระบบนัดหมาย" component={Meet} />
        <Drawer.Screen name="บันทึกการให้บริการ" component={VisitRecord} />
        <Drawer.Screen name="รายงาน" component={Report} />
        <Drawer.Screen name="ตั้งค่าระบบ" component={Setting} />
        <Drawer.Screen name="Login" component={Login} />
       
     
      </Drawer.Navigator>
    </NavigationContainer>
  );
}