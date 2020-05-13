// @flow
import * as React from "react";
import {
  Image, StyleSheet, View, Text, Animated
} from "react-native";

import { Profile } from "../Models";

const { Value } = Animated;

interface CardProps {
  profile: any;
  position?: Animated.ValueXY;
}

export default (props: CardProps) => {
  const { profile, likeOpacity, nopeOpacity } = {
    likeOpacity: 0,
    nopeOpacity: 0,
    ...props,
  };
  return (
    <View style={{ height: 450 }}>
      <Image style={styles.image} source={profile.profile} />
      <View style={styles.overlay}>
        <View style={styles.footer}>
          <Text style={styles.name}>{profile.firstName}</Text>
          <Text style={styles.gender}>{profile.gender}</Text>
        </View>
      </View>
    </View>
  );
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
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#6ee3b4",
  },
  likeLabel: {
    fontSize: 32,
    color: "#6ee3b4",
    fontWeight: "bold",
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#ec5288",
  },
  nopeLabel: {
    fontSize: 32,
    color: "#ec5288",
    fontWeight: "bold",
  },
});