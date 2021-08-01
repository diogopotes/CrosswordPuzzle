import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import LoadPuzzle from '../components/LoadPuzzle';

import Colors from '../constants/Colors';

import Alphabet from '../constants/Alphabet';

import { getPuzzle } from '../redux/actions/gameActions';

import { useDispatch, useSelector } from 'react-redux';

import { Feather } from '@expo/vector-icons';

const GameScreen = () => {
  const dispatch = useDispatch();

  // DATA FROM REDUX:
  const { loading, gameboard, error } = useSelector((state) => state.game);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //GET DATA FROM REDUX AT MOUNTING
    dispatch(getPuzzle());
  }, []);

  useEffect(() => {
    if (loading === false) {
      setIsLoading(false);
    }
  }, [loading]);

  const screenWidth = Dimensions.get('screen').width;

  const squareDimension = screenWidth / 15; // CELL WIDTH AND HEIGHT

  // GAME SCREEN STATES:

  const [highligthedCell, setHighligthedCell] = useState({});

  const [crosswordPuzzle, setCrosswordPuzzle] = useState(gameboard.cells);

  const [clue, setClue] = useState({
    number: null,
    text: '',
  });

  // CLUE POSITION REF VALUE (IF TRUE, IS HORIZONTAL):
  const horizontalRef = useRef(true);

  const listClues = gameboard.clues;

  const listWords = gameboard.words;

  // FUNCTION WHEN SELECTING A SQUARE (CELL):

  const selectSquare = (item) => {
    if (item.x === highligthedCell.x && item.y === highligthedCell.y) {
      horizontalRef.current = !horizontalRef.current;
      getClue(highligthedCell);
    } else {
      let copyCrossword = crosswordPuzzle;

      let selectedCell;

      copyCrossword.map((i) => {
        if (i === item && i.type !== 'block') {
          selectedCell = i;
        }
      });

      getClue(selectedCell);
      setHighligthedCell(selectedCell);
    }
  };

  // FUNCTION TO GET CLUE:

  const getClue = (selectedCell) => {
    let x = selectedCell.x;

    let y = selectedCell.y;

    let word_id_x; //horizontal word

    let word_id_y; //vertical word

    listWords.map((word) => {
      if (
        word.x instanceof Array &&
        word.x.includes(parseInt(x)) &&
        word.y === y
      ) {
        word_id_x = word.id;
      } else if (
        word.y instanceof Array &&
        word.y.includes(parseInt(y)) &&
        word.x === x
      ) {
        word_id_y = word.id;
      }
    });

    let clue_x; //horizontal clue

    let clue_y; //vertical clue

    let number_x; //horizontal number

    let number_y; //vertical number

    listClues.map((c) => {
      if (c.word === word_id_x) {
        clue_x = c.text;
        number_x = c.number;
      } else if (c.word === word_id_y) {
        clue_y = c.text;
        number_y = c.number;
      }
    });

    if (horizontalRef.current === false) {
      setClue({
        number: number_y,
        text: clue_y + ' (vert.)',
      });
    } else {
      setClue({
        number: number_x,
        text: clue_x + ' (horiz.)',
      });
    }
  };

  // FUNCTION OF USER LETTER INPUT:

  const inputLetter = (letter) => {
    let updatedCrossword = crosswordPuzzle;

    if (letter === 'delete') {
      updatedCrossword = updatedCrossword.map((square) => {
        if (highligthedCell.x === square.x && highligthedCell.y === square.y) {
          return { ...square, playedLetter: '' };
        } else {
          return square;
        }
      });
    } else {
      updatedCrossword = updatedCrossword.map((square) => {
        if (highligthedCell.x === square.x && highligthedCell.y === square.y) {
          return { ...square, playedLetter: letter };
        } else {
          return square;
        }
      });
    }

    setCrosswordPuzzle(updatedCrossword);
  };

  // FUNCTION TO DESELECT CELL:

  const deselect = () => {
    setHighligthedCell({});
    setClue({
      number: null,
      text: '',
    });
  };

  if (isLoading) {
    return <LoadPuzzle />;
  }

  return (
    <View style={styles.screen}>
      {/* CROSSWORD PUZZLE SECTION */}
      {crosswordPuzzle !== undefined && (
        <View style={[styles.crosswordContainer, { maxHeight: screenWidth }]}>
          <FlatList
            data={crosswordPuzzle}
            numColumns={15}
            keyExtractor={(item, index) => 'key_' + item.x + item.y}
            renderItem={({ item }) => {
              if (!item.solution) {
                return (
                  <TouchableOpacity
                    style={[
                      styles.itemContainer,
                      {
                        height: squareDimension,
                        width: squareDimension,
                        backgroundColor: 'black',
                      },
                    ]}
                    onPress={() => deselect()}
                    activeOpacity={1}
                  ></TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    style={[
                      styles.itemContainer,
                      { height: squareDimension, width: squareDimension },
                      highligthedCell.x === item.x &&
                      highligthedCell.y === item.y
                        ? { backgroundColor: Colors.selectedSquare }
                        : {},
                    ]}
                    onPress={() => selectSquare(item)}
                  >
                    <Text style={styles.itemNumber}>{item.number}</Text>

                    <Text style={styles.letter}>{item.playedLetter}</Text>
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      )}
      {/* CLUE SECTION */}
      <TouchableOpacity
        style={styles.clueContainer}
        onPress={() => deselect()}
        activeOpacity={1}
      >
        {clue.number !== null && clue.text !== '' && (
          <Text style={styles.clueText}>
            {clue.number} : {clue.text}
          </Text>
        )}
      </TouchableOpacity>
      {/* KEYBOARD SECTION */}
      <TouchableOpacity
        style={styles.keyboardContainer}
        onPress={() => deselect()}
        activeOpacity={1}
      >
        <View style={styles.keyboard}>
          {Alphabet.map((letter) => {
            return (
              <TouchableOpacity
                style={styles.letterContainer}
                onPress={() => inputLetter(letter)}
                key={letter}
              >
                <Text style={styles.keyboardLetter}>{letter}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={[styles.letterContainer, { width: 60 }]}
            onPress={() => inputLetter('delete')}
          >
            <Feather name="delete" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  crosswordContainer: {
    flex: 7,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemNumber: {
    fontSize: 8,
    color: 'black',
    fontWeight: '600',
    position: 'absolute',
    bottom: '60%',
    right: '60%',
  },
  letter: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  keyboardContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 3,
    flexDirection: 'row',
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  keyboardLetter: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  letterContainer: {
    width: 30,
    height: 35,
    borderRadius: 4,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  clueContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  clueText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
});

export default GameScreen;
