import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import TodosList from './todosList';
import CharactersList from './charactersList';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { todosReducer } from './todosReducer';
import { charactersReducer } from './charactersReducer';
import {connect} from "react-redux";
import * as R from "ramda";
import { fetchCharacters } from '../services/character';

@connect((store)=>{
  return {
    characters: R.pathOr([], ["services","characters","characters"])(store)
  };
})
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1,
    } // this is our initial data
  }

componentDidMount(){
  const { dispatch } = this.props;
  dispatch(fetchCharacters(this.state.page));
}

  render() {
    console.debug('characters: ',this.props.characters[0]);
    return (

            <View style={styles.container}>
            <Image
              source={require('./portada.png')}
              style={{ width: 350, height: 350, marginRight: 15 }}
            />
            {/* <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() =>
            this.props.navigation.navigate('Basic')
          }>
          <Text style={styles.appButtonText}>GO TO CHARACTERES VIEW PAGE </Text>
        </TouchableOpacity> */}

        <Text>first date: {this.props.characters[0].created}{'<-'}</Text>
        <Text>longitud: {this.props.characters.length}</Text>

        {/* <Provider store={store2}>
      <CharactersList />
    </Provider> */}
        {/* <Provider store={store}>
      <TodosList />
    </Provider> */}
          </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1, alignItems: 'center', justifyContent: 'center'
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
