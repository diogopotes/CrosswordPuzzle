import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';

import PreloadScreen from '../screens/PreloadScreen';

import GameScreen from './../screens/GameScreen';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();

export default function () {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <PreloadScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="GameScreen"
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
