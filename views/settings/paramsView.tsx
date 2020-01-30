import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Input, Slider } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import { SegmentedControls } from 'react-native-radio-buttons'


const paramsView = (props) => {
    const [pseudo, setPseudo] = useState("Jupi");
    const [gender, setGender] = useState("Homme");
    const [sexuality, setSexuality] = useState("Hetero");
    const [email, setEmail] = useState("jupi@gmail.com");
    const [avatarID, setavatarID] = useState(5);
    const [password, setPassword] = useState(true);

    const optionsGender = [
        "Homme",
        "Femme",
        "Non binaire",
    ];
    const optionsSexuality = [
        "Hetero",
        "Homo",
        "Genderfluid",
    ];

    function setSelectedOptionsGender(selectedOption) {
        setGender(selectedOption);
    }
    function setSelectedOptionsSexuality(selectedOption) {
        setSexuality(selectedOption);
    }

    const submit = (form) => {
        console.log(form)
    }

    return (
        <React.Fragment>
            <Text style={styles.sectionTitle}>Profile settings</Text>

            <Text style={styles.label}>Pseudo</Text>
            <Input inputStyle={{ color: 'black' }} value={pseudo} onChangeText={(value) => setPseudo(value)} />

            <Text style={styles.label}>Email</Text>
            <Input inputStyle={{ color: 'black' }} value={email} onChangeText={(value) => setEmail(value)} />

            <Text style={styles.label}>Gender : M/F/NB</Text>
            <SegmentedControls
                options={optionsSexuality}
                onSelection={(selectedOptions) => { setSelectedOptionsGender(selectedOptions) }}
                selectedOption={gender}
            />

            <Text style={styles.label}>Sexuality : M/F/NB</Text>
            <SegmentedControls
                options={optionsSexuality}
                onSelection={(selectedOptions) => { setSelectedOptionsSexuality(selectedOptions) }}
                selectedOption={sexuality}
            />

            <Text style={styles.label}>Avatar</Text>

            <Text style={styles.label}>Change password</Text>

            <Button title="Modifier" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit('profileSettings') }} />
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

export default paramsView;

