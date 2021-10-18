import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Profile from './Profile';
import Map from './Map';
import MenuIcon from './components/MenuIcon';

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{headerShown: true, headerLeft: () => <MenuIcon />}}>
            <Drawer.Screen name='Map' component={Map} />
            <Drawer.Screen name='Profile' component={Profile} />
          </Drawer.Navigator>
        </NavigationContainer>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}
