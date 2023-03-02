export const fetchCharacters = () => {


  return async (dispatch) => {
    try {
      var page = 1;
      while (page <= 41) {
        page += 1;
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        const todos = await response.json();
        dispatch({ type: 'FETCH_TODOS_SUCCESS', payload: todos.results });
      }
    } catch (error) {
      dispatch({ type: 'FETCH_TODOS_FAILURE', payload: error.message });
    }
  };
};
