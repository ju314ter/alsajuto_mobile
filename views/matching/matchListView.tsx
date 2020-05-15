import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import * as Helpers from '../../helpers'

import Match from '../../components/Match'

export default function MatchListView ({ navigation }) {
  const [isLoading, setLoading] = useState(false)
  const [matchList, setMatchList] = useState([])

  useEffect(() => {
    Helpers.getDataLocally('token').then((token) => {
      // Fetch Match list here
      if (token) {
        // Helpers.requestService('GET', 'matchings').then((res) => {
        //     console.log(res)
        // })
      }
    })
  }, [])

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <>
          <Match navigation={navigation} name='Catherine'>.</Match>
          <Match navigation={navigation} name='Jennyfer'>.</Match>
        </>
      </View>
    )
  } else {
    return <ActivityIndicator />
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%'
  }
})
