//Packages
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Drawer Content
import {DrawerContent} from '../screens/DrawerContent';

//Home Page
import Dashboard from '../screens/Dashboard';
import UserList from '../screens/UserList';
import Profile from '../screens/Profile';
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'Dashboard'}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="UserList" component={UserList} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
    
  );
};

export default AuthStack;
