import Home from "./components/home"
import Isslocation from "./components/iss"
import Meteors from "./components/meteors"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from   "@react-navigation/stack"
import React, { Component } from 'react';
const Stack=createStackNavigator()
export default class App extends Component {
  render() {
    return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
    <Stack.Screen name="home" component={Home}/>
    <Stack.Screen name="iss" component={Isslocation}/>
    <Stack.Screen name="meteors" component={Meteors}/>
    </Stack.Navigator>
    </NavigationContainer>

    );
  }
}
