// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TodoListScreen from './screens/TodoListScreen';
import NoteScreen from './screens/NoteScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}  />
    <Stack.Screen name="Note" component={NoteScreen}  />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack}  options={{ headerShown: false }}  />
        <Tab.Screen name="Todo" component={TodoListScreen}  options={{ headerShown: false }}  />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
