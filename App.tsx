import React, { Component } from 'react';
import * as Font from 'expo-font';
import * as Asset from 'expo-asset';
import { SignInContainer } from './Routes';
import { AppLoading } from 'expo';
import { Profile } from './Models';

// Remove this export
export const profiles: Profile[] = [
  {
    id: "1",
    name: "Caroline",
    age: 24,
    profile: require("./assets/profiles/1.jpg"),
  },
  {
    id: "2",
    name: "Jack",
    age: 30,
    profile: require("./assets/profiles/2.jpg"),
  },
  {
    id: "3",
    name: "Anet",
    age: 21,
    profile: require("./assets/profiles/3.jpg"),
  },
  {
    id: "4",
    name: "John",
    age: 28,
    profile: require("./assets/profiles/4.jpg"),
  },
  {
    id: "5",
    name: "Agrid",
    age: 18,
    profile: require("./assets/profiles/5.jpg"),
  },
  {
    id: "6",
    name: "Cha5",
    age: 28,
    profile: require("./assets/profiles/6.jpg"),
  },
  {
    id: "7",
    name: "Sebastien",
    age: 38,
    profile: require("./assets/profiles/7.jpg"),
  },
  {
    id: "8",
    name: "Robert",
    age: 24,
    profile: require("./assets/profiles/8.jpg"),
  },
  {
    id: "9",
    name: "Patrick",
    age: 24,
    profile: require("./assets/profiles/9.jpg"),
  },
  {
    id: "10",
    name: "Patrick",
    age: 24,
    profile: require("./assets/profiles/10.jpg"),
  },
  {
    id: "11",
    name: "Patrick",
    age: 24,
    profile: require("./assets/profiles/11.jpg"),
  },
  {
    id: "12",
    name: "Patrick",
    age: 24,
    profile: require("./assets/profiles/12.jpg"),
  },
];

export default class App extends Component {

    state = {
      fontsLoaded: false,
      assetsLoaded: false,
    }

  componentWillMount() {
    Font.loadAsync({
      'NotoSans-Bold': require('./assets/fonts/NotoSans-Bold.ttf'),
      'NotoSans-Italic': require('./assets/fonts/NotoSans-Italic.ttf'),
      'NotoSans-Regular': require('./assets/fonts/NotoSans-Regular.ttf'),
    }).then(()=>{
      this.setState({ fontsLoaded: true });
    })
  }

  async componentDidMount() {
    await Promise.all(profiles.map(profile => Asset.Asset.loadAsync(profile.profile)));
    this.setState({ assetsLoaded: true });
  }

  render () {
    if(this.state.assetsLoaded && this.state.fontsLoaded)
    return (
        <SignInContainer/>
    ) 
    else {
      return <AppLoading/>;
    };
  }
}