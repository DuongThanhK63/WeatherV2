import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
  ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Weather from './mini_screens/Weather';


function SearchScreen({ navigation }) {
  const [text, setText] = React.useState("");
  return (
    <View style={styles.container}>
        <View style={styles.containerTop}>
          <TextInput
              value={text}
              style={styles.input}
              placeholder="Nhap vao..."
              onChangeText={(user) => setText(user)}
              
          />


          <View style ={styles.button}>
          <Button
            title="Search"
            onPress={() => {
              navigation.navigate('DetailsScreen', {
              nameCity: text,
              });
            }}
          />
          </View>

        </View>

        <View style={styles.containerCenter}>

        </View>
    </View>
  );
}

function DetailsScreen({route, navigation}) {
  const {nameCity} = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Weather nameCity={nameCity}/>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={SearchScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
      backgroundColor: '#18181b99'
    
  },
  containerTop: {
    // marginTop: StatusBar.currentHeight,
    flex: 1,
    
    
    flexDirection: 'row',
  
    
    
    // backgroundColor: 'yellow',
  },
  containerCenter: {
    flex: 6,
    // backgroundColor: 'blue',
  },
  button: {
    // marginRight: 10,
    height: "50%",
    width: "30%",
    marginVertical: "5%",
    
   
   
    
    

  },
  input: {
    height: "50%",
    width: "65%",
    marginVertical: "5%",
    backgroundColor: 'white',
    marginHorizontal: "2%",

    
   
  },
});

export default Search
