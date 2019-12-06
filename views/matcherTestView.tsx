import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { Feather as Icon } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { profiles } from '../App';
import { Profile } from '../Models'
import CardMatch from '../components/Card';
import Animated from 'react-native-reanimated';

import {PanGestureHandler, State} from 'react-native-gesture-handler';

const widthScreen = Dimensions.get('window').width
const heightScreen = Dimensions.get('window').height
const widthCard = widthScreen * 0.8;
const widthRotated = widthScreen * Math.sin(72 * Math.PI/180) + heightScreen * Math.sin(18 * Math.PI/180)

const { event , Clock, Value, interpolate, Extrapolate, concat, cond, eq, neq, call, set, spring, clockRunning, stopClock, startClock, and, lessThan, greaterThan} = Animated 

interface MatcherProps {
  navigation: any
}

interface MatcherState {
  profiles: Profile[];
}

function runSpring(clock, value, velocity, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

export default class MatcherTestView extends Component<MatcherProps, MatcherState> {

  _onGestureEvent;
  translateX;
  translationX: Animated.Value<number>;
  translateY;
  translationY: Animated.Value<number>;
  rotationZ;
  velocityX: Animated.Value<number>;
  gestureState : Animated.Value<State>

  constructor(props: MatcherProps) {
      super(props);
      this.state = {
        profiles : profiles,
      }

      this.translationX = new Value(0);
      this.translationY = new Value(0);
      this.velocityX = new Value(0);
      this.gestureState = new Value(State.UNDETERMINED);


      this._onGestureEvent = event(
        [
          {
            nativeEvent: {
              translationX: this.translationX,
              translationY: this.translationY,
              velocityX: this.velocityX,
              state: this.gestureState,
            },
          },
        ],
        { useNativeDriver: true }
      );
      this.init();
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {display: 'none'},
      title: 'Matcher Test'
    }
  }

  init = () => {
    const { translationX, translationY, velocityX, gestureState } = this;
    const clockX = new Clock()
    const clockY = new Clock()
    
    translationX.setValue(0);
    translationY.setValue(0);
    velocityX.setValue(0);
    gestureState.setValue(State.UNDETERMINED);

    const snapPoint = cond(
                          and( lessThan(translationX, 0), lessThan(velocityX, -10)),
                          -widthRotated,
                          cond(
                            and( greaterThan(translationX, 0), greaterThan(velocityX, 10)), 
                            widthRotated,
                            0,
                          ),
                        )

    this.translateX = cond(eq(gestureState, State.END), [
      set(translationX, runSpring(clockX, translationX, velocityX, snapPoint)),
      cond(
        and( 
          eq(clockRunning(clockX),0),
          neq(translationX, 0),
        ),
        call([translationX], this.onSwipped)
      ),
      translationX
    ],
    translationX) 

    this.translateY = cond(eq(gestureState, State.END), [
      set(translationY, runSpring(clockY, translationY, 0, 0)),
      translationY
    ],
    translationY) 
  }

  onSwipped = ([translateX]) => {
      const isLiked = translateX > 0;
      console.log('is liked !') 
      const { profiles: [lastProfile, ...profiles] } = this.state;
      this.setState({profiles}, this.init)
  }

  render () {
    const { profiles: [lastProfile, ...profiles] } = this.state;
    const { _onGestureEvent, translateX, translateY } = this;

    const rotateZ = concat(interpolate(translateX, {
      inputRange: [-widthScreen,widthScreen],
      outputRange: [18,-18],
      extrapolate: Extrapolate.CLAMP,
    }), 'deg')

    const nopeOpacity =interpolate(translateX, {
      inputRange: [-0.25*widthScreen,0],
      outputRange: [1,-0],
      extrapolate: Extrapolate.CLAMP,
    })
    const likeOpacity =interpolate(translateX, {
      inputRange: [0, widthScreen*0.25],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    })

    const style = {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { translateX },
        { translateY },
        { rotateZ },
      ]
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.cards}>
            {
                profiles.map((profile, index) => (
                  <View 
                  style={[{ top: 5 * (index), left: 1 * (index) + ((widthScreen-widthCard)/2) }, {position: 'absolute', width: widthCard}]}
                  key={profile.id}>
                    <CardMatch {...{ profile }} />
                  </View>
                )).reverse()
            }
          <View style={{width: '80%', height: 500, alignItems: 'center'}}>
            <PanGestureHandler
              onGestureEvent={_onGestureEvent}
              onHandlerStateChange={_onGestureEvent}>
              <Animated.View {...{style}}>
                <CardMatch profile={lastProfile} />
              </Animated.View>
            </PanGestureHandler>
          </View>
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
  },
  cards: {
    flex: 1,
    zIndex: 100,
    alignItems: 'center',
  },
  footer: {
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