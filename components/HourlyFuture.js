import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
    ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HourlyFuture = ({
    h_temp0, h_icon0,
    h_temp1, h_icon1,
    h_temp2, h_icon2,
    h_temp3, h_icon3,
    h_temp4, h_icon4,
    h_temp5, h_icon5,
    h_temp6, h_icon6,
   

}) => {
    const [hour1, setHour1] = useState('')
    const [hour2, setHour2] = useState('')
    const [hour3, setHour3] = useState('')
    const [hour4, setHour4] = useState('')
    const [hour5, setHour5] = useState('')
    const [hour6, setHour6] = useState('')

        setInterval(() => {
            const time = new Date();
            const hour0 = time.getHours();
            const hour1 = hour0 + 1;
            const hour2 = hour1 + 1;
            const hour3 = hour2 + 1;
            const hour4 = hour3 + 1;
            const hour5 = hour4 + 1;
            const hour6 = hour5 + 1;

            const ampm1 = (hour1 >= 12 && hour1 < 24) ? 'PM' : 'AM';
            const hour1F = hour1 >= 13 ? hour1 %12: hour1;
            setHour1((hour1F < 10? '0' + hour1F : hour1F) + ':00 ' + ampm1);

            const ampm2 = (hour2 >= 12 && hour2 < 24) ? 'PM' : 'AM';
            const hour2F = hour2 >= 13 ? hour2 %12: hour2;
            setHour2((hour2F < 10? '0' + hour2F : hour2F) + ':00 ' + ampm2);

            const ampm3 = (hour3 >= 12 && hour3 < 24) ? 'PM' : 'AM';
            const hour3F = hour3 >= 13 ? hour3 %12: hour3;
            setHour3((hour3F < 10? '0' + hour3F : hour3F) + ':00 ' + ampm3);

            const ampm4 = (hour4 >= 12 && hour4 < 24) ? 'PM' : 'AM';
            const hour4F = hour4 >= 13 ? hour4 %12: hour4;
            setHour4((hour4F < 10? '0' + hour4F : hour4F) + ':00 ' + ampm4);

            const ampm5 = (hour5 >= 12 && hour5 < 24) ? 'PM' : 'AM';
            const hour5F = hour5 >= 13 ? hour5 %12: hour5;
            setHour5((hour5F < 10? '0' + hour5F : hour5F) + ':00 ' + ampm5);

            const ampm6 = (hour6 >= 12 && hour6 < 24) ? 'PM' : 'AM';
            const hour6F = hour6 >= 13 ? hour6 %12: hour6;
            setHour6((hour6F < 10? '0' + hour6F : hour6F) + ':00 ' + ampm6);


        }, 1000);
    return (
        <View  style={styles.container}>
            <CurrentWeather h_temp0={h_temp0} h_icon0={h_icon0}/>

            <FutureItem hour={hour1} h_temp={h_temp1} h_icon={h_icon1}/>
            <FutureItem hour={hour2} h_temp={h_temp2} h_icon={h_icon2}/>
            <FutureItem hour={hour3} h_temp={h_temp3} h_icon={h_icon3}/>
            <FutureItem hour={hour4} h_temp={h_temp4} h_icon={h_icon4}/>
            <FutureItem hour={hour5} h_temp={h_temp5} h_icon={h_icon5}/>
            <FutureItem hour={hour6} h_temp={h_temp6} h_icon={h_icon6}/>
            
            
            
        </View>
    )
}

const CurrentWeather = ({h_temp0, h_icon0}) => {
    const img = {uri: 'http://openweathermap.org/img/wn/'+ h_icon0 +'@2x.png'}

    return(
        <View style={styles.futureContainer}>
            <Text style={styles.text}>Bây giờ</Text>
            <Image source={img} style={styles.image}/>
            <Text style={styles.text}>{Math.floor(h_temp0)}&#176;C</Text>
        
        </View>

    )
}

const FutureItem = ({h_temp, h_icon, hour}) => {
    const img = {uri: 'http://openweathermap.org/img/wn/'+ h_icon +'@2x.png'}
    return (
        <View style={styles.futureContainer}>
            <Text style={styles.text}>{hour}</Text>
            <Image source={img} style={styles.image}/>
            <Text style={styles.text}>{Math.floor(h_temp)}&#176;C</Text>
    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        
        backgroundColor: '#55B4C2',
    },
    futureContainer: {
        backgroundColor: '#55B4C2',
        justifyContent: 'center',
        alignItems: 'center',
       width: 80,
       height: "90%",
       
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 2,
    
        
    },
    image: {
        width: 40,
        height: 40,
    },
    text: {
        color:'white'
    }

});

export default HourlyFuture
