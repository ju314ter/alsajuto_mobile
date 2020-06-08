// @flow
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import * as Helpers from '../helpers'
import { getStorageData } from '../services/provider'
import { getProfilPicture } from '../services/user'

interface CardProps {
  match: any;
}

export default function CardMatch(props: CardProps) {
  const [firstName, setRelationFirstName] = useState('');
  const [gender, setRelationGender] = useState('');
  const [height, setRelationHeight] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [urlProfilePicture, setUrlProfilePicture] = useState({ uri: true, data: 'https://i1.sndcdn.com/artworks-000244718297-hgnnd2-t500x500.jpg' })

  useEffect(() => {
    let storedData;
    let userId;
    async function setList() {
      setIsLoading(true)
      storedData = await getStorageData()
      console.log('id stored :', storedData.user.id);
      storedData.user.id === props.match.userOne ? userId = props.match.userTwo : userId = props.match.userOne
      try {
        const profilPictureUrl = await getProfilPicture(userId)
        if (profilPictureUrl) {
          setUrlProfilePicture({ uri: false, data: profilPictureUrl })
        }
      } catch (e) {
        console.log(e)
      }
      Helpers.requestService('app_users/', 'GET', userId).then((res: any) => {
        console.log('getting card props : ', res)
        setRelationFirstName(res.firstName)
        setRelationGender(res.gender)
        setRelationHeight(res.heightheightInCentimeter ?? 'Taille')
        setIsLoading(false)
      })
      setIsLoading(false)
    };
    setList();
  }, [])

  if (isLoading) {
    return <ActivityIndicator />
  } else {
    return (
      <View style={styles.TopPage}>
        <Image style={styles.image} source={{ uri: (urlProfilePicture.uri) ? urlProfilePicture.data : "data:image/png;base64," + urlProfilePicture.data }} />
        <View style={styles.overlay}>
          <View style={styles.footer}>
            <Text style={styles.sectionTitle}>
              {firstName}, {height}
            </Text>
          </View>
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  TopPage: {
    height: 450,
    marginLeft: '5%',
    marginRight: '5%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    width: '100%',
    flexDirection: "row",
    backgroundColor: '#fafafa'
  },
  sectionTitle: {
    padding: '5%',
    color: 'crimson',
    backgroundColor: '#fafafa',
    fontSize: 18,
    fontWeight: 'bold'
  },
});