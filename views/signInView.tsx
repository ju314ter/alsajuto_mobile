import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { login, getMe } from '../services/user'
import { setStorageData, getStorageData } from '../services/provider'


interface Props {
  navigation: any
}

export default class SignIn extends Component<Props> {
  state = {
    email: 'alanlima898@gmail.com',
    password: 'password',
    isLoading: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false
    }
  }

  login = async () => {
    this.setState({ isLoading: true })
    try {
      const { email, password } = this.state
      const token = await login({ email, password })
      const data = {
        user: await getMe(),
        token: token.token
      }
      await setStorageData(data)
      this.setState({ isLoading: false })
      this.props.navigation.navigate('LogIn');
    } catch (e) {
      console.log('catch login = async () => {...}\n' + e)
      this.setState({ isLoading: false })
      alert(e.message)
    }
  }

  /**
   * If token stored
   *    get the user
   *    if the user is retrieve
   *      you can go on
   *    else
   *      the token might be dead so we won't let you continue.
   *      you need to login again
   */
  componentDidMount = async () => {
    try {
      const storageData = await getStorageData()
      if (storageData) {
        const response = await getMe() // go to catch if token dead
        this.props.navigation.navigate('LogIn');
        this.setState({ isLoading: false })
      }
      this.setState({ isLoading: false })
    } catch (e) {
      console.log('componentDidMount : ' + e)
      this.setState({ isLoading: false })
    }
  }

  render() {
    const isLoading = this.state.isLoading;

    return (
      <View style={styles.container}>
        <Image source={require('../assets/landingBackground.jpg')} style={styles.backgroundImage} resizeMode='cover' blurRadius={4} />
        <LinearGradient colors={['#D42D4EAA', '#B11231AA', '#8D011DAA']} style={styles.linearGradient}>
          <Text style={styles.title}>LOVE ON</Text>
          {/* TODO : ADD LOGO HERE */}
          <View style={styles.form}>
            {isLoading ? (<ActivityIndicator />) : (
              <React.Fragment>
                <View style={{ margin: 10 }}>
                  <Input inputStyle={{ color: 'white' }} placeholderTextColor="#FFF" placeholder='E-mail' onChangeText={(email) => this.setState({ email })} />
                  <Input inputStyle={{ color: 'white' }} placeholderTextColor="#FFF" placeholder='Password' onChangeText={(password) => this.setState({ password })} secureTextEntry />
                </View>
                <View>
                  <Button title="Login" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                    buttonStyle={{ backgroundColor: '#8D011D' }}
                    onPress={() => this.login()}
                  />
                  <Button title="Get started" containerStyle={{ padding: 5 }} titleStyle={{ color: '#eeeeee' }}
                    buttonStyle={{ backgroundColor: '#8D011D' }}
                    onPress={() => this.props.navigation.navigate('SignUp')}
                  />
                </View>
              </React.Fragment>
            )}
            {/* <Text style={{ alignSelf: 'flex-end', padding: 5, color: '#eeeeee' }}>Can't acess your account ?</Text> */}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  form: {
    width: '80%',
    height: 200,
    justifyContent: 'space-between'
  },
  label: {
    color: 'white',
  },
  title: {
    position: 'absolute',
    fontFamily: 'NotoSans-Bold',
    color: 'white',
    fontSize: 20,
    top: '10%'
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
