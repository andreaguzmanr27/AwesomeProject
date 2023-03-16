import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image, ScrollView} from 'react-native'
import EpisodeComponent from './ViewEpisode';
import {connect} from "react-redux";
import * as R from "ramda";
import { fetchCharacters } from '../services/character';

@connect((store)=>{
  return {
    characters: R.pathOr([], ["services","characters","characters"])(store)
  };
})

export default class CharactersCards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      page: 1,
      selected: null,
    }
  };

  updateSelect = (index) => {
    if (index == this.state.selected) {
      this.setState({
        selected : null
      });
    }
    else {
      this.setState({
        selected : index
      });
    }
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
    );
    const { dispatch } = this.props;
    dispatch(fetchCharacters(this.state.page));
  };

  componentDidMount() {
  const { dispatch } = this.props;
  dispatch(fetchCharacters(this.state.page));
  };

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        <View>
          {this.props.characters.map((item, index) => (
            <View>
              {(index === this.state.selected)?
                <EpisodeComponent navigation = {this.props.navigation} e={item.episode}/>
              :null}
            </View>
          ))}
          {this.props.characters.map((item, index) => (
            <TouchableOpacity>
              <View style={(index === this.state.selected)?styles.selected:styles.card}>
                <View key={index}>
                  <View style={styles.row}>
                    <Image style={{width: 50, height: 135, flex: 0.4, borderRadius: 10,}} source={{uri: item.image}}/>
                    <View style={{flex: 0.2, padding: 5,}}>
                      <Text style={(index === this.state.selected)?styles.textsmallselected:styles.textsmall}>
                        {item.status}
                      </Text>
                      <Text numberOfLines={1} style={(index === this.state.selected)?styles.texttitleselected:styles.texttitle}>
                        {item.species}
                      </Text>
                      <Text style={(index === this.state.selected)?styles.textsmallselected:styles.textsmall}>Specie</Text>
                      <Text numberOfLines={2} style={(index === this.state.selected)?styles.texttitleselected:styles.texttitle}>
                        {item.origin.name}
                      </Text>
                      <Text style={(index === this.state.selected)?styles.textsmallselected:styles.textsmall}>Origin</Text>
                      <Text numberOfLines={2} style={(index === this.state.selected)?styles.texttitleselected:styles.texttitle}>
                        {item.location.name}
                      </Text>
                      <Text style={(index === this.state.selected)?styles.textsmallselected:styles.textsmall}>Location</Text>
                    </View>
                    <View style={{ flex: 0.4, flexDirection: 'column' }}>
                      <Text numberOfLines={2} style={(index === this.state.selected)?styles.textnameselected:styles.textname}  >
                        {item.name}
                      </Text>
                      <Image source={item.gender == 'Male' ? (index === this.state.selected)?require('./malewhite.png'):require('./male.png'): (index === this.state.selected)?require('./femalewhite.png'):require('./female.png')} key={item} style={{width: 25, height: 25, alignSelf: 'flex-end', marginBottom: 5}}/>
                      <Text style={(index === this.state.selected)?styles.textsmallrightselected:styles.textsmallright}>
                        Created:
                      </Text>
                      <Text style={(index === this.state.selected)?styles.textsmallrightselected:styles.textsmallright}>
                        {item.created.slice(0,10)}
                      </Text>
                      <TouchableOpacity activeOpacity={0.8}
                        onPress={e => {
                          this.updateSelect(index);
                        }}
                        style={(index === this.state.selected)?styles.appButtonContainerSelected:styles.appButtonContainer}>
                        <Text style={styles.appButtonText}>Episodes</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={e => {
            this.loadMore();
          }}
          style={styles.buttonMoreCharacteres}>
            <Text style={styles.textButtonMoreCharacteres}>Load more characters</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
};
const styles=StyleSheet.create({
  card: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    padding: 8,
    margin: 5,
  },
  selected: {
    borderRadius: 20,
    backgroundColor: "black",
    borderWidth: 2,
    padding: 8,
    margin: 5,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  row: {
    flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignitems: 'stretch'
  },
  textsmall: {
    marginTop:1,
    marginBottom: 4,
    fontSize: 8,
  },
  textsmallselected: {
    marginTop:1,
    marginBottom: 4,
    fontSize: 8,
    color:'white'
  },
  texttitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  texttitleselected: {
    fontSize: 12,
    fontWeight: 'bold',
    color:'white'
  },
  textname: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1
  },
  textnameselected: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
    color: 'white'
  },
  textsmallright: {
    textAlign: 'right',
    marginTop:1,
    marginBottom: 4,
    fontSize: 8,
  },
  textsmallrightselected: {
    textAlign: 'right',
    marginTop:1,
    marginBottom: 4,
    fontSize: 8,
    color:'white'
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  appButtonContainerSelected: {
    elevation: 8,
    backgroundColor: "#32BE01",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  buttonMoreCharacteres: {
    elevation: 8,
    backgroundColor: "black",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textButtonMoreCharacteres: {
    fontSize: 15,
    color: "#32BE01",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
})
