import { combineReducers } from "redux";
import { characterReducer, fetchCharactersEpic  } from "./character";
import { episodeReducer, fetchEpisodesEpic  } from "./episode";
import { characterForEpisodeReducer, fetchCharacterEpic  } from "./characterForEpisode";
import { combineEpics } from "redux-observable";

export const reducer = combineReducers({
  characters: characterReducer,
  episodes: episodeReducer,
  character: characterForEpisodeReducer,
});

export const epic = combineEpics(
  fetchCharactersEpic,
  fetchEpisodesEpic,
  fetchCharacterEpic
)
