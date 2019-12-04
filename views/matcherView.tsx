import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  navigation: any
}

export default class MatcherView extends Component<Props> {

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {display: 'none'}
    }
  }

  render () {
    return (
      <View style={styles.container}>

        <LinearGradient colors={['#D42D4E', '#B11231' ,'#8D011D']}
          style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'space-around'}}>

          <Text style={{fontFamily:'NotoSans-Regular', color: 'white', fontSize: 10}}>There's always time to Catch
            up!</Text>

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
});
