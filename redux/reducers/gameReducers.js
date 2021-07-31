import {
  GAME_REQUEST,
  GAME_FAIL,
  GAME_SUCCESS,
} from '../constants/gameConstants';

const initialState = {
  gameboard: {},
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GAME_REQUEST:
      return { loading: true, gameboard: {} };

    case GAME_SUCCESS:
      return { loading: false, gameboard: action.payload };

    case GAME_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
