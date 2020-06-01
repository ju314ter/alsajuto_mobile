import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { getStorageData, setAuthorization } from '../../services/provider'

export default function SettingsView(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setUserName] = useState(null)
  const [age, setUserAge] = useState(null)
  const [data, setData] = useState(null)
  const [user, setUser] = useState(null)

  const getAge = function (birthDate) {
    return Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10)
  }

  useEffect(() => {
    (async function() {
      try {
        const storageData = await getStorageData()
        console.log(storageData)
        setData(storageData)
        setUser(storageData.user)
        setUserAge(getAge(storageData.user.birthdayDate))
        setUserName(storageData.user.username ?? storageData.user.firstName)
        setIsLoading(false)
      } catch (e) {
        console.log('cactch SettingsView :')
        console.log(e)
      }

      setIsLoading(false)
    })()
  }, [])

  return (
    <View style={styles.container}>
      {/* TODO : Faire en sorte de faire disparaitre la ligne blanche entre le header et le début du LinearGradient */}
      <LinearGradient colors={['crimson', 'darkred', 'brown']} style={styles.linearGradient}>
        {isLoading ? (<ActivityIndicator />) : (
          <>
            <View style={styles.TopPage}>

              {/* Image View */}
              <View style={styles.ImageContent}>
                {/* <Image style={styles.image} source={)} /> */}
              </View>

              {/* Below the image, name and age section */}
              <View>
                <Text style={styles.sectionTitle}>{name ?? 'Name'}, {age ? age + ' ans' : 'age'}</Text>
              </View>
            </View>
            <View style={styles.ButtonContainer}>

              <View style={styles.button}>
                <Button
                  title='Paramètres' containerStyle={{ padding: 3 }} titleStyle={{ color: 'crimson' }}
                  buttonStyle={{ backgroundColor: 'white' }}
                  onPress={() => props.navigation.navigate('Profile', { user: user })}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title='Préférences' containerStyle={{ padding: 3 }} titleStyle={{ color: 'crimson' }}
                  buttonStyle={{ backgroundColor: 'white' }}
                  onPress={() => props.navigation.navigate('Preference')}
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
    padding: '8%'
  }
})
