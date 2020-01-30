import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Input, Slider } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import { SegmentedControls } from 'react-native-radio-buttons'

const displayedParamsView = (props) => {
    const [cardNumber, setCardNumber] = useState(1);
    const [cardColor, setCardColor] = useState('spade');
    const [age, setAge] = useState(27);
    const [size, setSize] = useState('178');
    const [description, setDescription] = useState('cc c chien');

    const submit = (form) => {
        console.log(form)
    }

    return (
        <React.Fragment>
            <Text style={styles.sectionTitle}>Displayed to others settings</Text>

            <Text style={styles.label}>Bordure de cadre</Text>

            <Text style={styles.label}>Age</Text>
            <Slider
                value={age}
                onValueChange={value => setAge(value)}
            />

            <Text style={styles.label}>Taille</Text>
            <Input inputStyle={{ color: 'white' }} placeholder={size} onChangeText={(value) => setSize(value)} />

            <Text style={styles.label}>Status (étudiant, développeur, fonctionnaire,...)</Text>

            <Text style={styles.label}>Description</Text>
            <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={(value) => setDescription(value)}
                value={description} />
            <Button
                title="Modifier" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit('displayedToOthersSettings') }} />
        </React.Fragment>
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

export default displayedParamsView;