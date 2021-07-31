import {
  GAMEBOARD_REQUEST,
  GAMEBOARD_FAIL,
  GAMEBOARD_SUCCESS,
} from '../constants/gameboardConstants';

export const gameboardReducer = (state = { gameboard: [{}] }, action) => {
  switch (action.type) {
    case GAMEBOARD_REQUEST:
      return { loading: true, gameboard: [{}] };

    case GAMEBOARD_SUCCESS:
      return { loading: false, gameboard: action.payload };

    case GAMEBOARD_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
