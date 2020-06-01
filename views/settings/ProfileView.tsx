import React, { useState, useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Input } from 'react-native-elements'
import { SegmentedControls } from 'react-native-radio-buttons'
import { ScrollView } from 'react-native-gesture-handler'
import * as Layout from '../../Utils/Layout'
import reducer, { TEXT_CHANGE, LIST_CHANGE } from '../../components/reducer'
import * as Helpers from '../../helpers'
import * as constant from '../../Utils/constant'
import { patch } from '../../services/User'

const ProfileView = (props) => {
  // const [pseudo, setPseudo] = useState(null)
  // const [gender, setGender] = useState(null)
  // const [email, setEmail] = useState(null)
  // const [password, setPassword] = useState(null)
  // const [age, setAge] = useState(null)
  // const [size, setSize] = useState(null)
  // const [description, setDescription] = useState(null)
  // const [avatarID, setavatarID] = useState(5)
  const [error, setError] = useState(null);
  const [userSaved, setUserSaved] = useState(props.navigation.state.params.user)
  const [tokenSaved, setTokenSaved] = useState(null)
  const [haveChange, setHaveChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const fields = [
    { name: 'username', label: 'Username', placeholder: userSaved.username, value: userSaved.username, required: false, type: 'textFied' },
    { name: 'firstName', label: 'Prénom', placeholder: userSaved.firstName, value: userSaved.firstName, required: false, type: 'textFied' },
    { name: 'lastName', label: 'Nom', placeholder: userSaved.lastName, value: userSaved.lastName, required: false, type: 'textFied' },
    { name: 'Gender', label: 'Genre', placeholder: userSaved.gender, value: userSaved.gender, required: false, type: 'selector', options: ['Homme', 'Femme', 'Non binaire'] },
    { name: 'sexualityPref', label: 'Orientation sexuelle', placeholder: userSaved.sexualityPref, value: userSaved.sexualityPref, required: false, type: 'selector', options: ['Hétérosexuel', 'Homosexuel', 'Non Binaire'] },
    { name: 'email', label: 'Email', placeholder: userSaved.email, value: userSaved.email, required: false, type: 'email' },
    { name: 'password', label: 'Password', placeholder: '', value: '', required: false, type: 'password' },
    { name: 'description', label: 'Description', placeholder: userSaved.description, value: userSaved.description, required: false, type: 'textArea' },
    { name: 'heightInCentimeter', label: 'Taille', placeholder: userSaved.heightInCentimeter, value: userSaved.heightInCentimeter, required: false, type: 'number' },
    { name: 'avatar', label: 'ProfilePicture', placeholder: userSaved.avatar, value: userSaved.avatar, required: false, type: 'avatar' }
  ]

  const [stateEncaiss, dispatch] = useReducer(reducer, fields);

  const changeText = (name, text) => {
    if (!haveChange) setHaveChange(true)
    dispatch({ type: TEXT_CHANGE, name, text })
  }

  const changeNumber = (name, value) => {
    if (!haveChange) setHaveChange(true)
    dispatch({ type: LIST_CHANGE, name, value })
  }

  const getAge = function (birthDate) {
    const date: any = new Date()
    return Math.floor((date - new Date(birthDate).getTime()) / 3.15576e+10)
  }

  function setSelectedOptionsGender(selectedOption) {
    console.log(selectedOption)
  }

  useEffect(() => {
    Helpers.getDataLocally('user').then(user => {
      user = JSON.parse(user)
    })
    Helpers.getDataLocally('token').then(token => {
      setTokenSaved(token)
    })
  }, [])

  const onSubmit = async () => {
    setLoading(true)
    try {
      let data = {};
      for (var i = 0; i < stateEncaiss.length; i++) {
        data[stateEncaiss[i].name] = stateEncaiss[i].value;
      }
      const response = await patch(userSaved.id, data, tokenSaved)
      setLoading(false)
      console.log(response)
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {
            stateEncaiss.map((field, key) => {
              switch (field.type) {
                case 'textFied':
                  return (
                    <PaperTextInput
                      key={key}
                      mode={"outlined"}
                      label={field.label}
                      placeholder={field.placeholder}
                      secureTextEntry={field.secure}
                      value={field.value}
                      onChangeText={(text) => changeText(field.name, text)}
                      // required={field.required}
                      style={{ backgroundColor: "#fff", marginTop: 10 }}
                    />
                  )
                case 'textArea':
                  return (
                    <PaperTextInput
                      key={key}
                      mode={"outlined"}
                      label={field.label}
                      placeholder={field.placeholder ?? field.label}
                      secureTextEntry={field.secure}
                      value={field.value}
                      onChangeText={(text) => changeText(field.name, text)}
                      // required={field.required}
                      style={{ backgroundColor: "#fff", marginTop: 10 }}
                    />
                  )
                case 'number':
                  return (
                    <PaperTextInput
                      key={key}
                      mode={"outlined"}
                      label={field.label}
                      placeholder={field.placeholder ?? field.label}
                      secureTextEntry={field.secure}
                      value={field.value}
                      onChangeText={(text) => changeNumber(field.name, text)}
                      // required={field.required}
                      style={{ backgroundColor: "#fff", marginTop: 10 }}
                    />
                  )
                case 'selector':
                  return (
                    <SegmentedControls
                      key={key}
                      mode={"outlined"}
                      label={field.label}
                      options={field.options}
                      placeholder={field.placeholder ?? field.label}
                      secureTextEntry={field.secure}
                      value={field.value}
                      selectedOption={field.value}
                      onSelection={(selectedOptions) => { setSelectedOptionsGender(selectedOptions) }}
                      optionStyle={{ margin: 5 }}
                      optionContainerStyle={{ marginTop: 10 }}
                      containerBorderWidth={0}
                      separatorWidth={0}
                      containerBorderRadius={10}
                    />
                  )
                default:
                  return (
                    <PaperTextInput
                      key={key}
                      mode={"outlined"}
                      label={field.label}
                      placeholder={field.placeholder ?? field.label}
                      secureTextEntry={field.secure}
                      value={field.value}
                      onChangeText={(text) => changeText(field.name, text)}
                      // required={field.required}
                      style={{ backgroundColor: "#fff", marginTop: 10 }}
                    />
                  )
              }
            })}
          <TouchableOpacity disabled={!haveChange} style={{ justifyContent: "center", marginTop: 20, marginLeft: 0, opacity: (haveChange) ? 1 : 0.3 }} onPress={() => onSubmit()}>
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} colors={["#0093FF", "#00DEFF"]} style={styles.button} >
              {loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                  <Text style={styles.buttonSubmit}>Modifier</Text>
                )}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={ /** define what to do */ null}>
            <Text style={styles.buttonSubmit}>Modifier</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40
  },
  errorText: {
    color: "#E6265C",
    fontSize: 15
  },
  button: {
    alignItems: 'center',
    borderRadius: 15,
    width: '100%',
    paddingTop: 13,
    paddingBottom: 13,
    paddingLeft: Layout.width * 0.07,
    paddingRight: Layout.width * 0.07
  },
  buttonSubmit: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: '700'
  }
})

export default ProfileView
