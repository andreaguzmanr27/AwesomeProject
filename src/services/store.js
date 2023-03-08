import 'rxjs';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers, persistReducer  } from 'redux-persist';
import storage from 'redux-persist/es/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger'
import { createEpicMiddleware } from "redux-observable";
import { reducer as servicesReducer, epic as servicesEpic } from './reducer-epic';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

const appReducer = persistCombineReducers(config, {
  services: servicesReducer,
});

const epicMiddleware = createEpicMiddleware();
const store = createStore(appReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(servicesEpic);

// const saveAndLoadSessionFilter = createFilter(
//   'services',
//   ['session'],
//   ['session']
// );

export default store;
export const persistor = persistStore(store)
