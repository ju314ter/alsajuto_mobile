import React, { useState, useEffect, useReducer } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Input, Slider } from 'react-native-elements'
import RangeSlider from 'rn-range-slider'
import { SegmentedControls } from 'react-native-radio-buttons'

const displayedParamsView = (props) => {
  const [age, setAge] = useState(27)
  const [size, setSize] = useState('178')
  const [description, setDescription] = useState('Lorem Ispum ... ici la description')

  const submit = (form) => {
    console.log(form)
  }

  return (
    <>
      <View style={styles.MainView}>
        {/* Title */}
        <Text style={styles.sectionTitle}>Displayed to others settings</Text>

        <Text style={styles.label}>Age</Text>
        <Slider value={age} onValueChange={value => setAge(value)} maximumValue={100} minimumValue={18} />
        <Text style={styles.label}>Taille</Text>
        <Input inputStyle={{ color: 'white' }} placeholder={(size ?? '000') + ' cm'} onChangeText={(value) => setSize(value)} />
        <Text style={styles.label}>Status (étudiant, développeur, fonctionnaire,...)</Text>
        <Text style={styles.label}>Description</Text>
        <TextInput multiline numberOfLines={4} onChangeText={(value) => setDescription(value)} value={description} />

        {/* Submit button */}
        <Button
          title='Modifier' containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
          buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit('displayedToOthersSettings') }}
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
  container: {
    backgroundColor: 'white',
    padding: 5,
    height: '100%',
    width: '100%'
  },
  label: {
    color: 'black',
    fontSize: 16
  },
  sectionTitle: {
    margin: 10,
    color: 'blue',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default displayedParamsView
