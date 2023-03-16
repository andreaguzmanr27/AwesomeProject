import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {connect} from "react-redux";
import * as R from "ramda";
import { fetchEpisodes } from '../services/episode';
import { fetchCharacter } from '../services/characterForEpisode';

@connect((store)=>{
  return {
    characters: R.pathOr([], ["services","characters","characters"])(store),
    episodes: R.pathOr([], ["services","episodes","episodes"])(store),
    character: R.pathOr([], ["services","character","character"])(store),
  };
})

export default class EpisodeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      episode: this.props.e,
      activeSlide: 0,
      charactersToFetch: null
    }
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchEpisodes(this.state.episode[0]))
    this.characters(this.state.episode[0].characters.slice(0,5))
  };

  get pagination () {
    const { episode, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={episode.length}
        activeDotIndex={activeSlide}
        containerStyle={{ backgroundColor: 'black', flexWrap: 'wrap' }}
        dotStyle={{
            width: 5,
            height: 5,
            borderRadius: 5,
            justifyContent: 'space-around',
            backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotStyle={{
          backgroundColor: 'rgba(255, 255, 255, 0.92)'
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  characters (characters){
    var idCharacters = [];
    characters.map(c =>
      idCharacters += c.slice(42,44)+","
    )
    this.setState({
      charactersToFetch: idCharacters
    })
    const { dispatch } = this.props;
    dispatch(fetchCharacter(this.state.charactersToFetch))
  }

  _onSnapToItem (index) {
    this.setState({ activeSlide: index });
    const { dispatch } = this.props;
    dispatch(fetchEpisodes(this.state.episode[index]));
    this.characters(this.props.episodes.characters.slice(0,5))
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.scrollView}>
        <Carousel data={this.state.episode}
        onSnapToItem={(index) =>
          this._onSnapToItem(index)
         }
        renderItem={({ item }) => (
          <View>
            <View style={styles.row}>
              <Text style={{color: 'white', fontSize: 24, alignSelf: 'center'}}>{this.props.episodes.characters.length}</Text>
              {this.props.character.map(character =>
                <TouchableOpacity style={styles.appButtonContainer}
                  onPress={() =>
                    navigate('CharacterDetails', { paramName: character })
                  }>
                <Image style={{width: 50, height: 50, borderRadius: 50}} source={{uri: character.image}}/>
                </TouchableOpacity>
              )}
            </View>
            <Text style={{color: 'white', marginBottom: 20}}>Characters</Text>
            <Text style={{color: 'white', textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginRight: 20, marginBottom: 20}}>{this.props.episodes.name}</Text>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{this.props.episodes.created.slice(0,10)}</Text>
            <Text style={{color: 'white', marginBottom: 20}}>Date created</Text>
          </View>
        )}
      sliderWidth={430}
      itemWidth={400}
      backgroundColor={'black'}
      />
      { this.pagination }
      </ScrollView>
    );
  }
};

const styles=StyleSheet.create({
  row: {
    flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignitems: 'stretch',
      justifyContent: 'space-around',
      marginBottom: 10,
      marginTop: 20
  },
})
