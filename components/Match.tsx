import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Dimensions, Animated, UIManager, LayoutAnimation } from 'react-native';
import { Icon, Button, Avatar } from 'react-native-elements';

interface Props {
    navigation: any
    name: string;
}

interface State {
    status: string
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
            status: 'Lancez votre challenge !',
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
        }).start(() => console.log('swiped completed'));
    }

    resetPosition() {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    render() {
        const { name } = this.props;
        const { status } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Icon
                        raised
                        iconStyle={{ fontSize: 40 }}
                        containerStyle={{ margin: 15 }}
                        name='trash'
                        color='red'
                        type='font-awesome'
                        onPress={() => { console.log('match deleted') }} />
                    <Icon
                        raised
                        iconStyle={{ fontSize: 40 }}
                        containerStyle={{ margin: 15 }}
                        name='exclamation-triangle'
                        color='yellow'
                        type='font-awesome'
                        onPress={() => { console.log('match signalé') }} />
                </View>
                <View style={styles.rightContainer}>
                    <Text>Où en êtes-vous ?</Text>
                    <Button title={status} />
                </View>
                <Animated.View style={[{ ...this.position.getLayout() }, { position: 'absolute', width: '100%' }]}
                    {...this._panResponder.panHandlers}>
                    <View style={{ position: 'relative' }}>
                        <View style={styles.slidableContent}>
                            <Icon
                                name='caret-left'
                                type='font-awesome'
                                onPress={() => { this.forceSwipe('right') }} />
                            <Avatar
                                rounded
                                size='medium'
                                source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
                            />
                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>{name}</Text>
                            <Icon
                                name='caret-right'
                                type='font-awesome'
                                onPress={() => { this.forceSwipe('left') }} />

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
    },
    leftContainer: {
        position: 'absolute',
        left: 0,
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 80,
        overflow: 'hidden'
    },
    rightContainer: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        width: '50%',
        height: 80,
        overflow: 'hidden'
    },
    slidableContent: {
        width: '100%',
        height: 80,
        backgroundColor: '#fafafa',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
