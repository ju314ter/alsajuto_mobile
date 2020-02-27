import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Input, Slider } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import { SegmentedControls } from 'react-native-radio-buttons'

const prefsView = (props) => {
    const [prefSex, setPrefSex] = useState("Femme");
    const [prefGender, setPrefGender] = useState("Hetero");
    const [prefAgeMin, setPrefAgeMin] = useState(25);
    const [prefAgeMax, setPrefAgeMax] = useState(35);
    const [positionRange, setPositionRange] = useState(35);

    const optionsSexuality = [
        "Hetero",
        "Homo",
        "Genderfluid",
    ];

    function setSelectedOptionPrefSexuality(selectedOption) {
        setPrefSex(selectedOption);
    }

    const submit = (form) => {
        console.log(form)
    }

    return (
        <React.Fragment>
            <Text style={styles.sectionTitle}>Preferences settings</Text>

            <Text style={styles.label}>Sexuality : H/H/GF</Text>
            <SegmentedControls
                options={optionsSexuality}
                onSelection={(selectedOptions) => { setSelectedOptionPrefSexuality(selectedOptions) }}
                selectedOption={prefSex}
            />

            {/* <Text style={styles.label}>Age range</Text>
                        <RangeSlider
                            style={{ width: 160, height: 80 }}
                            gravity={'center'}
                            min={18}
                            max={98}
                            step={1}
                            selectionColor="#3df"
                            blankColor="#f618"
                            onValueChanged={(low, high, fromUser) => {
                                this.setPrefAgeMin(low)
                                this.setPrefAgeMax(high)
                            }} /> */}

            <Text style={styles.label}>Position range</Text>
            <Slider
                value={positionRange}
                onValueChange={value => setPositionRange(value)}
            />

            <Button title="Modifier" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit('preferencesSettings') }} />
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

export default prefsView;