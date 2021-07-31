import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';

import Colors from '../constants/Colors';

import { cells } from '../data/crossword-puzzle.json';

const GameScreen = () => {
  const screenWidth = Dimensions.get('screen').width;

  const squareDimension = screenWidth / 16;

  const inputRef = useRef();

  const [highligthedCell, setHighligthedCell] = useState({});

  const [items, setItems] = useState(cells);

  const [letterPlayed, setLetterPlayed] = useState('');

  const [playerGameboard, setPlayerGameboard] = useState(
    cells.map((c) => {
      if (c.type !== 'block') {
        return { ...c, playerLetter: '' };
      }
    })
  );

  console.log(playerGameboard);

  const selectSquare = (item) => {
    if (item === highligthedCell) {
      setHighligthedCell({});
    } else {
      let listItems = cells;

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

  const inputLetter = (value) => {
    setLetterPlayed(value);
  };

  //console.log(letterPlayed);

  return (
    <View style={styles.screen}>
      <FlatGrid
        itemDimension={squareDimension}
        data={playerGameboard}
        //fixed
        spacing={0}
        renderItem={({ item }) => {
          if (!item.solution) {
            return (
              <View
                style={[
                  styles.itemContainer,
                  { height: squareDimension, backgroundColor: 'black' },
                ]}
              ></View>
            );
          } else {
            return (
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  { height: squareDimension },
                  highligthedCell === item
                    ? { backgroundColor: Colors.selectedSquare }
                    : {},
                ]}
                onPress={() => selectSquare(item)}
              >
                <Text style={styles.itemNumber}>{item.number}</Text>

                <Text style={styles.letter}>{letterPlayed}</Text>
              </TouchableOpacity>
            );
          }
        }}
      />
      <View style={styles.inputView}>
        <TextInput
          caretHidden
          ref={inputRef}
          maxLength={1}
          //value={letterPlayed}
          //onfocus={() => (value = '')}
          onChangeText={(val) => inputLetter(val)}
        />
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
    height: 10,
  },
});

export default GameScreen;
