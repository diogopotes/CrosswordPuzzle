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

  /*   useEffect(() => {

    const getData = async () => {

            try {

                const {data} = await axios.get('data/data.json');

                setListEmployees(data.employees);

            } catch(err) {

                setError(true);
                console.log(err.message);

            }

    }

   
    getData();

},[]) */

  const [highligthedCell, setHighligthedCell] = useState({});

  const [items, setItems] = useState(cells);

  const [letterPlayed, setLetterPlayed] = useState('');

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

  console.log(highligthedCell);

  return (
    <View style={styles.screen}>
      <FlatGrid
        itemDimension={squareDimension}
        data={items}
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

                <TextInput
                  caretHidden
                  ref={inputRef}
                  maxLength={1}
                  style={styles.inputView}
                  onChangeText={(val) => setLetterPlayed(val)}
                />
              </TouchableOpacity>
            );
          }
        }}
      />
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
    opacity: 0,
    height: 0,
  },
});

export default GameScreen;
