import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { profiles } from '../../App'


export default function SettingsView(props) {
    const [isLoading, setLoading] = useState(false);
    const [name, setUserName] = useState(profiles[1].name);
    const [age, setUserAge] = useState(profiles[1].age);

    const submit = (form) => {
        console.log(form)
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D42D4E', '#B11231', '#8D011D']}>
                {
                    isLoading ? (<ActivityIndicator />) : (
                        <React.Fragment>
                            <View style={{ height: '70%', backgroundColor: '#eee', marginLeft: '10%', marginRight: '10%', marginTop: 10, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', overflow: 'hidden' }}>
                                    <Image style={styles.image} source={profiles[1].profile} />
                                </View>
                                <View>
                                    <Text style={styles.sectionTitle}>{name}, {age}</Text>
                                </View>
                            </View>
                            <View style={{ height: '30%', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <View style={{ overflow: 'visible' }}>
                                    <View style={[styles.button, styles.buttonOverlay]}>
                                    </View>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Params') }}>
                                        <View style={styles.button}>
                                            <Text>I-Pa</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ overflow: 'visible', top: 70 }}>
                                    <View style={[styles.button, styles.buttonOverlay]}>
                                    </View>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Prefs') }}>
                                        <View style={styles.button}>
                                            <Text>I-Pr</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ overflow: 'visible' }}>
                                    <View style={[styles.button, styles.buttonOverlay]}>
                                    </View>
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('DisplayedParams') }}>
                                        <View style={styles.button}>
                                            <Text>I-DI</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </React.Fragment>
                    )
                }
            </LinearGradient>
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
    image: {
        ...StyleSheet.absoluteFillObject,
        width: undefined,
        height: undefined,
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