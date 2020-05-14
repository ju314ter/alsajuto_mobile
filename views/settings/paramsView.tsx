import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { SegmentedControls } from 'react-native-radio-buttons'
import { ScrollView } from 'react-native-gesture-handler'

const paramsView = (props) => {
  const [pseudo, setPseudo] = useState('Jupi')
  const [gender, setGender] = useState('Homme')
  const [sexuality, setSexuality] = useState('Hetero')
  const [email, setEmail] = useState('jupi@gmail.com')
  const [avatarID, setavatarID] = useState(5)
  const [password, setPassword] = useState(true)

  const optionsGender = [
    'Homme',
    'Femme',
    'Non binaire'
  ]
  const optionsSexuality = [
    'Hetero',
    'Homo',
    'Genderfluid'
  ]

  function setSelectedOptionsGender (selectedOption) {
    setGender(selectedOption)
  }
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
          <Text style={styles.Title}>Profile</Text>

          <Input
            inputStyle={{ color: 'black' }} placeholder={'Username : ' + pseudo} placeholderTextColor='black'
            onChangeText={(value) => setPseudo(value)}
          />
          <Input
            inputStyle={{ color: 'black' }} placeholder={'E-mail : ' + email} placeholderTextColor='black'
            onChangeText={(value) => setEmail(value)}
          />
          <Input
            inputStyle={{ color: 'black' }} placeholder='New password' placeholderTextColor='black' secureTextEntry
          // onChangeText={(value) => setPassword(value)}
          />
          <Input
            inputStyle={{ color: 'black' }} placeholder='Confirm password' placeholderTextColor='black' secureTextEntry
          // onChangeText={(value) => setEmail(value)}
          />

          <Text style={styles.label}>Gender :</Text>
          <SegmentedControls
            options={optionsGender}
            onSelection={(selectedOptions) => { setSelectedOptionsGender(selectedOptions) }}
            selectedOption={gender}
          />

          <Text style={styles.label}>Sexuality :</Text>
          <SegmentedControls
            options={optionsSexuality}
            onSelection={(selectedOptions) => { setSelectedOptionsSexuality(selectedOptions) }}
            selectedOption={sexuality}
          />

          <Text style={styles.label}>Avatar</Text>

          <Button
            title='Modifier' containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
            buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit('profileSettings') }}
          />
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  MainView: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: '10%',
    borderWidth: 3
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

export default paramsView
