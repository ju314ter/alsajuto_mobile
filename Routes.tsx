import React from 'react'
import { View, Dimensions, Text } from 'react-native'
import { createAppContainer, withNavigation } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import SignUp from './views/signUpView'
import SignIn from './views/signInView'
import Logout from './logout'
import RecoverAccount from './views/recoverAccountView'
import { Icon } from 'react-native-elements'

import { TransitionConfiguration } from './TransitionsApp'
import MatcherView from './views/matching/matcherView'
import GamesView from './views/games/gamesView'
import QuizzView from './views/games/quizzView'
import MatchListView from './views/matching/matchListView'
import NotificationsView from './views/notificationsView'
import SettingsView from './views/settings/settingsView'
import Preference from './views/settings/PreferenceView'
import ProfileView from './views/settings/ProfileView'

const ProfileNavigator = createStackNavigator({
  Settings: { screen: SettingsView },
  Profile: { screen: ProfileView },
  Preference: { screen: Preference }
}, {
  initialRouteName: 'Settings',
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

const DrawerNavigator = createDrawerNavigator({
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
            color='red'
          />
        </View>)
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
            color='red'
          />
        </View>)
    }
  }
}, {
  initialRouteName: 'Matcher',
  drawerType: 'back',
  drawerWidth: Dimensions.get('screen').width / 4,
  navigationOptions: {
    headerLeft: withNavigation(({ navigation, props }) => (
      <View style={{
        width: Dimensions.get('screen').width,
        height: '100%',
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Icon
          raised
          name='heartbeat'
          iconStyle={{ fontSize: 20 }}
          containerStyle={{ marginLeft: 10 }}
          size={20}
          type='font-awesome'
          color='#f50'
          onPress={() => { navigation.toggleDrawer() }} />
        <Text style={{ fontSize: 35, color: 'white', marginRight: 10 }}>Love On</Text>
      </View>
    ))
  }
})

const AppNavigator = createStackNavigator(
  {
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    RecoverPwd: { screen: RecoverAccount },
    LogIn: { screen: DrawerNavigator },
    Games: { screen: GamesNavigator, navigationOptions: { headerShown: false } },
  },
  {
    initialRouteName: 'SignIn',
    transitionConfig: TransitionConfiguration
  }
)

export const SignInContainer = createAppContainer(AppNavigator)
