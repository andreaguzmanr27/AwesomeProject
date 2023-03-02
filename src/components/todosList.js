import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from './todosActions';
import { FlatList, Text, View, VirtualizedList } from 'react-native';

const TodosList = ({ todos, error, fetchTodos }) => {
  useEffect(() => {
    fetchTodos();
  }, []);


  if (error) {
    return <Text>{error}</Text>;
  }

  return (
<View>
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
        {/* <Text style={{color: 'black'}}>{todos[0].name}</Text> */}
        {/* {console.log("this")}
        {console.log(todos)} */}
    <Text style={{color: 'black'}}>GO TO CHARACTERES VIEW PAGE</Text>
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

export default connect(mapStateToProps, { fetchTodos })(TodosList);
