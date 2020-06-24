import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import QuizzDisplayer from '../../components/quizzDisplayer';
import axios from 'axios';
import * as constant from '../../Utils/constant';
import { getStorageData } from '../../services/provider';


export default function QuizzView(props) {
    const [isLoading, setLoading] = useState(false);
    const { navigation } = props;

    useEffect(() => {
        const matchId = navigation.getParam('matchId');
        const status = navigation.getParam('gameStatus');
        const userOne = navigation.getParam('userOne', 'NO-ID');
        const userTwo = navigation.getParam('userTwo', 'NO-ID');

        (async function setQuizz() {
            setLoading(true);

            const storedData = await getStorageData()
            let userId;
            let myId;
            storedData.user.id === userOne ? userId = userTwo : userId = userOne
            storedData.user.id !== userOne ? myId = userTwo : myId = userOne

            if (status == '0') {
                console.log('creating a game')
                const res = await axios.post(constant.GAMES, { creatorId: myId, challengedId: userId })
                // await axios.patch(constant.MATCHS, + '/' + matchId, { data: { gameId: res.data.id } })
            } else {
                console.log('retrieving the game')
            }

            console.log('matchID : ', matchId)
            await axios.get(constant.GAMES + '/' + matchId)
            setLoading(false);
        })();
    }, [])
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#D42D4E', '#B11231', '#8D011D']}>
                {
                    isLoading ? (<ActivityIndicator />) : (
                        <React.Fragment>
                            <QuizzDisplayer></QuizzDisplayer>
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
        width: '100%',
        height: '100%'
    }
})