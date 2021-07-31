import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';

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

  const inputRef = useRef();

  const [highligthedCell, setHighligthedCell] = useState({});

  const [letterPlayed, setLetterPlayed] = useState('');

  const [crosswordPuzzle, setCrosswordPuzzle] = useState(gameboard);

  const selectSquare = (item) => {
    if (item === highligthedCell) {
      setHighligthedCell({});
    } else {
      let listItems = crosswordPuzzle;

      let selectedCell;

      listItems.map((i) => {
        if (i === item && i.type !== 'block') {
          selectedCell = i;
        }
      });

      inputRef.current.focus();
      setHighligthedCell(selectedCell);
    }
  };

  const inputLetter = () => {
    let updatedCrossword = crosswordPuzzle;

    updatedCrossword = updatedCrossword.map((square) => {
      if (square.x === item.x && square.y === item.y) {
        return { ...square, playerLetter: value };
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
});

export default GameScreen;
