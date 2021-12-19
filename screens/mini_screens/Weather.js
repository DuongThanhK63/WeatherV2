import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
    ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const img = {uri: 'http://openweathermap.org/img/wn/10d@2x.png'}
import TopTemp from '../../components/TopTemp';
import HourlyFuture from '../../components/HourlyFuture';
import DailyFuture from '../../components/DailyFuture';

const API_KEY = '78daf74e0c3e372089b6fd6202f50cfa';


const Weather = ({nameCity}) => {
    const [data, setData] = useState({});

    useEffect(() => {
        (async () => {
            console.log(nameCity)
            fetchDataFromApi(nameCity);
        })();
      }, []);

      const fetchDataFromApi = (nameCity) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&lang=vi&appid=${API_KEY}`)
         .then(res => res.json()).then(data => {
        console.log(data);
        setData(data);
         })

    }
  
    return (
    <View style={styles.container}>
        {/* Temp detail */}
        <View style={styles.containerTempDetail}>
            {/* <TopTemp main={data.main} name={data.name} weather={data.weather} wind={data.wind}
            visibility={data.visibility} coord={data.coord} /> */}

        </View>
        {/* Hours */}
        <View style={styles.containerHours}>
            <ScrollView horizontal={true} style={styles.dayScroll}>
            {/* <HourlyFuture  main={data.main} name={data.name} weather={data.weather} wind={data.wind}
            visibility={data.visibility} coord={data.coord} /> */}
            </ScrollView>

        </View>
        {/* Days */}
        <View style={styles.containerDays}> 
            <ScrollView horizontal={true} style={styles.dayScroll}>
                {/* <DailyFuture  main={data.main} name={data.name} weather={data.weather} wind={data.wind}
            visibility={data.visibility} coord={data.coord} /> */}
            </ScrollView>
        </View>

    </View>
)

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#18181b99',
        width: "100%",
        height: "100%",
        // padding: 5,
        
    },
    containerTempDetail: {
        flex: 5,
        // backgroundColor: 'red',
        borderRadius: 2,
    },
    containerHours: {
        flex: 2,
        backgroundColor: 'green',
        marginVertical: 5,
        borderRadius: 2,
    },
    containerDays: {
        flex: 2,
        borderRadius: 2,
    },
    dayScroll: {
        backgroundColor: '#18181b99',

    },
    containerFlex: {
        
        flexDirection: 'row',
        backgroundColor: '#00000033',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#eee',
        borderWidth: 1,
    },
    dayDetail: {
        paddingRight: 20,
    },
    image: {
        width: 150,
        height: 150,
    },


});

export default Weather
