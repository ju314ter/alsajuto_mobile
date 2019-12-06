import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { Feather as Icon } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { profiles } from '../App'
import CardMatch from '../components/Card';
import Interactable from '../components/Interactable';
import Animated from 'react-native-reanimated';

const { Value, interpolate, concat, Extrapolate, } = Animated;
const { width, height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;
const deltaX = width / 2;
const w = width - 32;
const h = w * φ;
const α = Math.PI / 12;
const A = width * Math.cos(α) + height * Math.sin(α);

interface Props {
  navigation: any
}

interface State {
    passedProfile: number
    likedProfile: number
    index: number
}

export default class MatcherTestView extends Component<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
            passedProfile: 0,
            likedProfile: 0,
            index: 0,
        }
      }

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {display: 'none'},
      title: 'Matcher Test'
    }
  }

  onSnap = ({ nativeEvent: { x } }) => {
    const { index } = this.state;
    if (x !== 0) {
      this.setState({ index: index + 1 });
    }
  }

  render () {
    const { onSnap } = this;
    const { index } = this.state;
    const x = new Value(0);
    const y = new Value(0);
    const profile = profiles[index];
    const rotateZ = concat(
      interpolate(x, {
        inputRange: [-1 * deltaX, deltaX],
        outputRange: [α, -1 * α],
        extrapolate: Extrapolate.CLAMP,
      }),
      "rad",
    );
    const likeOpacity = interpolate(x, {
      inputRange: [0, deltaX / 4],
      outputRange: [0, 1],
    });
    const nopeOpacity = interpolate(x, {
      inputRange: [-1 * deltaX / 4, 0],
      outputRange: [1, 0],
    });
    const translateX = x;
    const translateY = y;
    const style = {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { translateX },
        { translateY },
        { rotateZ },
      ],
    };

    return (

      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="user" size={32} color="gray" />
        <Icon name="message-circle" size={32} color="gray" />
      </View>
      <View style={styles.cards}>
        <Animated.View {...{ style }}>
          <CardMatch {...{ profile, likeOpacity, nopeOpacity }} />
        </Animated.View>
        <Interactable
          key={index}
          snapPoints={[{ x: -1 * A }, { x: 0 }, { x: A }]}
          style={StyleSheet.absoluteFill}
          {...{ onSnap, x, y }}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.circle}>
          <Icon name="x" size={32} color="#ec5288" />
        </View>
        <View style={styles.circle}>
          <Icon name="heart" size={32} color="#6ee3b4" />
        </View>
      </View>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfaff",
    justifyContent: "space-evenly",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  cards: {
    width: w,
    height: h,
    marginLeft: 16,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 2,
  },
});