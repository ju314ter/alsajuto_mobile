import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as Helpers from '../helpers';

interface Props {
  navigation: any
}

export default class SignIn extends Component<Props> {

  state = {
    email: 'julien@hypecode.com',
    password: 'password',
    isLoading: false
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false
    }
  }

  login = () => {
    this.setState({ isLoading: true })
    const payload = {
      email: this.state.email,
      password: this.state.password,
    }

    // Call API
    Helpers.LoginCall(payload).then((res: any) => {
      // if token retrieve
      if (!res.token) {
        alert('Something went wrong...')
        this.setState({ isLoading: false })
        return ;
      }
      alert('Sucess ! You\'re logged in !');
      // token saved in locally
      Helpers.storeDataLocally('token', res.token).then().catch((e) => {
        console.log({ message: 'Error', detail: e })
        this.setState({ isLoading: false })
      })
      Helpers.getMyProfile(res.token).then((user: any) => {
        // We try a param of the object to be sure
        if (user.id) {
          //Store User infos
          const userStringify = JSON.stringify(user)
          Helpers.storeDataLocally('user', userStringify).catch((e) => console.log({ message: 'Error', detail: e }));
          console.log('stored :', userStringify)
          // redirect to ->
          this.setState({ isLoading: false })
          this.props.navigation.navigate('LogIn');
        } else {
          console.log('trouble fetching user profile at SignInView.tsx')
          alert('Oops, Something Went wrong ...')
          this.setState({ isLoading: false })
        }
      }).catch(e => {
        console.log({ message: 'Error', detail: e })
        this.setState({ isLoading: false })
      })
    })
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
  componentDidMount() {
    Helpers.getDataLocally('token').then((res) => {
      console.log('stored TOKEN : ', res);
      if (!res) {
        this.setState({ isLoading: false })
        return;
      }
      Helpers.getMyProfile(res).then((user: any) => {
        if (user) {
          //Store userID
          const userStringify = JSON.stringify(user)
          Helpers.storeDataLocally('user', userStringify).catch((err) => console.log(err));
          console.log('stored user :', userStringify)
          // redirect to ->
          this.setState({ isLoading: false })
          this.props.navigation.navigate('LogIn');
          Helpers.getMyProfilePicture(res).then(profilPicture => {
            if (profilPicture) {
              const profilPictureStringify = JSON.stringify(profilPicture)
              Helpers.storeDataLocally('profilPicutre', profilPictureStringify).catch(e => console.log(e));
            }
          })
        } else {
          console.log('trouble fetching user profile at SignInView.tsx')
          this.setState({ isLoading: false })
        }
      }).catch(err => {
        console.log(err)
        this.setState({ isLoading: false })
      })
    }).catch(err => {
      console.log(err)
      this.setState({ isLoading: false })
    })
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
