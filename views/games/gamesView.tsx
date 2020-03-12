import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function GamesView({ navigation }) {
    const [isLoading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            {
                isLoading ? (<ActivityIndicator />) : (
                    <React.Fragment>
                        <Text>Games Work !</Text>
                        <Button title="Get started" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                            buttonStyle={{ backgroundColor: '#8D011D' }}
                            onPress={() => navigation.navigate('Quizz')}
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
    }
})