import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button, Input, Slider } from 'react-native-elements'

import { SegmentedControls } from 'react-native-radio-buttons'

const prefsView = (props) => {
  const [prefSex, setPrefSex] = useState('Femme')
  const [prefGender, setPrefGender] = useState('Hetero')
  const [prefAgeMin, setPrefAgeMin] = useState(25)
  const [prefAgeMax, setPrefAgeMax] = useState(35)
  const [positionRange, setPositionRange] = useState(35)

  const optionsSexuality = [
    'Hetero',
    'Homo',
    'Genderfluid'
  ]

  function setSelectedOptionPrefSexuality (selectedOption) {
    setPrefSex(selectedOption)
  }

  const submit = (form) => {
    console.log(form)
  }

  return (
    <>
      <View style={styles.MainView}>
        <Text style={styles.sectionTitle}>Preferences settings</Text>
        <Text style={styles.label}>Sexuality : H/H/GF</Text>
        <SegmentedControls
          options={optionsSexuality} selectedOption={prefSex}
          onSelection={(selectedOptions) => { setSelectedOptionPrefSexuality(selectedOptions) }}
        />
        {/* On a pas prévu de faire comme tinder avec la prise en compte de la distance ? */}
        {/* <Text style={styles.label}>Position range</Text>
        <Slider value={positionRange} onValueChange={value => setPositionRange(value)} /> */}

        <Button
          title='Modififer' containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
          buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit('preferencesSettings') }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  MainView: {
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
    padding: '10%',
    borderWidth: 5
  },
  label: {
    color: 'black',
    fontSize: 16
  },
  sectionTitle: {
    margin: '8%',
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default prefsView
