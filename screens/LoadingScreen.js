import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';

import Colors from '../constants/Colors';

const LoadingScreen = () => {
  return (
    <View style={styles.screen}>
      <Image
        source={require('../assets/img/crossword.png')}
        style={styles.image}
      />
      <View style={styles.indicator}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    height: '35%',
  },
  indicator: {
    marginVertical: 20,
  },
});

export default LoadingScreen;
