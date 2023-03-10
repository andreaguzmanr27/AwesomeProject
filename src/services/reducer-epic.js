import { combineReducers } from "redux";
import { characterReducer, fetchCharactersEpic  } from "./character";
import { combineEpics } from "redux-observable";

export const reducer = combineReducers({
  characters: characterReducer,
});

export const epic = combineEpics(
  fetchCharactersEpic
)
