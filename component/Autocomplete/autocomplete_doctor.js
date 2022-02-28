import React, { useState, useEffect } from "react";

import tw from "tailwind-react-native-classnames";
import axios from "axios";

import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components';

import { TouchableWithoutFeedback } from 'react-native';
import AwesomeDebouncePromise from 'awesome-debounce-promise';


const URL_DOCTOR = `http://178.128.90.50:3333/users`

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);


export default function Autocomplete_doctor(props) {


    //DOCTOR
    const [doctors, setDoctors] = useState([])
    const [doctor, setDoctor] = useState([])
    const [idDoctor, setIdDoctor] = useState()
    const [fnameDoctor, setFnameDoctor] = useState("")
    const [lnameDoctor, setLnameDoctor] = useState("")

    //Doctors Autocomplete

    const requestData = () => fetch(URL_DOCTOR);
    const requestDataWithDebounce = AwesomeDebouncePromise(requestData, 400);

    const [query, setQuery] = React.useState(null);
    const [data, setData] = React.useState([]);

    const getDoctors = async () => {
        await axios.get(`${URL_DOCTOR}`)
            .then(function (response) {
                // alert(JSON.stringify(response.data));

                let obj = JSON.stringify(response.data)
                let objJson = JSON.parse(obj)


                setDoctors(objJson)

            })
            .catch(function (error) {
                // alert(error.message);
            });

    };

    useEffect(() => {
        getDoctors()
    }, [])

    const updateData = () => {
        requestDataWithDebounce()
            .then(response => response.json())
            .then(json => json)
            .then(applyFilter)
            .then(setData);
    };

    React.useEffect(updateData, [query]);

    const onSelect = (index) => {
        setQuery(data[index].fname + " " + data[index].lname);
        setIdDoctor(data[index].doctor_id)
    };

    const onChangeText = (nextQuery) => {
        setQuery(nextQuery);
    };

    const applyFilter = (options) => {
        return options.filter(item => item.fname.toLowerCase().includes(query.toLowerCase()));
    };

    const clearInput = () => {
        setQuery('');
        setData(doctors);
    };

    const renderCloseIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearInput}>
            <Icon {...props} name='close' />
        </TouchableWithoutFeedback>
    );

    const renderOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.doctor_id + " " + item.fname + " " + item.lname}
            accessoryLeft={StarIcon}
        />
    );


    return (

        <Autocomplete
            placeholder='โปรดระบุชื่อแพทย์'
            value={query}
            onChangeText={onChangeText}
            accessoryRight={renderCloseIcon}
            onSelect={onSelect}>
            {data.map(renderOption)}
        </Autocomplete>
    )
}