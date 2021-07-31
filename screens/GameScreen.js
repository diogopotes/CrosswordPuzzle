import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Colors from '../constants/Colors';

import { getPuzzle } from '../redux/actions/gameActions';

import { useDispatch, useSelector } from 'react-redux';

import { Feather } from '@expo/vector-icons';

const GameScreen = () => {
  const dispatch = useDispatch();

  const { loading, gameboard, error } = useSelector((state) => state.game);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(getPuzzle());
  }, []);

  useEffect(() => {
    if (loading === false) {
      setIsLoading(false);
    }
  }, [loading]);

  const screenWidth = Dimensions.get('screen').width;

  const squareDimension = screenWidth / 15;

  const [highligthedCell, setHighligthedCell] = useState({});

  const [crosswordPuzzle, setCrosswordPuzzle] = useState(gameboard.cells);

  const [listClues, setListClues] = useState(gameboard.clues);

  const [clue, setClue] = useState('');

  const selectSquare = (item) => {
    if (item.x === highligthedCell.x && item.y === highligthedCell.y) {
      deselect();
    } else {
      let copyCrossword = crosswordPuzzle;

      let selectedCell;

      copyCrossword.map((i) => {
        if (i === item && i.type !== 'block') {
          selectedCell = i;
        }
      });

      setHighligthedCell(selectedCell);
      getClue(selectedCell);
    }
  };

  const getClue = (selectedCell) => {
    let clueNumber;

    let tempNumber;

    crosswordPuzzle.map((i) => {
      if (i.number) {
        tempNumber = i.number;
      }

      if (i.x === selectedCell.x && i.y === selectedCell.y) {
        clueNumber = tempNumber;
      }
    });

    console.log(clueNumber);

    listClues.map((clue) => {
      if (clue.number === clueNumber) {
        setClue(clue.text);
      }
    });
  };

  const alphabet = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

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

  const deselect = () => {
    setHighligthedCell({});
  };

  if (isLoading) {
    return (
      <View>
        <Text>LOADING...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {crosswordPuzzle !== undefined && (
        <View style={styles.crosswordContainer}>
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
      <TouchableOpacity
        style={styles.clueContainer}
        onPress={() => deselect()}
        activeOpacity={1}
      >
        <Text style={styles.clueText}>{clue}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.keyboardContainer}
        onPress={() => deselect()}
        activeOpacity={1}
      >
        <View style={styles.keyboard}>
          {alphabet.map((letter) => {
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
    flex: 6,
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
  },
});

export default GameScreen;
