// In App.js in a new project

import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
    ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WeatherMini from '../../components/WeatherMini';
import Weather from './Weather';




const Weathers = ({navigation}) => {
  const [text, setText] = React.useState("");

  return (
    <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details', {
                nameCity: "Ha Noi",
                })

          }
      />
      

        </View>
          

        <View style={styles.containerCenter}>

        </View>
        

    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex : 1,
      backgroundColor: '#18181b99',
      
      
    },
    containerTop: {
        flex: 1,
        // backgroundColor: 'red',
        marginTop: 30,

    },
    containerCenter: {
        flex: 7,
        backgroundColor: 'blue',
        

    },
    title: {
      fontSize: 20,
      //  backgroundColor: 'blue',
    },
    input: {
       marginVertical: 10,
      marginHorizontal: 20,
      height: 50,
      backgroundColor: 'white',
    },

  
  });

export default Weathers;