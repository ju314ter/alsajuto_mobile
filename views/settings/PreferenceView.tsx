import React, { useState, useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, Modal } from 'react-native'
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import reducer, { LIST_CHANGE } from '../../components/reducer'
import { getAllPreference, getAllTypePreference } from '../../services/preference'
import { getAllLikes, patchLike } from '../../services/like'
import { LinearGradient } from 'expo-linear-gradient'

const PreferenceView = (props) => {
  const [sexuality, setSexuality] = useState(null)
  const [preferencesAgeMin, setPreferencesAgeMin] = useState(null)
  const [preferencesAgeMax, setPreferencesAgeMax] = useState(null)
  const [typePreferences, setTypePreferences] = useState(null)
  const [preferences, setPreferences] = useState(null)
  const [type, setType] = useState(null)
  const [pref, setPref] = useState(null)
  const [haveChange, setHaveChange] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [likes, setLikes] = useState(null)
  const [keySaved, setKeySave] = useState([])
  const fields = [

  ]

  const [stateEncaiss, dispatch] = useReducer(reducer, fields);

  useEffect(() => {
    (async function () {
      try {
        setTypePreferences(await getAllTypePreference())
        setPreferences(await getAllPreference())
        setLikes(await getAllLikes())
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
    console.log('onSubmit')
    setLoading(false)
  }

  function PreferenceModal(item) {
    return (
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType={"slide"}
        onRequestClose={() => console.log('Close was requested')}
      >
        <ScrollView style={{
          margin: '1%',
          padding: '10%',
          backgroundColor: '#efefef',
          bottom: 20,
          left: 20,
          right: 20,
          position: 'absolute'
        }}>
          <Text style={{ fontWeight: 'bold', alignItems: 'center', marginBottom: 10 }}>Préférence en {item.name} ?</Text>
          {
            preferences.map((value, index) => {
              if (value.typeId === item.id) {
                for (let i = 0; i < likes.length; i++) {
                  if (likes[i].preference.id === value.id && likes[i].preference.typeId) {
                    return (
                      <TouchableHighlight
                        key={index}
                        style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}
                        underlayColor='crimson'
                        onPress={() => {
                        }}
                      >
                        <Text style={{ color: 'crimson' }}>{value.style}</Text>
                      </TouchableHighlight>
                    )
                  }
                }
                return (
                  <TouchableHighlight
                    key={index}
                    style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}
                    underlayColor='crimson'
                    onPress={() => {
                      console.log({preferenceId: value.id, typeId: value.typeId})
                      patchLike({preferenceId: value.id, typeId: value.typeId})
                      setIsModalVisible(!isModalVisible)
                    }}
                  >
                    <Text>{value.style}</Text>
                  </TouchableHighlight>
                )
              }
            })
          }
          <TouchableHighlight onPress={() => setIsModalVisible(!isModalVisible)} style={{ paddingTop: 4, paddingBottom: 4, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Cancel</Text>
          </TouchableHighlight>
        </ScrollView>
      </Modal>
    )
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: 'center', fontSize: 40, color: 'crimson', textTransform: "uppercase", letterSpacing: 2.40, textShadowRadius: 1, textShadowColor: 'black', lineHeight: 100 }}>Préférences</Text>
          {loading
            ? null
            : typePreferences.map((item, key) => {
              return (
                <LinearGradient
                  style={{ marginBottom: 4, marginTop: 4, borderRadius: 15, }}
                  colors={['crimson', 'black']}
                  key={key}
                >
                  <TouchableHighlight
                    onPress={(key) => {
                      setIsModalVisible(!isModalVisible)
                      setType(item)
                    }}
                    underlayColor='crimson'
                    style={{ alignItems: 'center', paddingTop: 8, paddingBottom: 8 }}
                  >
                    <Text style={{ color: "#fff", textTransform: "uppercase" }}>{item.name.toString()}</Text>
                  </TouchableHighlight>
                </LinearGradient>
              )
            })
          }
          {isModalVisible ? PreferenceModal(type) : null}
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
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: '5%',
    height: '100%'
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
