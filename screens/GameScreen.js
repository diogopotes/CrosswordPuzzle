import React, { useState } from 'react';
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

  const [items, setItems] = useState(cells);

  const selectSquare = (item) => {
    let listItems = cells;

    let itemsWithSelected = listItems.map((i) => {
      if (i.x === item.x && i.y === item.y && i.type !== 'block') {
        return { ...i, isSelected: true };
      } else {
        return i;
      }
    });

    setItems(itemsWithSelected);
  };

  console.log(items);

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
          } else if (item.isSelected) {
            return (
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  {
                    height: squareDimension,
                    backgroundColor: Colors.selectedSquare,
                  },
                ]}
                onPress={() => selectSquare(item)}
              >
                <Text style={styles.itemName}>{item.number}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                style={[styles.itemContainer, { height: squareDimension }]}
                onPress={() => selectSquare(item)}
              >
                <Text style={styles.itemName}>{item.number}</Text>
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
