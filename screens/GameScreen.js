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

import { getPuzzle } from '../redux/actions/gameboardActions';

import { useDispatch, useSelector } from 'react-redux';

const GameScreen = () => {
  const dispatch = useDispatch();

  const { loading, error, gameboard } = useSelector((state) => state.gameboard);

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

  const [crosswordPuzzle, setCrosswordPuzzle] = useState(gameboard);

  const selectSquare = (item) => {
    if (item === highligthedCell) {
      setHighligthedCell({});
    } else {
      let copyCrossword = crosswordPuzzle;

      let selectedCell;

      copyCrossword.map((i) => {
        if (i === item && i.type !== 'block') {
          selectedCell = i;
        }
      });

      setHighligthedCell(selectedCell);
    }
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

    updatedCrossword = updatedCrossword.map((square) => {
      if (highligthedCell.x === square.x && highligthedCell.y === square.y) {
        return { ...square, playerLetter: letter };
      } else {
        return square;
      }
    });

    setCrosswordPuzzle(updatedCrossword);
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
        <FlatList
          data={crosswordPuzzle}
          numColumns={15}
          keyExtractor={(item, index) => 'key_' + item.x + item.y}
          renderItem={({ item }) => {
            if (!item.solution) {
              return (
                <View
                  style={[
                    styles.itemContainer,
                    {
                      height: squareDimension,
                      width: squareDimension,
                      backgroundColor: 'black',
                    },
                  ]}
                ></View>
              );
            } else {
              return (
                <TouchableOpacity
                  style={[
                    styles.itemContainer,
                    { height: squareDimension, width: squareDimension },
                    highligthedCell === item
                      ? { backgroundColor: Colors.selectedSquare }
                      : {},
                  ]}
                  onPress={() => selectSquare(item)}
                >
                  <Text style={styles.itemNumber}>{item.number}</Text>

                  <Text style={styles.letter}>{item.playerLetter}</Text>
                </TouchableOpacity>
              );
            }
          }}
        />
      )}
      <View style={styles.container}>
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
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
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
  inputView: {
    width: 0,
    height: 0,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 2,
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
});

export default GameScreen;
