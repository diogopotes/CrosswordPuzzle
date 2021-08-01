import {
  GAME_REQUEST,
  GAME_FAIL,
  GAME_SUCCESS,
} from '../constants/gameConstants';

import { range } from 'lodash';

import { cells, clues, words } from '../../data/crossword-puzzle.json';

export const getPuzzle = () => async (dispatch) => {
  try {
    dispatch({ type: GAME_REQUEST });

    const listClues = clues;

    //ADDING PLAYER'S PLAYED LETTER:
    const listCells = cells.map((cell) => {
      if (cell.type !== 'block') {
        return { ...cell, playedLetter: '' };
      } else {
        return cell;
      }
    });

    //TRANSFORMING X AND Y FIELDS THAT HAVE RANGE TO AN ARRAY OF VALUES:
    listWords = words.map((word) => {
      if (word.x.includes('-')) {
        const index = word.x.indexOf('-');
        const firstNumber = parseInt(word.x.substr(0, index));
        const lastNumber = parseInt(word.x.substr(index + 1));

        let arrayX = range(firstNumber, lastNumber + 1, 1);

        return { ...word, x: arrayX };
      } else if (word.y.includes('-')) {
        const index = word.y.indexOf('-');
        const firstNumber = parseInt(word.y.substr(0, index));
        const lastNumber = parseInt(word.y.substr(index + 1));

        let arrayY = range(firstNumber, lastNumber + 1, 1);

        return { ...word, y: arrayY };
      } else {
        return word;
      }
    });

    const gameBoard = {
      clues: listClues,
      cells: listCells,
      words: listWords,
    };

    dispatch({ type: GAME_SUCCESS, payload: gameBoard });
  } catch (err) {
    dispatch({
      type: GAME_FAIL,
      payload: err.message,
    });
  }
};
