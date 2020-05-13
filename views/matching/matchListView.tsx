import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import * as Helpers from '../../helpers';


import Match from '../../components/Match';

export default function MatchListView({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const [matchList, setMatchList] = useState([]);

    useEffect(() => {
        Helpers.getDataLocally('token').then((token) => {
            // Fetch Match list here
            if (token) {
                // Helpers.requestService('GET', 'matchings').then((res) => {
                //     console.log(res)
                // })
            }
        })
    }, []);

    if (!isLoading) {
        return (
            <View style={styles.container}>
                <React.Fragment>
                    <Match navigation={navigation} name='Catherine'></Match>
                    <Match navigation={navigation} name='Jennyfer'></Match>
                </React.Fragment>
            </View>
        )
    } else {
        return <ActivityIndicator />
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    }
})