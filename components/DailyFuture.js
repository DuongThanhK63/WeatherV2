import * as React from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
    ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const DailyFuture = ({main, wind, visibility, name, weather, coord}) => {
    return (
        <View style={styles.container}>
            <CurrentWeather />

            <FutureItem />
            <FutureItem />
            <FutureItem />
            <FutureItem />
            <FutureItem />
            <FutureItem />
        </View>
    )
}

const CurrentWeather = () => {
    const img = {uri: 'http://openweathermap.org/img/wn/10d@2x.png'}

    return(
        <View style={styles.futureContainer}>
            <Text>Sunday</Text>
            <Image source={img} style={styles.image}/>
            <Text>Night -28&#176;C</Text>
            <Text>Day -38&#176;C</Text>
        </View>

    )
}

const FutureItem = () => {
    const img = {uri: 'http://openweathermap.org/img/wn/10d@2x.png'}
    return (
        <View style={styles.futureContainer}>
            <Text>Sunday</Text>
            <Image source={img} style={styles.image}/>
            <Text>Night -28&#176;C</Text>
            <Text>Day -38&#176;C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        
    },
    futureContainer: {
        
        backgroundColor: '#00000033',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
        margin: 2,
        
    },
    image: {
        width: 50,
        height: 50,
    },

});

export default DailyFuture
