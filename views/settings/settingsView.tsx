import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

export default function SettingsView(props) {
    const [isLoading, setLoading] = useState(false);

    const submit = (form) => {
        console.log(form)
    }

    return (
        <ScrollView style={styles.container}>
            {
                isLoading ? (<ActivityIndicator />) : (
                    <React.Fragment>
                        <Text style={styles.sectionTitle}>Displayed to others</Text>
                        <Button title='Profile settings' onPress={() => { props.navigation.navigate('Params') }} />
                        <Button title='Preferences settings' onPress={() => { props.navigation.navigate('Prefs') }} />
                        <Button title='Displayed informations settings' onPress={() => { props.navigation.navigate('DisplayedParams') }} />

                    </React.Fragment>
                )
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 5,
        height: '100%',
        width: '100%',
    },
    label: {
        color: 'lightgrey',
        fontSize: 16
    },
    sectionTitle: {
        margin: 10,
        color: 'blue',
        fontSize: 18
    }
})