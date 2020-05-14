import React, { useState, useEffect, useReducer } from 'react'
import { StyleSheet, Text, Image, View, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import * as Helpers from '../../helpers'

export default function SettingsView(props) {
  const [isLoading, setLoading] = useState(false)
  const [name, setUserName] = useState('julien')
  const [age, setUserAge] = useState(27)

  useEffect(() => {
    /**
     * Remplacer le call a l'id en dur par un id dynamique, recuperer toutes les infos et les passer aux vues appropriées
     * Dans chaque vue passer un appel en put pour patch le user avec les nouveaux inputs
     */

    Helpers.requestService('app_users/3', 'GET').then((res) => {
      setUserName(res.firstName)
    })
  }, [])

  const navigationOptions = {
    drawerLabel: <Icon
      name='user-cog'
      iconStyle={{ fontSize: 40, margin: 10 }}
      size={40}
      type='font-awesome'
      color='red'
    />
  }

  const submit = (form) => {
    console.log(form)
  }

  return (
    <View style={styles.container}>
      {/* TODO : Faire en sorte de faire disparaitre la ligne blanche entre le header et le début du LinearGradient */}
      <LinearGradient colors={['crimson', 'darkred', 'brown']} style={styles.linearGradient}>
        {isLoading ? (<ActivityIndicator />) : (
          <>
            <View style={styles.TopPage}>

              {/* Image View */}
              <View style={styles.ImageContent}>
                {/* <Image style={styles.image} source={profiles[1].profile} /> */}
              </View>

              {/* Below the image, name and age section */}
              <View>
                <Text style={styles.sectionTitle}>{name ?? 'Name'}, {age ?? 'age'}</Text>
              </View>
            </View>
            <View style={styles.ButtonContainer}>

              <View style={styles.button}>
                <Button
                  title='Paramètres' containerStyle={{ padding: 3 }} titleStyle={{ color: 'crimson' }}
                  buttonStyle={{ backgroundColor: 'white' }}
                  onPress={() => props.navigation.navigate('Params')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title='Préférences' containerStyle={{ padding: 3 }} titleStyle={{ color: 'crimson' }}
                  buttonStyle={{ backgroundColor: 'white' }}
                  onPress={() => props.navigation.navigate('Prefs')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title='Paramètres 2' containerStyle={{ padding: 3 }} titleStyle={{ color: 'crimson' }}
                  buttonStyle={{ backgroundColor: 'white' }}
                  onPress={() => props.navigation.navigate('DisplayedParams')}
                />
              </View>
            </View>

          </>
        )}
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%'
  },
  linearGradient: {
    height: '100%',
    width: '100%'
  },
  TopPage: {
    height: '60%',
    backgroundColor: '#eee',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  label: {
    color: 'lightgrey',
    fontSize: 16
  },
  ImageContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    overflow: 'hidden'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined
  },
  sectionTitle: {
    margin: '3%',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    margin: 5,
    overflow: 'visible'
  },
  ButtonContainer: {
    height: '30%',
    width: '100%',
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})
