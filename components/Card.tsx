// @flow
import React, { useState, useEffect, useReducer } from 'react';
import {
  Image, StyleSheet, View, Text, ActivityIndicator
} from "react-native";
import * as Helpers from '../helpers'
import { getStorageData } from '../services/provider'


import { Profile } from "../Models";

interface CardProps {
  match: any;
}

export default function CardMatch(props: CardProps) {
  const [firstName, setRelationFirstName] = useState('');
  const [gender, setRelationGender] = useState('');
  const [height, setRelationHeight] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let storedData;
    let userId;
    async function setList() {
      setIsLoading(true)
      storedData = await getStorageData()
      console.log('id stored :', storedData.user.id);
      storedData.user.id === props.match.userOne ? userId = props.match.userTwo : userId = props.match.userOne
      Helpers.requestService('app_users/', 'GET', userId).then((res: any) => {
        setRelationFirstName(res.firstName)
        setRelationGender(res.gender)
        setRelationHeight(res.heightheightInCentimeter ?? 'Taille')
        setIsLoading(false)
      })
    };
    setList();
  }, [])

  if (isLoading) {
    return <ActivityIndicator />
  } else {
    return (
      <View style={{ height: 450 }}>
        <Image style={styles.image} source={{ uri: 'https://i1.sndcdn.com/artworks-000244718297-hgnnd2-t500x500.jpg' }} />
        <View style={styles.overlay}>
          <View style={styles.footer}>
            <Text style={styles.name}>{firstName}</Text>
            <Text style={styles.gender}>{gender}</Text>
            <Text style={styles.height}>{height}</Text>
          </View>
        </View>
      </View>
    );
  }

};

const styles = StyleSheet.create({
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
    flexDirection: "row"
  },
  name: {
    color: "white",
    fontSize: 25,
    flex: 1
  },
  gender: {
    color: "white",
    fontSize: 15,
    flex: 1
  },
  height: {
    color: "white",
    fontSize: 15,
    flex: 1
  }
});