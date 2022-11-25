import React from 'react';
//import React in our code.
import {StyleSheet, View, TouchableOpacity, Text}  from 'react-native';
//import all the components we are going to use.
import axios from 'axios';

const App = () => {
  const URL = 'https://rickandmortyapi.com/api/character';
  const getDataUsingSimpleGetCall = () => {
  axios
  .get(URL)
  .then(response => {

    const c = response.data.results;
    c.forEach(element => console.log(element.name));
  })
  .catch((error) => {
     console.log('error ' + error);
  })
  };


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, textAlign: 'center'}}>
        Axios Networking in React Native
      </Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={getDataUsingSimpleGetCall}>
        <Text>Simple Get Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: '100%',
    marginTop: 16,
  },
});

export default App;
