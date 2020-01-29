import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Input, Slider } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import { SegmentedControls } from 'react-native-radio-buttons'


export default function SettingsView() {
    const [isLoading, setLoading] = useState(false);

    const [pseudo, setPseudo] = useState("Jupi");
    const [gender, setGender] = useState("Homme");
    const [sexuality, setSexuality] = useState("Hetero");
    const [email, setEmail] = useState("jupi@gmail.com");
    const [avatarID, setavatarID] = useState(5);
    const [password, setPassword] = useState(true);

    const [prefSex, setPrefSex] = useState("Femme");
    const [prefGender, setPrefGender] = useState("Hetero");
    const [prefAgeMin, setPrefAgeMin] = useState(25);
    const [prefAgeMax, setPrefAgeMax] = useState(35);
    const [positionRange, setPositionRange] = useState(35);

    const [age, setAge] = useState(27);
    const [size, setSize] = useState('178');
    const [description, setDescription] = useState('cc c chien');

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
    function setSelectedOptionPrefGender(selectedOption) {
        setPrefGender(selectedOption);
    }
    function setSelectedOptionPrefSexuality(selectedOption) {
        setPrefSex(selectedOption);
    }

    const submit = (form) => {
        console.log(form)
    }

    return (
        <ScrollView style={styles.container}>
            {
                isLoading ? (<ActivityIndicator />) : (
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


                        <Text style={styles.sectionTitle}>Preferences settings</Text>

                        <Text style={styles.label}>Prefered gender : M/F/NB</Text>
                        <SegmentedControls
                            options={optionsGender}
                            onSelection={(selectedOptions) => { setSelectedOptionPrefGender(selectedOptions) }}
                            selectedOption={prefGender}
                        />

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