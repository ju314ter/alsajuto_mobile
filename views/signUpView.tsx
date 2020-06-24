import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

import * as Helpers from '../helpers';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    navigation: any
}

export default class SignUp extends Component<Props> {

    state = {
        username: '',
        email: '',
        emailConf: '',
        password: '',
        passwordConf: '',
        redirectToReferrer: false,
        error: '',
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerShown: false
        }
    }

    register = () => {
        if (this.state.email
            && this.state.password
            && this.state.password === this.state.passwordConf
            && this.state.email === this.state.emailConf
        ) {
            const payload = {
                email: this.state.email,
                password: this.state.password,
                username: this.state.username
            }
            Helpers.requestService('app_users', 'POST', payload).then((res: any) => {
                console.log(res)
                if (res.id) {
                    alert('Sucess ! you will be logged in !');
                    this.props.navigation.navigate('LogIn');
                }
                else {
                    !res.errors[0].message ? alert('Something went wrong...') : alert(res.errors[0].message);
                }
            }).catch((err) => {
                console.log(err)
            });
        } else {
            alert('Please fill all fields');
        }
    }

    render() {
        return (

            <View style={styles.container}>

                <Image source={require('../assets/landingBackground.jpg')} style={styles.backgroundImage}
                    resizeMode='cover' blurRadius={4} />

                <LinearGradient colors={['#d6a9b2ef', '#baa6aaaa', '#968d8fef']} style={styles.linearGradient}>

                <Text style={styles.title}>LOVE ON</Text>

                    <ScrollView style={styles.scrollView}>

                        <View style={styles.form}>

                            <Input placeholderTextColor="black" placeholder='Username' onChangeText={(username) => this.setState({ username })}
                                value={this.state.username} />

                            <Input placeholderTextColor="black" placeholder='E-mail' onChangeText={(email) => this.setState({ email })}
                                value={this.state.email} />

                            <Input placeholderTextColor="black" placeholder='Confirm E-mail' onChangeText={(emailConf) => this.setState({ emailConf })}
                                value={this.state.emailConf} />

                            <Input placeholderTextColor="black" placeholder='Password' onChangeText={(password) => this.setState({ password })}
                                value={this.state.password} secureTextEntry={true} />

                            <Input placeholderTextColor="black" placeholder='Confirm Password' onChangeText={(passwordConf) => this.setState({ passwordConf })}
                                value={this.state.passwordConf} secureTextEntry={true} />
                        </View>
                        <View style={styles.buttonView}>
                            {/* SUBMIT BUTTON */}
                            <Button title="Register" containerStyle={{ padding: 5 }} titleStyle={{ color: 'white' }}
                                buttonStyle={{ backgroundColor: '#D42D4EAA' }} onPress={() => { this.register(); }} />

                            {/* BACK BUTTON */}
                            <Button title="Back" onPress={() => this.props.navigation.navigate('SignIn')}
                                containerStyle={{ padding: 5 }} titleStyle={{ color: 'white' }}
                                buttonStyle={{ backgroundColor: '#8D011DAA' }} />
                        </View>
                    </ScrollView>
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
        justifyContent: 'space-around',
        position: "relative"
    },
    title: {
        position: 'absolute',
        fontFamily: 'NotoSans-Bold',
        color: 'white',
        fontSize: 20,
        top: '10%',
        marginBottom: '40%'
    },
    scrollView: {
        width: '80%',
        height: '100%'
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    label: {
        color: 'black',
        fontFamily: 'NotoSans-Regular'
    },
    linearGradient: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    form: {
        marginTop: '40%',
        width: '100%',
        height: '80%',
        justifyContent: 'space-between'
    },
    buttonView: {

    }
});