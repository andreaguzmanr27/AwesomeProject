import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchCharacters } from './charactersActions';
import { FlatList, Text, View, VirtualizedList } from 'react-native';

const CharactersList = ({ todos, error, fetchCharacters }) => {
  useEffect(() => {
    fetchCharacters();
  }, []);


  if (error) {
    return <Text>{error}</Text>;
  }

  return (
<View>
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
        {/* <Text style={{color: 'black'}}>{todos[0].name}</Text> */}
        {/* {console.log("this")}
        {console.log(todos)} */}

</View>
  );
};

const mapStateToProps = (state) => {
  // {console.log(state.todos)}
  return {
    todos: state.todos,
    error: state.error,
  };

};

export default connect(mapStateToProps, { fetchCharacters })(CharactersList);
