import React, { useState, useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, Picker, TouchableNativeFeedbackBase, ImageBackground } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import reducer, { TEXT_CHANGE, LIST_CHANGE } from '../../components/reducer'
import { getAllPreference, getAllTypePreference } from '../../services/preference'
// import {  } from '@react-native-community/picker';
import { createPointerEventsContainer } from 'react-navigation-stack'

const PreferenceView = (props) => {
  const [sexuality, setSexuality] = useState(null)
  const [prefAgeMin, setPrefAgeMin] = useState(null)
  const [prefAgeMax, setPrefAgeMax] = useState(null)
  const [typePref, setTypePref] = useState(null)
  const [pref, setPref] = useState(null)
  const [haveChange, setHaveChange] = useState(false)
  const [loading, setLoading] = useState(true)
  const [likes, setLikes] = useState(null)
  const [keySaved, setKeySave] = useState([])
  const fields = [

  ]

  const [stateEncaiss, dispatch] = useReducer(reducer, fields);

  useEffect(() => {
    (async function () {
      console.log('useEffect()')
      try {
        setTypePref(await getAllTypePreference())
        setPref(await getAllPreference())
        setLoading(false)
      } catch (e) {
        console.log('ProfileView.useEffect :', e)
        setLoading(false)
      }
    })()
  }, [])

  const changePick = (name, data) => {
    if (!haveChange) setHaveChange(true)
    if (!keySaved.includes(name)) {
      let newKeySaved = keySaved;
      newKeySaved.push(name);
      setKeySave(newKeySaved);
    }
    dispatch({ type: LIST_CHANGE, name, data })
  }

  const onSubmit = async () => {
    setLoading(true)
    // try {
    //   let data = {}
    //   console.log('list of modified keys :', keySaved)
    //   for (var i = 0; i < keySaved.length; i++) {
    //     data[keySaved[i]] = stateEncaiss[getPosKeySave(keySaved[i])].value
    //   }
    //   setLoading(false)
    // } catch (e) {
    //   console.log('Catch On Submit Preference :', e)
    //   setLoading(false)
    //   return <View style={{backgroundColor: 'crimson'}}></View>
    // }
    console.log('onSubmit')
    setLoading(false)
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {/* {loading ? null : <GetView {...{}} />} */}
          {loading
            ? null
            : typePref.map((item, key) => {
              console.log('key:', key)
              return (
                <View style={styles.row}>
                  <Text style={styles.inputWrap}>{ item.name.toString() }</Text>
                  <Picker
                    style={{height: 20, width: 100, marginLeft: '10%'}}
                    onValueChange={(itemValue, itemIndex) => changePick(itemIndex, itemValue)}
                  >
                    <Picker.Item label='test' value='test' />
                    <Picker.Item label='test' value='test' />
                    <Picker.Item label='test' value='test' />
                  </Picker>
                </View>
              )
            })
          }
          {/* <Text style={styles.Title}>Préférences</Text>

          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Input
                inputStyle={{ color: 'black' }} placeholder={'Age min : ' + (prefAgeMin ?? '18')} placeholderTextColor='black' keyboardType='numeric'
                onChangeText={(value) => setPrefAgeMin(value)}
              />
            </View>
            <View style={styles.inputWrap}>
              <Input
                inputStyle={{ color: 'black' }} placeholder={'Age Max: ' + (prefAgeMax ?? '100')} placeholderTextColor='black' keyboardType='numeric'
                onChangeText={(value) => setPrefAgeMax(value)}
              />
            </View>
          </View> */}

          {/* <View style={styles.row}>
            <View style={styles.inputWrap}> */}
              {/* {
                likes.forEach(like => {
                  console.log(like)
                  console.log('-----------------------')
                })
              } */}
              {/* AJOUTER ICI LA MUSIQUE */}
            {/* </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputWrap}> */}
              {/* AJOUTER ICI LES FILMS */}
            {/* </View>
          </View> */}
          <Button
            title='Modififer' containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
            buttonStyle={{ backgroundColor: 'crimson' }} onPress={() => { onSubmit() }}
          />
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
    marginTop: 40,
    backgroundColor: 'orange'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: '5%',
    backgroundColor: 'yellow',
    height: '100%'
  },
  inputWrap: {
    flex: 1,
    backgroundColor: 'white',
  },
  picker: {
    flex: 3,
  },
  label: {
    color: 'black',
    margin: '5%'
  },
  Title: {
    margin: '10%',
    color: 'black',
    fontSize: 18,
    textAlign: 'center'
  }
})

export default PreferenceView
