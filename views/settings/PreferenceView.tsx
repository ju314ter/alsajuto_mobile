import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { SegmentedControls } from 'react-native-radio-buttons'
import { ScrollView } from 'react-native-gesture-handler'

const PreferenceView = (props) => {
  const [sexuality, setSexuality] = useState('Hetero')
  const [prefAgeMin, setPrefAgeMin] = useState(25)
  const [prefAgeMax, setPrefAgeMax] = useState(35)

  const optionsSexuality = [
    'Hetero',
    'Homo',
    'Genderfluid'
  ]

  function setSelectedOptionsSexuality (selectedOption) {
    setSexuality(selectedOption)
  }

  const submit = (form) => {
    console.log(form)
  }

  return (
    <>
      <View style={styles.MainView}>
        <ScrollView>
          <Text style={styles.Title}>Préférence</Text>
          <Text style={styles.label}>Sexuality :</Text>
          <SegmentedControls
            options={optionsSexuality}
            onSelection={(selectedOptions) => { setSelectedOptionsSexuality(selectedOptions) }}
            selectedOption={sexuality}
          />
          {/* On a pas prévu de faire comme tinder avec la prise en compte de la distance ? */}
          {/* <Text style={styles.label}>Position range</Text>
        <Slider value={positionRange} onValueChange={value => setPositionRange(value)} /> */}

          <Button
            title='Modififer' containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
            buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit('preferencesSettings') }}
          />
        </ScrollView>
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
  scrollView: {
    padding: '5%'
  },
  label: {
    color: 'black',
    margin: '5%'
  },
  Title: {
    margin: '8%',
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default PreferenceView
