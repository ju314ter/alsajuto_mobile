import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { SegmentedControls } from 'react-native-radio-buttons'
import { ScrollView } from 'react-native-gesture-handler'
import * as Helpers from '../../helpers'

const PreferenceView = (props) => {
  const [sexuality, setSexuality] = useState(null)
  const [prefAgeMin, setPrefAgeMin] = useState(null)
  const [prefAgeMax, setPrefAgeMax] = useState(null)
  const [likes, setLikes] = useState(null)

  const optionsSexuality = [
    'Heterosexual',
    'Homosexual',
    'Genderfluid'
  ]

  useEffect(() => {
    // Helpers.getDataLocally('user').then(user => {
    //   user = JSON.parse(user)
    //   if (user.gender === user.sexualityPref && (user.gender === 'Male' || user.gender === 'Female')) {
    //     setSexuality('Homosexual')
    //   } else if (user.gender !== user.sexualityPref && (user.gender === 'Male' || user.gender === 'Female')) {
    //     setSexuality('Heterosexual')
    //   } else {
    //     setSexuality('Genderfluid')
    //   }
    //   const ageTargeted = user.ageTargeted.split('-')
    //   setPrefAgeMin(ageTargeted[0])
    //   setPrefAgeMax(ageTargeted[1])
    // })
    // Helpers.getDataLocally('token').then(token => {
    //   Helpers.getLikes(token).then(likes => {
    //     setLikes(likes.rows)
    //     console.log(likes.rows)
    //   }).catch(e => console.log(e))
    // })
  }, [])

  function handleUpdatePreference () {
    // TODO
  }

  function setSelectedOptionsSexuality (selectedOption) {
    setSexuality(selectedOption)
  }

  const submit = (form) => {
    console.log(form)
    // Helpers.requestService(constant.LIKES, constant.PATCH, userSaved.id, form, tokenSaved).then(user => {
    //   Helpers.storeDataLocally('user', user).then(() => console.log('user updated !')).catch(e => console.log(e))
    //   user = JSON.parse(user)
    //   setUserSaved(user)
    //   setPseudo(user.username)
    //   switch (user.gender) {
    //     case 'Male':
    //       setGender('Homme')
    //       break
    //     case 'Female':
    //       setGender('Femme')
    //       break
    //     default :
    //       setGender('Non binaire')
    //       break
    //   }
    //   setEmail(user.email)
    //   setAge(getAge(user.birthdayDate))
    //   setSize(user.heightInCentimeter)
    //   setDescription(user.description)
    // })
  }

  return (
    <>
      <View style={styles.MainView}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.Title}>Préférences</Text>
          <SegmentedControls
            options={optionsSexuality}
            onSelection={(selectedOptions) => { setSelectedOptionsSexuality(selectedOptions) }}
            selectedOption={sexuality}
          />
          {/* On a pas prévu de faire comme tinder avec la prise en compte de la distance ? */}
          {/* Alan: Trop long à faire c'est une tanasse et on a même pas encore fini */}
          {/* <Text style={styles.label}>Position range</Text> */}

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
          </View>

          <View style={styles.row}>
            <View style={styles.inputWrap}>
              {/* {
                likes.forEach(like => {
                  console.log(like)
                  console.log('-----------------------')
                })
              } */}
              {/* AJOUTER ICI LA MUSIQUE */}
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputWrap}>
              {/* AJOUTER ICI LES FILMS */}
            </View>
          </View>

        </ScrollView>
        <Button
          title='Modififer' containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
          buttonStyle={{ backgroundColor: '#8D011D' }} onPress={() => { submit({ sexuality, prefAgeMin, prefAgeMax }) }}
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
  row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '5%'
  },
  inputWrap: {
    flex: 1
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
