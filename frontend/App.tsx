import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {initializeApp} from 'firebase/app';
import {getDatabase, ref} from "firebase/database";
import MenuIcon from './components/MenuIcon';
import Map from './Map';
import Chart from './Chart';
import Profile from './Profile';

const firebaseConfig = {
  apiKey: 'AIzaSyAKl7YYOilhJ02a9f6HwEuihRrEMR-I8BU',
  //authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://ecogators-b435b-default-rtdb.firebaseio.com/',
  projectId: 'ecogators-b435b',
  storageBucket: 'ecogators-b435b.appspot.com',
  messagingSenderId: 'sender-id',
  appId: '1:21504696904:android:ba0ebebb786d2ce8ee6e7d',
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={{headerShown: true, headerLeft: () => <MenuIcon />}}>
            <Drawer.Screen name='Map' component={Map} />
            <Drawer.Screen name='Chart' component={Chart} />
            <Drawer.Screen name='Profile' component={Profile} />
          </Drawer.Navigator>
        </NavigationContainer>
      <StatusBar style='auto' />
    </SafeAreaProvider>
  );
}
