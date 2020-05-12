import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Dimensions, Animated, UIManager, LayoutAnimation } from 'react-native';
import { Button, Card } from 'react-native-elements';

interface Props {
    navigation: any
    name: string;
}

interface State {
    index: number
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const SWIPE_THRESHOLD = 0.30 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default class Match extends Component<Props, State> {

    position;
    _panResponder;

    constructor(props) {
        super(props);

        this.state = {
            index: 0,
        }

        this.position = new Animated.ValueXY();

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx, y: 0 });
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

    static navigationOptions = ({ navigation }) => {
        return {
            headerStyle: { display: 'none' },
            title: 'Match'
        }
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH / 2 : -SCREEN_WIDTH / 2;
        Animated.timing(this.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        // direction === 'right' ? this.handleLikedProfile(profile) : this.handlePassedProfile(profile);
        // this.position.setValue({ x: 0, y: 0 });
    }

    resetPosition() {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const { position } = this;
        return {
            ...position.getLayout()
        };
    }

    render() {
        const { name } = this.props;

        return (
            <View style={styles.container}>
                <Text style={{ position: 'absolute', left: 0 }}>Left Options</Text>
                <Text style={{ position: 'absolute', right: 0 }}>Right Options</Text>
                <Animated.View style={[this.getCardStyle(), { position: 'absolute', width: '100%' }]}
                    {...this._panResponder.panHandlers}>
                    <View style={{ position: 'relative' }}>
                        <View style={{ width: '100%', height: 80, backgroundColor: 'red', borderRadius: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'white' }}>{name}</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 80,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusStyle: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
