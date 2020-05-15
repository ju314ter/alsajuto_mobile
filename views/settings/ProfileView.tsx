import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { SegmentedControls } from 'react-native-radio-buttons'
import { ScrollView } from 'react-native-gesture-handler'
import * as Helpers from '../../helpers'

const ProfileView = (props) => {
  const [pseudo, setPseudo] = useState(null)
  const [gender, setGender] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(true)
  const [age, setAge] = useState(null)
  const [size, setSize] = useState(null)
  const [description, setDescription] = useState(null)
  const [avatarID, setavatarID] = useState(5)

  const getAge = function (birthDate) {
    return Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
  }

  const optionsGender = [
    'Homme',
    'Femme',
    'Non binaire'
  ]

  function setSelectedOptionsGender (selectedOption) {
    setGender(selectedOption)
  }

  useEffect(() => {
    Helpers.getDataLocally('user').then(user => {
      user = JSON.parse(user)
      setPseudo(user.username)
      switch (user.gender) {
        case 'Male':
          setGender('Homme')
          break
        case 'Female':
          setGender('Femme')
          break
        default :
          setGender('Non binaire')
          break
      }
      setEmail(user.email)
      setAge(getAge(user.birthdayDate))
      setSize(user.heightInCentimeter)
      setDescription(user.description)
    })
  })

  // check how to use it.
  function checkPassword (value, checkValue) {
    if (value.length >= 8 && checkValue === value) {
      setPassword(value)
    } else {
      switch (true) {
        case value.length < 8:
          alert('Oops Something went wrong.\nIncrease the size of your password')
          break
        case checkValue !== value:
          alert('Oops Something went wrong password ain\'t the same')
          break
        default :
          alert('Oops Something went wrong')
          break
      }
    }
  }

  const submit = (form) => {
    console.log(form)
  }

  return (
    <>
      <View style={styles.MainView}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.Title}>Profile</Text>

          {/* Username */}
          <Input
            inputStyle={{ color: 'black' }} placeholder={'Username : ' + pseudo} placeholderTextColor='black'
            onChangeText={(value) => setPseudo(value)}
          />

          {/* Email */}
          <Input
            inputStyle={{ color: 'black' }} placeholder={'E-mail : ' + email} placeholderTextColor='black'
            onChangeText={(value) => setEmail(value)}
          />

          {/* Password */}
          <Input
            inputStyle={{ color: 'black' }} placeholder='New password' placeholderTextColor='black' secureTextEntry
            onChangeText={(value) => setPassword(value)}
          />

          {/* confirmPassword */}
          <Input
            inputStyle={{ color: 'black' }} placeholder='Confirm password' placeholderTextColor='black' secureTextEntry
            onChangeText={(value) => setEmail(value)}
          />

          {/* AGE */}
          <Input
            inputStyle={{ color: 'black' }} placeholder={'Age : ' + (age ?? '00')} placeholderTextColor='black' keyboardType='numeric'
            onChangeText={(value) => setAge(value)}
          />

          {/* Taile */}
          <Input
            inputStyle={{ color: 'black' }} placeholder={'Taille : ' + (size ?? '000') + ' cm'} placeholderTextColor='black' keyboardType='numeric'
            onChangeText={(value) => setSize(value)}
          />

          <Text style={styles.label}>Gender :</Text>
          <SegmentedControls
            options={optionsGender}
            onSelection={(selectedOptions) => { setSelectedOptionsGender(selectedOptions) }}
            selectedOption={gender}
          />

          <TextInput
            multiline numberOfLines={4} onChangeText={(value) => setDescription(value)} value={description}
            style={styles.TextArea}
          />

        </ScrollView>

        <Button
          title='Modifier' containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
          buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit('profileSettings') }}
        />
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
  },
  TextArea: {
    backgroundColor: 'lightgrey',
    margin: '5%'
  }
})

export default ProfileView
