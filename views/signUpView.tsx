import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
    navigation: any
  }
export default class SignUp extends Component<Props> {

  static navigationOptions = ({navigation}) => {
    return {
      headerShown: false
    }
  }

  render () {
    return (

        <View style={styles.container}>
            <Image source={require('../assets/landingBackground.jpg')} style={styles.backgroundImage}
            resizeMode='cover' blurRadius={4} />

            <LinearGradient colors={['#d6a9b2aa', '#baa6aaaa' ,'#968d8faa']}
                style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>

                <Text style={{position: 'absolute', color: 'black', fontFamily: 'NotoSans-Bold', fontSize: 20, top: '10%'}}>There's always time to
                    Catch
                    up!</Text>

                <View style={{width: '80%', height: 400, justifyContent: 'space-between'}}>
                    <Input inputStyle={{fontFamily: 'NotoSans-Italic'}} labelStyle={{color: 'black', fontFamily: 'NotoSans-Regular'}}
                        label='Choose a pseudonyme'
                        leftIconContainerStyle={{paddingRight: 10}} leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black'}} />
                    <Input inputStyle={{fontFamily: 'NotoSans-Italic'}} labelStyle={{color: 'black', fontFamily: 'NotoSans-Regular'}}
                        label='E-mail'
                        leftIconContainerStyle={{paddingRight: 10}} leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black'}} />
                    <Input inputStyle={{fontFamily: 'NotoSans-Italic'}} labelStyle={{color: 'black', fontFamily: 'NotoSans-Regular'}}
                        label='Confirm E-mail'
                        leftIconContainerStyle={{paddingRight: 10}} leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black'}} />
                    <Input inputStyle={{fontFamily: 'NotoSans-Italic'}} labelStyle={{color: 'black', fontFamily: 'NotoSans-Regular'}}
                        label='Password'
                        leftIconContainerStyle={{paddingRight: 10}} leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black'}} />
                    <Input inputStyle={{fontFamily: 'NotoSans-Italic'}} labelStyle={{color: 'black', fontFamily: 'NotoSans-Regular'}}
                        label='Confirm Password'
                        leftIconContainerStyle={{paddingRight: 10}} leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'black'}} />

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