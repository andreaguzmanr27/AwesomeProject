import React, { Component } from 'react'
import 'react-native-gesture-handler';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, Alert,  FlatList, Image, Button, Dimensions } from 'react-native'
import Home from './src/components/Home';
import UserCards from './src/components/Characters'
import VIewCharacter from './src/components/VIewCharacter';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import store, {persistor} from './src/services/store';
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

class App extends Component {

  constructor(props) {
    super(props);
     this.state = {
      posts:[],
    }
  }
  getContent() {
    return (
      <NativeBaseProvider>
        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitle: () => (
              <View style={{flexDirection: 'row'}}>
              <Image
                source={require('./src/components/logoRM.png')}
                style={{ width: 30, height: 30, marginRight: 15 }}
              />
              <Text style={{color: 'white', alignSelf: 'center', fontWeight: 'bold', }}>HOME</Text>
              </View>
            ),
          }}/>
            <Stack.Screen name="Basic" component={UserCards} options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitle: () => (
              <View style={{flexDirection: 'row'}}>
              <Image
                source={require('./src/components/logoRM.png')}
                style={{ width: 30, height: 30, marginRight: 15 }}
              />
              <Text style={{color: 'white', alignSelf: 'center', fontWeight: 'bold', }}>CHARACTERES</Text>
              </View>
            ),
          }}/>
          <Stack.Screen name="CharacterDetails" component={VIewCharacter} options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitle: () => (
              <View style={{flexDirection: 'row'}}>
              <Image
                source={require('./src/components/logoRM.png')}
                style={{ width: 30, height: 30, marginRight: 15 }}
              />
              <Text style={{color: 'white', alignSelf: 'center', fontWeight: 'bold', }}>Character details</Text>
              </View>
            ),
          }}/>
          </Stack.Navigator>

        </NavigationContainer>
      </NativeBaseProvider>
    );
  }
  render() {
return (
  <PersistGate persistor={persistor}>
      <Provider store={store}>{this.getContent()}</Provider>
  </PersistGate>

);
    }}




export default App
