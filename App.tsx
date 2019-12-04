import React, { Component } from 'react';
import * as Font from 'expo-font';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignUp from './views/signUpView';
import SignIn from './views/signInView';


const AppNavigator = createSwitchNavigator(
  {
    SignIn: SignIn,
    SignUp: SignUp,
  },
  {
    initialRouteName: 'SignIn',
  }
);

const SignInContainer = createAppContainer(AppNavigator);

export default class App extends Component {

    state = {
      isLoaded: false,
    }

  componentWillMount() {
    Font.loadAsync({
      'NotoSans-Bold': require('./assets/fonts/NotoSans-Bold.ttf'),
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