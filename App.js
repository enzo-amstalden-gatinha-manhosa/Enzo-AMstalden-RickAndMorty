import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersListScreen from './screens/CharactersListScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CharactersList"
          component={CharactersListScreen}
          options={{ title: 'Personagens',
            headerStyle: { backgroundColor: '#0b0f17' },
            headerTintColor: '#37ff8a',
            headerTitleStyle: { fontWeight: '800' },
          }}
        />
        <Stack.Screen
          name="CharacterDetail"
          component={CharacterDetailScreen}
          options={{ title: 'Detalhes do Personagem',
            headerStyle: { backgroundColor: '#0b0f17' },
            headerTintColor: '#37ff8a',
            headerTitleStyle: { fontWeight: '800' },
           }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
