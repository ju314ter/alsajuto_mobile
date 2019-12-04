import React, { Component } from 'react';
import * as Font from 'expo-font';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignUp from './views/signUpView';
import SignIn from './views/signInView';

import TransitionConfiguration from './TransitionsApp';
import MatcherView from './views/matcherView';


const AppNavigator = createStackNavigator(
  {
    SignIn: { screen: SignIn},
    SignUp: { screen: SignUp},
    Home: { screen: MatcherView},
  },
  {
    initialRouteName: 'SignIn',
    transitionConfig: TransitionConfiguration,
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