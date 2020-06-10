import React, { Component } from 'react';
import { StyleSheet, Text, View, PanResponder, Dimensions, Animated, UIManager, LayoutAnimation } from 'react-native';
import { Icon, Button, Avatar } from 'react-native-elements';
import { getStorageData } from '../services/provider';
import { getProfilPicture } from '../services/user';
import * as Helpers from '../helpers';
import ProfileView from '../views/settings/ProfileView';
import Axios from 'axios';
import * as constant from '../Utils/constant';



interface Props {
    navigation: any;
    match: any;
}

interface State {
    status: number;
    matchname: string;
    profilePic: any;
    profile: any;
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
            status: 0,
            matchname: 'Matchname',
            profilePic: {
                uri: true,
                data: 'https://i1.sndcdn.com/artworks-000244718297-hgnnd2-t500x500.jpg'
            },
            profile: {}
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

    componentDidMount = async () => {
        console.log('match props : ', this.props.match)
        console.log('match id : ', this.props.match.id)
        const storedData = await getStorageData()
        let userId;
        storedData.user.id === this.props.match.userOne ? userId = this.props.match.userTwo : userId = this.props.match.userOne
        try {
            const profilPictureUrl = await getProfilPicture(userId)
            if (profilPictureUrl) {
                this.setState({ profilePic: { uri: false, data: profilPictureUrl } })
            }
        } catch (e) {
            console.log(e)
        }
        try {
            // await Axios.get(constant.GAMES + '/' + )
        } catch (e) {
            console.log(e)
        }

        Helpers.requestService('app_users/', 'GET', userId).then((res: any) => {
            console.log(res)
            this.setState({ profile: res })
        })

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
        const { match } = this.props;
        const { status, profile } = this.state;

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
                    {
                        status === 0 ?
                            <Button title='Lancez-vous !' onPress={() => {
                                this.props.navigation.navigate('GameChoice', {
                                    matchId: `${match.id}`,
                                    gameStatus: `${status}`,
                                    userOne: this.props.match.userOne,
                                    userTwo: this.props.match.userTwo,
                                })
                            }} />
                            :
                            <Button title='Reprendre la partie' />
                    }
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
                                source={{ uri: (this.state.profilePic.uri) ? this.state.profilePic.data : "data:image/png;base64," + this.state.profilePic.data }}
                            />

                            <Text style={{ fontSize: 15, fontWeight: '500', color: 'black' }}>{profile.firstName}</Text>
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
        backgroundColor: 'white',
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
