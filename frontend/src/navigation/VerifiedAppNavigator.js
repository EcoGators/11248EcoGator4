import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import MenuIcon from './components/MenuIcon'
import StackNavigator from './StackNavigator'
import { Map } from '../features/home/screens/Map'
import { Chart } from '../features/home/screens/Chart'

const Drawer = createDrawerNavigator();

export const VerifiedAppNavigator = () => (
  <Drawer.Navigator
    screenOptions={{headerShown: true, headerLeft: () => <MenuIcon />}}>
    <Drawer.Screen name='Profile' component={StackNavigator} />
    <Drawer.Screen name='Map' component={Map} />
    <Drawer.Screen name='Chart' component={Chart} />
  </Drawer.Navigator>
)
