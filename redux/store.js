import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import { gameboardReducer } from './reducers/gameboardReducers';

const rootReducer = combineReducers({
  gameboard: gameboardReducer,
});

const middleware = composeWithDevTools(applyMiddleware(thunk));

export default createStore(rootReducer, middleware);
