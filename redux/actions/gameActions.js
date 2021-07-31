import {
  GAME_REQUEST,
  GAME_FAIL,
  GAME_SUCCESS,
} from '../constants/gameConstants';

import axios from 'axios';

import { cells, clues } from '../../data/crossword-puzzle.json';

export const getPuzzle = () => async (dispatch) => {
  try {
    dispatch({ type: GAME_REQUEST });

    const listClues = clues;

    const listCells = cells.map((c) => {
      if (c.type !== 'block') {
        return { ...c, playedLetter: '' };
      } else {
        return c;
      }
    });

    const gameBoard = {
      clues: listClues,
      cells: listCells,
    };

    dispatch({ type: GAME_SUCCESS, payload: gameBoard });
  } catch (err) {
    dispatch({
      type: GAME_FAIL,
      payload: err.message,
    });
  }
};
