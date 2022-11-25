import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, Alert,  FlatList, Image, Button, Dimensions } from 'react-native'

class UserCards extends Component {
 



  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  loadData = () => {
    const { page, data } = this.state;
    const endpoint = `https://rickandmortyapi.com/api/character?page=${page}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [...data, ...json.results],
          scrolling: false,
          total_pages: json.info.results
        });
      });
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadData
    );
  };

  componentDidMount() {
    // this.loadData();
  }

  myFunction() {
    //var element = document.getElementById("card");
    // for (var i = 0; i < card.length; i++) {
    //   card[i].classList.toggle("mystyle");
    // }
    // element.classList.toggle("mystyle");
  }


  render() {
    return (
      <View>
        <View>
          {this.state.data.map((item, index) => (
            <View style={styles.card} key={index}>
              <View>
                <View>
                  <View>
                    <Image
                      style={{width: 50, height: 50}}
                      source={{uri: item.image}}
                    />

                  </View>
                  <View>
                    <Text>
                        {this.uppercase(item.status)}
                    </Text>
                    <Text>
                        {this.uppercase(item.species)}
                    </Text>
                    <Text>Specie</Text>
                    <Text>
                        {this.uppercase(item.origin.name)}
                    </Text>
                    <Text>Origin</Text>
                    <Text>
                        {this.uppercase(item.location.name)}
                    </Text>
                    <Text>Location</Text>
                  </View>
                  <View>
                    <Text>
                      {this.uppercase(item.name)}
                    </Text>
                    {/* <FontAwesomeIcon icon="fa-solid fa-person" /> */}
                    <Text>
                      {this.uppercase(item.created)}
                    </Text>
                    <Button
                      title="Ver"
                      onPress={e => {
                        this.myFunction();
                      }}
                    >
                    </Button>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <Button
          title="Load more characters"
          onPress={e => {
            this.loadMore();
          }}
        >
        </Button>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  card: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
  }
})

export default UserCards;
