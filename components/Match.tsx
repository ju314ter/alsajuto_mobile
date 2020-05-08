import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Dimensions, Animated, UIManager, LayoutAnimation } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    navigation: any
    proposal: string
    proposalId: number
}

interface State {
    proposal: string
    proposalId: number
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const PROPOSAL_WIDTH = SCREEN_WIDTH * 0.9;
const SWIPE_THRESHOLD = 0.50 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default class MatchView extends Component<Props, State> {

    position;
    _panResponder;

    constructor(props) {
        super(props);

        this.state = {
            proposal: 'Julien',
            proposalId: 1
        }

        this.position = new Animated.ValueXY();

        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.position.setValue({ x: gestureState.dx });
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
            title: 'Matcher'
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

        direction === 'right' ? this.showRightOptions() : this.showLeftOptions();
        // this.position.setValue({ x: 0, y: 0 });

        // Spring Animation on reset
        // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.configureNext({
        //     duration: 600,
        //     create: { type: 'linear', property: 'opacity' },
        //     update: { type: 'spring', springDamping: 0.5 },
        //     delete: { type: 'linear', property: 'opacity' }
        // })
    }


    // TODO : send patch to back
    showRightOptions = () => {

    };

    showLeftOptions = () => {

    };


    resetPosition() {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    // getProposalStyle() {
    //     const { position } = this;
    //     const rotate = position.x.interpolate({
    //         inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    //         outputRange: ['120deg', '0deg', '-120deg']
    //     });
    //     return {
    //         ...position.getLayout(),
    //         transform: [{ rotate }]
    //     };
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ ...StyleSheet.absoluteFillObject, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#cfc6c8', borderRadius: 25 }}>
                    <Text>option bar left</Text>
                    <Text>option bar right</Text>
                </View>
                <Animated.View style={[...this.position.getLayout(), { ...StyleSheet.absoluteFillObject, width: '100%', backgroundColor: '#c99da6', borderRadius: 25 }]}
                    {...this._panResponder.panHandlers}>
                    <View style={{ position: 'relative' }}>
                        <Text>This is my slidable component</Text>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
