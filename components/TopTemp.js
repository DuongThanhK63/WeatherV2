import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, PermissionsAndroid, useWindowDimensions, 
    ScrollView, SafeAreaView, FlatList, ActivityIndicator, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const days = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const API_KEY = '78daf74e0c3e372089b6fd6202f50cfa';

const TopTemp = ({main, wind, visibility, name, weather, coord}) => {
    const img = {uri: 'http://openweathermap.org/img/wn/'+ weather[0].icon +'@2x.png'}
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [data, setData] = useState({});

    useEffect (() => {

        (async () => {
            fetchDataFromApi(coord.lat, coord.lon);
        })();

        setInterval(() => {
            const time = new Date();
            const month = time.getMonth();
            const date = time.getDate();
            const day = time.getDay();
            const hour = time.getHours();
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
            const minutes = time.getMinutes();
            
            setTime((hoursIn12HrFormat < 10? '0' + hoursIn12HrFormat : hoursIn12HrFormat) 
            + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm);

            setDate(days[day] + ', ' + date + ' ' + months[month]);

        }, 1000);
    }, [])

    const fetchDataFromApi = (lat, lon) => {
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
         .then(res => res.json()).then(data => {
             console.log("He he he he ")
         console.log(data);
        setData(data);
         });

        }


    return (
        <View style={styles.container}>
            <View style={styles.temp}>

                <View style={styles.time}>
                    <Text style={styles.tempFont}>{date}</Text>
                    <Text style={styles.tempFont}>{time}</Text>
                    <Image source={img} style={styles.image}/>
                    <Text style={styles.tempFont}>{weather[0].main}</Text>
                </View>
                <View style={styles.main}>
                    <Text style={styles.mainTemp}>{Math.floor(main.temp)}&#176;C</Text>

                </View>
            </View>
            <View style={styles.detail}>
                <View style={styles.detailTop}>
                    {/* Độ ẩm */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Độ ẩm</Text>
                        <Text style={styles.textDetail}>{main.humidity}</Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: main.humidity / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 
                    {/* Sức gió */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Sức gió</Text>
                        <Text style={styles.textDetail}>{wind.speed}</Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: wind.speed / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 
                    {/* Tầm nhìn */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Tầm nhìn</Text>
                        <Text style={styles.textDetail}>{Math.floor(visibility/1000)}</Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: Math.floor(visibility/1000) / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 
                    {/* Áp suất */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Độ ẩm</Text>
                        <Text style={styles.textDetail}>50</Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: 50 / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 

                </View>
                <View style={styles.detailBottom}>
                    {/* NO2 */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Độ ẩm</Text>
                        <Text style={styles.textDetail}></Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: 50 / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 
                    {/* PM10 */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Độ ẩm</Text>
                        <Text style={styles.textDetail}>50</Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: 50 / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 
                    {/* O3 */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Độ ẩm</Text>
                        <Text style={styles.textDetail}>50</Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: 50 / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 
                    {/* PM25 */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Độ ẩm</Text>
                        <Text style={styles.textDetail}>50</Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: 50 / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 
                    {/* Độ ẩm */}
                    <View style={styles.weatherList}>
                        <Text style={styles.textDetail}>Độ ẩm</Text>
                        <Text style={styles.textDetail}>50</Text>
                        <Text style={styles.textDetail}>%</Text>
                        <View style={styles.infoBar}>
                            <View
                            style={{
                                width: 50 / 2,
                                height: 5,
                                backgroundColor: 'yellow',
                            }}
                            />
                        </View>
                    </View> 

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    temp: {
        flex: 5,
        backgroundColor: 'blue',
        flexDirection: 'row',
    },
    time: {
        margin: 2,
    },
    detail: {
        flex: 6
    },
    detailTop: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
        

    },
    detailBottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
    },
    tempFont: {
        fontSize: 15,
        color: 'white',
    },
    main: {
        // marginRight: "10%",
    },
    mainTemp: {
        fontSize: 100,
        color: 'white'

    },
    weatherList: {
        alignItems: 'center',
        margin: 15,

    },
    textDetail: {
        color: 'white',
        fontSize: 14,
        
    },
    infoBar: {
        width: 45,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },




    
});

export default TopTemp
