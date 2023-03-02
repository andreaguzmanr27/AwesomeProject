import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { connect } from 'react-redux';

function ComponentTest(props) {
  return (
    <View>
      <Text>{props.counter}</Text>
      <Button
        title="Increment"
        onPress={() => props.dispatch({ type: 'INCREMENT' })}
      />
      <Button
        title="Decrement"
        onPress={() => props.dispatch({ type: 'DECREMENT' })}
      />
    </View>
  );
}

// Define a function to map the state from the store to the component's props
function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

export default connect(mapStateToProps)(ComponentTest);

// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { fetchTodos } from './todosActions';
// import { FlatList, Text } from 'react-native';

// const TodosList = ({ todos, error, fetchTodos }) => {
//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   if (error) {
//     return <Text>{error}</Text>;
//   }

//   return (
//     <FlatList
//       data={todos}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => <Text>{item.title}</Text>}
//     />
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     todos: state.todos.todos,
//     error: state.todos.error,
//   };
// };

// export default connect(mapStateToProps, { fetchTodos })(TodosList);
