import React, { Component } from 'react';
import * as Font from 'expo-font';
import * as Asset from 'expo-asset';
import { SignInContainer } from './Routes';
import { AppLoading } from 'expo';
import { Profile } from './Models';

export default class App extends Component {

  state = {
    fontsLoaded: false,
  }

  componentDidMount() {
    Font.loadAsync({
      'NotoSans-Bold': require('./assets/fonts/NotoSans-Bold.ttf'),
      'NotoSans-Italic': require('./assets/fonts/NotoSans-Italic.ttf'),
      'NotoSans-Regular': require('./assets/fonts/NotoSans-Regular.ttf'),
    }).then(() => {
      this.setState({ fontsLoaded: true });
    })
  }

  render() {
    if (this.state.fontsLoaded)
      return (
        <SignInContainer />
      )
    else {
      return <AppLoading />;
    };
  }
}