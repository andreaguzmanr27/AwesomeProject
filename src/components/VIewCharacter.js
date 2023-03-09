import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

class VIewCharacter extends Component {
  render() {
    const { paramName } = this.props.route.params;
    const { paramName2 } = this.props.route.params;

    return (
      <ScrollView>
      <View >
        <View style={styles.container}>
          <Image style={{width: 100, height: 100, borderRadius: 50, marginRight: 30 }} source={{uri: paramName.image}}/>
          <Text style={styles.title}>{paramName.name}</Text>
        </View>
        <View style={{padding: 20}}>
            <Text style={styles.text}>{paramName.status}</Text>
            <Text style={styles.texttitle}>Status</Text>
            <Text style={styles.text}>{paramName.gender}</Text>
            <Text style={styles.texttitle}>Gender</Text>
            <Text style={styles.text}>{paramName.species}</Text>
            <Text style={styles.texttitle}>Specie</Text>
            <Text style={styles.text}>{paramName.origin.name}</Text>
            <Text style={styles.texttitle}>Origin</Text>
            <Text style={styles.text}>{paramName.location.name}</Text>
            <Text style={styles.texttitle}>Location</Text>
            <Text style={styles.text}>{paramName.created.slice(0,10)}</Text>
            <Text style={styles.texttitle}>Created</Text>
            <View style={{backgroundColor: 'black', padding: 15, marginBottom: 8}}>
            <Text style={{color:'white', fontSize:'bold'}}>Episodes</Text>
            </View>
            {paramName.episode.map(epi =>
            <View>
            {paramName2.map(e => (
              e.url == epi ? <View><Text style={styles.text}>◉ {e.name}</Text></View> : null
            ))}
            </View>
            )}
        </View>
      </View>
      {/* <Provider store={store}>
      <ComponentTest />
    </Provider> */}

        {/* <Provider store={store}>
      <TodosList />
    </Provider> */}
      </ScrollView>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  texttitle:{
    fontSize: 10,
    marginBottom: 20
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
    alignSelf: 'center'
  },
})


export default VIewCharacter;
