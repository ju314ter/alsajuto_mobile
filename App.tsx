import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonGroup, Button, Input, withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';


export default class App extends Component {

    state = {
      selectedIndex: 0
    }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
  }

  render () {

    const { selectedIndex } = this.state
    const buttons = ['Sign In ', 'Sign Up']

    const SignIn = (
      <View style={{width: '100%', height: 200, justifyContent: 'space-between'}}>
        <View>
          <Input
              style={{width: '95%'}}
              placeholder='E-mail or pseudo'
            />
          <Input
              style={{width: '95%'}}
              placeholder='Password'
            />
        </View>
        <View>
          <Button title="Login" containerStyle={{padding: 5}} titleStyle={{color: 'white'}} buttonStyle={{backgroundColor: '#8D011D'}}/>
          <Button title="Register" containerStyle={{padding: 5}} titleStyle={{color: 'white'}} buttonStyle={{backgroundColor: '#8D011D'}}/>
        </View>

          <Text style={{alignSelf: 'flex-end', padding: 5}}>Can't acess your account ?</Text>
      </View>
    )

    const SignUp = (
      <View style={{width: '100%', height: 400, justifyContent: 'space-between'}}>
          <Text style={styles.label}>Pseudo</Text>
          <Input
              style={{width: '95%'}}
              placeholder='Choose a pseudonyme'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white'}}
            />
          <Text style={styles.label}>Email</Text>
          <Input
              style={{width: '95%'}}
              placeholder='E-mail adress'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white' }}
            />
          <Text style={styles.label}>Confirm E-mail</Text>
          <Input
              style={{width: '95%'}}
              placeholder='Confirm E-mail adress'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white' }}
            />
          <Text style={styles.label}>Password</Text>
          <Input
              style={{width: '95%'}}
              placeholder='Choose a password'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white' }}
            />
          <Text style={styles.label}>Confirm Password</Text>
          <Input
              style={{width: '100%'}}
              placeholder='Confirm password'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right', size: 10, color: 'white' }}
            />

          <Button title="Register"/>
      </View>
    ) 

    return ( 
      <View style={styles.container}>
        <Image source={require('../alsajuto_mobile/assets/landingBackground.jpg')}
        style={styles.backgroundImage} 
        resizeMode='cover' 
        blurRadius={4}/>

        <LinearGradient
          colors={['#8D011DAA', '#B11231AA', '#D42D4EAA']}
          style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>

          <Text style={{position: 'absolute', color: 'white', fontSize: 25, top: '10%'}}>There's always time to Catch up!</Text>

          <View style={{width: '70%', justifyContent: 'center', alignItems: 'center'}}>
              {
                this.state.selectedIndex == 0 ? SignIn : SignUp
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
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  label : {
    color: 'white',
  }
});
