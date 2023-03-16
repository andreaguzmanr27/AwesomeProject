import axios from 'axios';
import endpoint from '../config/endpoint'
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

//------------------------------States----------------------------------------------

const FETCH_EPISODES_REQUEST = "episode/FETCH_EPISODES_REQUEST";
const FETCH_EPISODES_SUCCESS = "episode/FETCH_EPISODES_SUCCESS";
const FETCH_EPISODES_FAILURE = "episode/FETCH_EPISODES_FAILURE";


export const episodeReducer = function (state = {}, action = {}) {
//------------------------------ Reducer de function ----------------------------------------------

 switch (action.type) {
  case FETCH_EPISODES_REQUEST:
      return {
				...state,

		  };
    case FETCH_EPISODES_SUCCESS:
      return {
				...state,
				episodes: action.payload,
		  };
    case FETCH_EPISODES_FAILURE:
      return { ...state,
				error: action.payload,

		  };
    default:
      return state;
  }
};

//------------------------------ACTIONS----------------------------------------------

const successFetchEpisodes = (payload) => ({ payload, type: FETCH_EPISODES_SUCCESS });

const failureFetchEpisodes = (payload) => ({ payload, type: FETCH_EPISODES_FAILURE });

export const fetchEpisodes = (episode) => ({
  episode, type: FETCH_EPISODES_REQUEST
})

export const fetchEpisodesEpic = (action$) =>
  action$.pipe (
  ofType(FETCH_EPISODES_REQUEST),
  mergeMap((action) =>
      axios.get(action.episode)
      .then( (response) => {
        return successFetchEpisodes(response?.data);
      })
      .catch((exception) => {
        return failureFetchEpisodes(exception);
      })
  ));
