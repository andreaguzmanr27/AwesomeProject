import axios, {from} from 'axios';
import endpoint from '../config/endpoint'
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
//------------------------------States----------------------------------------------

const FETCH_CHARACTERS_REQUEST = "character/FETCH_CHARACTERS_REQUEST";
const FETCH_CHARACTERS_SUCCESS = "character/FETCH_CHARACTERS_SUCCESS";
const FETCH_CHARACTERS_FAILURE = "character/FETCH_CHARACTERS_FAILURE";


export const characterReducer = function (state = {}, action = {}) {
//------------------------------ Reducer de function ----------------------------------------------
 switch (action.type) {
  case FETCH_CHARACTERS_REQUEST:
      return {
				...state,

		  };
    case FETCH_CHARACTERS_SUCCESS:
      // console.debug("action.payload: ",action.payload.length);
      return {
				...state,
				characters: action.payload,  // validar

		  };
    case FETCH_CHARACTERS_FAILURE:
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

export const fetchCharactersEpic = (action$) =>
  action$.pipe (
  ofType(FETCH_CHARACTERS_REQUEST),
  mergeMap((action) =>
      axios.get(endpoint.character+'?page='+action.page)
      .then( (response) => {
        // handle success
        // console.log("page:", action.page);
        consoler.log("results:", response.data.results?.length);
        return successFetchCharacters(response?.data?.results);
      })
      .catch((exception) => {
        return failureFetchCharacters(exception);
      })
  ));
