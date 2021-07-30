import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { FlatGrid } from 'react-native-super-grid';

import Colors from '../constants/Colors';

import { cells } from '../data/crossword-puzzle.json';

const GameScreen = () => {
  const screenWidth = Dimensions.get('screen').width;

  const squareDimension = screenWidth / 16;

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

  const inputRef = useRef();

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
                <Text style={styles.itemName}>{item.number}</Text>
                <Text ref={inputRef}></Text>
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
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  itemName: {
    fontSize: 8,
    color: 'black',
    fontWeight: '600',
  },
});

export default GameScreen;
