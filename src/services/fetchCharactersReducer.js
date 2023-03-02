import axios from 'axios';
import endpoint from '../../config/endpoints'
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ajax } from "rxjs/observable/dom/ajax";
//------------------------------States----------------------------------------------

const FETCH_CHARACTERS_REQUEST = "character/FETCH_CHARACTERS_REQUEST";

const FETCH_CHARACTERS_SUCCESS = "character/FETCH_CHARACTERS_SUCCESS";

const FETCH_CHARACTERS_FAILURE = "character/FETCH_CHARACTERS_FAILURE";


export const characterReducer = function (state = {}, action = {}) {
//------------------------------ Reducer de function ----------------------------------------------
 switch (action.type) {
  case 'FETCH_CHARACTERS_REQUEST':
      return {
				...state,

		  };
    case 'FETCH_CHARACTERS_SUCCESS':
      return {
				...state,
				characters: action.payload,  // validar

		  };
    case 'FETCH_CHARACTERS_FAILURE':
      return { ...state,
				error: action.payload,

		  };
    default:
      return state;
  }
};

//------------------------------ACTIONS----------------------------------------------

const successFetchCharacters = (payload) => ({ payload, type: FETCH_CHARACTERS_SUCCESS });

const failureFetchCharacters = (payload) => ({ payload, type: FETCH_CHARACTERS_FAILURE });

export const fetchCharacters = (page) => ({
  page, type: FETCH_CHARACTERS_REQUEST
})

export const fetchCharactersEpic = (action$) => {
  action$.ofType(FETCH_CHARACTERS_REQUEST).mergeMap((action) => {
      return ajax.get(endpoint.character+'?page='+action.page)
      .then(function (response) {
        // handle success
        console.log("page:", action.page);
        console.log("results:", response.data.results);
        return successFetchCharacters(response?.data?.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return failureFetchCharacters(error);
      })
      .finally(function () {
        // always executed
      })
    }
  )
}

// export const fetchCharactersEpic = (action$) => {
//   action$.ofType(FETCH_CHARACTERS_REQUEST).mergeMap(action =>
//       axios.get(endpoint+'?page='+action.page)
//       .then(function (response) {
//         // handle success
//         // console.log(response);
//         return successFetchCharacters(response?.results);
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//         return failureFetchCharacters(error);
//       })
//       .finally(function () {
//         // always executed
//       })
//     )
//   )
// }


// export const fetchCharactersEpic = (actions$) => {      // action with epic
// 	return async (dispatch) => {
//     try {
//       var page = 1;
//       while (page <= 41) {
//         page += 1;
//         const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
//         const todos = await response.json();
//         console.log("here")
// 			  return successFetchCharacters(todos.results)
//       }
//     } catch (error) {
// 		  return failureFetchCharacters(error.message);
//     }
//   };
// };
