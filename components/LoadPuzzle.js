import React from 'react';

import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

import Colors from '../constants/Colors';

const LoadPuzzle = () => {
  return (
    <View style={styles.loadingPuzzleContainer}>
      <Text style={styles.loadingText}>LOADING PUZZLE...</Text>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingPuzzleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: 24,
    color: Colors.primary,
  },
});

export default LoadPuzzle;
