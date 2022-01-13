import React from 'react';
import { LogBox } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import Home from './screens/Home';
import Favorite from './screens/Favorite';
import Test from './screens/Test';
LogBox.ignoreAllLogs()


const Drawer = createDrawerNavigator();
 
const App = () => {
   return (

    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} options={{headerShown: false,}}/>
        <Drawer.Screen name="Favorite" component={Favorite} options={{headerShown: false,}}/>
       
      </Drawer.Navigator>
    </NavigationContainer>
   )
}


export default App;
