import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface NavigationParams {
  my_param: string; // You can change "string" to what you are using
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}

export default class SignUp extends Component<Props> {

  render () {
    return (

        <View style={styles.container}>
            <Image source={require('../assets/landingBackground.jpg')} style={styles.backgroundImage}
            resizeMode='cover' blurRadius={4} />

            <LinearGradient colors={['#d6a9b2aa', '#baa6aaaa' ,'#968d8faa']}
                style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>

                <Text style={{position: 'absolute', color: 'black', fontSize: 20, top: '10%'}}>There's always time to
                    Catch
                    up!</Text>

                <View style={{width: '80%', height: 400, justifyContent: 'space-between'}}>
                    <Text style={styles.label}>Pseudo</Text>
                    <Input style={{width: '95%'}} placeholder='Choose a pseudonyme'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black'}} />
                    <Text style={styles.label}>Email</Text>
                    <Input style={{width: '95%'}} placeholder='E-mail adress'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black' }} />
                    <Text style={styles.label}>Confirm E-mail</Text>
                    <Input style={{width: '95%'}} placeholder='Confirm E-mail adress'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black' }} />
                    <Text style={styles.label}>Password</Text>
                    <Input style={{width: '95%'}} placeholder='Choose a password'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black' }} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <Input style={{width: '100%'}} placeholder='Confirm password'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black' }} />

                    <Button title="Register" containerStyle={{padding: 5}} titleStyle={{color: 'black'}}
                  buttonStyle={{backgroundColor: '#eeeeee'}}/>
                    <Button title="Back" onPress={()=> this.props.navigation.navigate('SignIn')} 
                    containerStyle={{padding: 5}} titleStyle={{color: 'black'}}
                  buttonStyle={{backgroundColor: '#eeeeee'}}/>
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
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },
    label : {
      color: 'black',
      fontFamily: 'NotoSans-Regular'
    }
  });