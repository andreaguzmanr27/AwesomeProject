import { createStore } from 'redux';

const initialState = {
  counter: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1,
      };
    case 'DECREMENT':
      return {
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}

// Create a Redux store using the reducer function
const store = createStore(reducer);

export default store;

// export const fetchTodos = () => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//       const todos = await response.json();
//       dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: todos });
//     } catch (error) {
//       dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message });
//     }
//   };
// };

// const initialState = {
//   todos: [],
//   error: null,
// };

// export const todosReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'FETCH_TODOS_SUCCESS':
//       return { ...state, todos: action.payload, error: null };
//     case 'FETCH_TODOS_FAILURE':
//       return { ...state, todos: [], error: action.payload };
//     default:
//       return state;
//   }
// };
