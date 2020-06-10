import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function GamesView({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    const matchId = navigation.getParam('matchId');
    const status = navigation.getParam('gameStatus');
    const userOne = navigation.getParam('userOne', 'NO-ID');
    const userTwo = navigation.getParam('userTwo', 'NO-ID');

    return (
        <View style={styles.container}>
            {
                isLoading ? (<ActivityIndicator />) : (
                    <React.Fragment>
                        <Text style={styles.gameTitle}>Let's quizz !</Text>
                        <Button title="Get started" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                            buttonStyle={{ backgroundColor: '#8D011D' }}
                            onPress={() => {
                                navigation.navigate('Quizz', {
                                    matchId: `${matchId}`,
                                    gameStatus: `${status}`,
                                    userOne: userOne,
                                    userTwo: userTwo,
                                })
                            }}
                        />
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
    },
    gameTitle: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10
    }
})