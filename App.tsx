import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Font from 'expo-font';
import { ButtonGroup, Button, Input, withTheme } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import SignIn from './views/signInView';


export default class App extends Component {

    state = {
      isLoaded: false,
    }

  componentWillMount() {
    Font.loadAsync({
      'noto-sans-bold': require('./assets/fonts/NotoSans-Bold.ttf'),
    }).then(()=>{this.setState({isLoaded: true})});
  }


  render () {
    if(this.state.isLoaded === true)
    return ( 
      <SignIn />
    ) 
    else {
      return null;
    };
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
