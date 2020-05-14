import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Dimensions, Animated, UIManager, LayoutAnimation } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import CardMatch from '../../components/Card';
import * as Helpers from '../../helpers';

interface Props {
  navigation: any
}

interface State {
  passedProfile: number
  likedProfile: number
  index: number
  potentialMatchs: Array<any>
  isLoading: boolean
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
      passedProfile: 0,
      likedProfile: 0,
      index: 0,
      potentialMatchs: [],
      isLoading: false
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

  componentDidMount() {
    this.setState({ isLoading: true })
    Helpers.requestService('matchings', 'GET').then((res: Array<any>) => {
      console.log(res)
      this.setState({ potentialMatchs: res })
      this.setState({ isLoading: false })
    })
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
    this.setState(({ likedProfile }) => ({
      likedProfile: likedProfile + 1
    }));
    //Patch relation to match
    Helpers.requestService('matchings/' + match.id, 'PATCH', '', {})
  };

  handlePassedProfile = (promatchfile) => {
    this.setState(({ passedProfile }) => ({
      passedProfile: passedProfile + 1
    }));
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
            <Animated.View style={[{ top: 5 * (index - this.state.index), left: 2 * (index - this.state.index) }, { position: 'absolute', width: '100%' }]} key={profile.id}>
              <CardMatch {...{ match }} />
            </Animated.View>
          )
        }

      }).reverse();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#D42D4E', '#B11231', '#8D011D']}
          style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'flex-start' }}>

          <View style={styles.statusStyle}>
            <Text style={{ color: 'yellow' }}>Index: {this.state.index}</Text>
            <Text style={{ color: 'green' }}>Passed: {this.state.passedProfile}</Text>
            <Text style={{ color: 'blue' }}>Like: {this.state.likedProfile}</Text>
          </View>
          <View style={{ width: '80%' }}>
            {
              this.renderCards()
            }
          </View>
        </LinearGradient>
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
