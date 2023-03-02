import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class Head extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={{width: 50, height: 50, borderRadius: 50, alignSelf: 'center' }} source={this.props.logo}/>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 20,
    marginTop:20,
    marginBottom: 10
  },
  text: {
    color: 'white',
  },
  row: {
    flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignitems: 'stretch'
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10
  },
})


export default Head;
