import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SignUp from './views/signUpView';
import SignIn from './views/signInView';

import { TransitionConfiguration } from './TransitionsApp';
import MatcherView from './views/matcherView';
// import WheelOfFortune from './components/WheelOfFortune'

const DrawerNavigator = createDrawerNavigator(
  {
    Matcher: { screen: MatcherView},
    // WheelOfFortune: { screen: WheelOfFortune},
    // MatcherTest: { screen: MatcherTestView},
  },
  {
    initialRouteName: 'Matcher',
    drawerType: 'back',
    navigationOptions: {
      headerLeft: withNavigation(({navigation}) => <Text onPress={()=>{navigation.toggleDrawer()}} style={{color: 'black'}}>Menu</Text>),
    }
  }
)
  
const AppNavigator = createStackNavigator(
  {
    SignIn: { screen: SignIn},
    SignUp: { screen: SignUp},
    LogIn: { screen: DrawerNavigator},
  },
  {
    initialRouteName: 'SignIn',
    transitionConfig: TransitionConfiguration,
  }
);

export const SignInContainer = createAppContainer(AppNavigator);

