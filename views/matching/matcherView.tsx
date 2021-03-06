import React, { Component } from 'react'
import { StyleSheet, Text, View, PanResponder, Dimensions, Animated, ActivityIndicator } from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import CardMatch from '../../components/Card'
import { matchings, patchMatch } from '../../services/matching'
import { getStorageData, setAuthorization } from '../../services/provider'

import * as Helpers from '../../helpers'

interface Props {
  navigation: any
}

interface State {
  index: number
  potentialMatchs: Array<any>
  isLoading: boolean
  userId: string
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const SWIPE_THRESHOLD = 0.30 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default class MatcherView extends Component<Props, State> {

  position;
  _panResponder;

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      potentialMatchs: [],
      isLoading: true,
      userId: '0'
    }

    this.position = new Animated.ValueXY();

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      },
    });
  }

  componentDidMount = async () => {
    try {
      const storedData = await getStorageData()
      setAuthorization(storedData.token)
      this.setState({ potentialMatchs: await matchings() })
      this.setState({ userId: storedData.user.id })
      this.setState({ isLoading: false })
      console.log('## STATE ##')
      console.log('matcher state : ', this.state)
    } catch (e) {
      console.log('catch ComponentDidMount MatcherView')
      console.log(e)
      this.setState({ isLoading: false })
    }
  }

  forceSwipe(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const match = this.state.potentialMatchs[this.state.index];

    direction === 'right' ? this.handleLikedProfile(match) : this.handlePassedProfile(match);
    this.position.setValue({ x: 0, y: 0 });

    // Spring Animation on Profile Deck
    // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    // LayoutAnimation.configureNext({
    //     duration: 600,
    //     create: { type: 'linear', property: 'opacity' },
    //     update: { type: 'spring', springDamping: 0.5 },
    //     delete: { type: 'linear', property: 'opacity' }
    // })

    this.setState({ index: this.state.index + 1 });
  }

  // TODO : send patch to back
  handleLikedProfile = (match) => {
    let body = {
      id: this.state.userId,
      response: true
    }
    // Helpers.requestService('matchings/' + match.id, 'PATCH', '', body)
    patchMatch(match.id, body).then(res => console.log(res));
  };

  handlePassedProfile = (match) => {
    let body = {
      id: this.state.userId,
      response: false
    }
    patchMatch(match.id, body).then(res => console.log(res));
  };

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['120deg', '0deg', '-120deg']
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  getLikeOpacityStyle() {
    const { position } = this;
    const opacity = position.x.interpolate({
      inputRange: [0, SCREEN_WIDTH / 4],
      outputRange: [0, 1]
    });
    return {
      opacity: opacity
    };
  }

  getNopeOpacityStyle() {
    const { position } = this;
    const opacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 4, 0],
      outputRange: [1, 0]
    });
    return {
      opacity: opacity
    };
  }

  renderCards() {
    if (this.state.potentialMatchs) {
      if (this.state.potentialMatchs.length <= this.state.index && this.state.isLoading === false) {
        return (
          <Card title="No More cards">
            <Button title='no more cards' onPress={() => {
              console.log(this.state.potentialMatchs)
            }} />
          </Card>
        )
      }
      else {
        return this.state.potentialMatchs.map((match, index) => {

          if (index < this.state.index) { return null }

          if (index == this.state.index) {
            return (
              <Animated.View style={[this.getCardStyle(), { position: 'absolute', width: '100%' }]} key={match.id}
                {...this._panResponder.panHandlers}>
                <View style={{ position: 'relative' }}>
                  <Animated.View style={[this.getNopeOpacityStyle(), styles.nope]}>
                    <Text style={styles.nopeLabel}>NOPE</Text>
                  </Animated.View>
                  <Animated.View style={[this.getLikeOpacityStyle(), styles.like]}>
                    <Text style={styles.likeLabel}>LIKE</Text>
                  </Animated.View>
                  <CardMatch {...{ match }} />
                </View>
              </Animated.View>
            )
          }
          else {
            return (
              <Animated.View style={[{ top: 5 * (index - this.state.index), left: 2 * (index - this.state.index) }, { position: 'absolute', width: '100%' }]} key={match.id}>
                <CardMatch {...{ match }} />
              </Animated.View>
            )
          }
        }).reverse();
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.statusStyle}>
            <Text style={{ color: 'black' }}>Index: {this.state.index}</Text>
          </View>
          <View style={{ width: '80%' }}>
            {this.state.isLoading ? (<ActivityIndicator />) : (
              this.renderCards()
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fafafa'
  },
  statusStyle: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  like: {
    zIndex: 2,
    borderWidth: 4,
    position: 'absolute',
    top: 100,
    left: CARD_WIDTH / 2 - 10,
    transform: [{ rotate: '35deg' }],
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
    zIndex: 2,
    borderWidth: 4,
    transform: [{ rotate: '-35deg' }],
    position: 'absolute',
    top: 100,
    left: CARD_WIDTH / 2 - 10,
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
