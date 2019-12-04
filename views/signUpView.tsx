import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

export default class SignUp extends Component {
  render () {
    return (

        <View style={styles.container}>
            <Image source={require('../alsajuto_mobile/assets/landingBackground.jpg')} style={styles.backgroundImage}
                resizeMode='cover' blurRadius={4} />

            <LinearGradient colors={['#D42D4EAA', '#B11231AA' ,'#8D011DAA']}
                style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>

                <Text style={{position: 'absolute', color: 'white', fontSize: 25, top: '10%'}}>There's always time to
                    Catch
                    up!</Text>

                <View style={{width: '100%', height: 400, justifyContent: 'space-between'}}>
                    <Text style={styles.label}>Pseudo</Text>
                    <Input style={{width: '95%'}} placeholder='Choose a pseudonyme'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white'}} />
                    <Text style={styles.label}>Email</Text>
                    <Input style={{width: '95%'}} placeholder='E-mail adress'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white' }} />
                    <Text style={styles.label}>Confirm E-mail</Text>
                    <Input style={{width: '95%'}} placeholder='Confirm E-mail adress'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white' }} />
                    <Text style={styles.label}>Password</Text>
                    <Input style={{width: '95%'}} placeholder='Choose a password'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white' }} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <Input style={{width: '100%'}} placeholder='Confirm password'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white' }} />

                    <Button title="Register" />
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
      color: 'white',
    }
  });