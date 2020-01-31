import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function SettingsView(props) {
    const [isLoading, setLoading] = useState(false);

    const submit = (form) => {
        console.log(form)
    }

    return (
        <View style={styles.container}>
            {
                isLoading ? (<ActivityIndicator />) : (
                    <React.Fragment>
                        <View style={{ height: '70%', backgroundColor: '#eee', marginLeft: '10%', marginRight: '10%', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                                <Text>Username Image</Text>
                            </View>
                            <View>
                                <Text style={styles.sectionTitle}>UserName, Age</Text>
                                <Text style={styles.sectionTitle}>Current status</Text>
                            </View>
                        </View>
                        <View style={{ height: '30%', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity style={{ height: '100%' }} onPress={() => { props.navigation.navigate('Params') }}>
                                <View style={{ overflow: 'visible' }}>
                                    <View style={[styles.button, styles.buttonOverlay]}>
                                    </View>
                                    <View style={styles.button}>
                                        <Text>I-Pa</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: '100%' }} onPress={() => { props.navigation.navigate('Prefs') }}>
                                <View style={{ overflow: 'visible', top: 70 }}>
                                    <View style={[styles.button, styles.buttonOverlay]}>
                                    </View>
                                    <View style={styles.button}>
                                        <Text>I-Pr</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: '100%' }} onPress={() => { props.navigation.navigate('DisplayedParams') }}>
                                <View style={{ overflow: 'visible' }}>
                                    <View style={[styles.button, styles.buttonOverlay]}>
                                    </View>
                                    <View style={styles.button}>
                                        <Text>I-DI</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </React.Fragment>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
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
    },
    button: {
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 40,
        padding: 5,
        width: 80,
        height: 80,
    },
    buttonOverlay: {
        backgroundColor: '#e3e3e3',
        position: 'absolute',
        top: 2
    }
})