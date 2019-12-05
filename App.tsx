import React, { Component } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, Image } from 'react-native';

import { SignInContainer } from './Routes';

export default class App extends Component {

    state = {
      isLoaded: false,
    }

  componentWillMount() {
    Font.loadAsync({
      'NotoSans-Bold': require('./assets/fonts/NotoSans-Bold.ttf'),
      'NotoSans-Italic': require('./assets/fonts/NotoSans-Italic.ttf'),
      'NotoSans-Regular': require('./assets/fonts/NotoSans-Regular.ttf'),
    })
    .then(()=>{this.setState({isLoaded: true})});
  }

  render () {
    if(this.state.isLoaded === true)
    return (
        <SignInContainer/>
    ) 
    else {
      return null;
    };
  }
}