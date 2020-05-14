import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import SignUp from './views/signUpView';
import SignIn from './views/signInView';
import Logout from './logout';
import RecoverAccount from './views/recoverAccountView';
import { Icon } from 'react-native-elements';
import { Dimensions } from 'react-native';

import { TransitionConfiguration } from './TransitionsApp'
import MatcherView from './views/matching/matcherView'
import GamesView from './views/games/gamesView'
import QuizzView from './views/games/quizzView'
import SettingsView from './views/settings/settingsView'
import MatchListView from './views/matching/matchListView'
import NotificationsView from './views/notificationsView'
import prefsView from './views/settings/prefView'
import paramsView from './views/settings/paramsView'
import displayedParamsView from './views/settings/displayedView'

const ProfileNavigator = createStackNavigator({
  Profile: { screen: SettingsView },
  DisplayedParams: { screen: displayedParamsView },
  Params: { screen: paramsView },
  Prefs: { screen: prefsView }
}, {
  initialRouteName: 'Profile',
  transitionConfig: TransitionConfiguration,
  defaultNavigationOptions: {
    headerShown: false
  }
})

const GamesNavigator = createStackNavigator({
  GameChoice: { screen: GamesView },
  Quizz: { screen: QuizzView }
}, {
  initialRouteName: 'GameChoice',
  transitionConfig: TransitionConfiguration,
  defaultNavigationOptions: {
    headerShown: false
  }
})

const DrawerNavigator = createDrawerNavigator(
  {
    Matcher: {
      screen: MatcherView,
      navigationOptions: {
        drawerLabel: (
          <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Icon
              name='users'
              iconStyle={{ fontSize: 40, margin: 10 }}
              size={40}
              type='font-awesome'
              color='red' />
          </View>),
      }
    },
    Settings: {
      screen: ProfileNavigator,
      navigationOptions: {
        drawerLabel: (
          <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Icon
              name='cogs'
              iconStyle={{ fontSize: 40, margin: 10 }}
              size={40}
              type='font-awesome'
              color='red' />
          </View>),
      }
    },
    Matchlist: {
      screen: MatchListView,
      navigationOptions: {
        drawerLabel: (
          <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Icon
              name='trophy'
              iconStyle={{ fontSize: 40, margin: 10 }}
              size={40}
              type='font-awesome'
              color='red' />
          </View>),
      }
    },
    Games: {
      screen: GamesNavigator,
    },
    Notifications: {
      screen: NotificationsView,
      navigationOptions: {
        drawerLabel: (
          <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Icon
              name='bell'
              iconStyle={{ fontSize: 40, margin: 10 }}
              size={40}
              type='font-awesome'
              color='red' />
          </View>),
      }
    },
    Logout: {
      screen: Logout,
      navigationOptions: {
        drawerLabel: (
          <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Icon
              name='logout-variant'
              iconStyle={{ fontSize: 40, margin: 10 }}
              size={40}
              type='material-community'
              color='red' />
          </View>),
      }
    },
  },
  Settings: {
    screen: ProfileNavigator,
    navigationOptions: {
      drawerLabel: (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Icon
            name='cogs'
            iconStyle={{ fontSize: 40, margin: 10 }}
            size={40}
            type='font-awesome'
            color='red'
          />
        </View>)
    }
  },
  Matchlist: {
    screen: MatchListView,
    navigationOptions: {
      drawerLabel: (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Icon
            name='trophy'
            iconStyle={{ fontSize: 40, margin: 10 }}
            size={40}
            type='font-awesome'
            color='red'
          />
        </View>)
    }
  },
  Games: {
    screen: GamesNavigator
  },
  Notifications: {
    screen: NotificationsView,
    navigationOptions: {
      drawerLabel: (
        <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Icon
            name='bell'
            iconStyle={{ fontSize: 40, margin: 10 }}
            size={40}
            type='font-awesome'
            color='red'
          />
        </View>)
    }
  }
}, {
  initialRouteName: 'Matchlist',
  drawerType: 'back',
  drawerWidth: Dimensions.get('screen').width / 4,
  navigationOptions: {
    headerLeft: withNavigation(({ navigation, props }) => (
      <View style={styles.MatchListStyle}>
        <Icon
          raised
          name='heartbeat'
          iconStyle={{ fontSize: 20 }}
          containerStyle={{ marginLeft: 10 }}
          size={20}
          type='font-awesome'
          color='#f50'
          onPress={() => { navigation.toggleDrawer() }}
        />
        <Text style={{ fontSize: 35, color: 'white', marginRight: 10 }}>Love On</Text>
      </View>
    ))
  }
}
)

const AppNavigator = createStackNavigator(
  {
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    RecoverPwd: { screen: RecoverAccount },
    LogIn: { screen: DrawerNavigator }
  },
  {
    initialRouteName: 'SignIn',
    transitionConfig: TransitionConfiguration
  }
)

const styles = StyleSheet.create({
  MatchListStyle: {
    width: Dimensions.get('screen').width,
    height: '100%',
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export const SignInContainer = createAppContainer(AppNavigator)
