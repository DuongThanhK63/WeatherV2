import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
  ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Weather from './mini_screens/Weather';

const Home = () => {
    return (
        <View style={styles.container}>
            <Weather nameCity={"Ha Noi"} />

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex : 1,
        // backgroundColor: '#18181b99'
      
    },
});

export default Home
