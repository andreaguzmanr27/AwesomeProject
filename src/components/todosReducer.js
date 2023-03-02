const initialState = {
  todos: [],
  error: null,
};

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      return { ...state, todos: action.payload, error: null };
    case 'FETCH_TODOS_FAILURE':
      return { ...state, todos: [], error: action.payload };
    default:
      return state;
  }
};
