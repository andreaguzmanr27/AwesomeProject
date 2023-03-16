import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./portada.png')}
          style={{ width: 350, height: 350, marginRight: 15 }}/>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() =>
            this.props.navigation.navigate('Basic')
          }>
          <Text style={styles.appButtonText}>GO TO CHARACTERES VIEW PAGE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1, alignItems: 'center', justifyContent: 'center'
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#32BE01",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
})
