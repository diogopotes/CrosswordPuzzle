import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import LoadingScreen from './../screens/LoadingScreen';

import GameScreen from './../screens/GameScreen';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();

export default function () {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  /*   useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }); */

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={{
            headerTitle: 'Crossword Puzzle',
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTitleStyle: {
              alignSelf: 'center',
              color: 'white',
              fontSize: 22,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
