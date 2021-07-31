import {
  GAMEBOARD_REQUEST,
  GAMEBOARD_FAIL,
  GAMEBOARD_SUCCESS,
} from '../constants/gameboardConstants';

import axios from 'axios';

export const getPuzzle = () => async (dispatch) => {
  try {
    dispatch({ type: GAMEBOARD_REQUEST });

    const { cells } = await axios.get('data/data.json');

    const gameBoard = cells.map((c) => {
      if (c.type !== 'block') {
        return { ...c, playerLetter: '' };
      }
    });

    dispatch({ type: GAMEBOARD_SUCCESS, payload: gameBoard });

    //return gameBoard;
  } catch (err) {
    dispatch({
      type: GAMEBOARD_FAIL,
      payload: err.message,
    });
  }
};
