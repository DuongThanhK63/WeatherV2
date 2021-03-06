import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet, Text, View, StatusBar, useWindowDimensions, ScrollView, Platform
} from 'react-native';

import * as Location from 'expo-location';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import TopTemp from '../components/TopTemp';
import HourlyFuture from '../components/HourlyFuture';
import DailyFuture from '../components/DailyFuture';
import Detail from '../components/Detail';

const API_KEY = '78daf74e0c3e372089b6fd6202f50cfa';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const Home = () => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    // Top container
    const [current_weather, setcurrent_weather] = useState('')
    const [current_temp, setcurrent_temp] = useState('')
    const [name, setname] = useState('')

    // Center container
    // Hours
    const [h_temp0, seth_temp0] = useState('')
    const [h_icon0, seth_icon0] = useState('')

    const [h_temp1, seth_temp1] = useState('')
    const [h_icon1, seth_icon1] = useState('')

    const [h_temp2, seth_temp2] = useState('')
    const [h_icon2, seth_icon2] = useState('')

    const [h_temp3, seth_temp3] = useState('')
    const [h_icon3, seth_icon3] = useState('')

    const [h_temp4, seth_temp4] = useState('')
    const [h_icon4, seth_icon4] = useState('')

    const [h_temp5, seth_temp5] = useState('')
    const [h_icon5, seth_icon5] = useState('')

    const [h_temp6, seth_temp6] = useState('')
    const [h_icon6, seth_icon6] = useState('')


    // Daily
    const [d_min0, setd_min0] = useState('')
    const [d_max0, setd_max0] = useState('')
    const [d_icon0, setd_icon0] = useState('')

    const [d_min1, setd_min1] = useState('')
    const [d_max1, setd_max1] = useState('')
    const [d_icon1, setd_icon1] = useState('')

    const [d_min2, setd_min2] = useState('')
    const [d_max2, setd_max2] = useState('')
    const [d_icon2, setd_icon2] = useState('')

    const [d_min3, setd_min3] = useState('')
    const [d_max3, setd_max3] = useState('')
    const [d_icon3, setd_icon3] = useState('')

    const [d_min4, setd_min4] = useState('')
    const [d_max4, setd_max4] = useState('')
    const [d_icon4, setd_icon4] = useState('')

    const [d_min5, setd_min5] = useState('')
    const [d_max5, setd_max5] = useState('')
    const [d_icon5, setd_icon5] = useState('')

    const [d_min6, setd_min6] = useState('')
    const [d_max6, setd_max6] = useState('')
    const [d_icon6, setd_icon6] = useState('')


    // Bottom container
    const [current_pressure, setcurrent_pressure] = useState('')
    const [current_humidity, setcurrent_humidity] = useState('')
    const [current_wind_speed, setcurrent_wind_speed] = useState('')
    const [current_visibility, setcurrent_visibility] = useState('')

    const [current_uvi, setcurrent_uvi] = useState('')
    const [current_no2, setcurrent_no2] = useState('')
    const [current_co, setcurrent_co] = useState('')
    const [current_pm25, setcurrent_pm25] = useState('')

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("He he")
                onecall_fetchDataFromApi("21", "105")
                current_fetchDataFromApi("21", "105")
                current_AirFromApi("21", "105")
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            onecall_fetchDataFromApi(location.coords.latitude, location.coords.longitude);
            current_fetchDataFromApi(location.coords.latitude, location.coords.longitude);
            current_AirFromApi(location.coords.latitude, location.coords.longitude);
            // Xoa cac thong bao cu
            await Notifications.cancelAllScheduledNotificationsAsync();
            // Thong bao buoi sang
            await Notifications.scheduleNotificationAsync({
                identifier: "identifer1",
                content: {
                    title: `Th???i ti???t t???i ${name}`,
                    body: `${current_weather} : ${Math.floor(d_min0)} / ${Math.floor(d_max0)} C`,
                    data: { data: "goes here" },
                },
                trigger: {
                    hour: 7,
                    minute: 0,
                    repeats: true,
                },
            });

        })();

        // Push Notification
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };


    }, [])

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token;
    }

    const onecall_fetchDataFromApi = (latitude, longitude) => {
        if (latitude && longitude) {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}
            &lon=${longitude}&units=metric&lang=vi&appid=${API_KEY}`)
                .then(res => res.json()).then(data => {

                    console.log(data);

                    // Top
                    setcurrent_weather(data.current.weather[0])
                    setcurrent_temp(data.current.temp)

                    // Center
                    // Hours
                    seth_temp0(data.hourly[0].temp)
                    seth_icon0(data.hourly[0].weather[0].icon)

                    seth_temp1(data.hourly[1].temp)
                    seth_icon1(data.hourly[1].weather[0].icon)

                    seth_temp2(data.hourly[2].temp)
                    seth_icon2(data.hourly[2].weather[0].icon)

                    seth_temp3(data.hourly[3].temp)
                    seth_icon3(data.hourly[3].weather[0].icon)


                    seth_temp4(data.hourly[4].temp)
                    seth_icon4(data.hourly[4].weather[0].icon)

                    seth_temp5(data.hourly[5].temp)
                    seth_icon5(data.hourly[5].weather[0].icon)

                    seth_temp6(data.hourly[6].temp)
                    seth_icon6(data.hourly[6].weather[0].icon)

                    //  console.log(data.hourly[3].weather[0].icon)



                    // Daily
                    setd_min0(data.daily[0].temp.min)
                    setd_max0(data.daily[0].temp.max)
                    setd_icon0(data.daily[0].weather[0].icon)

                    setd_min1(data.daily[1].temp.min)
                    setd_max1(data.daily[1].temp.max)
                    setd_icon1(data.daily[1].weather[0].icon)

                    setd_min2(data.daily[2].temp.min)
                    setd_max2(data.daily[2].temp.max)
                    setd_icon2(data.daily[2].weather[0].icon)

                    setd_min3(data.daily[3].temp.min)
                    setd_max3(data.daily[3].temp.max)
                    setd_icon3(data.daily[3].weather[0].icon)

                    setd_min4(data.daily[4].temp.min)
                    setd_max4(data.daily[4].temp.max)
                    setd_icon4(data.daily[4].weather[0].icon)


                    setd_min5(data.daily[5].temp.min)
                    setd_max5(data.daily[5].temp.max)
                    setd_icon5(data.daily[5].weather[0].icon)

                    setd_min6(data.daily[6].temp.min)
                    setd_max6(data.daily[6].temp.max)
                    setd_icon6(data.daily[6].weather[0].icon)

                    // Bottom
                    setcurrent_humidity(data.current.humidity)
                    setcurrent_pressure(data.current.pressure)
                    setcurrent_visibility(data.current.visibility)
                    setcurrent_wind_speed(data.current.wind_speed)
                    setcurrent_uvi(data.current.uvi)



                })
        }
    }

    const current_fetchDataFromApi = (latitude, longitude) => {
        if (latitude && longitude) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}
            &lon=${longitude}&units=metric&lang=vi&appid=${API_KEY}`)
                .then(res => res.json()).then(data => {

                    console.log(data);
                    setname(data.name)

                })
        }

    }

    const current_AirFromApi = (latitude, longitude) => {
        if (latitude && longitude) {
            fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=$
            {latitude}&lon=${longitude}&appid=${API_KEY}`)
                .then(res => res.json()).then(data => {

                    console.log(data);
                    setcurrent_co(data.list[0].components.co)
                    setcurrent_no2(data.list[0].components.no2)
                    setcurrent_pm25(data.list[0].components.pm2_5)
                })
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.containerTemp}>
                <TopTemp current_temp={current_temp} name={name} current_weather={current_weather} />
            </View>
            {/* Hours */}
            <View style={styles.containerHours}>
                <Text style={styles.text}>H??ng gi???</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <HourlyFuture
                        h_temp0={h_temp0} h_icon0={h_icon0}
                        h_temp1={h_temp1} h_icon1={h_icon1}
                        h_temp2={h_temp2} h_icon2={h_icon2}
                        h_temp3={h_temp3} h_icon3={h_icon3}
                        h_temp4={h_temp4} h_icon4={h_icon4}
                        h_temp5={h_temp5} h_icon5={h_icon5}
                        h_temp6={h_temp6} h_icon6={h_icon6}
                    />
                </ScrollView>

            </View>

            {/* Days */}
            <View style={styles.containerDays}>
                <Text style={styles.text}>H??ng ng??y</Text>
                <ScrollView horizontal={false} pagingEnabled showsVerticalScrollIndicator={false}>

                    <DailyFuture
                        d_min0={d_min0} d_max0={d_max0} d_icon0={d_icon0}
                        d_min1={d_min1} d_max1={d_max1} d_icon1={d_icon1}
                        d_min2={d_min2} d_max2={d_max2} d_icon2={d_icon2}
                        d_min3={d_min3} d_max3={d_max3} d_icon3={d_icon3}
                        d_min4={d_min4} d_max4={d_max4} d_icon4={d_icon4}
                        d_min5={d_min4} d_max5={d_max5} d_icon5={d_icon5}
                        d_min6={d_min6} d_max6={d_max6} d_icon6={d_icon6}
                    />
                </ScrollView>

            </View>

            {/* Detail */}

            <View style={styles.containerDetail}>
                <Text style={styles.text}>Chi ti???t</Text>
                <ScrollView horizontal={false} pagingEnabled showsVerticalScrollIndicator={false}>

                    <Detail wind_speed={current_wind_speed}
                        visibility={current_visibility} pressure={current_pressure}
                        humidity={current_humidity} current_uvi={current_uvi} current_co={current_co}
                        current_no2={current_no2} current_pm25={current_pm25} />

                </ScrollView>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#55B4C2',
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    containerTemp: {
        flex: 3,
    },
    containerHours: {
        flex: 3,
        backgroundColor: '#55B4C2',
        marginVertical: 1,
        alignItems: 'center'
    },
    containerDays: {
        flex: 4,
        height: '20%',
        backgroundColor: '#55B4C2',
        marginVertical: 1,
        alignItems: 'center'
    },
    containerDetail: {
        alignItems: 'center',
        flex: 2,

    },
    dayDetail: {
        paddingRight: 20,
    },
    image: {
        width: 150,
        height: 150,
    },
    text: {
        color: 'white',

    },
    temp: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    tempView: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    time: {
        flex: 1,
    },
    time1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    time2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        width: 50,
        height: 50,
    },
    tempFont: {
        fontSize: 20,
        color: 'white',
    },
    mainTemp: {
        fontSize: 65,
        color: 'white'

    },
    weatherList: {
        alignItems: 'center',
        margin: 15,

    },
    textDetail: {
        color: 'white',
        fontSize: 15,

    },
    infoBar: {
        width: 45,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },

    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    location: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },

});

export default Home
