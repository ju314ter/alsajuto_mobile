import React, { Component } from 'react';
import * as Helpers from './helpers';


export default function logout({ navigation }) {
    Helpers.clearLocalData().then((res) => console.log(res.message))
    return navigation.navigate('SignIn')
}