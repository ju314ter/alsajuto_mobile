import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Match from '../../components/Match'
import { matchs } from '../../services/matching';

export default function MatchListView ({ navigation }) {
  const [isLoading, setLoading] = useState(false)
  const [matchList, setMatchList] = useState([])

  useEffect(() => {
    (async function setList() {
      setMatchList(await matchs());
      console.log(matchList);
    })();
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
