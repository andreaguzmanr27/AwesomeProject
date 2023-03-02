import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import UserCards from './Card_copy';

class MyComponent extends Component {

constructor(props) {
  super(props)
  this.state = {
    data3: [],
    data: [],
    episode: this.props.e,
    page: 1,
    page2: 1,
    activeSlide: 0,
    total_pages: null,
    total_pages2: null,
    character1InEpisode: "https://rickandmortyapi.com/api/character/3"
  }
};


// fetchData = () =>{
//   const { page, total_pages, data3 } = this.state;
//   const endpoint2 = fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
//   fetch(endpoint2)
//   // fetch(endpointtest)
//   .then(response => response.json())
//   .then(json => {
//     this.setState({
//       data3: [...data3, ...json.results],
//       total_pages: json.info.results,
//       page: this.state.page <= 3 ? this.state.page + 1 : this.state.page
//     });
//   })
//   console.log(this.state.page)
// }


// async componentDidMount() {
//   try {
//     const { page, total_pages, data3 } = this.state;
//     const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
//     const json = await response.json();
//     this.setState({ data3: [...data3, ...json.results], total_pages: json.info.results, page: this.state.page <= 3 ? this.state.page + 1 : this.state.page});
//     // console.log(this.state.data3)
//     console.log(this.state.page)
//     // console.log(this.state.data3.find(i => i.url == "https://rickandmortyapi.com/api/episode/2").name)
//   } catch (error) {
//     console.log(error);
//   }
// };
async fetchData() {
  try {
    while(this.state.page <= 3) {
    const { page, total_pages, data3 } = this.state;
    const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
    const responseJson = await response.json();

    this.setState({
      data3: [...data3, ...responseJson.results],
      total_pages: responseJson.info.results,
      page: this.state.page + 1
    });
    // console.log(this.state.page)
  }

  } catch (error) {
    console.error(error);
  }
}

async loadDataCharacters () {
  try {
    while(this.state.page <= 42) {
  const { page2, data } = this.state;
  const response =  await fetch (`https://rickandmortyapi.com/api/character?page=${page2}`);
  const responseJson = await response.json();
  this.setState({
    data: [...data, ...responseJson?.results],
    scrolling: false,
    total_pages2: responseJson.info.results,
    page2: this.state.page2 + 1
  })

}
}
catch (error) {
  console.error(error);
}
};
async componentDidMount() {
  this.fetchData();
  this.loadDataCharacters();
  this.sendData(characters)
};

async componentDidUpdate() {
  this.fetchData();

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
render() {
  const { navigate } = this.props.navigation;
  return (
  <ScrollView style={styles.scrollView}>
    <Carousel
      data={this.state.episode}
      onSnapToItem={(index) => this.setState({ activeSlide: index }) }
      renderItem={({ item }) => (
    <View>
      {this.state.data3.map(epi => epi.url == item ?
      <View>
        <View style={styles.row}>
          <Text style={{color: 'white', fontSize: 24, alignSelf: 'center'}}>{epi.characters.length}</Text>
          {epi.characters.slice(0, 5).map(character =>
          <View >
            {this.state.data.map(c => c.url == character?
            <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() =>
              navigate('CharacterDetails', { paramName: c, paramName2: this.state.data3})
            }>
              <Image style={{width: 50, height: 50, borderRadius: 50}} source={{uri: c.image}}/>
            </TouchableOpacity> : null)}
          </View>)}
        </View>
        <Text style={{color: 'white', marginBottom: 20}}>Characters</Text>
        <Text style={{color: 'white', textAlign: 'right', fontSize: 20, fontWeight: 'bold', marginRight: 20, marginBottom: 20}}>{epi.name}</Text>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>{epi.created.slice(0,10)}</Text>
        <Text style={{color: 'white'}}>Date created</Text>
      </View> : null)}
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


export default MyComponent;
