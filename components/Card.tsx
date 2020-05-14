// @flow
import React, { useState, useEffect, useReducer } from 'react';
import {
  Image, StyleSheet, View, Text, ActivityIndicator
} from "react-native";
import * as Helpers from '../helpers'

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
    setIsLoading(true)
    Helpers.requestService('app_users/' + props.match.userTwo, 'GET').then((res: any) => {
      setRelationFirstName(res.firstName)
      setRelationGender(res.gender)
      setRelationHeight(res.height)
      setIsLoading(false)
    })
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
    flexDirection: "row",
  },
  name: {
    color: "white",
    fontSize: 32,
  },
  gender: {
    color: "white",
    fontSize: 28,
  },
  height: {
    color: "white",
    fontSize: 24,
  }
});