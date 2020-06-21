import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { getStorageData } from '../../services/provider'
import { getMyProfilPicture, getMe } from '../../services/user'

export default function SettingsView(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [name, setUserName] = useState(null)
  const [age, setUserAge] = useState(null)
  const [data, setData] = useState(null)
  const [user, setUser] = useState(null)
  const [profilPicture, setProfilPicture] = useState({ uri: true, data: 'https://i1.sndcdn.com/artworks-000244718297-hgnnd2-t500x500.jpg' })

  const getAge = function (birthDate) {
    return Math.floor((new Date().getTime() - new Date(birthDate).getTime()) / 3.15576e+10)
  }

  useEffect(() => {
    (async function () {
      try {
        const storageData = await getStorageData()
        setData(storageData)
        setUser(await getMe())
        setUserAge(getAge(storageData.user.birthdayDate))
        setUserName(storageData.user.username || storageData.user.firstName)
        const profilPictureUrl = await getMyProfilPicture()
        if (profilPictureUrl) {
          setProfilPicture({ uri: false, data: profilPictureUrl })
        }
        setIsLoading(false)
      } catch (e) {
        console.log('catch SettingsView :' + e)
      }
      setIsLoading(false);
    })()
  }, [])

  return (
    <View style={styles.container}>
      {/* TODO : Faire en sorte de faire disparaitre la ligne blanche entre le header et le début du LinearGradient */}
      <View style={styles.contentContainer}>
        {isLoading ? (<ActivityIndicator />) : (
          <>
            <View style={styles.TopPage}>

              {/* Image View */}
              <View style={styles.ImageContent}>
                <Image style={styles.image} source={{ uri: (profilPicture.uri) ? profilPicture.data : "data:image/png;base64," + profilPicture.data }} />
              </View>

              {/* Below the image, name and age section */}
              <View>
                <Text style={styles.sectionTitle}>{name ?? 'Name'}, {age ? age + ' ans' : 'age'}</Text>
              </View>
            </View>

            <View style={styles.ButtonContainer}>
              <View style={styles.button}>
                <Button
                  title='Paramètres' containerStyle={{ padding: 3 }} titleStyle={{ color: '#fafafa' }}
                  buttonStyle={{ backgroundColor: 'crimson' }}
                  onPress={() => props.navigation.navigate('Profile', { user: user })}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title='Préférences' containerStyle={{ padding: 3 }} titleStyle={{ color: '#fafafa' }}
                  buttonStyle={{ backgroundColor: 'crimson' }}
                  onPress={() => props.navigation.navigate('Preference')}
                />
              </View>
            </View>

          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20
  },
  TopPage: {
    height: '60%',
    marginLeft: '10%',
    marginRight: '10%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  label: {
    color: 'white',
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
    // margin: '3%',
    padding: '5%',
    color: 'crimson',
    backgroundColor: '#fafafa',
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
