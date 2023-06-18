import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import * as Font from 'expo-font';
export default class Isslocation extends Component {
  constructor() {
    super();
    this.state = {
      loc: {},
      flag: false,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.getloc();
    }, 10000);
  }


  getloc = () => {
    axios
      .get('https://api.wheretheiss.at/v1/satellites/25544')
      .then((r) => {
        this.setState({ loc: r.data, flag: true });
      })
      .catch((i) => {
        console.log(i.message);
        this.setState({ flag: false });
      });
  };

  render() {
    console.log(52, this.state.loc);
    if (Object.keys(this.state.loc).length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading ... </Text>
        </View>
      );
    } else {
      return (
        <View style={s.v1}>
          <Text style={s.t1}> ISS Location </Text>
          <View style={s.mapContainer}>
            <MapView
              style={s.map}
              region={{
                latitude: this.state.loc.latitude,
                longitude: this.state.loc.longitude,
                latitudeDelta: 100,
                longitudeDelta: 100,
              }}
              // scrollEnabled={false}
              zoomEnabled={true}>
              <Marker
                coordinate={{
                  latitude: this.state.loc.latitude,
                  longitude: this.state.loc.longitude,
                }}>
                <Image
                  source={require('../assets2/iss_icon.png')}
                  style={{ height: 15, width: 15 }}
                />
              </Marker>
            </MapView>
          </View>
          <View style={s.dataCard}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={s.dataTitle}>Latitude:{"\t\t\t"}</Text>
              <Text style={s.dataText}>{Math.round(this.state.loc.latitude * 100) / 100}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={s.dataTitle}>Longitude:{"\t\t\t"}</Text>
              <Text style={s.dataText}>{Math.round(this.state.loc.longitude * 100) / 100}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={s.dataTitle}>Date:</Text>
              <Text style={s.dataText}>{new Date(this.state.loc.timestamp* 1000).toGMTString()}</Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const s = StyleSheet.create({
  t1: {
    color: 'white',
    fontSize: 32,
    fontFamily: 'bruno',
    marginBottom: 30,
  },
  v1: {
    backgroundColor: '#144272',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    // flex: 0.6, // this didn't work that's why set width and height seperately
    margin: 10,
    // backgroundColor:"pink",
    width: '80%',
    height: '50%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  dataCard: {
    backgroundColor: 'pink',
     width: '80%',
    height: 150,
    padding:10
  },
  dataTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  dataText: {
    fontSize: 20,
  },
});
