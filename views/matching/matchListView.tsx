import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Match from '../../components/Match';

export default function MatchListView({ navigation }) {
    const [isLoading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            {
                isLoading ? (<ActivityIndicator />) : (
                    <React.Fragment>
                        {/* <Match navigation={navigation} proposal='julien' proposalId={1}></Match>
                        <Match navigation={navigation} proposal='alan' proposalId={2}></Match> */}
                        <Match navigation={navigation} name='Catherine'></Match>
                        <Match navigation={navigation} name='Jennyfer'></Match>
                    </React.Fragment>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%'
    }
})