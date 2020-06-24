import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import Match from '../../components/Match'
import { matchs } from '../../services/matching';

export default function MatchListView({ navigation }) {
  const [isLoading, setLoading] = useState(false)
  const [matchList, setMatchList] = useState([])

  useEffect(() => {
    (async function setList() {
      setLoading(true);
      await setMatchList(await matchs());
      setLoading(false);
      console.log('matchList length : ', matchList.length);
    })();
  }, [])

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <>
          {
            matchList.length !== 0 ? matchList.map((match, index) => {
              return <Match navigation={navigation} match={match} key={match.id}>.</Match>
            }) : <Text style={styles.nomatch}>Pas de nouveaux match :/</Text>
          }
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
  },
  nomatch: {
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '600',
    paddingTop: 50,
  }
})
