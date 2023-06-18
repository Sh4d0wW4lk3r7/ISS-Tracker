// DQkmM2h5E0BSaEGsAGFo1M8dKIPaGdcy2KgUlEVQ
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import axios from 'axios';
export default class Meteors extends Component {
  constructor() {
    super();
    this.state = { m2: {} };
  }
  getdata() {
    console.log(11);
    axios
      .get(
        'https://api.nasa.gov/neo/rest/v1/feed?api_key=DQkmM2h5E0BSaEGsAGFo1M8dKIPaGdcy2KgUlEVQ'
      )
      .then((i) => {
        console.log(17);
        this.setState({ m2: i.data.near_earth_objects });
      })
      .catch((i) => {
        console.log(i.message);
      });
  }
  componentDidMount() {
    this.getdata();
  }
  keyExtractor = (item, index) => {
    index.toString();
  };
  renderItem = ({ item }) => {
    console.log(item);
    var bg, speed, size;
    if (item.ts <= 30) {
      bg = require('../assets2/meteor_bg1.png');
      speed = require('../assets2/meteor_speed1.gif');
      size = 100;
    } else if (item.ts <= 75) {
      bg = require('../assets2/meteor_bg2.png');
      speed = require('../assets2/meteor_speed2.gif');
      size = 150;
    } else {
      bg = require('../assets2/meteor_bg3.png');
      speed = require('../assets2/meteor_speed3.gif');
      size = 200;
    }
    return (
      <View>
        <ImageBackground
          source={bg}
          style={{
            flex: 1,
            resizeMode: 'cover',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <Image
            source={speed}
            style={{ width: size, height: size, alignSelf: 'center' }}
          />
          <View
            style={{
              backgroundColor: '#0E8388',
              position: 'absolute',
              bottom: 0,
              margin: 20,
              padding: 20,
              opacity: 0.75,
              alignSelf:"center"
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#CBE4DE', fontWeight: 'bold' }}>
                Closest to Earth:{' '}
              </Text>
              <Text style={{ color: '#CBE4DE', fontWeight: 'bold' }}>
                {item.close_approach_data[0].close_approach_date_full}
              </Text>
            </View>

 <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#CBE4DE', fontWeight: 'bold' }}>
                Minimum diameter(km):{' '}
              </Text>
              <Text style={{ color: '#CBE4DE', fontWeight: 'bold',marginTop:10 }}>
                {item.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
            </View>

<View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#CBE4DE', fontWeight: 'bold' }}>
                Minimum diameter(km):{' '}
              </Text>
              <Text style={{ color: '#CBE4DE', fontWeight: 'bold',marginTop:10 }}>
                {item.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
            </View>

<View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#CBE4DE', fontWeight: 'bold' }}>
                Missing Earth by(km):{' '}
              </Text>
              <Text style={{ color: '#CBE4DE', fontWeight: 'bold',marginTop:10 }}>
                {item.close_approach_data[0].miss_distance.kilometers}
              </Text>
            </View>

          </View>
        </ImageBackground>
      </View>
    );
  };
  render() {
    console.log(26, this.state.m2);
    if (Object.keys(this.state.m2).length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      var ma = Object.keys(this.state.m2).map((i) => {
        return this.state.m2[i];
      });
      var m1 = [].concat.apply([], ma);

      /**"estimated_diameter": {
		"kilometers": {
			"estimated_diameter_min": 0.2745079817,
			"estimated_diameter_max": 0.6138185073
		}, */

      m1.forEach(function (i) {
        var d =
          (i.estimated_diameter.kilometers.estimated_diameter_min +
            i.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        // console.log(84, d)
        var ts =
          (d / i.close_approach_data[0].miss_distance.kilometers) * 1000000000;
        // console.log(86, ts)
        i.ts = ts;
      });
      m1.sort(function (a, b) {
        return b.ts - a.ts;
      });
      m1 = m1.slice(0, 5);
      console.log(52, '\n', m1);
      return (
        <View style={s.v1}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={m1}
            renderItem={this.renderItem}
            horizontal={true}
          />
        </View>
      );
    }
  }
}
const s = StyleSheet.create({
  t1: { color: 'red', fontSize: 32 },
  v1: {
    backgroundColor: 'skyblue',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
