import React from 'react'
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
    ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Button, Alert } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Weather from '../screens/mini_screens/Weather';

const Screen = ({nameCity}) => {
  // <Weather nameCity={nameCity} />
  

}

const Stack = createNativeStackNavigator();

const WeatherMini = ({nameCity}) => {
    return (
        <TouchableOpacity onPress={() => {
      Alert("hehehe")
        }} >
        
          <View style={styles.container}>
              <Text style={styles.title}>{nameCity}</Text>
              

          </View>
        </TouchableOpacity>

    )
    
}

const styles = StyleSheet.create({
    container: {
     
      backgroundColor: 'white',
      marginTop: 20,
      marginHorizontal: 10,
      borderRadius: 8,
      height: 80,
      alignItems: 'center',
      
    },
    title: {
      fontSize: 20,
      //  backgroundColor: 'blue',
    },
  
  });

export default WeatherMini
