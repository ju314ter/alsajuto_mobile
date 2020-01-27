import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { State } from 'react-native-gesture-handler';

interface Props {
  navigation: any
}

export default class SignIn extends Component<Props> {

  state = {
    email: '',
    password: ''
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerShown: false
    }
  }
  5


  login = () => {
      fetch('https://alsatoju-dev.herokuapp.com/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
      .then((res)=>{
        console.log(res);
          if (res.token) {
            alert('Sucess ! you will be logged in !');
            this.props.navigation.navigate('LogIn');
          }
          else {
            alert('Something went wrong...')
          }
      })
      .catch((err)=>{console.log(err)});
  }

  render () {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/landingBackground.jpg')} style={styles.backgroundImage}
          resizeMode='cover' blurRadius={4} />

        <LinearGradient colors={['#D42D4EAA', '#B11231AA' ,'#8D011DAA']}
          style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>

          <Text style={{position: 'absolute', fontFamily:'NotoSans-Bold', color: 'white', fontSize: 20, top: '10%'}}>There's always time to Catch
            up!</Text>

          <View style={{width: '80%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: '100%', height: 200, justifyContent: 'space-between'}}>
              <View style={{margin: 10}}>
                <Input inputStyle={{color: 'white'}} placeholder='E-mail or pseudo' />
                <Input inputStyle={{color: 'white'}} placeholder='Password' />
              </View>
              <View>
                <Button title="Login" containerStyle={{padding: 5}} titleStyle={{color: '#eeeeee'}}
                  buttonStyle={{backgroundColor: '#8D011D'}} 
                  onPress={() => this.props.navigation.navigate('LogIn')}
                  />
                <Button title="Get started" containerStyle={{padding: 5}} titleStyle={{color: '#eeeeee'}}
                  buttonStyle={{backgroundColor: '#8D011D'}}
                  onPress={() => this.props.navigation.navigate('SignUp')}
                  />
              </View>

              <Text style={{alignSelf: 'flex-end', padding: 5, color: '#eeeeee'}}>Can't acess your account ?</Text>
            </View>
          </View>

        </LinearGradient>

      </View>
    );
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
