import React from 'react';

import * as Notifications from 'expo-notifications';


import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import Home from './screens/Home';
import Favorite from './screens/Favorite';

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