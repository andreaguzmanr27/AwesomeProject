import axios, {from} from 'axios';
import endpoint from '../config/endpoint'
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
//------------------------------States----------------------------------------------

const FETCH_CHARACTER_REQUEST = "characterForEpisode/FETCH_CHARACTER_REQUEST";
const FETCH_CHARACTER_SUCCESS = "characterForEpisode/FETCH_CHARACTER_SUCCESS";
const FETCH_CHARACTER_FAILURE = "characterForEpisode/FETCH_CHARACTER_FAILURE";


export const characterForEpisodeReducer = function (state = {}, action = {}) {
//------------------------------ Reducer de function ----------------------------------------------
 switch (action.type) {
  case FETCH_CHARACTER_REQUEST:
      return {
				...state,

		  };
    case FETCH_CHARACTER_SUCCESS:
      return {
				...state,
				character: action.payload,  // validar
		  };
    case FETCH_CHARACTER_FAILURE:
      return { ...state,
				error: action.payload,

		  };
    default:
      return state;
  }
};

//------------------------------ACTIONS----------------------------------------------

const successFetchCharacter = (payload) => ({ payload, type: FETCH_CHARACTER_SUCCESS });

const failureFetchCharacter = (payload) => ({ payload, type: FETCH_CHARACTER_FAILURE });

export const fetchCharacter = (characters) => ({
  characters, type: FETCH_CHARACTER_REQUEST
})

export const fetchCharacterEpic = (action$) =>
  action$.pipe (
  ofType(FETCH_CHARACTER_REQUEST),
  mergeMap((action) =>
      axios.get(endpoint.character+"/"+action.characters)
      .then( (response) => {
        return successFetchCharacter(response?.data);
      })
      .catch((exception) => {
        return failureFetchCharacter(exception);
      })
  ));
