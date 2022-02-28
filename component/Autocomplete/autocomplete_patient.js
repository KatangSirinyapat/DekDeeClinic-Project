import React, { useState, useEffect } from "react";

import tw from "tailwind-react-native-classnames";
import axios from "axios";

import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const URL_PATIENT = `http://178.128.90.50:3333/patients`

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);


export default function Autocomplete_patient(props) {

      //PATIENT
      const [patients, setPatients] = useState([])
      const [patient, setPatient] = useState([])
      const [idPatient, setIdPatient] = useState()
  
      const [fname_patient, setFname_patient] = useState("")
      const [lname_patient, setLname_patient] = useState("")
      const [age_patient, setAge_patient] = useState("")


    //Patient Autocomplete

    const requestData_patient = () => fetch(URL_PATIENT);
    const requestDataWithDebounce_patient = AwesomeDebouncePromise(requestData_patient, 400);

    const [query_patient, setQuery_patient] = React.useState(null);
    const [data_patient, setData_patient] = React.useState([]);

    
    useEffect(() => {
        getPatient()
    }, [])



    const getPatient = async () => {
        await axios.get(`${URL_PATIENT}`)
            .then(function (response) {

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)



                setPatients(objJson)

                // alert(patients[0].clinic_number)
            })
            .catch(function (error) {
                // alert(error.message);
            })

    }

    const updateData_patient = () => {
        requestDataWithDebounce_patient()
            .then(response => response.json())
            .then(json => json)
            .then(applyFilter_patient)
            .then(setData_patient);
    };

    React.useEffect(updateData_patient, [query_patient]);

    const onSelect_patient = (index) => {
        setQuery_patient(data_patient[index].fname + " " + data_patient[index].lname);
        setIdPatient(data_patient[index].clinic_number)
        setFname_patient(data_patient[index].fname)
        setLname_patient(data_patient[index].lname)
        setAge_patient(data_patient[index].age)

    };

    const onChangeText_patient = (nextQuery) => {
        setQuery_patient(nextQuery);
    };

    const applyFilter_patient = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query_patient.toLowerCase()));
    };

    const clearInput_patient = () => {
        setQuery_patient('');
        setData_patient(patients);
    };

    const renderCloseIcon_patient = (props) => (
        <TouchableWithoutFeedback onPress={clearInput_patient}>
            <Icon {...props} name='close' />
        </TouchableWithoutFeedback>
    );

    const renderOption_patient = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.clinic_number + " " + item.fname + " " + item.lname}
            accessoryLeft={StarIcon}
        />
    );



    return (

        <Autocomplete
            placeholder='โปรดระบุชื่อผู้ป่วย'
            value={query_patient}
            onChangeText={onChangeText_patient}
            accessoryRight={renderCloseIcon_patient}
            onSelect={onSelect_patient}>
            {data_patient.map(renderOption_patient)}
        </Autocomplete>
    )
}