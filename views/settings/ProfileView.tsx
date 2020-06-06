import React, { useState, useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { TextInput as PaperTextInput, TextInput } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { SegmentedControls } from 'react-native-radio-buttons'
import { ScrollView } from 'react-native-gesture-handler'
import * as Layout from '../../Utils/Layout'
import reducer, { TEXT_CHANGE } from '../../components/reducer'
import { patch, getMe } from '../../services/user'
import { setStorageData, getStorageData } from '../../services/provider'

const ProfileView = (props) => {
  const [error, setError] = useState(null);
  const [userSaved, setUserSaved] = useState(props.navigation.state.params.user)
  const [tokenSaved, setTokenSaved] = useState(null)
  const [haveChange, setHaveChange] = useState(false)
  const [loading, setLoading] = useState(false)
  const [keySaved, setKeySave] = useState([])
  const fields = [
    { name: 'username', label: 'Username', placeholder: userSaved.username, value: userSaved.username, required: false, type: 'textFied', secure: false },
    { name: 'firstName', label: 'Prénom', placeholder: userSaved.firstName, value: userSaved.firstName, required: false, type: 'textFied', secure: false },
    { name: 'lastName', label: 'Nom', placeholder: userSaved.lastName, value: userSaved.lastName, required: false, type: 'textFied', secure: false },
    { name: 'Gender', label: 'Genre', placeholder: userSaved.gender, value: userSaved.gender, required: false, type: 'selector', options: ['Homme', 'Femme', 'Non binaire'] },
    { name: 'sexualityPref', label: 'Orientation sexuelle', placeholder: userSaved.sexualityPref, value: userSaved.sexualityPref, required: false, type: 'selector', options: ['Hétérosexuel', 'Homosexuel', 'Non Binaire'] },
    { name: 'email', label: 'Email', placeholder: userSaved.email, value: userSaved.email, required: false, type: 'email', secure: false },
    { name: 'password', label: 'Password', placeholder: '', value: '', required: false, type: 'password', secure: true },
    { name: 'description', label: 'Description', placeholder: userSaved.description, value: userSaved.description, required: false, type: 'textArea' },
    { name: 'heightInCentimeter', label: 'Taille', placeholder: userSaved.heightInCentimeter.toString(), value: userSaved.heightInCentimeter, required: false, type: 'number' },
    { name: 'avatar', label: 'ProfilePicture', placeholder: userSaved.avatar, value: userSaved.avatar, required: false, type: 'avatar' }
  ]

  const [stateEncaiss, dispatch] = useReducer(reducer, fields);

  const changeText = (name, text) => {
    if (!haveChange) setHaveChange(true)
    if (!keySaved.includes(name)) {
      let newKeySaved = keySaved;
      newKeySaved.push(name);
      setKeySave(newKeySaved);
    }
    dispatch({ type: TEXT_CHANGE, name, text })
  }

  const changeNumber = (name, text) => {
    if (!haveChange) setHaveChange(true)
    if (!keySaved.includes(name)) {
      let newKeySaved = keySaved;
      newKeySaved.push(name);
      setKeySave(newKeySaved);
    }
    text = Number(text)
    dispatch({ type: TEXT_CHANGE, name, text })
  }

  const getAge = function (birthDate) {
    const date: any = new Date()
    return Math.floor((date - new Date(birthDate).getTime()) / 3.15576e+10)
  }

  function setSelectedOptionsGender(selectedOption) {
    console.log(selectedOption)
  }

  useEffect(() => {
    (async function () {
      try {
        setUserSaved(await getMe())
        const stData = await getStorageData()
        setTokenSaved(stData.token)
      } catch (e) { console.log('ProfileView.useEffect :', e) }
    })()
  }, [])

  const getPosKeySave = (name) => {
    for (var i = 0; i < stateEncaiss.length; i++) {
      if (stateEncaiss[i].name === name)
        return i;
    }
    return -1;
  }

  const getLabelFromName = (name) => {
    const arr = name.split(',')
    let response = []
    for (let x = 0; x < arr.length; x++) {
      for (var i = 0; i < stateEncaiss.length; i++) {
        if (stateEncaiss[i].name === arr[x])
          response.push(stateEncaiss[i].label)
          // return stateEncaiss[i].label
      }
    }
    if (response.length) return response.toString()
    return -1
  }

  const onSubmit = async () => {
    setLoading(true)
    try {
      let data = {};
      console.log('list of modified keys :', keySaved);
      // Update only the modified field
      for (var i = 0; i < keySaved.length; i++) {
        data[keySaved[i]] = stateEncaiss[getPosKeySave(keySaved[i])].value
      }
      console.log('data updated : ')
      console.log(data)
      const response = await patch(userSaved.id, data)
      if (response === data) {
        await setStorageData({ user: response, token: tokenSaved })
        setUserSaved(response)
      }
      setLoading(false)
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
    setLoading(false)
    alert(getLabelFromName(keySaved.toString()) + ' mis à jour')
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
                    <TextInput
                      key={key}
                      multiline
                      numberOfLines={2}
                      mode={"outlined"}
                      label={field.label}
                      placeholder={field.placeholder ?? field.label}

                      onChangeText={(text) => changeText(field.name, text)}
                      style={{ backgroundColor: "#fff", marginTop: 10 }}
                    />
                  )
                case 'number':
                  return (
                    <PaperTextInput
                      key={key}
                      mode={"outlined"}
                      label={field.label}
                      placeholder={field.placeholder}
                      secureTextEntry={field.secure}
                      value={field.value}
                      onChangeText={(number) => changeNumber(field.name, number)}
                      keyboardType={"number-pad"}
                      style={{ backgroundColor: "#fff", marginTop: 10 }}
                      maxLength={3}
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
