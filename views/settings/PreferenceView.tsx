import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { SegmentedControls } from 'react-native-radio-buttons'
import { ScrollView } from 'react-native-gesture-handler'
import * as Helpers from '../../helpers'

const PreferenceView = (props) => {
  const [sexuality, setSexuality] = useState(null)
  const [prefAgeMin, setPrefAgeMin] = useState(null)
  const [prefAgeMax, setPrefAgeMax] = useState(null)

  const optionsSexuality = [
    'Heterosexual',
    'Homosexual',
    'Genderfluid'
  ]

  useEffect(() => {
    Helpers.getDataLocally('user').then(user => {
      user = JSON.parse(user)
      if (user.gender === user.sexualityPref && (user.gender === 'Male' || user.gender === 'Female')) {
        setSexuality('Homosexual')
      } else if (user.gender !== user.sexualityPref && (user.gender === 'Male' || user.gender === 'Female')) {
        setSexuality('Heterosexual')
      } else {
        setSexuality('Genderfluid')
      }
      // setUserAge(user.birthday)
    })
  })

  function setSelectedOptionsSexuality (selectedOption) {
    setSexuality(selectedOption)
  }

  const submit = (form) => {
    console.log(form)
  }

  return (
    <>
      <View style={styles.MainView}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.Title}>Préférence</Text>
          <Text style={styles.label}>Sexuality :</Text>
          <SegmentedControls
            options={optionsSexuality}
            onSelection={(selectedOptions) => { setSelectedOptionsSexuality(selectedOptions) }}
            selectedOption={sexuality}
          />
          {/* On a pas prévu de faire comme tinder avec la prise en compte de la distance ? */}
          {/* <Text style={styles.label}>Position range</Text> */}

          <View>
            .
          </View>
        </ScrollView>
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
    borderWidth: 5
  },
  scrollView: {
    width: '100%',
    padding: '5%'
  },
  rangeSlider: {
    flex: 1,
    flexDirection: 'row',
    margin: '3%'
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
