import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { ButtonGroup, Input } from 'react-native-elements';
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
      <View style={{width: '75%', height: '40%', justifyContent: 'space-between'}}>

          <Input
              style={{width: '95%'}}
              placeholder='E-mail or pseudo'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
            />

          <Input
              style={{width: '95%'}}
              placeholder='Password'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
            />

          <Text style={{alignSelf: 'flex-end'}}>Can't acess your account ?</Text>
      </View>
    )

    const SignUp = (
      <View style={{width: '75%', height: '40%', justifyContent: 'space-between'}}>
          <Text style={styles.label}>Pseudo</Text>
          <Input
              style={{width: '95%'}}
              placeholder='Choose a pseudonyme'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
            />
          <Text style={styles.label}>Email</Text>
          <Input
              style={{width: '95%'}}
              placeholder='E-mail adress'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
            />
          <Text style={styles.label}>Confirm E-mail</Text>
          <Input
              style={{width: '95%'}}
              placeholder='Confirm E-mail adress'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
            />
          <Text style={styles.label}>Password</Text>
          <Input
              style={{width: '95%'}}
              placeholder='Choose a password'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
            />
          <Text style={styles.label}>Confirm Password</Text>
          <Input
              style={{width: '95%'}}
              placeholder='Confirm password'
              leftIcon={{ type: 'font-awesome', name: 'chevron-right' }}
            />
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

          <View>
            <Text style={{color: 'white', fontSize: 25, marginBottom: 15}}>There's always time to Catch up!</Text>
          </View>

          <View style={{width: '70%', justifyContent: 'center', alignItems: 'center'}}>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                innerBorderStyle= {{width: 0}}
                containerStyle={{width: '100%', padding:0 , margin: 0, height: 40, backgroundColor: '#ffffffCC', borderTopLeftRadius: 15, borderTopRightRadius: 15}}
              />
              <View style={{backgroundColor: '#ffffffCC', width: '100%', height: 400, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
              {
                this.state.selectedIndex == 0 ? SignIn : SignUp
              }
              </View>
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

  }
});
