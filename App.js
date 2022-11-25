import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View, Alert,  FlatList, Image, Button, Dimensions } from 'react-native'
import axios from 'axios'
import UserCards from './src/components/Card_copy';



class axioslist extends Component {

  constructor(props) {
    super(props);
     this.state = {
      posts:[],
    }
  }

//   componentDidMount(){
//     axios.get('https://rickandmortyapi.com/api/character')
//     .then(res => {
//       console.log(res.data.results)
//       this.setState({
//         posts: res.data.results,
//         // n: res.data.results[0].name,
//         // s: res.data.results[0].status,
//         // species: res.data.results[0].species,
//         // gender: res.data.results[0].gender
//       })
//     })
//  }

  render() {
    const { posts } = this.state;
    const postList = posts.length ? (
      posts.map(post =>
        {
          return(

          <Text  key={post.name}>
            {post.name},
           </Text>
      )
        })
    ) : (<Text>No data yet.</Text>)


    return (

      <View>
        <UserCards posts={posts}/>
        {<Text>{postList} </Text>}

      </View>
      );
    }}

      export default axioslist
