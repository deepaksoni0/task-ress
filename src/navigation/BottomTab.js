import React from 'react';
import Dashboard from '../screens/OtherScreens/Dashboard';
import ProfileTab from '../screens/BottomTabNavigationScreens/ProfileTab';
import PropertiesTab from '../screens/BottomTabNavigationScreens/PropertiesTab';
import ReviewTab from '../screens/BottomTabNavigationScreens/ReviewTab';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();
function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#23C1DB"
      inactiveColor="#888"
      barStyle={{ backgroundColor: 'white' }}
      >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ReviewTab"
        component={ReviewTab}
        options={{
          tabBarLabel: 'Review',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="star-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PropertiesTab"
        component={PropertiesTab}
        options={{
          tabBarLabel: 'Properties',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="shield-home-outline"
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="md-person-outline" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
