import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import 'react-native-gesture-handler';
import { BooksScreen } from './src/screens/Book/BooksScreen';
import { FlatListScreen } from './src/screens/FlatList/FlatListScreen';
import { OpMatScreen } from './src/screens/OpMat/OpMatScreen';
import { SpeechScreen } from './src/screens/Speech/SpeechScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="OpMat">
        <Drawer.Screen name="OpMat" component={OpMatScreen} />
        <Drawer.Screen name="Speech" component={SpeechScreen} />
        <Drawer.Screen name="FlatList" component={FlatListScreen} />
        <Drawer.Screen name="Crud" component={BooksScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}