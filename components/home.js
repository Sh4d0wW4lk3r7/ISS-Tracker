import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import * as Font from 'expo-font';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { font: false };
  }
  loadfonts = async () => {
    await Font.loadAsync({
      bruno: require('../assets/fonts/BrunoAceSC-Regular.ttf'),
      aw: require('../assets/fonts/Audiowide-Regular.ttf'),
    });
    this.setState({ font: true });
  };
  componentDidMount() {
    this.loadfonts();
  }
  render() {
    if (!this.state.font) {
      return null;
    }
    return (
      <View style={s.v1}>
        <ImageBackground
          style={{ resizeMode: 'contain', width: '100', height: '100%' }}
          source={require('../assets/space.jpg')}>
          <Text style={s.t1}> ISS Tracker </Text>
          <View
            style={{
              flex: 0.8,
              margin: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={s.to}
              onPress={() => {
                this.props.navigation.navigate('iss');
              }}>
              <Image
                source={require('../assets2/iss_icon.png')}
                style={[s.ii, { width: 150, height: 100,top:-60 }]}
              />
              <Text style={s.t2}> Iss{}location </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={s.to}
              onPress={() => {
                this.props.navigation.navigate('meteors');
              }}>
              <Image
                source={require('../assets2/meteor_icon.png')}
                style={[s.ii, { width: 200, height: 150,top:-60 }]}
              />
              <Text style={s.t2}> Meteors </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const s = StyleSheet.create({
  t1: {
    color: 'red',
    fontSize: 32,
    fontFamily: 'bruno',
    textAlign: 'center',
    marginTop: 20,
  },
  v1: {
    backgroundColor: 'skyblue',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  t2: {
    color: 'black',
    textAlign: 'center',
    fontSize: 31,
    fontWeight: 'bold',
    fontFamily: 'aw',
  },
  to: {
    width: 200,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ii:{position:'absolute'}
});
